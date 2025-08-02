import Ride from "../models/ride.js";
import mongoose from "mongoose";

// @desc    Create a new ride offer
// @route   POST /api/rides
// @access  Private
export const createRide = async (req, res) => {
  try {
    const { driver, from, to, departureTime, seatsAvailable, notes } = req.body;

    if (!driver || !from || !to || !departureTime || !seatsAvailable) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const newRide = new Ride({
      driver,
      from,
      to,
      departureTime,
      seatsAvailable,
      notes,
    });

    const savedRide = await newRide.save();
    res
      .status(201)
      .json({ message: "Ride offered successfully!", ride: savedRide });
  } catch (error) {
    console.error("Error creating ride:", error);
    res
      .status(500)
      .json({ message: "Server error while creating ride offer." });
  }
};

// @desc    Get all active ride offers
// @route   GET /api/rides
// @access  Public
export const getActiveRides = async (req, res) => {
  try {
    const activeRides = await Ride.find({
      status: "active",
      departureTime: { $gt: new Date() },
    })
      .populate("driver", "name")
      .sort({ departureTime: 1 });
    res.status(200).json(activeRides);
  } catch (error) {
    console.error("Error fetching active rides:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching active rides." });
  }
};

// @desc    Cancel/Delete a ride offer
// @route   DELETE /api/rides/:rideId
// @access  Private
export const cancelRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return res.status(400).json({ message: "Invalid Ride ID." });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found." });
    }

    if (ride.driver.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this ride." });
    }

    await Ride.findByIdAndDelete(rideId);

    res.status(200).json({ message: "Ride offer deleted successfully." });
  } catch (error) {
    console.error("Error deleting ride:", error);
    res.status(500).json({ message: "Server error while deleting ride." });
  }
};

// @desc    Accept a ride offer
// @route   PATCH /api/rides/:rideId/accept
// @access  Private
export const acceptRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return res.status(400).json({ message: "Invalid Ride ID." });
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found." });
    }
    if (ride.status !== "active") {
      return res
        .status(400)
        .json({ message: "This ride is no longer available." });
    }
    if (ride.driver.toString() === userId) {
      return res
        .status(400)
        .json({ message: "You cannot accept your own ride." });
    }

    ride.acceptedBy = userId;
    ride.status = "booked";

    await ride.save();

    res.status(200).json({ message: "Ride accepted successfully!", ride });
  } catch (error) {
    console.error("Error accepting ride:", error);
    res.status(500).json({ message: "Server error while accepting ride." });
  }
};
