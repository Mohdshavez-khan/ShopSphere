import { useState } from "react";
import StarRating from "./starRating";

function ReviewForm({ initialReview, loading, onSubmit, onCancel }) {
	const [rating, setRating] = useState(initialReview?.rating || 0);
	const [comment, setComment] = useState(initialReview?.comment || "");
	const [error, setError] = useState("");
	const isEditing = Boolean(initialReview);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const trimmedComment = comment.trim();
		if (!rating || rating < 1 || rating > 5) return setError("Choose a rating from 1 to 5 stars.");
		if (trimmedComment.length < 4) return setError("Your review must be at least 4 characters.");
		if (trimmedComment.length > 500) return setError("Your review must be 500 characters or fewer.");
		setError("");
		await onSubmit({ rating, comment: trimmedComment });
	};

	return (
		<form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm" noValidate>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<label className="text-sm font-semibold text-slate-900">{isEditing ? "Edit your review" : "Your rating"}</label>
				<StarRating value={rating} onChange={setRating} label="Choose a rating" />
			</div>
			<label htmlFor={isEditing ? "edit-review-comment" : "review-comment"} className="sr-only">Review comment</label>
			<textarea id={isEditing ? "edit-review-comment" : "review-comment"} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Share what you liked about this product..." maxLength={500} rows={4} className="mt-4 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
			<div className="mt-2 flex items-center justify-between gap-3"><p className="text-xs text-slate-500">{comment.length}/500</p>{error && <p className="text-right text-sm text-rose-600">{error}</p>}</div>
			<div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				{isEditing && <button type="button" onClick={onCancel} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white">Cancel</button>}
				<button type="submit" disabled={loading} className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400">{loading ? "Saving..." : isEditing ? "Save changes" : "Publish review"}</button>
			</div>
		</form>
	);
}

export default ReviewForm;
