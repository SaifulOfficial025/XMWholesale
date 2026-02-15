import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { fetchAllProducts } from "../../Redux/Product/AllProducts";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || null,
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 12;

  // Load products when any filter changes
  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedBrand, currentPage]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      // Build params for API
      const params = {
        page: currentPage,
        page_size: itemsPerPage,
      };

      if (searchTerm) params.search = searchTerm;
      if (selectedBrand) params.brand = selectedBrand;

      const data = await fetchAllProducts(params);
      setAllProducts(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err) {
      setError(err.message || "Failed to load products");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
    setCurrentPage(1);
    const params = {};
    if (newSearch) params.search = newSearch;
    if (selectedBrand) params.brand = selectedBrand;
    params.page = "1";
    setSearchParams(params);
  };

  // Handle brand selection change
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (brand) params.brand = brand;
    params.page = "1";
    setSearchParams(params);
  };

  // Pagination
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    <section>
      <div className="bg-black py-8">
        <Header />
      </div>

      <div className="bg-white min-h-screen py-8 px-2 md:px-8 ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-[250px] md:min-w-[250px] md:flex-shrink-0">
            <Sidebar
              selectedBrand={selectedBrand}
              onBrandSelect={handleBrandSelect}
            />
          </div>
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="flex-1 flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder={t("product_list.search_placeholder")}
                value={searchTerm}
                onChange={handleSearchChange}
                className="max-w-5xl w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c0121a] bg-white text-gray-700"
              />
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
              </div>
            ) : allProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found</p>
              </div>
            ) : (
              <>
                {/* Results Counter */}
                <div className="mb-4 text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, totalCount)} of{" "}
                  {totalCount} products
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7">
                  {allProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        sku: product.sku,
                        description: product.description,
                        french_description: product.french_description,
                        size: product.size,
                        primary_image: product.primary_image,
                        is_favorite: product.is_favorite,
                      }}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 overflow-x-auto md:overflow-x-visible">
                    <div className="flex justify-start md:justify-end items-center gap-2 min-w-max md:min-w-0">
                      <button
                        onClick={() => {
                          const newPage = Math.max(1, currentPage - 1);
                          setCurrentPage(newPage);
                          const params = {};
                          if (searchTerm) params.search = searchTerm;
                          if (selectedBrand) params.brand = selectedBrand;
                          params.page = String(newPage);
                          setSearchParams(params);
                        }}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded border border-gray-300 bg-red-100 text-gray-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        &lt;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (num) => (
                          <button
                            key={num}
                            onClick={() => {
                              setCurrentPage(num);
                              const params = {};
                              if (searchTerm) params.search = searchTerm;
                              if (selectedBrand) params.brand = selectedBrand;
                              params.page = String(num);
                              setSearchParams(params);
                            }}
                            className={`px-3 py-2 rounded border text-sm font-semibold ${
                              num === currentPage
                                ? "bg-[#c0121a] text-white border-[#c0121a]"
                                : "bg-red-100 text-gray-700 border-gray-300"
                            }`}
                          >
                            {String(num).padStart(2, "0")}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() => {
                          const newPage = Math.min(totalPages, currentPage + 1);
                          setCurrentPage(newPage);
                          const params = {};
                          if (searchTerm) params.search = searchTerm;
                          if (selectedBrand) params.brand = selectedBrand;
                          params.page = String(newPage);
                          setSearchParams(params);
                        }}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded border border-gray-300 bg-red-100 text-gray-500 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Home;
