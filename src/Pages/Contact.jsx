import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import { submitContactForm } from "../Redux/Contact";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = React.useState({
    name: "",
    whatsapp: "",
    email: "",
    text: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t("contact.error_name");
    if (!form.email.trim()) newErrors.email = t("contact.error_email_required");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = t("contact.error_email_invalid");
    if (!form.text.trim()) newErrors.text = t("contact.error_message");
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        console.log("Submitting contact form:", form);

        const response = await submitContactForm(form);
        console.log("Contact form submitted successfully:", response);

        // Show success message
        setSuccessMessage(t("contact.success_message"));

        // Clear form
        setForm({ name: "", whatsapp: "", email: "", text: "" });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Error submitting contact form:", error);
        setErrors({
          submit: error.message || "Failed to send message. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>
      <div className="bg-white min-h-screen py-10 px-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Left: Contact Info */}
            <div>
              <h1 className="text-3xl font-bold text-[#c0121a] mb-3">
                {t("contact.page_title")}
              </h1>
              <p className="text-gray-700 mb-5 text-sm max-w-md">
                {t("contact.page_desc")}
              </p>
              <div className="mb-3 flex items-start gap-2">
                <span className="font-semibold">
                  {t("contact.address_label")}
                </span>
                <span className="text-gray-700 text-sm">
                  {t("contact.address_text")
                    .split("\n")
                    .map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                </span>
              </div>
              <div className="mb-3 flex items-center gap-2">
                <span className="font-semibold">
                  {t("contact.phone_label")}
                </span>
                <span className="text-gray-700 text-sm">
                  {t("contact.phone_number")}
                </span>
              </div>
              <div className="mb-3 flex items-center gap-2">
                <span className="font-semibold">
                  {t("contact.email_label")}
                </span>
                <span className="text-gray-700 text-sm">
                  {t("contact.email_address")}
                </span>
              </div>
              <div className="mt-6 mb-2 font-semibold">
                {t("contact.follow_us")}
              </div>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="text-[#1877f3] hover:opacity-80">
                  <FaFacebook />
                </a>
                <a href="#" className="text-[#e4405f] hover:opacity-80">
                  <FaInstagram />
                </a>
                <a href="#" className="text-[#1da1f2] hover:opacity-80">
                  <FaTwitter />
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-pulse">
                  ✓ {successMessage}
                </div>
              )}
              {errors.submit && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  ✗ {errors.submit}
                </div>
              )}
              <form
                className="bg-white rounded-xl border p-6 flex flex-col gap-4 shadow-sm"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">
                      {t("contact.form_full_name")}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className={`w-full border rounded px-3 py-2 text-sm ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder={t("contact.form_placeholder_name")}
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && (
                      <div className="text-xs text-red-500 mt-1">
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold mb-1">
                      {t("contact.form_whatsapp")}
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      className="w-full border rounded px-3 py-2 text-sm"
                      placeholder={t("contact.form_placeholder_whatsapp")}
                      value={form.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {t("contact.form_email")}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`w-full border rounded px-3 py-2 text-sm ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder={t("contact.form_placeholder_email")}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-xs text-red-500 mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {t("contact.form_message")}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="text"
                    className={`w-full border rounded px-3 py-2 text-sm min-h-[70px] ${
                      errors.text ? "border-red-500" : ""
                    }`}
                    placeholder={t("contact.form_placeholder_message")}
                    value={form.text}
                    onChange={handleChange}
                    required
                  />
                  {errors.text && (
                    <div className="text-xs text-red-500 mt-1">
                      {errors.text}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#c0121a] text-white font-semibold px-6 py-2 rounded shadow hover:bg-[#a70c17] transition w-fit mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? t("contact.form_sending")
                    : t("contact.form_submit")}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="w-full rounded-xl overflow-hidden border mt-8">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.003019023872!2d-99.1749720240846!3d19.44824604067559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8c7e2e2e2e3%3A0x7e7e7e7e7e7e7e7e!2sChapultepec%20Park!5e0!3m2!1sen!2smx!4v1670000000000!5m2!1sen!2smx"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Contact;
