import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../Redux/Product/Category";
import { useTranslation } from "react-i18next";

function Category() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories();
      // Filter out categories without images
      const categoriesWithImages = data.filter((cat) => cat.image);
      setCategories(categoriesWithImages);
    } catch (err) {
      setError(err.message || "Failed to load categories");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-wide">
        {t("hero_and_banners.discover_category")}
      </h2>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="max-h-52 md:max-h-72 bg-white rounded-md overflow-hidden flex flex-col shadow-sm md:hover:scale-110 transition-transform duration-300"
            >
              <div className="flex-1 min-h-0 aspect-square w-full bg-gray-100 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.display_name || cat.name}
                  className="object-cover w-full h-full"
                  draggable="false"
                />
              </div>
              <div className="p-4 border-t text-center bg-white flex-shrink-0">
                <span className="font-medium text-gray-800 text-sm sm:text-base md:text-lg">
                  {i18n.language === "fr" && cat.french_display_name
                    ? cat.french_display_name
                    : cat.display_name || cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
