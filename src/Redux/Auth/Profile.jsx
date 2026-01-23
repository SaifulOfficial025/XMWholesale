import { BASE_URL } from "../Config";

// Fetch User Profile API
export const fetchUserProfile = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch(`${BASE_URL}/accounts/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Update User Profile API
export const updateUserProfile = async (profileData) => {
  try {
    const accessToken = localStorage.getItem("access_token");

    const formData = new FormData();
    formData.append("first_name", profileData.first_name);
    formData.append("last_name", profileData.last_name);
    formData.append("phone_number", profileData.phone_number || "");
    formData.append("company_name", profileData.company_name || "");

    // Only add image if it's a file
    if (profileData.image && profileData.image instanceof File) {
      formData.append("image", profileData.image);
    }

    const response = await fetch(`${BASE_URL}/accounts/api/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
