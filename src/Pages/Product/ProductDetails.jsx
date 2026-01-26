import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../Redux/Product/ProductDetails";
import { useCart } from "../../Context/CartContext";
import { useTranslation } from "react-i18next";

function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadProductDetails();
  }, [id]);

  const loadProductDetails = async () => {
    try {
      setLoading(true);
      // Use id from URL params, default to 1 if not provided
      const productId = id || 1;
      const data = await fetchProductDetails(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message || "Failed to load product details");
      console.error("Error loading product details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section>
        <div className="bg-black py-8">
          <Header />
        </div>
        <div className="bg-white min-h-screen py-8 px-2 md:px-8 flex items-center justify-center">
          <p className="text-gray-600">{t("product_details.loading")}</p>
        </div>
        <Footer />
      </section>
    );
  }

  if (error || !product) {
    return (
      <section>
        <div className="bg-black py-8">
          <Header />
        </div>
        <div className="bg-white min-h-screen py-8 px-2 md:px-8 flex items-center justify-center">
          <p className="text-red-600">
            {error || t("product_details.not_found")}
          </p>
        </div>
        <Footer />
      </section>
    );
  }

  // Create images array: primary_image first, then additional images
  const images = [
    product.primary_image,
    ...(product.images && Array.isArray(product.images) ? product.images : []),
  ];

  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>
      <div className="bg-white min-h-screen py-8 px-2 md:px-8">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto w-full  flex items-center justify-between mb-2">
          <nav className="text-xs text-gray-500  gap-1 flex items-center justify-center">
            <span>{t("product_details.breadcrumb_product")}</span>
            <FaArrowRight className=" justify-center" />
            <span>{t("product_details.breadcrumb_details")}</span>
          </nav>
          <hr className="my-4" />
        </div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Image Gallery */}
          <div>
            <div className="rounded-xl overflow-hidden bg-gray-100 mb-4 aspect-[4/3] w-full">
              <img
                src={images[selectedImg]}
                alt={product.name}
                className="object-cover w-full h-full"
                draggable="false"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`rounded-lg overflow-hidden border-2 aspect-square w-20 h-20 ${
                      selectedImg === idx
                        ? "border-[#c0121a]"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="object-cover w-full h-full"
                      draggable="false"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold mt-2 mb-2">{product.name}</h1>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              ${product.price}
            </div>
            <p className="text-gray-600 text-sm mb-2">
              {product.description || t("product_details.no_description")}
            </p>
            <div className=" gap-8 mb-2">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">
                  {t("product_details.box_label")}
                </span>{" "}
                <span className="text-black font-semibold">
                  {product.box_per_item} {t("product_details.item")}
                </span>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">
                  {t("product_details.sku_label")}
                </span>{" "}
                <span className="text-black font-semibold">{product.sku}</span>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">
                  {t("product_details.quantity_label")}
                </span>{" "}
                <span className="text-black font-semibold">
                  {product.quantity}
                </span>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">
                  {t("product_details.category_label")}
                </span>{" "}
                <span className="text-black font-semibold">
                  {product.category}
                </span>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">
                  {t("product_details.brand_label")}
                </span>{" "}
                <span className="text-black font-semibold">
                  {product.brand}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-base font-medium">
                {t("product_details.quantity_select")}
              </span>
              <div className="flex items-center border rounded">
                <button
                  className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1 text-lg">{quantity}</span>
                <button
                  className="px-3 py-1 text-lg text-gray-700 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <span className="ml-2 text-base font-medium">
                {t("product_details.boxes")}
              </span>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  setShowSuccess(true);
                  setTimeout(() => setShowSuccess(false), 2000);
                }}
                className="bg-black text-white font-semibold px-7 py-3 shadow hover:bg-gray-800 transition"
              >
                {t("product_details.add_to_cart")}
              </button>
              <Link to="/checkout" className="ml-3">
                <button className="bg-[#c0121a] text-white font-semibold px-7 py-3  shadow hover:bg-[#a70c17] transition">
                  {t("product_details.go_to_cart")}
                </button>
              </Link>
            </div>
            {showSuccess && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-pulse text-center">
                ✓{" "}
                {t("product_details.added_to_cart", {
                  count: quantity,
                }).replace("{count}", quantity)}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="-mt-44">
        <Footer />
      </div>
    </section>
  );
}

export default ProductDetails;
