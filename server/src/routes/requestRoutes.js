import express from "express";
import { createRequest } from "../controller/requestController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const requestRouter = express.Router();
requestRouter.use(authMiddleware);

requestRouter.post("/send", createRequest);
