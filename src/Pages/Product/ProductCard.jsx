import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ProductCard({ product, onProductClick }) {
  const { t } = useTranslation();
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full h-[460px] flex flex-col">
      <div
        className="aspect-[4/3] w-full bg-gray-100 cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={product.img || "/categorydummyimg.png"}
          alt={product.title || "Product"}
          className="object-cover w-full h-full hover:opacity-80 transition-opacity"
          draggable="false"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 text-gray-900 truncate">
          {product.title || "Product Name"}
        </h3>
        <div className="mb-1 text-base">
          <span className="font-semibold text-gray-400">Code:</span>
          <span className="ml-2 text-black font-semibold inline-block max-w-[12rem] align-middle truncate">
            {product.code || "N/A"}
          </span>
        </div>
        <div className="mb-4 text-base">
          <span className="font-semibold text-gray-400">Quantity:</span>
          <span className="ml-2 text-black font-semibold inline-block max-w-[8rem] align-middle truncate">
            {product.quantity || "N/A"}
          </span>
        </div>
        {/* {showSuccess && (
          <div className="mb-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-xs text-center animate-pulse">
            ✓ Added to cart
          </div>
        )} */}
        <Link to={`/product/details/${product.id}`}>
          <button className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white font-semibold rounded border-2 py-2 text-base transition shadow-sm">
            {t("product_list.add_to_cart")}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
