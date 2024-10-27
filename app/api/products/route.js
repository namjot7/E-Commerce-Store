
// Go to http://localhost:3000/api/products to test console.log()

import { initMongoose } from "@/lib/mongoose";
import Product from "@/model/product";

export async function findAllProducts() {
    return Product.find().exec(); // executes the query to find products
}
export async function GET(req, res) {
    await initMongoose();

    const products = await findAllProducts(); // Fetch all products
    if (products) {
        return new Response(JSON.stringify(products), {
            headers: { 'Content-Type': 'application/json' },
        })
    }
    // Get ids from Req
    const symbols = Object.getOwnPropertySymbols(req);
    const state = req[symbols[1]];
    const searchParams = state.url.searchParams;
    const ids = searchParams.get('ids');

    if (ids) {
        console.log(ids);
        const idsArray = ids.split(',')
        const filteredProducts = products.filter(product => idsArray.includes(product._id.toString()));
        // console.log(filteredProducts);

        return new Response(JSON.stringify(filteredProducts), {
            headers: { 'Content-Type': 'application/json' },
        })
        // Not working
        // res.json(
        //     await Product.find({
        //         '_id': { $in: idsArray }
        //     }).exec())
    }
    // Can add the else for more security
    // else {
    //     return new Response(JSON.stringify(products), {
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    //     // res.json(products) // not working
    // }

}