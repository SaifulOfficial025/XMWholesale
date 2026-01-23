import { BASE_URL } from "../Config";

// Fetch all brands
export const fetchBrands = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/api/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
