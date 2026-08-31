import User from "../models/user.js";
import ExpressError from "../utils/ExpressError.js";

const ManageUsers = async (req, res) => {
    const users = await User.find({}).select("-password");
    if (!users) {
        throw new ExpressError(404, "Users data not found");
    };

    res.status(200).json({
        success: true,
        users
    })
};

const changeUsersRole = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
    };

    if (user.role === "admin") {
        res.status(400).json({
            success: false,
            message: "Admin role cannot be changed"
        })
    };

    user.role = "admin";
    await user.save();

    res.status(200).json({
        success: true,
        message: "User promoted to admin successfully"
    });
};

const userDelete = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
    };

    await User.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
};

export { ManageUsers, changeUsersRole, userDelete };



