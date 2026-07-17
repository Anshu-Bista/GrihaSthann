import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllRequests, getAllUsers, getStats, updateRequest } from "../controller/adminController.js";

export const adminRouter = express.Router();

adminRouter.use(authMiddleware);

adminRouter.get("/stats", getStats);

adminRouter.get("/requests", getAllRequests);

adminRouter.patch("/requests/:id", updateRequest);

adminRouter.get("/users", getAllUsers);