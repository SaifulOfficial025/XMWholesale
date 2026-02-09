import React, { useState, useEffect } from "react";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { FaArrowRight, FaTrash } from "react-icons/fa6";
import { useCart } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../../Redux/Product/ConfirmOrder";
import { useTranslation } from "react-i18next";

function ConfirmOrder() {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const access_token = localStorage.getItem("access_token");
    setIsLoggedIn(!!access_token);
  }, []);

  const handleConfirmOrder = async () => {
    try {
      setError("");
      setLoading(true);

      // Prepare order payload
      const orderPayload = {
        total_amount: getCartTotal().toString(),
        items: cartItems.map((item) => {
          const unitsPerBox = item.units_per_box || 1;
          const unitsCount = item.quantity * unitsPerBox; // convert boxes -> units
          return {
            product: item.id,
            quantity: unitsCount,
            unit_price: item.price,
            total_price: (parseFloat(item.price) * unitsCount).toString(),
          };
        }),
      };

      console.log("Placing order:", orderPayload);

      // Call the order API
      const response = await placeOrder(orderPayload);
      console.log("Order placed successfully:", response);

      // Show success message
      setSuccessMessage(
        t("checkout.order_success", { orderId: response.uuid }).replace(
          "{orderId}",
          response.uuid,
        ),
      );

      // Clear cart and redirect after 3 seconds
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error("Error placing order:", err);
      setError(err.message || t("checkout.order_failed"));
    } finally {
      setLoading(false);
    }
  };

  // Show success message even if cart becomes empty
  if (successMessage) {
    return (
      <section>
        <div className="bg-black py-8">
          <Header />
        </div>
        <div className="bg-white min-h-screen py-8 px-2 md:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="p-6 bg-green-100 border-4 border-green-400 text-green-700 rounded-xl text-lg font-semibold mb-6 animate-pulse">
              ✓ {successMessage}
            </div>
            <p className="text-gray-600 mb-4">{t("checkout.redirecting")}</p>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section>
        <div className="bg-black py-8">
          <Header />
        </div>
        <div className="bg-white min-h-screen py-8 px-2 md:px-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{t("checkout.cart_empty")}</p>
            <Link to="/products">
              <button className="bg-[#c0121a] text-white font-semibold px-6 py-2 rounded shadow hover:bg-[#a70c17] transition">
                {t("checkout.continue_shopping")}
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>

      <div className="bg-white min-h-screen py-8 px-2 md:px-8 pb-32">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto w-full mb-2">
          <nav className="text-xs text-gray-500 gap-1 flex flex-wrap items-center">
            <span>{t("checkout.breadcrumb_product")}</span>
            <FaArrowRight className=" justify-center" />
            <span>{t("checkout.breadcrumb_details")}</span>
            <FaArrowRight className=" justify-center" />
            <span>{t("checkout.breadcrumb_confirmation")}</span>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border relative"
              >
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-3 right-3 md:top-auto md:bottom-3 md:right-3 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition"
                  title="Remove"
                >
                  <FaTrash size={18} />
                </button>
                <img
                  src={item.primary_image || "/categorydummyimg.png"}
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg mb-4 md:mb-0"
                  draggable="false"
                />
                <div className="flex-1 flex flex-col gap-2 w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                    <h2 className="text-base md:text-xl font-semibold mb-1 md:mb-0">
                      {item.name}
                    </h2>
                    <div className="text-xl md:text-2xl font-bold text-gray-900">
                      $
                      {(
                        parseFloat(item.price) *
                        item.quantity *
                        (item.units_per_box || 1)
                      ).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span>
                      {t("checkout.sku_label")} {item.sku || "N/A"}
                    </span>{" "}
                    |
                    <span className="ml-2">
                      {t("checkout.price_label")} $
                      {parseFloat(item.price).toFixed(2)}
                      {t("checkout.per_box")}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-semibold text-sm">
                      {t("checkout.quantity_label")}
                    </span>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-700">
                      {t("checkout.boxes")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Address & Summary */}
          <div>
            <div className="bg-white rounded-xl shadow p-6 border flex flex-col gap-4 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("checkout.order_summary")}
              </h3>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {t("checkout.subtotal")}
                    </span>
                    <span className="font-semibold">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{t("checkout.items")}</span>
                    <span className="font-semibold">{cartItems.length}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">
                      {t("checkout.total")}
                    </span>
                    <span className="font-bold text-xl text-[#c0121a]">
                      ${getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {t("checkout.delivery_notice")}
              </div>
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm mb-2">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm mb-2 animate-pulse">
                  ✓ {successMessage}
                </div>
              )}
              {!isLoggedIn && (
                <div className="p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm mb-2">
                  {t("checkout.login_message").split("{login}")[0]}
                  <Link to="/signin" className="font-semibold underline">
                    {t("checkout.login_link")}
                  </Link>
                  {t("checkout.login_message").split("{login}")[1]}
                </div>
              )}
              <button
                onClick={handleConfirmOrder}
                disabled={loading || !isLoggedIn}
                className="bg-[#c0121a] text-white font-semibold px-6 py-3 rounded shadow hover:bg-[#a70c17] transition mt-2 w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? t("checkout.processing")
                  : !isLoggedIn
                    ? t("checkout.login_to_order")
                    : t("checkout.confirm_order")}
              </button>
              <Link to="/products" className="text-center">
                <button className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded shadow hover:bg-gray-300 transition w-full">
                  {t("checkout.continue_shopping")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-0">
        <Footer />
      </div>
    </section>
  );
}

export default ConfirmOrder;
