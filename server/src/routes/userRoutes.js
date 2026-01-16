import express from "express"
import { save } from "../controller/userController.js";


export const userRouter = express.Router();

userRouter.post("/", save);