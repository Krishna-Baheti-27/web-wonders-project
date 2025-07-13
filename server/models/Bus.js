const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  source: {
    name: String,
    coords: {
      lat: Number,
      lng: Number,
    },
  },
  destination: {
    name: String,
    coords: {
      lat: Number,
      lng: Number,
    },
  },
  polyline: String, // Google's encoded polyline (overview_polyline.points)
  fare: String,
  timetable: [String], // ["08:00", "11:00", ...]
  delay: { type: Number, default: 0 },
  mode: { type: String, default: "bus" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bus", routeSchema);
