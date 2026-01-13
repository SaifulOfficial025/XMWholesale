import React from "react";

function Profile() {
  // Dummy handler for demonstration
  const handleUpdate = (e) => {
    e.preventDefault();
    // Implement update logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5e7eb]">
      <div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
            {/* Replace with your logo image if available */}
            <img
              src="/logo192.png"
              alt="XM Wholesale"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <form onSubmit={handleUpdate}>
          {/* First Name & Last Name */}
          <div className="flex gap-3 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-base mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
                placeholder="XXXXXX"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-base mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
                placeholder="XXXXXX"
                required
              />
            </div>
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 text-base mb-1">Phone</label>
            <div className="flex items-center bg-[#f7f7f7] rounded-lg border border-gray-300 px-2 py-1 focus-within:ring-2 focus-within:ring-[#a41c1c]">
              <span className="flex items-center px-2">
                <img
                  src="https://flagcdn.com/us.svg"
                  alt="US"
                  className="w-6 h-6 rounded-full"
                />
              </span>
              <input
                type="tel"
                className="flex-1 px-2 py-2 bg-transparent outline-none border-none text-base"
                placeholder="+XXXXXXXXXXXX"
                required
                style={{ minWidth: 0 }}
              />
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-base mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
              placeholder="XXXXXX"
              required
            />
          </div>
          {/* Company Name */}
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-1">
              Company Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
              placeholder="XXXXXX"
              required
            />
          </div>
          {/* Update Profile Button */}
          <button
            type="submit"
            className="w-full bg-[#b80000] hover:bg-[#a41c1c] text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
