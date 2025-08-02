import express from "express";
import {
  createAlert,
  getActiveAlerts,
  getAllAlerts,
  updateAlertStatus,
} from "../controllers/alertController.js";

const router = express.Router();

// @route   GET /api/alerts/active
// @desc    Get all currently active alerts (for the public banner)
// @access  Public
router.get("/active", getActiveAlerts);

// @route   GET /api/alerts
// @desc    Get all alerts, including inactive ones (for an admin panel)
// @access  Admin
router.get("/", getAllAlerts);

// @route   POST /api/alerts
// @desc    Create a new alert
// @access  Admin
router.post("/", createAlert);

// @route   PATCH /api/alerts/:id
// @desc    Update an alert's status (e.g., from 'active' to 'inactive')
// @access  Admin
router.patch("/:id", updateAlertStatus);

export default router;
