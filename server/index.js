import express from "express";

const app = express();

// Middleware
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // to see all requests in the console

// Routes
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import parcelRouter from "./routes/parcelRoutes.js";
import routeRouter from "./routes/routeRoutes.js";
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/parcels", parcelRouter);
app.use("/api/routes", routeRouter);
export default app;
