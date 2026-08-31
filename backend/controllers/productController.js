import Product from "../models/product.js";
import ExpressError from "../utils/ExpressError.js";

const getAllProduct = async (req, res) => {
    const { search, category, minPrice, maxPrice, sort } = req.query;
    const query = {};

    if (search) {
        query.name = {
            $regex: search,
            $options: "i"
        };
    }

    if (category) {
        query.category = category;
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if(minPrice) query.price.$gte = Number(minPrice);
        if(maxPrice) query.price.$lte = Number(maxPrice);
    }

    let findQuery = Product.find(query);

    // Handle sorting
    if (sort === "priceAsc") {
        findQuery = findQuery.sort({ price: 1 });
    } else if (sort === "priceDesc") {
        findQuery = findQuery.sort({ price: -1 });
    }

    const product = await findQuery;
    if (!product) {
        throw new ExpressError(404, "products not found")
    }
    res.status(200).json({ success: true, product });
};

const showProduct = async (req, res) => {
    const { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
        throw new ExpressError(404, "Product not found")
    }
    res.status(200).json({ product });
};


export { getAllProduct, showProduct };