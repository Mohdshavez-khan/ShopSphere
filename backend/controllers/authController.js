import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError.js";

const register = async (req , res) => {
    const {name , email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ExpressError(400 , "User Allready Exists with this email")
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        _id : user._id,
        email : user.email,
        name : user.name,
        role : user.role
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: "15d" });

    await user.save();
    res.status(201).json({ message: "User created successfully", token ,
        user : {
            _id : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        }
    });
};

const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        // return res.status(400).json({ message: "Invalid email or password" });
        throw new ExpressError(400 , "inavlid email and password")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        // return res.status(400).json({ message: "Invalid email or password" });
        throw new ExpressError(400 , "inavlid email and password")
    }
    const token = jwt.sign({
        _id : user._id,
        email : user.email,
        name : user.name,
        role : user.role
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: "15d" });

    res.status(200).json({ message: "Login successful", token ,
        user : {
            _id : user._id,
            name : user.name,
            email : user.email,
            role : user.role
        }
    });
};

const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")
    if (!user) {
        // return res.status(404).json({ message: "User not found" });
        throw new ExpressError(404 , "User not found")
    }
 
    res.status(200).json({ user });
};

export default { register , Login , getProfile };
