import { BASE_URL } from "../Config";

// Send OTP to email for forget password
export const sendForgetPasswordOTP = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/api/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send OTP: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Verify OTP for forget password
export const verifyForgetPasswordOTP = async (email, otp) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/api/verify-otp`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });

    if (!response.ok) {
      throw new Error(`OTP verification failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Change password
export const changePassword = async (newPassword) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await fetch(`${BASE_URL}/accounts/api/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`Password change failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Resend OTP
export const resendOTP = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/accounts/api/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to resend OTP: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
