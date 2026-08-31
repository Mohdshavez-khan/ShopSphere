import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { adminDashboardStats } from "../controllers/adminDashboard.js";
const router = express.Router();

router.get("/dashboard" , isLoggedIn, isAdmin , wrapAsync(adminDashboardStats));

export default router;