import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

const adminDashboardStats = async(req , res) => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
        {
            $match: {
                status: { $ne: "cancelled"}
            }
        },
        {
            $group:{
                _id : null,
                total : { $sum: "$totalAmount"}
            }
        }
    ]);

    res.json({
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: revenue[0]?.total
    })
};

export {adminDashboardStats};