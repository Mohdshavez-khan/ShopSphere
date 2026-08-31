import Joi from "joi";
import ExpressError from "./utils/ExpressError.js";

const productValidate = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    image: Joi.string().allow("")

});

const createProductImage = (req , res , next) => {
    if(!req.file) {
        throw new ExpressError(400 , "Product image is required")
    }

    next()
};


const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

const cartValidate = Joi.object({
    user: objectId.required(),
    items: Joi.array().items(
        Joi.object({
            product: objectId.required(),
            quantity: Joi.number().integer().min(1).required()
        })
    ).required()
});

const orderValidate = Joi.object({
    product: objectId.required(),
    quantity: Joi.number().integer().min(1).required(),
    shippingAddress: Joi.object({
        name : Joi.string().required(),
        mobile : Joi.number().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        pincode: Joi.string().required(),

    }).required()
});

const userValidate = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email
    ().required(),
    password : Joi.string().required()

});

const reviewValidate = Joi.object({
    rating : Joi.number().min(1).max(5).required(),
    comment : Joi.string().required()
});

export { productValidate, cartValidate, orderValidate , userValidate , createProductImage , reviewValidate};
