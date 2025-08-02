import Route from "../models/route.js";

// @desc    Fetch all routes
// @route   GET /api/routes
// @access  Public
export const getAllRoutes = async (req, res) => {
  try {
    // Find all routes and sort them by name
    const routes = await Route.find({}).sort({ name: 1 });
    res.status(200).json(routes);
  } catch (error) {
    console.error("Error fetching all routes:", error);
    res.status(500).json({ message: "Server error while fetching routes." });
  }
};
