import { Router } from "express";
import { fetchProduct, productCreate } from "../controller/productControler.js";

export const productRouter = Router();

productRouter.get("/", fetchProduct);
productRouter.post("/", productCreate);
