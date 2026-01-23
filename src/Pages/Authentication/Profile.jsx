import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../../Redux/Auth/Profile";

function Profile({ onClose }) {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    company_name: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const data = await fetchUserProfile();
      setProfileData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
        company_name: data.company_name || "",
        image: null,
      });
      if (data.image) {
        setImagePreview(data.image);
      }
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        image: file,
      }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      setUpdating(true);
      const updateData = {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        phone_number: profileData.phone_number,
        company_name: profileData.company_name,
        image: profileData.image,
      };
      await updateUserProfile(updateData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="rounded-2xl shadow-xl p-8 w-full max-w-md">
          <p className="text-center text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center ">
      <div
        className=" rounded-2xl shadow-xl p-8 w-full max-w-md"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)" }}
      >
        {/* Logo / Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 rounded-full bg-black flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/xmlogo.png"
                alt="XM Wholesale"
                className="w-20 h-20 object-contain"
              />
            )}
          </div>
          {/* <label className="absolute bottom-0 right-0 mt-2 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold hover:bg-red-700">
              +
            </div>
          </label> */}
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
                name="first_name"
                value={profileData.first_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
                placeholder="First Name"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-base mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={profileData.last_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label className="block text-gray-700 text-base mb-1">Phone</label>
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
                name="phone_number"
                value={profileData.phone_number}
                onChange={handleInputChange}
                className="flex-1 px-2 py-2 bg-transparent outline-none border-none text-base"
                placeholder="Enter your phone number"
                style={{ minWidth: 0 }}
              />
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-base mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
              placeholder="email@example.com"
              disabled
              title="Email cannot be changed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed
            </p>
          </div>
          {/* Company Name */}
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={profileData.company_name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a41c1c] text-base bg-[#f7f7f7]"
              placeholder="Company Name"
            />
          </div>
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Success Toast */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-pulse">
              ✓ Profile updated successfully!
            </div>
          )}
          {/* Update Profile Button */}
          <button
            type="submit"
            disabled={updating}
            className="w-full bg-[#b80000] hover:bg-[#a41c1c] disabled:bg-gray-400 text-white text-lg font-semibold rounded-lg py-3 mb-3 transition-colors duration-200"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
