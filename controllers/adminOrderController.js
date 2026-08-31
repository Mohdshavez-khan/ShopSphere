import Order from "../models/order.js";
import ExpressError from "../utils/ExpressError.js";

const getAllOrders = async (req, res) => {
    const orders = await Order.find({})
        .populate("user", "name , email")
        .populate("product")

    res.status(200).json({
        success: true,
        count: orders.length,
        orders
    })
};

const getOrderById = async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email").populate("product");
    if (!order) {
        throw new ExpressError(404, "Order not found");
    }
    res.status(200).json({
        success: true,
        order
    });
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = [
        "pending", "shipped", "delivered", "cancelled"
    ];
    if (!validStatus.includes(status)) {
        throw new ExpressError(400, "Invalid order status")
    };
    const order = await Order.findById(id)
    if (!order) {
        throw new ExpressError(404, "Order not found")
    }

    order.status = status;
    await order.save();

    res.status(200).json({
        success: true,
        message: "Order status updated scccessfully",
        order
    })

};

export {getAllOrders , getOrderById , updateOrderStatus};