import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/api";

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOrder = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/order/my-order/${id}`);
                setOrder(res.data.order);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to load order");
            } finally {
                setLoading(false);
            }
        };
        getOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/20">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12h18" />
                                <path d="M12 3v18" />
                            </svg>
                        </div>
                        <p className="mt-6 text-lg font-medium text-slate-900">Loading order details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Order not found</p>
                        <h2 className="mt-4 text-2xl font-semibold text-slate-950">Unable to load this order.</h2>
                        <p className="mt-3 max-w-xl mx-auto text-sm leading-7 text-slate-600">{error || "Order not found."}</p>
                        <div className="mt-6">
                            <Link to="/my-orders" className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">Back to My Orders</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const product = order.product || {};
    const productPrice = Number(product.price || 0);
    const quantity = Number(order.quantity || 0);
    const subtotal = productPrice * quantity;
    const shipping = Number((order.totalPrice || 0) - subtotal) || 0;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-6 flex items-start justify-between rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Order ID</p>
                        <p className="mt-2 text-base font-semibold text-slate-900 `break-words`">{order._id}</p>
                        <p className="mt-2 text-sm text-slate-600">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Status</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">{order.status}</p>
                        <div className="mt-4">
                            <Link to="/my-orders" className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">Back to My Orders</Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-5">
                        <div className="flex gap-4 rounded-[28px] border border-slate-200 bg-white p-5 items-center">
                            <img src={product.imageUrl} alt={product.name} className="h-32 w-32 rounded-3xl object-cover" />
                            <div>
                                <h3 className="text-lg font-semibold text-slate-950">{product.name}</h3>
                                <p className="mt-2 text-sm text-slate-600">Price: ${productPrice.toFixed(2)}</p>
                                <p className="mt-1 text-sm text-slate-600">Qty: {quantity}</p>
                                <p className="mt-1 text-sm text-slate-600">Subtotal: ${subtotal.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Shipping address</p>
                            <p className="mt-3 leading-7 text-slate-900 `break-words`">
                                {order.shippingAddress?.address},<br />
                                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Order summary</p>
                            <div className="mt-4 space-y-3 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Items subtotal</span>
                                    <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping charges</span>
                                    <span className="font-semibold text-slate-900">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total price</span>
                                    <span className="font-semibold text-slate-900">${Number(order.totalPrice || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Delivery status</p>
                            <p className="mt-3 text-base font-semibold text-slate-950">{order.status === "delivered" ? "Delivered" : order.status === "shipped" ? "Shipped" : order.status === "cancelled" ? "Cancelled" : "Pending"}</p>
                            <p className="mt-2 text-sm text-slate-600">{new Date(order.updatedAt || order.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
