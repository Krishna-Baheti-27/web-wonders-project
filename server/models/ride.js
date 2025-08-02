import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // --- NEW FIELD to track who accepted the ride ---
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // It's null until someone accepts
    },
    from: {
      type: String,
      required: [true, "A starting location is required."],
      trim: true,
    },
    to: {
      type: String,
      required: [true, "A destination is required."],
      trim: true,
    },
    departureTime: {
      type: Date,
      required: [true, "A departure time is required."],
    },
    seatsAvailable: {
      type: Number,
      required: [true, "Please specify the number of available seats."],
      min: [1, "You must offer at least one seat."],
      default: 1,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ["active", "booked", "completed", "cancelled"], // Added 'booked' status
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;
