import express from "express";
// --- THE FIX: Make sure acceptRide is included in the import ---
import {
  createRide,
  getActiveRides,
  cancelRide,
  acceptRide,
} from "../controllers/rideController.js";
// import { protect } from '../middlewares/userMiddleware.js';

const router = express.Router();

// @route   GET /api/rides
// @desc    Get all active ride offers
// @access  Public
router.get("/", getActiveRides);

// @route   POST /api/rides
// @desc    Create a new ride offer
// @access  Private (should be protected in a real app)
router.post("/", createRide);

// @route   PATCH /api/rides/:rideId/cancel
// @desc    Cancel a user's own ride offer
// @access  Private (should be protected)
router.patch("/:rideId/cancel", cancelRide);

// @route   PATCH /api/rides/:rideId/accept
// @desc    Accept a ride offer
// @access  Private (should be protected)
router.patch("/:rideId/accept", acceptRide);

export default router;
