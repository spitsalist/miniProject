import { Router } from "express";
// import mongoose from "mongoose";
import { authenticateToken } from "../middleware/authMiddlewares.js";
// import { Basket } from "../models/basket.js";
// import { Product } from "../models/product.js";
import {
  updateBasketControler,
  deleteProductFromBasket,
  updateProduct,
  basketProducts,
} from "../controller/basketController.js";

export const basketRouter = Router();
basketRouter.get("/:userId", basketProducts);
basketRouter.put("/:id", updateProduct);
basketRouter.post("/:id", authenticateToken, updateBasketControler);
basketRouter.delete("/:id", deleteProductFromBasket);
