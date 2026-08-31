import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AUTH_EVENT_NAME, getStoredAuth, getUserFirstName, removeTokenFromStorage } from "../utils/auth";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useState(() => getStoredAuth());
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [search, setSearch] = useState("")

    useEffect(() => {
        const syncAuth = () => setAuth(getStoredAuth());
        window.addEventListener(AUTH_EVENT_NAME, syncAuth);
        window.addEventListener("storage", syncAuth);

        return () => {
            window.removeEventListener(AUTH_EVENT_NAME, syncAuth);
            window.removeEventListener("storage", syncAuth);
        };
    }, []);

    const navItems = [
        { to: "/", label: "Home", icon: (<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-4v-6H8v6H4a1 1 0 0 1-1-1z" /></svg>) },
        { to: "/products", label: "Products", icon: (<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M7 7v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7M9 11h6" /></svg>) },
        { to: "/cart", label: "Cart", icon: (<svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2 10h10l2-7H7" /><circle cx="10" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></svg>) },
    ];

    const userMenu = [
        { path: "/profile", label: "Profile" },
        { path: "/my-orders", label: "My Orders" },
        { path: "/logout", label: "Logout" }
    ];

    const adminMenu = [
        { path: "/admin/dashboard", label: "Dashboard" },
        { path: "/admin/products", label: "Manage Products" },
        { path: "/admin/orders", label: "Manage Orders" },
        { path: "/admin/users", label: "Manage Users" },
        { path: "/admin/add-product", label: "Add Product" },
        { path: "/logout", label: "Logout" },
    ];

    const Menu = auth.user?.role === "admin" ? adminMenu : userMenu;


    const handleLogout = () => {
        removeTokenFromStorage();
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            window.dispatchEvent(new Event(AUTH_EVENT_NAME));
        }
        setIsOpen(false);
        navigate("/");
    };

    const handleToggleProfile = () => {
        setIsProfileOpen((prev) => !prev)
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const value = e.currentTarget.elements.search.value;
        navigate(`/products?search=${search}`)
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // const handleSearch = () => {
    //     navigate(`/products?search=${search}`);
    // };

    const NavLinkClass = ({ isActive }) =>
        isActive
            ? "flex items-center gap-1 rounded-full bg-neutral-950 px-3 py-2 text-sm font-semibold text-white shadow-sm"
            : "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950";


    return (
        <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-base font-semibold text-white shadow-lg shadow-neutral-900/10">
                        S
                    </div>
                    <div className="leading-tight">
                        <p className="text-lg font-semibold tracking-tight text-neutral-950">ShopSphere</p>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">Premium</p>
                    </div>
                </Link>

                <form className="hidden flex-1 max-w-md md:mx-8 md:flex" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="flex-1 rounded-l-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:bg-white"
                        name="search"
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <button className="flex items-center justify-center rounded-r-full bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800" type="submit">
                        Search
                    </button>
                </form>

                <div className="hidden items-center gap-2 lg:flex">
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} className={NavLinkClass}>
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                    {auth.isAuthenticated ? (

                        <>
                            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700 cursor-pointer" onClick={handleToggleProfile}>
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                                    {getUserFirstName(auth.user).charAt(0).toUpperCase()}
                                </span>
                                <span>{getUserFirstName(auth.user).charAt(0).toUpperCase() + getUserFirstName(auth.user).slice(1)}</span>
                            </div>

                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden z-50">
                                    {Menu.map((item) => (
                                        <button
                                            key={item.path}
                                            onClick={() => {
                                                navigate(item.path);
                                                setIsProfileOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>

                            )}

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={NavLinkClass}>
                                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 1 1 14 0" /></svg>
                                <span>Login</span>
                            </NavLink>
                            <NavLink to="/signup" className={NavLinkClass}>
                                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
                                <span>Sign Up</span>
                            </NavLink>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50 lg:hidden"
                    aria-label="Toggle navigation"
                >
                    {isOpen ? (
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    )}
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="border-t border-neutral-200/80 bg-white/95 px-4 py-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:px-6 lg:px-8">
                    <form className="mb-4 flex md:hidden" onSubmit={handleSearchSubmit}>
                        <input
                            name="search"
                            value={search}
                            onChange={handleSearchChange}
                            type="text"
                            placeholder="Search products..."
                            className="flex-1 rounded-l-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:bg-white"
                        />
                        <button type="submit" className="rounded-r-full bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800">
                            Go
                        </button>
                    </form>

                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={NavLinkClass}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="flex items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </span>
                            </NavLink>
                        ))}
                        {auth.isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700" onClick={handleToggleProfile}>
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                                        {getUserFirstName(auth.user).charAt(0).toUpperCase()}
                                    </span>
                                    <span>{getUserFirstName(auth.user)}</span>
                                </div>

                                {isProfileOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden z-50">
                                        {Menu.map((item) => (
                                            <button
                                                key={item.path}
                                                onClick={() => {
                                                    navigate(item.path);
                                                    setIsProfileOpen(false);
                                                    setIsOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>

                                )}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center justify-start rounded-full border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={NavLinkClass} onClick={() => setIsOpen(false)}>
                                    <span className="flex items-center gap-2">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 1 1 14 0" /></svg>
                                        Login
                                    </span>
                                </NavLink>
                                <NavLink to="/signup" className={NavLinkClass} onClick={() => setIsOpen(false)}>
                                    <span className="flex items-center gap-2">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
                                        Sign Up
                                    </span>
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;