import { BASE_URL } from "./Config";

// Fetch order history
export const fetchOrderHistory = async () => {
  try {
    // Get access token from localStorage
    const accessToken =
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("access");

    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if token exists
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/products/api/order`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order history: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
