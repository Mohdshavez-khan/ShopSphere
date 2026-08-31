import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";

const formatPrice = (value) => {
    const numericValue = Number(value || 0);
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(numericValue);
};

function AdminProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await API.get("/admin/products");
            setProducts(Array.isArray(response?.data?.products) ? response.data.products : []);
        } catch (err) {
            const message = err?.response?.data?.message || "Unable to load products at the moment.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        const confirmed = window.confirm("Delete this product? This action cannot be undone.");
        if (!confirmed) return;

        try {
            setProcessingId(productId);
            await API.delete(`/admin/products/${productId}`);
            toast.success("Product deleted successfully");
            fetchProducts();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to delete product");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 w-56 rounded bg-slate-200" />
                    <div className="h-10 w-full rounded bg-slate-200" />
                    <div className="h-64 rounded-2xl bg-slate-200" />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.3)] sm:p-8 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Catalog</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Product Management</h1>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/admin/add-product")}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                    + Add Product
                </button>
            </header>

            {error ? (
                <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {error}
                </div>
            ) : null}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_45px_-28px_rgba(15,23,42,0.3)]">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-4 font-semibold">Image</th>
                                <th className="px-4 py-4 font-semibold">Name</th>
                                <th className="px-4 py-4 font-semibold">Category</th>
                                <th className="px-4 py-4 font-semibold">Price</th>
                                <th className="px-4 py-4 font-semibold">Stock</th>
                                <th className="px-4 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product._id} className="border-t border-slate-200 hover:bg-slate-50/80">
                                        <td className="px-4 py-4">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200"
                                            />
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-900">{product.name}</td>
                                        <td className="px-4 py-4 text-slate-600">{product.category}</td>
                                        <td className="px-4 py-4 font-medium text-slate-900">{formatPrice(product.price)}</td>
                                        <td className="px-4 py-4 text-slate-700">{product.stock}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/admin/edit-products/${product._id}`)}
                                                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    disabled={processingId === product._id}
                                                    className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    {processingId === product._id ? "Deleting..." : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-12 text-center text-slate-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;