import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: " User",
        unique: true,
        required: true
    },

    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required : true
            },

            quantity: {
                type: Number,
                default: 1,
                min : 1
            }
        }
    ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;