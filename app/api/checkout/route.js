import { initMongoose } from '@/lib/mongoose';
import Order from '@/model/order';
import Product from '@/model/product';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
    await initMongoose();

    if (req.method === 'POST') {
        try {
            const body = await req.json();
            const { name, email, address, city, productsIds } = body; // destructing, extracting data from the request
            const uniqIds = [...new Set(productsIds)]
            // Filter products w.r.t to UniqIds 
            const products = await Product.find({ _id: { $in: uniqIds } }).exec();
            const line_items = [];

            // console.log('User Information:', body);
            // console.log('Product IDs:', productsIds);
            // console.log('Unique IDs:', uniqIds);
            // console.log(products); // In Cart page

            for (const productId of uniqIds) {
                // Create an array of the matching UniqId from the POSTED data
                const quantity = productsIds.filter(id => id == productId).length
                // console.log('Quantity:', quantity);

                // Get unique products
                const product = products.filter(p => p._id == productId)
                // console.log(product[0]);

                line_items.push({
                    quantity,
                    price_data: {
                        product_data: { name: product[0].name },
                        currency: "CAD",
                        unit_amount: product[0].price * 100, // converted to cents (lowest currency unit)
                    },
                    // product_data: { name: product.name },
                    // unit_amount: product.price * 100,
                })
            }
            // console.log(line_items);

            // Setting up the order
            const order = await Order.create({
                products: line_items,
                name,
                email,
                address,
                city,
                paid: 0,
            })

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                customer_email: email,
                success_url: `http://localhost:3000/?success`,
                cancel_url: `http://localhost:3000/?failed`,
                metadata: { orderId: order._id.toString() } // send this to user as orderId for reference
                // success_url: `${req.headers.origin}/?success=true`,
                // cancel_url: `${req.headers.origin}/?canceled=true`,
            });

            // return NextResponse.redirect(303, session.url);
            return NextResponse.json({ message: "Request posted", url: session.url }); // return URL to the frontEnd (Handled using ReactJs)
        } catch (err) {
            return NextResponse.json({ message: err.message });
        }
    }
    else {
        return NextResponse.json({ message: "Not a POST request" });
    }
}