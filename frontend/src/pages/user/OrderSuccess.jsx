function OrderSuccess() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/40">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </div>
                <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-500">Order confirmed</p>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                    <span className="block">Your order is successfully created</span>
                    <span className="block `bg-gradient-to-r` from-emerald-500 via-slate-950 to-slate-700 bg-clip-text text-transparent">Thank you for shopping with ShopSphere</span>
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    We are preparing your shipment and will send you an update shortly.
                </p>
            </div>
        </div>
    )
};

export default OrderSuccess;