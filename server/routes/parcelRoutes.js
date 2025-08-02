import express from "express";
import {
  calculateFare,
  createBooking,
  getUserOrders,
} from "../controllers/parcelController.js";
// import { protect } from '../middlewares/userMiddleware.js'; // Optional: Protect routes

const router = express.Router();

// Calculate parcel fare
router.post("/fare", calculateFare);

// Create a new parcel booking
router.post("/book", createBooking);

// NEW: Get all orders for a specific user
// The ':userId' is a URL parameter that will contain the user's ID
router.get("/user/:userId", getUserOrders);

export default router;
