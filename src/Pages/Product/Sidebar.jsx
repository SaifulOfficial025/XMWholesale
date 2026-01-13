import React from "react";

const brands = [
  "Cocomelon",
  "Chupa Chups",
  "Hot Wheels",
  "Superman",
  "Batman",
  "Barbie",
];

function Sidebar() {
  return (
    <aside className="bg-[#f5f5f6] rounded-xl p-6 w-full max-w-xs mx-auto">
      <h2 className="font-bold text-lg mb-3 text-gray-900">Brands</h2>
      <hr className="border-t border-gray-200 mb-5" />
      <ul className="flex flex-col gap-3">
        {brands.map((brand, idx) => (
          <li key={brand}>
            {idx === 0 ? (
              <button
                className="w-full rounded-full border-2 border-[#c0121a] text-[#c0121a] font-medium py-2 px-6  text-base"
                style={{ fontWeight: 500 }}
              >
                {brand}
              </button>
            ) : (
              <button
                className="w-full text-gray-700 font-medium py-2 px-6 bg-transparent text-base text-left"
                style={{ fontWeight: 500 }}
              >
                {brand}
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
