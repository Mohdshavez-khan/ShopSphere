import Cart from "../models/cart.js";
import ExpressError from "../utils/ExpressError.js"

const addToCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [{ product: productId, quantity: 1 }]
        });

        await cart.save();
        return res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart
        });
    };

    const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1
    } else {
        cart.items.push({
            product: productId,
            quantity: 1
        });
    };

    await cart.save();
    res.status(200).json({
        success: true,
        message: "Product added to cart",
        cart
    });
};

const getCart = async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
        return res.status(200).json({
            success: true,
            cart: { items: [] },
        });
    };

    res.status(200).json({
        success: true,
        cart
    });

};

const updateCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
    const { action } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "cart not found"
        });
    };

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) {
        return res.status(404).json({
            success: false,
            message: "Product not found in cart"
        });
    };

    if (action !== "increase" && action !== "decrease") {
        return res.status(400).json({
            message: "inavlid action"
        })
    };

    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease") {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.items = cart.items.filter((item) => {
                item.product.toString() !== productId
            });
        };
    };

    await cart.save();
    res.status(200).json({
        success: true,
        message: "Quantity Updated",
        cart
    })
};

const removeCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "cart not found"
        })
    };
    cart.items = cart.items.filter((item) =>
        item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({
        success: true,
        message: "item remove successsfully",
        cart
    });
};

const clearCart = async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        res.status(404).json({
            success: false,
            message: "Cart not found"
        })
    };

    cart.items = [];
    await cart.save();
    res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
        cart
    });

};

export { addToCart, getCart, updateCart, removeCart, clearCart };