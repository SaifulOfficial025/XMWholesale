import { BASE_URL } from "../Config";

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();

    try {
      if (data.tokens) {
        localStorage.setItem("tokens", JSON.stringify(data.tokens));
        if (data.tokens.access) {
          localStorage.setItem("accessToken", data.tokens.access);
        }
        if (data.tokens.refresh) {
          localStorage.setItem("refreshToken", data.tokens.refresh);
        }
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (storageErr) {
      console.warn("Failed to save login data to localStorage:", storageErr);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
