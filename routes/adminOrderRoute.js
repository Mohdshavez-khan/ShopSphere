import express from "express";
import { getAllOrders, getOrderById, updateOrderStatus } from "../controllers/adminOrderController.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { wrapAsync } from "../utils/wrapAsync.js";
const router = express.Router();

router.get("/allOrders", isLoggedIn, isAdmin, wrapAsync(getAllOrders));
router.get("/:id", isLoggedIn, isAdmin, wrapAsync(getOrderById));
router.patch("/:id", isLoggedIn, isAdmin, wrapAsync(updateOrderStatus));


export default router;