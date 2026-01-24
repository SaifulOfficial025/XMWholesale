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

// Fetch all products with optional filters
export const fetchAllProducts = async (params = {}) => {
  try {
    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.brand) queryParams.append("brand", params.brand);
    if (params.category) queryParams.append("category", params.category);
    if (params.search) queryParams.append("search", params.search);
    if (params.ordering) queryParams.append("ordering", params.ordering);
    if (params.page) queryParams.append("page", params.page);
    if (params.page_size) queryParams.append("page_size", params.page_size);

    const queryString = queryParams.toString();
    const url = `${BASE_URL}/products/api/products/${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching products with URL:", url);

    const response = await fetch(url, {
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
