import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity: { type: Number, min: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
basketSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((total, item) => {
    return Math.round((total + item.price * item.quantity) * 100) / 100;
  }, 0);
  console.log(this.totalPrice);
  next();
});

export const Basket = mongoose.model("Basket", basketSchema);
