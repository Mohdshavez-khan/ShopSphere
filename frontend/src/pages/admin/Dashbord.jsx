import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

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

const statusStyles = {
    pending: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200",
    shipped: "bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200",
    delivered: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    cancelled: "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200",
};

const statsIcons = {
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 8v-1a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    products: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 12 3l9 4.5-9 4.5L3 7.5Zm9 4.5v9M3 7.5v9l9 4.5 9-4.5v-9" />
        </svg>
    ),
    orders: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M7 7V4h10v3M6 12h12M6 17h9" />
        </svg>
    ),
    revenue: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
};

const quickActions = [
    {
        title: "User Management",
        description: "Review customers and permissions",
        path: "/admin/users",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 8v-1a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: "Product Management",
        description: "Manage inventory and listings",
        path: "/admin/products",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 12 3l9 4.5-9 4.5L3 7.5Zm9 4.5v9M3 7.5v9l9 4.5 9-4.5v-9" />
            </svg>
        ),
    },
    {
        title: "Order Management",
        description: "Track and update order status",
        path: "/admin/orders",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M5 7l1 10h12l1-10M9 11h6M8 4h8l1 3H7l1-3Z" />
            </svg>
        ),
    },
];

function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError("");

                const [statsResponse, ordersResponse] = await Promise.all([
                    API.get("/admin/dashboard"),
                    API.get("/admin/allOrders"),
                ]);

                setStats({
                    totalUsers: statsResponse?.data?.totalUsers ?? 0,
                    totalProducts: statsResponse?.data?.totalProducts ?? 0,
                    totalOrders: statsResponse?.data?.totalOrders ?? 0,
                    totalRevenue: statsResponse?.data?.totalRevenue ?? 0,
                });

                const latestOrders = Array.isArray(ordersResponse?.data?.orders)
                    ? ordersResponse.data.orders.slice().reverse().slice(0, 5)
                    : [];

                setRecentOrders(latestOrders);
            } catch (fetchError) {
                console.error("Dashboard data fetch failed:", fetchError);
                const message =
                    fetchError?.response?.data?.message ||
                    "Unable to load the dashboard right now. Please try again.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const metrics = useMemo(
        () => [
            {
                key: "users",
                label: "Total Users",
                value: stats.totalUsers,
                change: "+12.4%",
                icon: statsIcons.users,
                tone: "bg-slate-900 text-white",
            },
            {
                key: "products",
                label: "Total Products",
                value: stats.totalProducts,
                change: "+8.1%",
                icon: statsIcons.products,
                tone: "bg-white text-slate-900 ring-1 ring-slate-200",
            },
            {
                key: "orders",
                label: "Total Orders",
                value: stats.totalOrders,
                change: "+5.7%",
                icon: statsIcons.orders,
                tone: "bg-white text-slate-900 ring-1 ring-slate-200",
            },
            {
                key: "revenue",
                label: "Total Revenue",
                value: formatCurrency(stats.totalRevenue),
                change: "+18.2%",
                icon: statsIcons.revenue,
                tone: "bg-emerald-500 text-white",
            },
        ],
        [stats]
    );

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 w-56 rounded bg-slate-200" />
                    <div className="h-4 w-72 rounded bg-slate-200" />
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="h-32 rounded-2xl bg-slate-200" />
                        ))}
                    </div>
                    <div className="h-64 rounded-2xl bg-slate-200" />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.3)] sm:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Store Control</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Admin Dashboard</h1>
                    </div>
                    <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                        <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        Overview of your store
                    </div>
                </div>
                <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                    Monitor your sales, inventory, customer growth, and day-to-day admin activity from one place.
                </p>
            </header>

            {error ? (
                <div className="mb-8 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">
                    {error}
                </div>
            ) : null}

            <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((item) => (
                    <div
                        key={item.key}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.tone}`}>
                                {item.icon}
                            </div>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                {item.change}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-slate-500">{item.label}</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{item.value}</h2>
                    </div>
                ))}
            </section>

            <section className="mb-8 grid gap-4 md:grid-cols-3">
                {quickActions.map((action) => (
                    <button
                        key={action.title}
                        type="button"
                        onClick={() => navigate(action.path)}
                        className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_20px_45px_-28px_rgba(15,23,42,0.4)]"
                    >
                        <div>
                            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white transition group-hover:bg-slate-700">
                                {action.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">{action.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">{action.description}</p>
                        </div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-slate-400 transition group-hover:text-slate-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </button>
                ))}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.3)] sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Recent Orders</h2>
                        <p className="text-sm text-slate-500">Latest customer activity</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/orders")}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        View all
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-slate-500">
                                <th className="px-3 py-3 font-medium">Order ID</th>
                                <th className="px-3 py-3 font-medium">Customer</th>
                                <th className="px-3 py-3 font-medium">Amount</th>
                                <th className="px-3 py-3 font-medium">Status</th>
                                <th className="px-3 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <tr key={order._id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80">
                                        <td className="px-3 py-3 text-slate-700">#{String(order._id).slice(-6).toUpperCase()}</td>
                                        <td className="px-3 py-3 text-slate-700">
                                            {order?.user?.name || order?.user?.email || "Guest customer"}
                                        </td>
                                        <td className="px-3 py-3 font-medium text-slate-900">
                                            {formatCurrency(order?.totalPrice ?? order?.totalAmount ?? 0)}
                                        </td>
                                        <td className="px-3 py-3">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[order?.status] || "bg-slate-100 text-slate-700"}`}
                                            >
                                                {order?.status || "pending"}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-slate-500">{formatDate(order?.createdAt)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-3 py-6 text-center text-slate-500">
                                        No recent orders available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;