import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            setLoading(true);
            const res = await API.get("/cart");
            setCart(res.data.cart);
            setEmpty(!res.data.cart?.items?.length);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to load cart");
            setCart({ items: [] });
            setEmpty(true);
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = async (id) => {
        try {
            await API.put(`/cart/updateCart/${id}`, { action: "increase" });
            toast.success("Quantity increased successfully")
            getCart();

        } catch (err) {
            toast.error(err.response?.data?.message || "quantity not increased")
        }
    };

    const handleDecrease = async (id) => {
        try {
            await API.put(`/cart/updateCart/${id}`, { action: "decrease" });
            toast.success("Quantity decreased successfully")
            getCart();
        } catch (err) {
            toast.error(err.response?.data?.message || "quantity not decreased")
        }
    };

    const handleRemove = async (id) => {
        try {
            await API.delete(`/cart/removeCart/${id}`);
            toast.success("Product removed from cart")
            getCart();
        } catch (err) {
            console.error(err);
            toast.error(err.respponse?.data?.message || "Product has not removed from cart");
        }
    };

    const handleClearCart = async () => {
        try {
            await API.delete("/cart");
            toast.success("Cart cleared successfully");
            getCart();
        } catch (err) {
            console.error(err);
            toast.error(err.respponse?.data?.message || "Cart does not cleared")
        }
    };

    const subtotal = cart?.items?.reduce((sum, item) => sum + Number(item.product.price || 0) * Number(item.quantity || 1), 0) || 0;
    const shipping = subtotal > 0 ? 15 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
                <div className="w-full lg:flex-1">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Your cart</p>
                            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Shopping Cart</h1>
                        </div>
                        <div className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
                            {cart?.items?.length || 0} item(s)
                        </div>
                    </div>

                    <div className="space-y-4">
                        {cart?.items?.length ? (
                            cart?.items?.map((item) => (
                                <div key={item._id} className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_10px_35px_-15px_rgba(15,23,42,0.25)]">
                                    <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center">
                                        <div className="shrink-0">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.name}
                                                className="h-40 w-full rounded-2xl object-cover sm:h-44 sm:w-44"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-wrap items-start justify-between gap-3">
                                                    <div>
                                                        <h2 className="text-xl font-semibold text-slate-900">{item.product.name}</h2>
                                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                                            {item.product.description || "Premium quality item carefully selected for your collection."}
                                                        </p>
                                                    </div>
                                                    <p className="text-lg font-semibold text-emerald-600">${Number(item.product.price || 0).toFixed(2)}</p>
                                                </div>

                                                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                                                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                                                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100" onClick={() => handleDecrease(item.product._id)}>
                                                            -
                                                        </button>
                                                        <span className="min-w-8 text-center text-sm font-semibold text-slate-800" >{item.quantity}</span>
                                                        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100" onClick={() => handleIncrease(item.product._id)}>
                                                            +
                                                        </button>
                                                    </div>

                                                    <button type="button" className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100" onClick={() => handleRemove(item.product._id)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
                                <p className="text-lg font-semibold text-slate-800">Your cart is empty</p>
                                <p className="mt-2 text-sm text-slate-600">Add some items to see them appear here.</p>
                            </div>
                        )}
                        <button className="rounded-2xl  border-slate-400 bg-black text-center text-white text-2xl shadow-sm py-2 px-6" onClick={handleClearCart}>Clear Cart</button>
                    </div>
                </div>
                <aside className="w-full max-w-none lg:w-90 lg:flex-none">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_-15px_rgba(15,23,42,0.25)] lg:sticky lg:top-6">
                        <h3 className="text-xl font-semibold text-slate-900">Order Summary</h3>
                        <div className="mt-5 space-y-3 text-sm text-slate-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                            </div>
                            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-base font-semibold text-slate-900">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button type="button" className="mt-6 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                            Proceed to Checkout
                        </button>
                    </div>
                </aside>

            </div>
        </div>
    )
};
export default Cart;