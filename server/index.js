import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fare from "./routes/fare.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", fare);

app.get("/", (req, res) => {
  res.send("Welcome to the Web Wonders API!");
});

app.listen(8000, () => console.log("Server running on port 8000"));
