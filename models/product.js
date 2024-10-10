import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  quantity: { type: Number },
  stock: { type: Number },
});

export const Product = mongoose.model("Product", productSchema);
