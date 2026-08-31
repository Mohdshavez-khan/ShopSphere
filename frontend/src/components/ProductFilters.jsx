import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = ["Fashion", "Electronics", "Shoes", "Watches", "Beauty", "Home"];

function ProductFilters() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        category: searchParams.get("category") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        sort: searchParams.get("sort") || ""
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleCategoryChange = (e) => {

        setFilters({ ...filters, category: e.target.value });
    };

    const handleMinPriceChange = (e) => {
        setFilters({ ...filters, minPrice: e.target.value });
    };

    const handleMaxPriceChange = (e) => {
        setFilters({ ...filters, maxPrice: e.target.value });
    };

    const handleSortChange = (e) => {
        setFilters({ ...filters, sort: e.target.value });
    };

    const applyFilters = () => {
        const queryParams = new URLSearchParams();
        if (filters.category) queryParams.append("category", filters.category);
        if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
        if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
        if (filters.sort) queryParams.append("sort", filters.sort);

        navigate(`/products?${queryParams.toString()}`);
    };

    const removeFilters = () => {
        setFilters({
            category: "",
            minPrice: "",
            maxPrice: "",
            sort: ""
        });
        navigate("/products");
    };

    return (
        <div className="mb-6 px-0">

            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex w-full items-center justify-start gap-2 rounded-xl px-5 py-3 bg-neutral-950 text-sm text-white font-semibold lg:hidden">
                <i class="fa-solid fa-bars"></i> Filter Products
            </button>

            {/* Premium Filter Container */}
            <div className={`rounded-2xl border border-gray-200/60 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ${isFilterOpen ? "block" : "hidden"} lg:block` } >

                {/* Filter Content */}
                <div className="p-6 lg:p-8">
                    {/* Filters Grid - Desktop: Single Row, Mobile: Stacked */}
                    <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-5 xl:gap-6">

                        {/* Filter Item 1: Category */}
                        <div className="flex-1 lg:flex-none">
                            <label className="block text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 lg:mb-3">
                                <span className="inline-flex items-center">
                                    Category
                                </span>
                            </label>
                            <select
                                value={filters.category}
                                onChange={handleCategoryChange}
                                className="w-full lg:w-auto h-11 px-4 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300/70 rounded-lg transition-all duration-300 hover:border-gray-400/70 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/20 shadow-sm appearance-none cursor-pointer"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', paddingRight: '2.5rem' }}
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Item 2: Min Price */}
                        <div className="flex-1 lg:flex-none">
                            <label className="block text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 lg:mb-3">
                                Min Price
                            </label>
                            <input
                                type="number"
                                placeholder="$0"
                                value={filters.minPrice}
                                onChange={handleMinPriceChange}
                                min="0"
                                className="w-full lg:w-auto h-11 px-4 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300/70 rounded-lg transition-all duration-300 hover:border-gray-400/70 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/20 shadow-sm placeholder-gray-500"
                            />
                        </div>

                        {/* Filter Item 3: Max Price */}
                        <div className="flex-1 lg:flex-none">
                            <label className="block text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 lg:mb-3">
                                Max Price
                            </label>
                            <input
                                type="number"
                                placeholder="$5000"
                                value={filters.maxPrice}
                                onChange={handleMaxPriceChange}
                                min="0"
                                className="w-full lg:w-auto h-11 px-4 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300/70 rounded-lg transition-all duration-300 hover:border-gray-400/70 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/20 shadow-sm placeholder-gray-500"
                            />
                        </div>

                        {/* Filter Item 4: Sort */}
                        <div className="flex-1 lg:flex-none">
                            <label className="block text-xs font-bold text-gray-800 uppercase tracking-widest mb-3 lg:mb-3">
                                Sort By
                            </label>
                            <select
                                value={filters.sort}
                                onChange={handleSortChange}
                                className="w-full lg:w-auto h-11 px-4 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300/70 rounded-lg transition-all duration-300 hover:border-gray-400/70 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/20 shadow-sm appearance-none cursor-pointer"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', paddingRight: '2.5rem' }}
                            >
                                <option value="">Latest</option>
                                <option value="priceAsc">Price: Low to High</option>
                                <option value="priceDesc">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 lg:gap-3 lg:ml-auto pt-2 lg:pt-0">
                            <button
                                onClick={applyFilters}
                                className="flex-1 lg:flex-none h-11 px-8 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:bg-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-95 transition-all duration-300"
                            >
                                Apply
                            </button>
                            <button
                                onClick={removeFilters}
                                className="flex-1 lg:flex-none h-11 px-8 bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-widest rounded-lg border border-gray-200 shadow-sm hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:scale-95 transition-all duration-300"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductFilters;
