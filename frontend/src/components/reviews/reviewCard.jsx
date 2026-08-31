import StarRating from "./starRating";
import ReviewForm from "./reviewForm";


function ReviewCard({ review, isOwner, editing, saving, onEdit, onCancel, onSave, onDelete }) {
	const reviewerName = typeof review.user === "object" ? review.user?.name : "ShopSphere customer";
	const date = review.updatedAt || review.createdAt;

	return (
		<article className="relative mb-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
			{editing ? <ReviewForm initialReview={review} loading={saving} onSubmit={onSave} onCancel={onCancel} /> : <>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
					<div><p className="font-semibold text-slate-900">{reviewerName}</p><div className="mt-1 flex flex-wrap items-center gap-3"><StarRating value={review.rating} label={`${review.rating} out of 5 stars`} />{date && <time dateTime={date} className="text-xs text-slate-500">{new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</time>}</div></div>
				</div>
				<p className="mt-3 text-sm leading-6 text-slate-600">{review.comment}</p>
				{isOwner && <div className="mt-3 flex gap-2 sm:absolute sm:right-4 sm:top-4 sm:mt-0"><button type="button" onClick={onEdit} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-950">Edit</button><button type="button" onClick={() => onDelete(review._id)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">Delete</button></div>}
			</>}
		</article>
	);
}

export default ReviewCard;
