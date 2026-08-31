import { useState } from "react";
import Api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { setStoredAuth } from "../utils/auth";
import toast from "react-hot-toast";

const initialState = {
  email: "",
  password: ""
};

const initialErrors = {
  email: "",
  password: ""
};

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    const validationErrors = { ...initialErrors };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) validationErrors.email = "Email address is required.";
    else if (!emailPattern.test(formData.email)) validationErrors.email = "Enter a valid email address.";
    if (!formData.password) validationErrors.password = "Password is required.";
    else if (formData.password.length < 8) validationErrors.password = "Password must be at least 8 characters.";

    setErrors(validationErrors);
    return Object.values(validationErrors).every((error) => !error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await Api.post("/auth/login", formData);
      setStoredAuth(response.data.token, response.data.user);
      toast.success("You are logged in successfully");
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || "Logged in failed Please check the details carefully")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl shadow-slate-200/40 rounded-[28px] p-8 sm:p-10">
        <div className="max-w-md mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Welcome back</p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-950">Login to Your Account</h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500">Enter your details to continue shopping with a premium experience.</p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 inline-flex items-center rounded-full px-2 text-slate-500 transition duration-150 hover:text-slate-900"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.05 10.05 0 0 1 12 19c-5.06 0-9.3-3.24-10.84-7.5a1 1 0 0 1 0-.92A10.05 10.05 0 0 1 6.06 6.06" />
                      <path d="M1 1l22 22" />
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                      <path d="M14.12 14.12C13.44 14.8 12.54 15.2 11.5 15.2a3 3 0 0 1-3-3c0-1.04.4-1.94 1.08-2.62" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-rose-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-slate-950 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="font-medium text-slate-950 underline decoration-slate-900 decoration-2 underline-offset-4 transition hover:text-slate-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;