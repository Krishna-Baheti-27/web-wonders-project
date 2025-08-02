import Alert from "../models/alert.js";

// @desc    Create a new alert
// @route   POST /api/alerts
// @access  Admin (for now, public for testing)
export const createAlert = async (req, res) => {
  try {
    const { title, message, priority } = req.body;

    if (!title || !message || !priority) {
      return res
        .status(400)
        .json({ message: "Title, message, and priority are required." });
    }

    const newAlert = new Alert({
      title,
      message,
      priority,
    });

    const savedAlert = await newAlert.save();
    res
      .status(201)
      .json({ message: "Alert created successfully!", alert: savedAlert });
  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ message: "Server error while creating alert." });
  }
};

// @desc    Get all currently active alerts
// @route   GET /api/alerts/active
// @access  Public
export const getActiveAlerts = async (req, res) => {
  try {
    const activeAlerts = await Alert.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.status(200).json(activeAlerts);
  } catch (error) {
    console.error("Error fetching active alerts:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching active alerts." });
  }
};

// @desc    Get all alerts (active and inactive)
// @route   GET /api/alerts
// @access  Admin
export const getAllAlerts = async (req, res) => {
  try {
    const allAlerts = await Alert.find({}).sort({ createdAt: -1 });
    res.status(200).json(allAlerts);
  } catch (error) {
    console.error("Error fetching all alerts:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching all alerts." });
  }
};

// @desc    Update an alert's status
// @route   PATCH /api/alerts/:id
// @access  Admin
export const updateAlertStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "inactive"].includes(status)) {
      return res
        .status(400)
        .json({
          message: "Invalid status provided. Must be 'active' or 'inactive'.",
        });
    }

    const alert = await Alert.findById(id);

    if (!alert) {
      return res.status(404).json({ message: "Alert not found." });
    }

    alert.status = status;
    const updatedAlert = await alert.save();

    res
      .status(200)
      .json({
        message: `Alert status updated to '${status}'.`,
        alert: updatedAlert,
      });
  } catch (error) {
    console.error("Error updating alert status:", error);
    res
      .status(500)
      .json({ message: "Server error while updating alert status." });
  }
};
