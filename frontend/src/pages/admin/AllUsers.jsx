import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";

const roleStyles = {
    admin: "bg-slate-900 text-white",
    user: "bg-emerald-100 text-emerald-700",
};

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await API.get("/admin/users");
            setUsers(Array.isArray(response?.data?.users) ? response.data.users : []);
        } catch (err) {
            const message = err?.response?.data?.message || "Unable to load users right now.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleMakeAdmin = async (userId) => {
        const confirmed = window.confirm("Promote this user to admin?");
        if (!confirmed) return;

        try {
            setProcessingId(userId);
            await API.patch(`/admin/users/${userId}/role`);
            toast.success("User promoted to admin successfully");
            fetchUsers();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to update user role");
        } finally {
            setProcessingId(null);
        }
    };

    const handleDeleteUser = async (user) => {
        const confirmed = window.confirm(`Delete ${user.name || user.email}? This action cannot be undone.`);
        if (!confirmed) return;

        try {
            setProcessingId(user._id);
            await API.delete(`/admin/users/${user._id}`);
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to delete user");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 w-52 rounded bg-slate-200" />
                    <div className="h-10 w-full rounded bg-slate-200" />
                    <div className="h-64 rounded-2xl bg-slate-200" />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.3)] sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Users</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
                    </div>
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                        {users.length} total users
                    </div>
                </div>
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
                                <th className="px-4 py-4 font-semibold">Name</th>
                                <th className="px-4 py-4 font-semibold">Email</th>
                                <th className="px-4 py-4 font-semibold">Role</th>
                                <th className="px-4 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="border-t border-slate-200 hover:bg-slate-50/80">
                                        <td className="px-4 py-4 font-medium text-slate-900">{user.name || "Unnamed User"}</td>
                                        <td className="px-4 py-4 text-slate-600">{user.email}</td>
                                        <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${roleStyles[user.role] || "bg-slate-100 text-slate-700"}`}
                                            >
                                                {user.role || "user"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                {user.role !== "admin" ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMakeAdmin(user._id)}
                                                        disabled={processingId === user._id}
                                                        className="rounded-full border border-slate-200 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {processingId === user._id ? "Updating..." : "Make Admin"}
                                                    </button>
                                                ) : (
                                                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                                                        Admin
                                                    </span>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteUser(user)}
                                                    disabled={processingId === user._id}
                                                    className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    {processingId === user._id ? "Deleting..." : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-12 text-center text-slate-500">
                                        No users found.
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

export default AllUsers;