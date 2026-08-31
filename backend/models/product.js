import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true , trim: true},
    description: { type: String, required: true ,  trim: true},
    price: { type: Number, required: true , min: 0},
    category: { type: String, required: true },
    imageUrl: { type: String, required: true ,  trim: true},
    stock: { type: Number, required: true , min: 0},
    rating: { type: Number, default: 0 , min: 0 , max: 5 },
    numReviews: { type: Number, default: 0 },
   

} ,{timestamps : true});



const Product = mongoose.model("Product", productSchema);
export default Product;