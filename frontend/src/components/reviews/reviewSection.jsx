import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";
import { AUTH_EVENT_NAME, getStoredAuth } from "../../utils/auth";
import ReviewCard from "./reviewCard";
import ReviewForm from "./reviewForm";
import StarRating from "./starRating";

function reviewUserId(review) {
    return typeof review.user === "object" ? review.user?._id : review.user;
}

function ReviewSection({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [auth, setAuth] = useState(getStoredAuth);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const refreshAuth = () => setAuth(getStoredAuth());
        window.addEventListener(AUTH_EVENT_NAME, refreshAuth);
        return () => window.removeEventListener(AUTH_EVENT_NAME, refreshAuth);
    }, []);

    useEffect(() => {
        let active = true;
        const fetchReviews = async () => {
            setLoading(true); setError("");
            try {
                const response = await API.get(`/products/${productId}/reviews`);
                if (active) setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
            } catch (requestError) {
                if (active) setError(requestError.response?.data?.message || "Reviews could not be loaded.");
            } finally { if (active) setLoading(false); }
        };
        if (productId) fetchReviews();
        return () => { active = false; };
    }, [productId, auth.isAuthenticated]);

    const refreshReviews = async () => {
        const response = await API.get(`/products/${productId}/reviews`);
        setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
    };

    const handleCreate = async (reviewData) => {
        setFormLoading(true);
        try { await API.post(`/products/${productId}/reviews`, reviewData); await refreshReviews();
        toast.success("Review published successfully"); }
        catch (requestError) { toast.error(requestError.response?.data?.message || "Review could not be published"); }
        finally { setFormLoading(false); }
    };

    const handleUpdate = async (reviewId, reviewData) => {
        setFormLoading(true);
        try { await API.put(`/products/${reviewId}/reviews`, reviewData); await refreshReviews(); setEditingId(null); toast.success("Review updated successfully"); }
        catch (requestError) { toast.error(requestError.response?.data?.message || "Review could not be updated"); }
        finally { setFormLoading(false); }
    };

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Delete your review? This action cannot be undone.")) return;
        try { await API.delete(`/products/${reviewId}/reviews`); setReviews((current) => current.filter((review) => review._id !== reviewId)); toast.success("Review deleted successfully"); }
        catch (requestError) { toast.error(requestError.response?.data?.message || "Review could not be deleted"); }
    };

    const average = reviews.length ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length : 0;

    return (
        <section className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12" aria-labelledby="reviews-heading">
            <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">Customer feedback</p><h2 id="reviews-heading" className="mt-2 text-2xl font-semibold text-slate-950 md:text-3xl">Reviews</h2></div><p className="text-sm text-slate-500">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p></div>
            <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
                <div className="rounded-xl bg-slate-950 p-4 text-white shadow-sm"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Average rating</p><p className="mt-2 text-3xl font-semibold">{average.toFixed(1)}<span className="text-lg text-slate-400"> / 5</span></p><StarRating value={Math.round(average)} label={`${average.toFixed(1)} out of 5 stars`} /><p className="mt-2 text-sm text-slate-400">Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p></div>
                <div>{auth.isAuthenticated ? <ReviewForm loading={formLoading} onSubmit={handleCreate} /> : <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="font-semibold text-slate-900">Have you tried this product?</p><p className="mt-1 text-sm text-slate-500">Sign in to share your experience.</p><Link to="/login" className="mt-4 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">Sign in to review</Link></div>}</div>
            </div>
            <div className="mt-8">{loading && <p className="py-8 text-center text-sm text-slate-500">Loading reviews...</p>}{!loading && error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</p>}{!loading && !error && reviews.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No reviews yet. Be the first to share your thoughts.</p>}{!loading && !error && reviews.length > 0 && <div>{reviews.map((review) => <ReviewCard key={review._id} review={review} isOwner={auth.user?._id === reviewUserId(review)} editing={editingId === review._id} saving={formLoading} onEdit={() => setEditingId(review._id)} onCancel={() => setEditingId(null)} onSave={(reviewData) => handleUpdate(review._id, reviewData)} onDelete={handleDelete} />)}</div>}</div>
        </section>
    );
}


export default ReviewSection;
