import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/api";


const initialError = {
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
};

function CheckOut() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errors, setErrors] = useState(initialError)
    const [submitError, setSubmitError] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        mobile: ""
    });


    useEffect(() => {
        getProduct()
    }, [id]);

    const getProduct = async () => {
        try {
            const res = await API.get(`/products/${id}`);
            setProduct(res.data.product);
        } catch (err) {
            console.log(err);
            setErrors(err.response?.details?.message)
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress, [name]: value
        });
    };

    const handleDecrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const validate = () => {
        const validationErrors = { ...initialError }
        if (!shippingAddress.name.trim()) validationErrors.name = "name is required";
        if (!shippingAddress.mobile.trim()) validationErrors.mobile = "mobile no. is required";
        if (!shippingAddress.address.trim()) validationErrors.address = "address is required";
        if (!shippingAddress.city.trim()) validationErrors.city = "city is required";
        if (!shippingAddress.state.trim()) validationErrors.state = "state is required";
        if (!shippingAddress.pincode.trim()) validationErrors.pincode = "pincode is required";

        setErrors(validationErrors);
        return Object.values(validationErrors).every((error) => !error);
    };

    const loadRazorpayScript = async () => {
        if (window.Razorpay) return true;

        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Razorpay checkout failed to load. Please try again."));
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitError(null);

        try {
            await loadRazorpayScript();

            const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
            if (!razorpayKeyId) {
                throw new Error("Razorpay public key is missing. Please contact support.");
            }

            const { data } = await API.post("/payment/create-order", {
                amount: total
            });

            const razorpayOrder = data?.order || data;
            if (!razorpayOrder?.id || !razorpayOrder?.amount || !razorpayOrder?.currency) {
                throw new Error("Unable to create Razorpay order. Please try again.");
            }

            const orderPayload = {
                product: product._id,
                quantity,
                shippingAddress
            };

            const options = {
                key: razorpayKeyId,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                order_id: razorpayOrder.id,
                name: "ShopSphere",
                description: "Order Payment",
                handler: async (response) => {
                    try {
                        const verifyRes = await API.post("/payment/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (!verifyRes.data?.success) {
                            throw new Error(verifyRes.data?.message || "Payment verification failed.");
                        }

                        await API.post("/order", orderPayload);
                        navigate("/order-success");
                    } catch (error) {
                        console.error("Payment verification or order creation failed:", error);
                        setSubmitError(error.response?.data?.message || error.message || "Payment verification failed. Please try again.");
                    }
                },
                theme: {
                    color: "#0f172a"
                },
                modal: {
                    ondismiss: () => {
                        setSubmitError("Payment cancelled");
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Razorpay checkout failed:", error);
            setSubmitError(error.response?.data?.message || error.message || "Failed to initiate payment. Please try again.");
        }
    };

    if (!product) {
        return <h1>Loading....</h1>
    }

    const subtotal = Number(product.price || 0) * quantity;
    const shipping = subtotal > 0 ? 5 : 0;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <div className="order-2 rounded-4xl border border-slate-200 bg-white p-8 shadow-xl lg:order-1">
                        <div className="max-w-2xl">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Secure checkout</p>
                            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-950">Shipping details</h1>
                            <p className="mt-3 text-sm text-slate-500">Fill in your address and contact information to complete your order.</p>
                        </div>

                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={shippingAddress.name}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                                />
                                {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="mobile" className="block text-sm font-medium text-slate-700">Contact no.</label>
                                <input
                                    type="number"
                                    placeholder="Enter your number"
                                    name="mobile"
                                    value={shippingAddress.mobile}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                                />
                                {errors.mobile && <p className="mt-2 text-sm text-rose-600">{errors.mobile}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="address" className="block text-sm font-medium text-slate-700">Shipping Address</label>
                                <textarea
                                    rows={4}
                                    aria-rowcount={6}
                                    aria-colcount={12}
                                    name="address"
                                    value={shippingAddress.address}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                                />
                                {errors.address && <p className="mt-2 text-sm text-rose-600">{errors.address}</p>}
                            </div>

                            {submitError && (
                                <p className="text-sm text-rose-600">{submitError}</p>
                            )}

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-slate-700">City</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your city"
                                        name="city"
                                        value={shippingAddress.city}
                                        onChange={handleChange}
                                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                                    />
                                    {errors.city && <p className="mt-2 text-sm text-rose-600">{errors.city}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="state" className="block text-sm font-medium text-slate-700">State</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your state"
                                        name="state"
                                        value={shippingAddress.state}
                                        onChange={handleChange}
                                        className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                                    />
                                    {errors.state && <p className="mt-2 text-sm text-rose-600">{errors.state}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="pincode" className="block text-sm font-medium text-slate-700">Pin Code</label>
                                <input
                                    type="number"
                                    placeholder="Enter your pin code"
                                    name="pincode"
                                    value={shippingAddress.pincode}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                                />
                                {errors.pincode && <p className="mt-2 text-sm text-rose-600">{errors.pincode}</p>}
                            </div>

                            {/* <button className="w-full rounded-3xl bg-slate-950 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-slate-800" type="submit">
                                Submit
                            </button> */}
                        </form>
                    </div>

                    <aside className="order-1 rounded-4xl border border-slate-200 bg-white p-6 shadow-xl lg:order-2">
                        <div className="flex flex-col gap-5">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-950">Order Summary</h2>
                                <p className="mt-2 text-sm text-slate-500">Review your order before placing it.</p>
                            </div>

                            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-center gap-4">
                                    <img src={product.imageUrl} alt={product.name} className="h-24 w-24 rounded-3xl object-cover" />
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-lg font-semibold text-slate-950">{product.name}</h3>
                                        <p className="mt-1 text-sm text-slate-600">${Number(product.price || 0).toFixed(2)} each</p>
                                        <p className="mt-1 text-sm text-slate-600">Quantity: {quantity}</p>
                                    </div>
                                </div>

                                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4">
                                    <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                                        <span>Quantity</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleDecrease}
                                                disabled={quantity <= 1}
                                                className="h-10 w-10 rounded-full border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition duration-200 hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center text-sm font-semibold text-slate-900">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={handleIncrease}
                                                className="h-10 w-10 rounded-full border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition duration-200 hover:border-slate-400 hover:bg-slate-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3 rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-slate-950">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="font-medium text-slate-950">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="mt-4 border-t border-slate-200 pt-4 text-base font-semibold text-slate-950 flex justify-between">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button type="button" className="mt-6 w-full rounded-3xl bg-slate-950 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-slate-800" onClick={handleSubmit}>
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
};

export default CheckOut;