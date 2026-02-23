import express from "express";
import { createProperty, deleteProperty, getProperties, getPropertyById } from "../controller/propertyController.js";
import upload from "../middleware/multerConfig.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const propertyRouter = express.Router();

propertyRouter.post("/", upload.array("images", 5),createProperty);

propertyRouter.get("/", getProperties);

propertyRouter.get("/:id", getPropertyById);

propertyRouter.delete("/:id", authMiddleware, deleteProperty);