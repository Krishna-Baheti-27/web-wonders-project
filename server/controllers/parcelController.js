import Parcel from "../models/parcel.js";
import Route from "../models/route.js";

// --- Helper function to calculate distance ---
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// --- Controller to calculate fare ---
export const calculateFare = async (req, res) => {
  try {
    const { source, destination, weight } = req.body;

    if (!source || !destination || !weight) {
      return res
        .status(400)
        .json({ message: "Source, destination, and weight are required." });
    }

    const routes = await Route.find({}).lean();

    let sourceStop, destinationStop;

    for (const route of routes) {
      if (!sourceStop) {
        sourceStop = route.stops.find(
          (stop) =>
            stop.name.trim().toLowerCase() === source.trim().toLowerCase()
        );
      }
      if (!destinationStop) {
        destinationStop = route.stops.find(
          (stop) =>
            stop.name.trim().toLowerCase() === destination.trim().toLowerCase()
        );
      }
      if (sourceStop && destinationStop) break;
    }

    if (!sourceStop || !destinationStop) {
      return res
        .status(404)
        .json({
          message: "Could not find one or both locations on our routes.",
        });
    }

    const distance = getDistanceFromLatLonInKm(
      sourceStop.lat,
      sourceStop.lng,
      destinationStop.lat,
      destinationStop.lng
    );

    // --- FARE CALCULATION IN DOLLARS ---
    const baseFare = 5;
    const ratePerKm = 1.5;
    const ratePerKg = 2;
    const calculatedFareInUSD =
      baseFare + distance * ratePerKm + parseFloat(weight) * ratePerKg;

    // --- CONVERT TO RUPEES ---
    const CONVERSION_RATE = 80;
    const calculatedFareInINR = calculatedFareInUSD * CONVERSION_RATE;

    if (isNaN(calculatedFareInINR)) {
      return res
        .status(500)
        .json({ message: "Fare calculation resulted in an error." });
    }

    res.status(200).json({ fare: calculatedFareInINR.toFixed(2) });
  } catch (error) {
    console.error("Fare Calculation Error:", error);
    res.status(500).json({ message: "Server error during fare calculation." });
  }
};

// --- Controller to create a booking ---
export const createBooking = async (req, res) => {
  try {
    const {
      senderName,
      senderPhone,
      source,
      destination,
      packageType,
      weight,
      fare,
    } = req.body;

    if (
      !senderName ||
      !senderPhone ||
      !source ||
      !destination ||
      !packageType ||
      !weight ||
      !fare
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields for booking." });
    }

    const newParcel = new Parcel({
      senderName,
      senderPhone,
      source,
      destination,
      packageType,
      weight,
      fare,
      status: "pending",
    });

    const savedParcel = await newParcel.save();

    // --- DEBUGGING LOG ---
    // This will show us the exact document that was saved to the database.
    console.log("Parcel saved successfully:", savedParcel);
    // --- END DEBUGGING LOG ---

    res.status(201).json({
      message: "Booking created successfully!",
      booking: savedParcel,
    });
  } catch (error) {
    // If there's an error during save, this will catch it.
    console.error("Create Booking Error:", error);
    res.status(500).json({ message: "Server error while creating booking." });
  }
};
