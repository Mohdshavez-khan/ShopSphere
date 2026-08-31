import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import API from "../api/api.jsx";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function FeaturedProducts({ limit , showbtn }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");

    useEffect(() => {

        fetchProducts()
    }, [search , category, minPrice, maxPrice, sort]);

    const fetchProducts = async () => {
        try {
            let url = `/products?search=${search || ""}&category=${category || ""}`;
            if (minPrice) url += `&minPrice=${minPrice}`;
            if (maxPrice) url += `&maxPrice=${maxPrice}`;
            if (sort) url += `&sort=${sort}`;
            
            const res = await API.get(url);
            setProducts(res.data.product);
            setError(null);
        } catch (err) {
            console.error("Failed to load featured products:", err);
            setError(err.response?.data?.message || "Unable to load featured products.");
        }
    };

    const displayProducts = limit ? products.slice(0, limit) : products;
    return (
        <>
            {error && (
                <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700 shadow-sm">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 sm:gap-4 min-w-0 w-full">
                {
                    displayProducts.map((product) => {
                        return (
                            <div key={product._id} className="min-w-0 w-full max-w-full" >
                                <ProductCard product={product} />
                            </div>
                        )
                    })
                }

            </div>
            <div className="w-full mt-6">
                {
                    showbtn && <Link className="bg-black text-white px-10 py-2 rounded-xl text-bold shadow-md hover:shadow-2xl transition-all text-xl w-full flex justify-center items-center" to={"/products"}> View All</Link>
                }
            </div>
        </>

    )
};

export default FeaturedProducts;