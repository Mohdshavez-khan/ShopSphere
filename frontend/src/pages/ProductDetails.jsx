import API from "../api/api.jsx";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReviewSection from "../components/reviews/reviewSection";


function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/products/${id}`);
            setProduct(res.data.product);
        } catch (error) {
            console.error("Error loading product:", error);
            setFetchError(error.response?.data?.message || "Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        try {
            await API.delete(`/products/${id}`);
            toast.success("Product deleted successfully")
            navigate("/products");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error(error.response?.data?.message || "Failed to delete product")
        }
    };

    const handleEdit = () => {
        navigate(`/admin/edit-products/${id}`);
    };

    const handleCart = async () => {
        try {
            await API.post(`/cart/addToCart/${id}`);
            toast.success("Product added to cart")
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add product in cart")
        };

    };

    const handleBuy = async (id) => {
        navigate(`/checkout/${id}`)
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] bg-gray-50 px-4 py-4 md:px-6 md:py-8 flex items-center justify-center">
                <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-xl">
                    <p className="text-lg font-semibold text-slate-900">Loading product...</p>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="min-h-[70vh] bg-gray-50 px-4 py-4 md:px-6 md:py-8 flex items-center justify-center">
                <div className="rounded-3xl border border-rose-200 bg-white px-8 py-10 text-center shadow-xl">
                    <p className="text-lg font-semibold text-slate-900">{fetchError}</p>
                    <button
                        type="button"
                        onClick={fetchProduct}
                        className="mt-4 rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[70vh] bg-gray-50 px-4 py-4 md:px-6 md:py-8 shadow-xl hover:shadow-3xl transition-all duration-300">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 rounded-3xl bg-white p-5 shadow-xl md:grid-cols-2 md:p-10">

                <div className="flex h-80 items-center justify-center rounded-2xl overflow-hidden bg-gray-100 md:h-125">

                    <img src={product?.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-300" />

                </div>

                <div className="flex flex-col justify-center">

                    <span className="mb-4 w-fit rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                        {product?.category}
                    </span>

                    <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl mt-0">{product?.name}
                    </h1>

                    <div className="mb-5 flex items-center gap-2">
                        <span className="text-lg text-yellow-500">
                            {product?.rating}
                        </span>

                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        ${product?.price}
                    </h2>

                    <p className="mb-6 text-gray-600 leading-7">
                        {product?.description}
                    </p>

                    {user?.role === "user" ? (
                        <div className="flex flex-col gap-3">
                            <button className="w-full rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-gray-800" onClick={handleCart}>
                                Add to Cart
                            </button>

                            <button className=" w-full rounded-2xl border-2 border-black px-6 py-4 font-semibold text-black transition hover:-translate-y-1 hover:bg-black hover:text-white" onClick={() => handleBuy(product._id)}>
                                Buy Now
                            </button>
                        </div>
                    ) : user?.role === "admin" ? (
                        <div className="flex flex-col gap-3">
                            <button className="flex-1 border-2 border-black px-6 py-4 font-semibold text-black rounded-2xl transition hover:-translate-y-1 hover:bg-black hover:text-white" onClick={handleEdit}>
                                Edit Product
                            </button>

                            <button className="flex-1 bg-black px-6 py-4 font-semibold text-white rounded-2xl transition hover:-translate-y-1 hover:bg-gray-800 hover:text-white" onClick={handleDelete}>
                                Delete Product
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            <ReviewSection productId={id} />
        </div>
    )
}
export default ProductDetails;