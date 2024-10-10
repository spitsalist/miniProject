import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routes/authRoute.js";
import { postRouter } from "./routes/postRoute.js";
import { basketRouter } from "./routes/basketRouter.js";
import { productRouter } from "./routes/productRouter.js";

dotenv.config(".env");
const port = 4001;
const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/register", authRouter);
app.use("/basket", basketRouter);
app.use("/product", productRouter);

const uri = process.env.MONGO_URI;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server is running on post: ${port}`));
  } catch {
    console.log(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};
start();
