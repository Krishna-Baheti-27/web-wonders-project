import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  // Add other stop-specific fields if needed
});

const routeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate route slugs
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["pedal", "cycle", "two-wheeler", "car"], // Extend this enum as needed
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    stops: {
      type: [stopSchema],
      validate: [(arr) => arr.length > 0, "At least one stop is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("Route", routeSchema);
export default Route;
