import express from "express";
import cors from "cors";
import { connection } from "./database/db";
import { authRouter } from "./routes/authRoutes";

const app = express();

// enable CORS
app.use(cors());

// middleware
app.use(express.json());

// DB connection
connection()
  .then(async () => {
    console.log("Database connected");
    await createAdminIfNotExists();
  })
  .catch((err) => console.error("DB connection failed:", err));

//Routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Application is running");
});

// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend connected successfully 🚀" });
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
