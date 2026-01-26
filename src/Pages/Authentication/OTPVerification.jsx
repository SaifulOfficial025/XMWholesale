import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Thankyousignup from "./Thankyousignup";
import { verifyOTP } from "../../Redux/Auth/Signup";

function OTPVerification({ email, onClose }) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(21);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length < 4) {
      setError(t("auth.enter_valid_otp"));
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOTP(email, otp);

      // Save tokens and user info to localStorage
      if (response.access) {
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        localStorage.setItem(
          "user_info",
          JSON.stringify(response.login_user_info),
        );

        // Show thank you page
        setShowThankYou(true);

        // Navigate to home after a delay
        setTimeout(() => {
          navigate("/");
          onClose && onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.message || t("auth.otp_verification_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-[#e5e7eb] relative">
      {/* Close Button */}
      {/* {onClose && (
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold transition-colors duration-200 z-10"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
      )} */}
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)" }}
      >
        <h2 className="text-2xl font-semibold text-center mb-2">
          {t("auth.otp_verification_title")}
        </h2>
        <p className="text-center text-base text-gray-700 mb-6">
          {t("auth.otp_sent_to")}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-xl bg-[#f7f7f7] mb-6 text-center tracking-widest"
            maxLength={6}
            style={{ letterSpacing: "0.2em" }}
            required
            placeholder="000000"
          />
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b80000] hover:bg-[#a41c1c] disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
          >
            {loading ? t("auth.verifying") : t("auth.verify_button")}
          </button>
        </form>
        <div className="text-center mt-2 text-base">
          <span className="text-gray-700">{t("auth.not_received_otp")} </span>
          <span className="text-gray-700">{t("auth.resend_otp_text")} </span>
          <span className="text-[#b80000] font-semibold">
            {timer > 0 ? `00:${timer.toString().padStart(2, "0")}` : "00:00"}
          </span>
        </div>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-full max-w-md mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
              onClick={() => setShowThankYou(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <div className="bg-white rounded-2xl shadow-xl overflow-y-auto">
              <Thankyousignup
                onClose={() => {
                  setShowThankYou(false);
                  onClose && onClose();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OTPVerification;
