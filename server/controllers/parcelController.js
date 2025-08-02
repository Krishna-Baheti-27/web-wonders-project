import mongoose from "mongoose";
import Parcel from "../models/parcel.js";
import Route from "../models/route.js";

// --- Existing Functions (No Changes) ---
export const calculateFare = async (req, res) => {
  /* ... existing code ... */
};
export const createBooking = async (req, res) => {
  /* ... existing code ... */
};
export const getUserOrders = async (req, res) => {
  /* ... existing code ... */
};

// --- ADMIN FUNCTION: Get all PENDING parcels ---
// This now only fetches parcels with a 'pending' status for the admin's to-do list.
export const getAllParcels = async (req, res) => {
  try {
    const allParcels = await Parcel.find({ status: "pending" }) // THE FIX IS HERE
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(allParcels);
  } catch (error) {
    console.error("Error fetching all parcels:", error);
    res.status(500).json({ message: "Server error while fetching parcels." });
  }
};

// --- ADMIN FUNCTION: Update a parcel's status and tag ---
export const updateParcelByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminTag } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is a required field." });
    }

    const parcel = await Parcel.findById(id);
    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found." });
    }

    parcel.status = status;
    if (adminTag !== undefined) {
      parcel.adminTag = adminTag;
    }

    const updatedParcel = await parcel.save();
    res
      .status(200)
      .json({ message: "Parcel updated successfully.", parcel: updatedParcel });
  } catch (error) {
    console.error("Error updating parcel:", error);
    res.status(500).json({ message: "Server error while updating parcel." });
  }
};
