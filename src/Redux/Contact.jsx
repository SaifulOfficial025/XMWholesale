import { BASE_URL } from "./Config";

export const submitContactForm = async (contactData) => {
  try {
    const payload = {
      full_name: contactData.name,
      email: contactData.email,
      whatsapp_number: contactData.whatsapp,
      description: contactData.text,
      created_at: new Date().toISOString(),
    };

    const response = await fetch(`${BASE_URL}/accounts/api/contact`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Contact form failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to submit contact form");
  }
};
