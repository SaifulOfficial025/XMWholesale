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
    return data;
  } catch (error) {
    throw error;
  }
};
