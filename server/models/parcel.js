import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: [true, "Sender name is required."],
    },
    senderPhone: {
      type: String,
      required: [true, "Sender phone number is required."],
    },
    source: {
      type: String,
      required: [true, "Source location is required."],
    },
    destination: {
      type: String,
      required: [true, "Destination location is required."],
    },
    packageType: {
      type: String,
      enum: ["document", "small_box", "large_box", "other"],
      required: true,
    },
    weight: {
      type: Number,
      required: [true, "Package weight is required."],
    },
    fare: {
      type: Number,
      required: [true, "Fare is required."],
    },
    status: {
      type: String,
      enum: ["pending", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    // --- THE FIX ---
    // Explicitly tell Mongoose to use the 'parcel' collection (singular)
    collection: "parcel",
  }
);

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;
