import { BASE_URL } from "../Config";

// Fetch product details by ID
export const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/api/product/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product details: ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
