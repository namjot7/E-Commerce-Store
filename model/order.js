const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema({
    products: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    paid: { type: Number, defaultValue: 0 }
}, { timestamps: true })

const Order = models?.Order || model("Order", orderSchema) // check if orderSchema is already created
export default Order;