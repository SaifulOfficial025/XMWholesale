import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OTPVerification from "./OTPVerification";
import { registerUser } from "../../Redux/Auth/Signup";
import { useTranslation } from "react-i18next";

function Signup({ activeTab, setActiveTab, onClose }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    companyName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwords_no_match"));
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser(formData);

      // Save email to localStorage or state for OTP verification
      setUserEmail(formData.email);

      // Show OTP verification modal
      setShowOTP(true);
    } catch (err) {
      setError(err.message || t("auth.registration_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        {/* First Name & Last Name */}
        <div className="flex gap-3 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 text-base mb-1">
              {t("auth.first_name_label")}
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
              placeholder={t("auth.first_name_placeholder")}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-base mb-1">
              {t("auth.last_name_label")}
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
              placeholder={t("auth.last_name_placeholder")}
              required
            />
          </div>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-base mb-1">
            {t("auth.email_label")}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
            placeholder={t("auth.email_placeholder")}
            required
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-base mb-1">
            {t("auth.password_label")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7] pr-10"
              placeholder={t("auth.password_placeholder")}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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

        {/* confirm password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-base mb-1">
            {t("auth.confirm_password_label")}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7] pr-10"
              placeholder={t("auth.confirm_password_placeholder")}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <FaEye className="h-5 w-5" />
              ) : (
                <FaEyeSlash className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 text-base mb-1">
            {t("auth.phone_label")}
          </label>
          <div className="flex items-center bg-[#f7f7f7] rounded-lg border border-gray-300 px-2 py-1 focus-within:ring-2 focus-within:ring-[#a41c1c]">
            {/* <span className="flex items-center px-2">
              <img
                src="https://flagcdn.com/us.svg"
                alt="US"
                className="w-6 h-6 rounded-full"
              />
            </span> */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="flex-1 px-2 py-2 bg-transparent outline-none border-none text-base"
              placeholder={t("auth.phone_placeholder")}
              required
              style={{ minWidth: 0 }}
            />
          </div>
        </div>
        {/* Company Name */}
        <div className="mb-6">
          <label className="block text-gray-700 text-base mb-1">
            {t("auth.company_name_label")}
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
            placeholder={t("auth.company_name_placeholder")}
            required
          />
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        {/* Sign up Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#b80000] hover:bg-[#a41c1c] disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
        >
          {loading ? t("auth.signing_up") : t("auth.signup_button")}
        </button>
        {/* Already Have Account Link */}
        {/* <div className="text-center mt-4 text-gray-600 text-base">
          Already have an account?{" "}
          <button
            type="button"
            className="text-[#b80000] font-medium hover:underline cursor-pointer"
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
        </div> */}
      </form>

      {/* OTP Verification Modal */}
      {showOTP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-full max-w-md mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
              onClick={() => setShowOTP(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <div className="bg-white rounded-2xl shadow-xl overflow-y-auto">
              <OTPVerification
                email={userEmail}
                onClose={() => setShowOTP(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
