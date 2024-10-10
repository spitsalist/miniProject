import { Basket } from "../models/basket.js";
import { Product } from "../models/product.js";
import { fetchProduct } from "./productControler.js";

export const basketProducts = async (req, res) => {
  try {
    const { userId } = req.params;
    const basket = await Basket.findOne({ userId });
    if (!basket) {
      return res.status(404).send({ message: "Basket not found" });
    }
    res.status(200).json(basket);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

export const updateBasketControler = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await fetchProduct(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).send({ message: "Not avilable in the stock" });
    }

    let basket = await Basket.findOne({ userId: req.user.userId });

    if (!basket) {
      basket = await Basket.create({
        userId: req.user.userId,
        items: [],
        totalPrice: 0,
      });
    }

    const existItems = basket.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existItems > -1) {
      basket.items[existItems].quantity += quantity;
    } else {
      basket.items.push({
        productId: product._id,
        quantity: quantity,
        price: product.price,
      });
    }
    await basket.save();

    await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });
    return res
      .status(200)
      .json({ message: "Item added in the basket", basket });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error adding to Basket", error: error.message });
  }
  next();
};

export const deleteProductFromBasket = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity: deleteQuantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const basket = await Basket.findOne({
      "items.productId": productId,
    });
    if (!basket) {
      return res.status(404).send({ message: "Basket not found" });
    }

    const basketItem = basket.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!basketItem) {
      return res
        .status(404)
        .send({ message: "Product not found in the basket" });
    }

    if (basketItem.quantity < deleteQuantity) {
      return res.status(400).send({
        message: "Cannot remove more items than present in the basket",
      });
    }

    basketItem.quantity -= deleteQuantity;

    if (basketItem.quantity === 0) {
      basket.items = basket.items.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await basket.save();

    await Product.findByIdAndUpdate(productId, {
      $inc: { stock: deleteQuantity },
    });

    res.json({ message: "Product quantity updated in basket", basket });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productUpdate = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!productUpdate) return res.status(404).send("Product not found");
    res.status(201).json(productUpdate);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};
