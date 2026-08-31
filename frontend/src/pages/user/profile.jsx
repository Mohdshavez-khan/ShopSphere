import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";

function Profile() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await API.get("/order/my-order");
                setOrders(res.data.orders || []);
            } catch (err) {
                console.error("Failed to load orders for profile:", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const totalOrders = orders ? orders.length : 0;
    const savedAddresses = orders
        ? Array.from(new Set(orders.map(o => {
            const a = o.shippingAddress || {};
            return `${a.address || ""}|${a.city || ""}|${a.state || ""}|${a.pincode || ""}`;
        }).filter(Boolean))).length
        : 0;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-900 text-2xl font-semibold text-white">
                                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">{user?.name || "User"}</h2>
                                <p className="text-sm text-slate-600">{user?.email}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800">{user?.role || "user"}</span>
                                    {user?.verified && <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Verified</span>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link to="/profile" className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50">Edit Profile</Link>
                            <Link to="/my-orders" className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800">My Orders</Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Total orders</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">{loading ? "..." : totalOrders}</p>
                            </div>

                            <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Saved addresses</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">{loading ? "..." : savedAddresses}</p>
                            </div>

                            {/* Only show reviews if available in user data */}
                            {user?.reviews && (
                                <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Reviews</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-900">{user.reviews.length}</p>
                                </div>
                            )}
                        </div>

                        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Account details</p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs text-slate-500">Full name</p>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{user?.name || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Email</p>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{user?.email || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Role</p>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{user?.role || "-"}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Member since</p>
                                    <p className="mt-1 text-sm font-medium text-slate-900">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Quick actions</p>
                            <div className="mt-4 flex flex-col gap-3">
                                <Link to="/my-orders" className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
                                    <span>My Orders</span>
                                    <span className="text-sm text-slate-500">{loading ? "..." : totalOrders}</span>
                                </Link>

                                {savedAddresses > 0 && (
                                    <Link to="/my-orders" className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
                                        <span>Saved addresses</span>
                                        <span className="text-sm text-slate-500">{savedAddresses}</span>
                                    </Link>
                                )}

                                <Link to="/logout" className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50">
                                    <span>Logout</span>
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-[20px] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">About</p>
                            <p className="mt-3 text-sm text-slate-600">Manage your account details, view order history, and update preferences from here. All data is loaded from your account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;