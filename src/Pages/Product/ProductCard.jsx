import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProductCard({ product, onProductClick }) {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return null;
  }

  const handleImageClick = () => {
    navigate(`/product/details/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();

    console.log("Adding to cart:", product);

    if (!product.id) {
      console.error("Product ID is missing:", product);
      return;
    }

    // Add product with quantity 1 by default
    addToCart(product, 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const displayedDescription =
    i18n && i18n.language === "fr" && product.french_description
      ? product.french_description
      : product.description || "N/A";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full h-[360px] flex flex-col">
      {/* Uniform image container */}
      <div
        className="w-full flex items-center justify-center bg-white cursor-pointer"
        style={{ height: 180, minHeight: 180, maxHeight: 180 }}
        onClick={handleImageClick}
      >
        <img
          src={product.primary_image || "/categorydummyimg.png"}
          alt={product.sku || "Product"}
          className="object-contain w-full h-full max-h-[180px] max-w-[220px] hover:opacity-80 transition-opacity"
          draggable="false"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p
          className="text-md mb-2 text-gray-900"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {displayedDescription}
        </p>
        <p>
          {/* <span className="font-semibold text-gray-400">SKU:</span>{" "} */}
          <span className="text-black font-semibold">
            {product.sku || "N/A"}
          </span>
        </p>
        {/* <div className="mb-4 text-base">
          <span className="font-semibold text-gray-400">Size:</span>
          <span className="ml-2 text-black font-semibold inline-block max-w-[8rem] align-middle truncate">
            {product.size || "Go to details"}
          </span>
        </div> */}
        <div className="mt-auto pt-4 pb-4">
          <Link to={`/product/details/${product.id}`} className="block">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded border-2 py-2 text-base transition shadow-sm">
              {t("product_list.add_to_cart")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
