function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-100/80">
            <div className="mb-3 flex items-start gap-3">
              <span className="inline-flex h-10 w-20 mt-2 items-center justify-center rounded-xl bg-black text-white text-lg font-semibold">
                S
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-900">ShopSphere</p>
                <p className="mt-1 text-sm text-slate-500">Premium shopping experience with quality products and fast delivery.</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-500">
              Elegant, minimal design with reliable spacing and simple structure.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-100/80">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Quick links</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Home</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Product</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Cart</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Login</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Sign Up</a>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-100/80">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Customer support</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Contact Us</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">FAQ</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Return Policy</a>
              </li>
              <li>
                <a href="#" className="block rounded-2xl px-2 py-1 transition duration-300 hover:bg-slate-900/5 hover:text-slate-900">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-100/80">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">Contact information</h2>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="font-medium text-slate-900">Email</p>
                <p className="mt-1">support@shopsphere.com</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="font-medium text-slate-900">Phone</p>
                <p className="mt-1">+1 (800) 123-4567</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="font-medium text-slate-900">Location</p>
                <p className="mt-1">San Francisco, CA</p>
              </div>
              <div className="mt-4 flex gap-3">
                <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.04c-5.5 0-10 4.46-10 10.03 0 4.98 3.66 9.1 8.44 9.92v-7.03h-2.54V12h2.54V9.84c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.96h-2.34v7.03C18.34 21.17 22 17.02 22 12.07c0-5.57-4.5-10.03-10-10.03z" />
                  </svg>
                </a>
                <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4.01c-.77.34-1.6.57-2.47.67a4.3 4.3 0 0 0 1.88-2.38 8.58 8.58 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.5 6a12.16 12.16 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.32 5.72 4.25 4.25 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 3.99 2.97A8.58 8.58 0 0 1 2 18.57a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.54 12.2-12.2 0-.19-.01-.39-.02-.58A8.72 8.72 0 0 0 22 4.01z" />
                  </svg>
                </a>
                <a href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 2C4.238 2 2 4.238 2 7v10c0 2.762 2.238 5 5 5h10c2.762 0 5-2.238 5-5V7c0-2.762-2.238-5-5-5H7zm10 2.4c.828 0 1.5.672 1.5 1.5v10.2c0 .828-.672 1.5-1.5 1.5H7c-.828 0-1.5-.672-1.5-1.5V5.9c0-.828.672-1.5 1.5-1.5h10zM12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 1.5a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6zm4.95-.35a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex sm:items-center sm:justify-between sm:text-sm">
          <p>© 2026 ShopSphere. All Rights Reserved.</p>
          <p className="mt-3 sm:mt-0">Made with React, Node.js, Express.js, MongoDB, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
