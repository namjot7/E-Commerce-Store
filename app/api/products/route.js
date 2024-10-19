
import { initMongoose } from "@/lib/mongoose";
import Product from "@/model/product";

export async function findAllProducts(params) {
    return Product.find().exec();
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
    else {
        return new Response(JSON.stringify(products), {
            headers: { 'Content-Type': 'application/json' },
        })
        // res.json(products) // not working
    }

}