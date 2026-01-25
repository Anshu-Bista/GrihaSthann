import express from "express";
import { createProperty, getProperties, getPropertyById } from "../controller/propertyController.js";
import upload from "../middleware/multerConfig.js";

export const propertyRouter = express.Router();

propertyRouter.post("/", upload.array("images", 5),createProperty);

propertyRouter.get("/", getProperties);

propertyRouter.get("/:id", getPropertyById)