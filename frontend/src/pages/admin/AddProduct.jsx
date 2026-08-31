import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

const CATEGORIES = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Shoes",
    "Home",
    "Watches",
];

function AddProduct() {
    const navigate = useNavigate();
    const objectUrlRef = useRef(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    function handleImageChange(e) {
        const file = e.target.files && e.target.files[0];
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            objectUrlRef.current = objectUrl;
            setImageFile(file);
            setPreview(objectUrl);
            setErrors((prev) => ({ ...prev, image: undefined }));
        } else {
            setImageFile(null);
            setPreview(null);
        }
    };

    function validate() {
        const errs = {};
        if (!form.name.trim()) errs.name = "Product name is required.";
        if (!form.description.trim()) errs.description = "Description is required.";
        if (!form.category) errs.category = "Please select a category.";
        if (!form.price.toString().trim()) errs.price = "Price is required.";
        else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
            errs.price = "Price must be a number greater than 0.";
        if (!form.stock.toString().trim()) errs.stock = "Stock is required.";
        else if (isNaN(Number(form.stock)) || Number(form.stock) < 0)
            errs.stock = "Stock must be a number greater than or equal to 0.";
        if (!imageFile) errs.image = "Product image is required.";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage({ type: "", text: "" });
        if (!validate()) return;

        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("description", form.description);
        fd.append("price", String(form.price));
        fd.append("category", form.category);
        fd.append("stock", String(form.stock));
        fd.append("image", imageFile);

        try {
            setSubmitting(true);
            await API.post("/admin/products", fd);
            setMessage({ type: "success", text: "Product created successfully." });
            setForm({ name: "", description: "", price: "", category: "", stock: "" });
            setImageFile(null);
            setPreview(null);
            setErrors({});
            setTimeout(() => navigate("/admin/products"), 800);
        } catch (err) {
            setMessage({
                type: "error",
                text: err?.response?.data?.message || "Failed to create product.",
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-[70vh] p-4 sm:p-6 lg:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 sm:p-8 lg:p-10">
                        <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
                        <p className="text-sm text-gray-500 mb-6">Create a new product for the store.</p>

                        {message.text && (
                            <div
                                className={`mb-4 px-4 py-3 rounded-md text-sm ${
                                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                }`}
                            >
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                                        errors.name ? "border-red-300" : "border-gray-200"
                                    }`}
                                    placeholder="e.g. Wireless Headphones"
                                />
                                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                                        errors.category ? "border-red-300" : "border-gray-200"
                                    }`}
                                >
                                    <option value="">Select category</option>
                                    {CATEGORIES.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                                        errors.description ? "border-red-300" : "border-gray-200"
                                    }`}
                                    placeholder="Describe the product features"
                                />
                                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={form.price}
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                                        errors.price ? "border-red-300" : "border-gray-200"
                                    }`}
                                    placeholder="0.00"
                                />
                                {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input
                                    name="stock"
                                    type="number"
                                    min="0"
                                    value={form.stock}
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                                        errors.stock ? "border-red-300" : "border-gray-200"
                                    }`}
                                    placeholder="Quantity in stock"
                                />
                                {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product image</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center justify-center w-36 h-36 rounded-xl border-dashed border-2 border-gray-200 bg-gray-50 cursor-pointer">
                                        {preview ? (
                                            <img src={preview} alt="image preview" className="w-full h-full object-cover rounded-xl" />
                                        ) : (
                                            <div className="text-center text-sm text-gray-500 px-3">Click to upload</div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 mb-2">Upload a clear image of the product.</p>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-600" />
                                        {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex items-center justify-end">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center gap-3 bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shadow-sm" />}
                                    <span>{submitting ? "Creating..." : "Create Product"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
    

   