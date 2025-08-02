import express from "express";
import {
  calculateFare,
  createBooking,
} from "../controllers/parcelController.js";
// import { protect } from '../middlewares/userMiddleware.js'; // Optional: Protect routes

const router = express.Router();

// @desc    Calculate parcel fare
// @route   POST /api/parcels/fare
// @access  Public (or Private if you add middleware)
router.post("/fare", calculateFare);

// @desc    Create a new parcel booking
// @route   POST /api/parcels/book
// @access  Public (or Private if you add middleware)
router.post("/book", createBooking);

export default router;
