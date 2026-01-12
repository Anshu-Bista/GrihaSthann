import express from "express";
import { login, register } from "../controller/authController";

export const authRouter = express.Router();

router.post("/register", register);
router.post("/login", login);

