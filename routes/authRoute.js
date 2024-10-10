import { Router } from "express";
import { registerController, loginController } from "../controller/auth.js";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
