import Product from "../models/product.js";
import Review from "../models/review.js";

const createReview = async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).jaon({
            message: "Product not found"
        });
    };

    const review = await Review.create({
        user: req.user._id,
        product: productId,
        rating,
        comment
    });

    res.status(201).json({
        message: "Review created successfully",
        review
    });

};

const showReview = async (req, res) => {
    console.log("show review routes")
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        })
    };

    const reviews = await Review.find({ product: productId }).populate("user", "name").sort({ createdAt: -1 })

    res.status(200).json({
        message: "review shows scccessfully",
        reviews
    })
};

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
        return res.status(404).json({
            message: "Review not found"
        })
    };

    if (review.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You can only change your reviews"
        })
    };

    review.rating = rating;
    review.comment = comment;
    await review.save();
    res.status(200).json({
        review
    });
};

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        return res.status(404).json({
            message: "Review not found"
        })
    };

    if (review.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You can only change your reviews"
        })
    };

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({
        message : "Review deleted successfully"
    })
};

export { createReview, showReview, updateReview , deleteReview};
