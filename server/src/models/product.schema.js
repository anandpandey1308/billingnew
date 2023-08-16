import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide a name"]
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    }
}, {timestamps: true})


export default mongoose.model("Product", productSchema)