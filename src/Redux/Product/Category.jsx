import { BASE_URL } from "../Config";

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
