function StarRating({ value = 0, onChange, disabled = false, label = "Rating" }) {
    const isInteractive = typeof onChange === "function" && !disabled;

    return (
        <div className="flex items-center gap-1" role={isInteractive ? "radiogroup" : undefined} aria-label={label}>
            {[1, 2, 3, 4, 5].map((star) => {
                const starIcon = (
                    <span className={star <= value ? "text-amber-400" : "text-slate-200"} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path d="m12 2.5 2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5Z" />
                        </svg>
                    </span>
                );

                return isInteractive ? (
                    <button key={star} type="button" onClick={() => onChange(star)} className="rounded p-0.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300" role="radio" aria-checked={value === star} aria-label={`${star} ${star === 1 ? "star" : "stars"}`}>
                        {starIcon}
                    </button>
                ) : <span key={star}>{starIcon}</span>;
            })}
        </div>
    );
}

export default StarRating;
