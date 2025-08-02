import express from "express";
import { getAllRoutes } from "../controllers/routeController.js";

const router = express.Router();

// This sets up the endpoint to fetch all routes
router.get("/", getAllRoutes);

export default router;
