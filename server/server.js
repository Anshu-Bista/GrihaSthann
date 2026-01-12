import express from "express";
import cors from "cors";

const app = express();

// enable CORS
app.use(cors());

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Application is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

await createAdminIfNotExists();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
