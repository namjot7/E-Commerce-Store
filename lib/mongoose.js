import mongoose from "mongoose";

export async function initMongoose(params) {
    if (mongoose.connection.readyState === 1) { // connected
        return mongoose.connection.asPromise(); //  converts the existing connection into a promise, allowing you to wait for it as you would with any asynchronous operation.
    }
    return await mongoose.connect(process.env.MONGODB_URL)
    // return await mongoose.connect("mongodb+srv://namjot:oD8S266aeAvJENO8@cluster0.zs7tc.mongodb.net/online_store?retryWrites=true&w=majority&appName=Cluster0")
    // return await mongoose.connect("mongodb://localhost:27017/online_store/products")

}