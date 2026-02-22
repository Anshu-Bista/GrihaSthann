import express from "express";
import { getAllRequests, getStats } from "../controller/adminController.js";

export const adminRouter = express.Router();

adminRouter.get("/stats", getStats);

adminRouter.get("/requests", getAllRequests);