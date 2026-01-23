import { BASE_URL } from "../Config";

export const placeOrder = async (orderData) => {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    throw new Error("Access token not found. Please login first.");
  }

  try {
    const response = await fetch(`${BASE_URL}/products/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Order failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to place order");
  }
};
