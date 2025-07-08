import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Fare API!");
});

router.post("/getRoute", async (req, res) => {
  const { origin, destination } = req.body;

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/directions/json",
    {
      params: {
        origin,
        destination,
        mode: "transit",
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    }
  );

  const route = response.data.routes[0];
  const leg = route.legs[0];

  res.json({
    directions: response.data,
    distance: leg.distance.text,
    duration: leg.duration.text,
    fare:
      route.fare?.text ||
      `₹${Math.round(10 + (leg.distance.value / 1000) * 2)}`,
  });
});

router.post("/saveRoute", async (req, res) => {
  const { userId, origin, destination, distance, duration, fare } = req.body;
  // Save to DB here (use MongoDB or dummy for now)
  console.log("Saved route:", {
    userId,
    origin,
    destination,
    distance,
    duration,
    fare,
  });
  res.status(201).send("Saved");
});

export default router;