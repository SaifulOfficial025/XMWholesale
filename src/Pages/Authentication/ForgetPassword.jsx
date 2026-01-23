import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  sendForgetPasswordOTP,
  verifyForgetPasswordOTP,
  changePassword,
  resendOTP,
} from "../../Redux/Auth/ForgetPassword";

function ForgetPassword({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  // Timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await sendForgetPasswordOTP(email);
      setStep(2);
      setTimer(21); // Start 21-second timer
      setSuccess(false);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyForgetPasswordOTP(email, otp);

      // Save tokens to localStorage
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);
      localStorage.setItem(
        "user_info",
        JSON.stringify(response.login_user_info),
      );

      setStep(3);
      setSuccess(false);
    } catch (err) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!password || !confirmPassword) {
      setError("Please enter both password fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await changePassword(password);
      setSuccess(true);

      // Show success and redirect after 2 seconds
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        onClose && onClose();
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    try {
      setLoading(true);
      await resendOTP(email);
      setTimer(21); // Restart timer
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-[#e5e7eb]">
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

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Forget Password
        </h2>

        <form>
          {/* Step 1: Email Input */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              step >= 1 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
            }`}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-base mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
                placeholder="Enter your email"
                required
              />
            </div>
            {step === 1 && (
              <>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full bg-[#b80000] hover:bg-[#a41c1c] disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </>
            )}
          </div>

          {/* Step 2: OTP Input */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              step >= 2 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
            }`}
          >
            {step >= 2 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-base mb-1">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
                    placeholder="Enter OTP"
                    maxLength={6}
                    required
                  />
                </div>
                {step === 2 && (
                  <>
                    {error && (
                      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-pulse">
                        ✓ OTP verified successfully!
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={loading}
                      className="w-full bg-[#b80000] hover:bg-[#a41c1c] disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
                    >
                      {loading ? "Verifying..." : "Verify"}
                    </button>

                    <div className="text-center mt-3 text-sm">
                      <span className="text-gray-700">
                        Didn't receive OTP?{" "}
                      </span>
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={timer > 0 || loading}
                        className="text-[#b80000] font-semibold hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {timer > 0 ? `Resend (${timer}s)` : "Resend OTP"}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Step 3: Password Fields */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              step >= 3 ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
            }`}
          >
            {step >= 3 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-base mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7] pr-10"
                      placeholder="Enter new password"
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

                <div className="mb-6">
                  <label className="block text-gray-700 text-base mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7] pr-10"
                      placeholder="Confirm password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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

                <button
                  type="button"
                  onClick={handleSavePassword}
                  disabled={loading}
                  className="w-full bg-[#b80000] hover:bg-[#a41c1c] disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
                >
                  {loading ? "Saving..." : "Save Password"}
                </button>

                {error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-pulse">
                    ✓ Password changed successfully! Redirecting...
                  </div>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
