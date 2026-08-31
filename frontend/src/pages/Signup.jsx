import { useState } from "react";
import API from "../api/api.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const initialErrors = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.name.trim()) validationErrors.name = "Full name is required.";
    if (!formData.email.trim()) validationErrors.email = "Email address is required.";
    else if (!emailPattern.test(formData.email)) validationErrors.email = "Enter a valid email address.";
    if (!formData.password) validationErrors.password = "Password is required.";
    else if (formData.password.length < 8) validationErrors.password = "Password must be at least 8 characters.";
    if (!formData.confirmPassword) validationErrors.confirmPassword = "Please confirm your password.";
    else if (formData.confirmPassword !== formData.password) validationErrors.confirmPassword = "Passwords do not match.";

    setErrors(validationErrors);
    return Object.values(validationErrors).every((error) => !error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setFormData(initialState);
      toast.success("You are signup successfully")
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registrtion failed please check the details carefully")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl shadow-slate-200/40 rounded-[28px] p-8 sm:p-10">
        <div className="max-w-md mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Welcome to ShopSphere</p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-950">Create Your Account</h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500">Sign up to start shopping with premium style and seamless checkout.</p>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full name</label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="relative mt-1">
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
              <div className="relative mt-1">
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
                  placeholder="Create password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm password</label>
              <div className="relative mt-1">
                <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-12 pr-12 text-sm text-slate-900 outline-none transition duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 inline-flex items-center rounded-full px-2 text-slate-500 transition duration-150 hover:text-slate-900"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
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
              {errors.confirmPassword && <p className="mt-2 text-sm text-rose-600">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-slate-950 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-slate-950 underline decoration-slate-900 decoration-2 underline-offset-4 transition hover:text-slate-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
