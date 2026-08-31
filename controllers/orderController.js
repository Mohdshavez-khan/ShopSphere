import Order from "../models/order.js";
import Product from "../models/product.js";
import ExpressError from "../utils/ExpressError.js";
import { razorpay } from "../config/rayzorpay.js";

const createOrder = async (req, res) => {
    const { product, quantity, shippingAddress } = req.body;

    const foundProduct = await Product.findById(product);
    if (!foundProduct) {
        throw new ExpressError(404, "Product not found");
    }

    if (foundProduct.stock < quantity) {
        throw new ExpressError(404, "Product is out of stock");
    }
    const shipping = 5;
    const totalPrice = foundProduct.price * quantity + shipping;
    const order = await Order.create({
        user: req.user._id,
        product,
        quantity,
        totalPrice,
        shippingAddress
    });

    //update stock
    foundProduct.stock -= quantity;
    await foundProduct.save();
    res.status(201).json({
        success: true,
        message: "order created successfully",
        order
    });
};

const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate("product");

    res.status(200).json({
        success: true,
        count: orders.length,
        orders
    });
};

const getOrderById = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const order = await Order.findById(id).populate("user", "name email").populate("product");

    if (!order) {
        throw new ExpressError(404, "Order not found");
    };

    if (order.user.toString() !== userId.toString()) {
        return res.status(403).json({
            message: "You are not authorized to get this order"
        })
    };

    res.status(200).json({
        success: true,
        order
    });
};

const cancelOrder = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        })
    };

    if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized to cancel this order"
        })
    };

    if (order.status !== "pending") {
        return res.status(400).json({
            message: "You cannot cancel the order at this stage"
        })
    };

    order.status = "cancelled";
    await order.save();
    res.status(200).json({
        message: "Order cancelled successfully",
        order
    });
};


const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id)
    if (!order) {
        throw new ExpressError(404, "Order not found")
    }
    const deleteOrder = await Order.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Order delete successfull",
        deleteOrder

    });
};

export { createOrder, getMyOrders, getOrderById, deleteOrder, cancelOrder }
