import React, { useState, useEffect } from "react";
import { fetchBrands } from "../../Redux/Product/AllProducts";

function Sidebar({ selectedBrand, onBrandSelect }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <aside className="bg-[#f5f5f6] rounded-xl p-6 w-full max-w-xs mx-auto">
      <h2 className="font-bold text-lg mb-3 text-gray-900">Brands</h2>
      <hr className="border-t border-gray-200 mb-5" />

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
                onClick={() => onBrandSelect(brand.name)}
                className={`w-full rounded-full border-2 font-medium py-2 px-6 text-base transition-colors duration-200 ${
                  selectedBrand === brand.name
                    ? "border-[#c0121a] text-[#c0121a] bg-white"
                    : "text-gray-700 bg-transparent border-gray-300 hover:border-gray-400"
                }`}
                style={{ fontWeight: 500 }}
              >
                {brand.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Sidebar;
