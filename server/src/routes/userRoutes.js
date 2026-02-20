import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controller/userController.js";
import upload from "../middleware/multerConfig.js";

export const userRouter = express.Router();

userRouter.use(authMiddleware);

// Get logged-in user's profile
userRouter.get("/profile", getProfile);

userRouter.patch("/profile", upload.single("image"), updateProfile);
