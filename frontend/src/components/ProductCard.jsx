import { Link } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

function ProductCard({ product }) {

    const addToCart = async (id) => {
        try {
            await API.post(`/cart/addTocart/${id}`);
            toast.success("Product added to cart");
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Product not added to cart")
        }
    };

    return (
        <div className="w-full min-w-0 max-w-full bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            <Link to={`/products/${product._id}`} className="block">
                <img src={product.imageUrl} alt={product.name}
                    className="block w-full max-w-full aspect-square object-cover" />
                <div className="p-2 pb-0 sm:p-4 sm:pb-3 min-w-0">
                    <h3 className="min-w-0 text-base sm:text-lg font-semibold truncate">
                        {product.name}
                    </h3>
                    <div className="flex min-w-0 itms-center justify-between gap-2 mt-1">
                        <p className="text-xl font-bold text-black">
                            ${Number(product.price).toLocaleString("en-US")}
                        </p>
                        <span className="flex items-center gap-1 text-yellow-500">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                                <path d="m12 2.5 2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5Z" />
                            </svg>
                            {product.rating}
                        </span>
                    </div>
                </div>
            </Link>
            <div className="p-2 sm:p-4 pt-1 sm:pt-0 min-w-0">
                <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300" onClick={() => addToCart(product._id)}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
};

export default ProductCard;