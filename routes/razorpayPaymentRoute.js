import express from "express";
import { verifyRazorpayPayment , createRazorpayOrder } from "../controllers/paymentController.js";
import { wrapAsync } from "../utils/wrapAsync.js";
const router = express.Router();

router.post("/create-order", wrapAsync(createRazorpayOrder));
router.post("/verify-payment", wrapAsync(verifyRazorpayPayment));

export default router;