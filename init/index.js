import dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
    dotenv.config({path : "../.env"})
};

import mongoose from "mongoose";
import Product from "../models/product.js";
import data from "./data.js";


import { connectDB } from "../config/db.js";
connectDB()

const initData = async () => {
    await Product.deleteMany({});
    await Product.insertMany(data.products);
    console.log("data initaised successfully")
}

initData()