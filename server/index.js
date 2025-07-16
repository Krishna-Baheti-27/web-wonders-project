import express from "express";

const app = express();

// Middleware
import cors from "cors";
import morgan from "morgan"
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')) // to see all requests in the console

// Routes
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);

// app.get("/", (req, res) => {
//   res.send("Welcome to the Web Wonders API!");
// });

// for undefined routes
// app.all("*", (req, res) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on this server!`,
//   });
// });

export default app;

// | Method   | Endpoint                      | Description                               |
// | -------- | ----------------------------- | ----------------------------------------- |
// | `POST`   | `/api/admin/routes`           | ➕ Create a new route (with fare/schedule) |
// | `GET`    | `/api/admin/routes`           | 📄 Get all admin-created routes           |
// | `GET`    | `/api/admin/routes/:id`       | 🔍 Get details of a single route          |
// | `PUT`    | `/api/admin/routes/:id`       | ✏️ Update a route (e.g., fare/timetable)  |
// | `DELETE` | `/api/admin/routes/:id`       | ❌ Delete a route                          |
// | `PATCH`  | `/api/admin/routes/:id/delay` | 🔄 Update delay in minutes (real-time)    |
