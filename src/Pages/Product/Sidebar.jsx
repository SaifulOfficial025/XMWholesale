import React, { useState, useEffect } from "react";
import { fetchBrands } from "../../Redux/Product/AllProducts";

function Sidebar({ selectedBrand, onBrandSelect }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await fetchBrands();
      setBrands(data);
    } catch (err) {
      setError(err.message || "Failed to load brands");
      console.error("Error loading brands:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside
      className="bg-[#f5f5f6] rounded-xl p-6 w-full max-w-xs mx-auto"
      style={{ minWidth: "250px" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-900">Brands</h2>
        {/* Toggle button for mobile */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden inline-flex items-center justify-center w-6 h-6 text-gray-900 hover:text-[#c0121a] transition-colors"
          aria-label="Toggle brands"
        >
          <span className="text-2xl">{isExpanded ? "−" : "+"}</span>
        </button>
      </div>
      <hr className="border-t border-gray-200 my-3" />

      {/* Brands list - hidden on mobile by default, visible on desktop */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96" : "max-h-0 md:max-h-none"
        } md:max-h-none`}
      >
        {loading ? (
          <p className="text-gray-600 text-sm">Loading brands...</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : brands.length === 0 ? (
          <p className="text-gray-600 text-sm">No brands found</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {brands.map((brand) => (
              <li key={brand.id}>
                <button
                  onClick={() => {
                    onBrandSelect(brand.name);
                    setIsExpanded(false);
                  }}
                  className={`w-full rounded-full border-2 py-2 px-6 text-base transition-colors duration-200 text-center ${
                    selectedBrand === brand.name
                      ? "border-[#c0121a] text-[#c0121a] bg-white font-semibold"
                      : "text-gray-700 bg-white border-gray-300 hover:border-gray-400 font-semibold"
                  }`}
                >
                  {brand.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
