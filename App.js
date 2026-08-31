import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";
import adminDAshboardRouter from "./routes/adminDashboard.js";
import adminProductRouter from "./routes/adminProductRoute.js";
import adminOrderRouter from "./routes/adminOrderRoute.js";
import adminUserManageRoute from "./routes/adminUserManageRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import paymentRouter from "./routes/razorpayPaymentRoute.js";

import { connectDB } from "./config/db.js";

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/check", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart" , cartRouter);
app.use("/api/admin" , adminDAshboardRouter);
app.use("/api/admin/products" , adminProductRouter);
app.use("/api/admin/users" , adminUserManageRoute);
app.use("/api/admin" , adminOrderRouter);
app.use("/api/products" , reviewRouter);
app.use('/api/payment' , paymentRouter);



app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Internal server error" } = err;
    res.status(statusCode).json({
        success: false,
        message
    })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
