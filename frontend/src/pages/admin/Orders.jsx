import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";

const statusStyles = {
    pending: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200",
    shipped: "bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200",
    delivered: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200",
};

const statusOptions = ["pending", "shipped", "delivered", "cancelled"];

const formatCurrency = (value) => {
    const numericValue = Number(value || 0);
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(numericValue);
};

const formatDate = (value) => {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await API.get("/admin/allOrders");
            setOrders(Array.isArray(response?.data?.orders) ? response.data.orders : []);
        } catch (err) {
            const message = err?.response?.data?.message || "Unable to load orders at the moment.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, nextStatus) => {
        try {
            setProcessingId(orderId);
            await API.patch(`/admin/${orderId}`, { status: nextStatus });
            toast.success("Order status updated successfully");
            fetchOrders();
            if (selectedOrder?._id === orderId) {
                setSelectedOrder((current) => ({ ...current, status: nextStatus }));
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update order status");
        } finally {
            setProcessingId(null);
        }
    };

    const handleViewDetails = async (orderId) => {
        try {
            setDetailsLoading(true);
            const response = await API.get(`/admin/${orderId}`);
            setSelectedOrder(response?.data?.order || null);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to load order details");
        } finally {
            setDetailsLoading(false);
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
            <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.3)] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Orders</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Order Management</h1>
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
                                <th className="px-4 py-4 font-semibold">Order ID</th>
                                <th className="px-4 py-4 font-semibold">Customer</th>
                                <th className="px-4 py-4 font-semibold">Items</th>
                                <th className="px-4 py-4 font-semibold">Amount</th>
                                <th className="px-4 py-4 font-semibold">Status</th>
                                <th className="px-4 py-4 font-semibold">Date</th>
                                <th className="px-4 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-t border-slate-200 hover:bg-slate-50/80">
                                        <td className="px-4 py-4 font-medium text-slate-900">#{String(order._id).slice(-6).toUpperCase()}</td>
                                        <td className="px-4 py-4 text-slate-700">
                                            {order?.user?.name || order?.user?.email || "Guest customer"}
                                        </td>
                                        <td className="px-4 py-4 text-slate-700">
                                            <div className="flex flex-col">
                                                <span>{order?.product?.name || "Product"}</span>
                                                <span className="text-xs text-slate-500">Qty: {order?.quantity || 1}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-900">
                                            {formatCurrency(order?.totalPrice ?? order?.totalAmount ?? 0)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <select
                                                value={order?.status || "pending"}
                                                onChange={(event) => handleStatusChange(order._id, event.target.value)}
                                                disabled={processingId === order._id}
                                                className={`min-w-32.5 rounded-full px-2.5 py-1.5 text-xs font-semibold capitalize outline-none ${statusStyles[order?.status] || "bg-slate-100 text-slate-700"}`}
                                            >
                                                {statusOptions.map((status) => (
                                                    <option key={status} value={status} className="text-slate-900">
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-4 text-slate-500">{formatDate(order?.createdAt)}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => handleViewDetails(order._id)}
                                                    disabled={detailsLoading}
                                                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    View details
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-12 text-center text-slate-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
                    <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Order Details</p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                    #{String(selectedOrder._id).slice(-6).toUpperCase()}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedOrder(null)}
                                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                            >
                                Close
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Customer</p>
                                <p className="mt-2 font-semibold text-slate-900">
                                    {selectedOrder?.user?.name || selectedOrder?.user?.email || "Guest customer"}
                                </p>
                                <p className="text-sm text-slate-600">{selectedOrder?.user?.email || "No email available"}</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Order Status</p>
                                <span
                                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[selectedOrder?.status] || "bg-slate-100 text-slate-700"}`}
                                >
                                    {selectedOrder?.status || "pending"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Items</p>
                            <div className="mt-3 space-y-2 text-sm text-slate-700">
                                <div className="flex items-center justify-between gap-4">
                                    <span>{selectedOrder?.product?.name || "Product"}</span>
                                    <span>{selectedOrder?.quantity || 1}x</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Total</p>
                                <p className="mt-2 text-xl font-bold text-slate-900">
                                    {formatCurrency(selectedOrder?.totalPrice ?? selectedOrder?.totalAmount ?? 0)}
                                </p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Date</p>
                                <p className="mt-2 text-sm font-medium text-slate-900">{formatDate(selectedOrder?.createdAt)}</p>
                            </div>
                        </div>

                        {selectedOrder?.shippingAddress && (
                            <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Shipping Address</p>
                                <p className="mt-3 text-sm text-slate-700">
                                    {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.pincode}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminOrders;