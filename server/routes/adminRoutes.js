import express from "express";
import { getRoutes } from "../controllers/adminController.js";

const router = express.Router();

router.route("/routes").get(getRoutes);

export default router;
