import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddlewares.js";
import { getPost, postController } from "../controller/postController.js";

export const postRouter = Router();

postRouter.get("/", getPost);

postRouter.post("/", authenticateToken, postController);
