import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import {sequelize} from "./database/db.js";

// 🔥 IMPORT MODELS (CRITICAL)
import "./model/userModel.js";

import { authRouter } from "./routes/authRoutes.js";
import { uploadRouter } from "./routes/uploadRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js"; 
import { createAdminIfNotExists } from "./model/createAdmin.js";

const app = express();
const PORT = 5000;

// middleware

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // 🔥 CREATE TABLES
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");

    // 🔥 SAFE TO QUERY NOW
    await createAdminIfNotExists();

    // routes
    app.use("/api/auth", authRouter);
    app.use("/api/file", uploadRouter);
    app.use("/api/users", userRouter);
    app.use("/api/admin", adminRouter);
    app.use("/api/properties", propertyRouter);

    app.get("/", (req, res) => {
      res.send("Application is running");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Startup failed:", err);
  }
};

startServer();
