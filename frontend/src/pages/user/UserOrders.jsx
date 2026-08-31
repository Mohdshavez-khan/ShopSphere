import { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";

const statusStyles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    shipped: "bg-sky-100 text-sky-700 border-sky-200",
    delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200"
};




function UserOrders() {
    const [myOrders, setMyOrders] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMyOrders();
    }, []);

    const getMyOrders = async () => {
        try {
            const res = await API.get("/order/my-order");
            setMyOrders(res.data.orders);
            setError(null);
        } catch (error) {
            console.error("Failed to load orders:", error);
            setError(error.response?.data?.message || "Failed to load orders.");
            setMyOrders([]);
        }
    };

    const handleCancelOrder = async (id) => {
        try {
            await API.patch(`/order/my-order/${id}/cancel`);
            getMyOrders();
            setError(null);
        } catch (error) {
            console.error("Failed to cancel order:", error);
            setError(error.response?.data?.message || "Failed to cancel order.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-10 rounded-4xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/20 sm:p-10">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Order history</p>
                    <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">My Orders</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        View your purchase history, order status, delivery details, and item totals in one clean dashboard.
                    </p>
                    {error && (
                        <div className="mt-6 rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                            {error}
                        </div>
                    )}
                </div>

                {myOrders === null ? (
                    <div className="rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/20">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12h18" />
                                <path d="M12 3v18" />
                            </svg>
                        </div>
                        <p className="mt-6 text-lg font-medium text-slate-900">Loading your orders...</p>
                        <p className="mt-2 text-sm text-slate-500">Please wait while we fetch your recent purchases.</p>
                    </div>
                ) : myOrders.length === 0 ? (
                    <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">No orders yet</p>
                        <h2 className="mt-4 text-2xl font-semibold text-slate-950">You don’t have any orders yet.</h2>
                        <p className="mt-3 max-w-xl mx-auto text-sm leading-7 text-slate-600">
                            As soon as you place an order, it will show up here with tracking details, totals, and shipping address.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {myOrders.map((order) => (
                            <div key={order._id} className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Order ID</p>
                                        <p className="mt-2 text-base font-semibold text-slate-900 `break-words`">{order._id}</p>
                                    </div>
                                    <span className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${statusStyles[order.status] || statusStyles.pending}`}>
                                        {order.status}
                                    </span>
                                    {
                                        order.status === "pending" ? (
                                            <button onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>

                                        ) : null
                                    }
                                    <div className="mt-2 sm:mt-0">
                                        <Link to={`/my-orders/${order._id}`} className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">
                                            View Details
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid gap-6 p-6 sm:grid-cols-[1.1fr_0.9fr] sm:p-8">
                                    <div className="space-y-5">
                                        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
                                            <img
                                                src={order.product?.imageUrl}
                                                alt={order.product?.name || "Product image"}
                                                className="h-28 w-full rounded-3xl object-cover sm:h-28 sm:w-28"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Product</p>
                                                <h3 className="mt-3 text-lg font-semibold text-slate-950 line-clamp-2 `break-words`">{order.product?.name}</h3>
                                                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                                    <span className="rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm">Qty: {order.quantity}</span>
                                                    <span className="rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm">Total: ${Number(order.totalPrice || 0).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
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
                                                    <span>Order ID</span>
                                                    <span className="font-semibold text-slate-900 `break-words`">{order._id}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Quantity</span>
                                                    <span className="font-semibold text-slate-900">{order.quantity}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Total price</span>
                                                    <span className="font-semibold text-slate-900">${Number(order.totalPrice || 0).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
                                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Delivery details</p>
                                            <p className="mt-3 text-base font-semibold text-slate-950">{order.status === "delivered" ? "Delivered" : order.status === "shipped" ? "Shipped" : order.status === "cancelled" ? "Cancelled" : "Pending"}</p>
                                            <p className="mt-2 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserOrders;