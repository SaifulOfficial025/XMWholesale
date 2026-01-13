import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ForgetPassword({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp) {
      setStep(3);
    }
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (password && confirmPassword && password === confirmPassword) {
      // Reset and close
      setStep(1);
      setEmail("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      onClose && onClose();
      window.location.reload();
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
              <button
                type="button"
                onClick={handleSendOTP}
                className="w-full bg-[#b80000] hover:bg-[#a41c1c] text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
              >
                Send OTP
              </button>
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
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    className="w-full bg-[#b80000] hover:bg-[#a41c1c] text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
                  >
                    Verify
                  </button>
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
                  className="w-full bg-[#b80000] hover:bg-[#a41c1c] text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
                >
                  Save Password
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
