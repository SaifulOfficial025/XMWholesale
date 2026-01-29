import React, { useState, useEffect } from "react";
import { fetchOrderHistory } from "../Redux/OrderHistory";
import { useTranslation } from "react-i18next";

function OrderHistory({ onClose }) {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    loadOrderHistory();
  }, []);

  const loadOrderHistory = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchOrderHistory();
      setOrders(data || []);
    } catch (err) {
      setError(err.message || "Failed to load order history");
      console.error("Error loading order history:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("order_history.title")}</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-red-400 text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t("order_history.loading")}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadOrderHistory}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {t("order_history.try_again")}
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">{t("order_history.no_orders")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.uuid}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {/* Order Header */}
                <div
                  className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.uuid ? null : order.uuid,
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            {t("order_history.order_id")}
                          </p>
                          <p className="font-semibold text-gray-900">
                            {order.uuid}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {t("order_history.date")}
                          </p>
                          <p className="font-medium text-gray-700">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {t("order_history.total_amount")}
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        ${parseFloat(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                    <div className="ml-4">
                      <svg
                        className={`w-6 h-6 text-gray-600 transition-transform ${
                          expandedOrder === order.uuid ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Order Items (Expanded) */}
                {expandedOrder === order.uuid && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {t("order_history.order_items")} ({order.items.length})
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          {/* Product Image */}
                          <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            {item.product_image ? (
                              <img
                                src={item.product_image}
                                alt={item.product_sku}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg
                                  className="w-8 h-8"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">
                              {t("product_details.sku_label")}{" "}
                              {item.product_sku}
                            </p>
                            <p className="text-sm text-gray-600">
                              {t("order_history.quantity")}: {item.quantity}{" "}
                              {t("order_history.boxes")}
                            </p>
                          </div>

                          {/* Pricing */}
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              ${parseFloat(item.unit_price).toFixed(2)}{" "}
                              {t("order_history.per_box")}
                            </p>
                            <p className="font-bold text-gray-900">
                              ${parseFloat(item.total_price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
