import Route from "../models/route.js";

// @desc    Get all routes
// @route   GET /api/routes
// @access  Public
export const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find({}).sort({ name: 1 });
    res.status(200).json(routes);
  } catch (error) {
    console.error("Error fetching all routes:", error);
    res.status(500).json({ message: "Server error while fetching routes." });
  }
};

// --- NEW ADMIN FUNCTION: Create a new route ---
export const createRoute = async (req, res) => {
  try {
    const { id, name, type, color, stops, startTime, endTime, frequency } =
      req.body;

    // The 'stops' field will come as a JSON string from the form, so we need to parse it.
    let parsedStops;
    try {
      parsedStops = JSON.parse(stops);
    } catch (e) {
      return res
        .status(400)
        .json({
          message:
            "Invalid format for stops. Please provide a valid JSON array.",
        });
    }

    const newRoute = new Route({
      id,
      name,
      type,
      color,
      stops: parsedStops,
      startTime,
      endTime,
      frequency,
    });

    const savedRoute = await newRoute.save();
    res
      .status(201)
      .json({ message: "Route created successfully!", route: savedRoute });
  } catch (error) {
    console.error("Error creating route:", error);
    res.status(500).json({ message: "Server error while creating route." });
  }
};

// --- NEW ADMIN FUNCTION: Update an existing route ---
export const updateRoute = async (req, res) => {
  try {
    const { routeId } = req.params;
    const { id, name, type, color, stops, startTime, endTime, frequency } =
      req.body;

    let parsedStops;
    try {
      parsedStops = JSON.parse(stops);
    } catch (e) {
      return res
        .status(400)
        .json({
          message:
            "Invalid format for stops. Please provide a valid JSON array.",
        });
    }

    const updatedRoute = await Route.findByIdAndUpdate(
      routeId,
      {
        id,
        name,
        type,
        color,
        stops: parsedStops,
        startTime,
        endTime,
        frequency,
      },
      { new: true, runValidators: true }
    );

    if (!updatedRoute) {
      return res.status(404).json({ message: "Route not found." });
    }

    res
      .status(200)
      .json({ message: "Route updated successfully.", route: updatedRoute });
  } catch (error) {
    console.error("Error updating route:", error);
    res.status(500).json({ message: "Server error while updating route." });
  }
};

// --- NEW ADMIN FUNCTION: Delete a route ---
export const deleteRoute = async (req, res) => {
  try {
    const { routeId } = req.params;

    const route = await Route.findByIdAndDelete(routeId);

    if (!route) {
      return res.status(404).json({ message: "Route not found." });
    }

    res.status(200).json({ message: "Route deleted permanently." });
  } catch (error) {
    console.error("Error deleting route:", error);
    res.status(500).json({ message: "Server error while deleting route." });
  }
};
