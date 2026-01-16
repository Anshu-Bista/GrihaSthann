import express from "express";
import upload from "../middleware/multerConfig.js";
import { uploadFile } from "../controller/fileController.js";
 
export const uploadRouter = express.Router();
 
// Route for single file upload
uploadRouter.post("/upload", upload.single("file"), uploadFile);
 