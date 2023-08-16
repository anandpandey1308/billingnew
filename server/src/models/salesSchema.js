import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Provide a product name"],
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sales", salesSchema);
