import { Product } from "../models/product.js";

export const fetchProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) res.status(404).send("Product not found");

    return product;
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};

export const productCreate = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      // quantity,
      stock,
    });
    res.status(201).json({
      message: "Product was created succesfully",
      Product: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server error", error: error.message });
  }
};
