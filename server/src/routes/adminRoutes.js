import express from "express";
import { getStats } from "../controller/adminController.js";

export const adminRouter = express.Router();

adminRouter.get("/stats", getStats);

