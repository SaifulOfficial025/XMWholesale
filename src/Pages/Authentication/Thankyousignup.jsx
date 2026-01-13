import React from "react";
import { Link } from "react-router-dom";

function Thankyousignup({ onClose }) {
  return (
    <div className=" flex items-center justify-center bg-[#e5e7eb]">
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)" }}
      >
        {/* Close Button */}
        {/* {onClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold transition-colors duration-200"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            &times;
          </button>
        )} */}

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Thank You For Signing Up!
        </h2>

        {/* Yellow Alert Box */}
        <div className="bg-yellow-100 rounded-xl p-6 mb-8 border border-yellow-200">
          <p className="text-gray-800 text-center text-base leading-relaxed">
            Your account is currently under review and requires admin approval.
            Once your account is verified, you will receive an email
            notification. You will be able to log in after approval.
          </p>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-red-600 hover:text-red-700 font-semibold text-lg inline-flex items-center gap-2 transition-colors duration-200"
            onClick={() => window.location.reload()}
          >
            Back to home
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Thankyousignup;
