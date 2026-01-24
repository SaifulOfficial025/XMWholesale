import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Signup from "./Signup";
import ForgetPassword from "./ForgetPassword";
import { loginUser } from "../../Redux/Auth/Signin";

export default function SignIn({ onClose }) {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await loginUser(formData.email, formData.password);

      // Save response tokens and user info to localStorage (use API shape)
      if (response.tokens) {
        localStorage.setItem("access_token", response.tokens.access);
        localStorage.setItem("refresh_token", response.tokens.refresh);
      }
      if (response.user) {
        localStorage.setItem("user_info", JSON.stringify(response.user));
      }

      // Notify other parts of the app that auth state changed
      try {
        window.dispatchEvent(new Event("authChanged"));
      } catch (e) {
        // ignore
      }

      // Close modal and navigate
      if (onClose) {
        onClose();
      }

      // Redirect to home
      navigate("/");

      // Close modal and let Header update via event/listener
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)" }}
      >
        {/* Close Button */}
        {onClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold transition-colors duration-200"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            &times;
          </button>
        )}
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-lg focus:outline-none ${
              activeTab === "login"
                ? "border-b-2 border-[#a41c1c] text-[#a41c1c]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
          <button
            className={`px-4 py-2 font-medium text-lg focus:outline-none ${
              activeTab === "signup"
                ? "border-b-2 border-[#a41c1c] text-[#a41c1c]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" && (
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-base mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-2">
              <label className="block text-gray-700 text-base mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7] pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Forgot Password */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                className="text-sm text-gray-500 hover:underline"
                onClick={() => setShowForgetPassword(true)}
              >
                Forgot Password?
              </button>
            </div>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            {/* Log in Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b80000] hover:bg-[#a41c1c] disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
            {/* Or Continue With */}
            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-sm">
                Or Continue With
              </span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            {/* Google Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#f5f5f5] border border-gray-200 rounded-lg py-3 text-base font-medium text-gray-700 hover:bg-gray-100 mb-2"
            >
              <FaGoogle className="text-xl" />
              Continue with Google
            </button>
            {/* Sign Up Link */}
            {/* <div className="text-center mt-4 text-gray-600 text-base">
              Haven't Any Account?{" "}
              <button
                type="button"
                className="text-[#b80000] font-medium hover:underline"
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div> */}
          </form>
        )}

        {activeTab === "signup" && (
          <Signup
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={onClose}
          />
        )}
      </div>

      {/* Forget Password Modal */}
      {showForgetPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-y-auto">
              <ForgetPassword onClose={() => setShowForgetPassword(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
