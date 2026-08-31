import crypto from "crypto";
import { razorpay } from "../config/rayzorpay.js";

const createRazorpayOrder = async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({
            message: "Vaalid amount is required"
        });
    }

    const Usd_to_inr = 90;
    const Amount_inr = Math.round(amount * Usd_to_inr);
    const options = {
        amount: Amount_inr * 100,
        receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
        order,
        usdAmount: amount,
        InrAmount: Amount_inr
    });
};

const verifyRazorpayPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Missing Razorpay payment verification fields"
        });
    }

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment verification failed"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        }
    });
};

export { verifyRazorpayPayment , createRazorpayOrder};
