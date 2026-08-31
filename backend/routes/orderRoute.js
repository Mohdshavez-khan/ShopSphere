import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { createOrder, getMyOrders, getOrderById, deleteOrder, cancelOrder } from "../controllers/orderController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { orderValidate } from "../Schema.js";
const router = express.Router();

router.post("/", isLoggedIn, validate(orderValidate), wrapAsync(createOrder));
router.get("/my-order", isLoggedIn, wrapAsync(getMyOrders));
router.get("/my-order/:id", isLoggedIn, wrapAsync(getOrderById));
router.patch("/my-order/:id/cancel", isLoggedIn, wrapAsync(cancelOrder))

router.delete("/:id", isLoggedIn, isAdmin, wrapAsync(deleteOrder));


export default router;