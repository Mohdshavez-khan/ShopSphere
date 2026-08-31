import Product from "../models/product.js";
import ExpressError from "../utils/ExpressError.js";

const adminProductCreate = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = "";
    if (req.file) {
        imageUrl = req.file.path
    }
    const product = new Product({
        name, description, price, imageUrl, category, stock
    });
    await product.save()
    res.status(201).json({
        message: "Product successfully created",
        product
    })

};

const adminProducts = async (req, res) => {
    const products = await Product.find({});
    if (products.length === 0) {
        throw new ExpressError(404, "Product not found")
    };

    res.status(200).json({
        products
    });
};

const adminProductUpdate = async (req, res) => {
     const { id } = req.params;
    const updatedData = { ...req.body };
    if (req.file) {
        updatedData.imageUrl = req.file.path
    }
    const product = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true
    });
    
    if (!product) {
        throw new ExpressError(404, "Product not found")
    };

    res.status(200).json({
        message: "Product update successfully",
        product

    });

};

const adminProductDelete = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new ExpressError(404, "Product not found")
    }
    res.status(200).json({
        message: "Product deleted successfully",
        product
    })

};

export { adminProductCreate, adminProducts, adminProductUpdate, adminProductDelete };