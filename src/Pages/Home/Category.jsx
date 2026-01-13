import React from "react";

const categories = [
  {
    title: "Monica Diara Party Dress",
    img: "/categorydummyimg.png",
  },
  {
    title: "Monica Diara Party Dress",
    img: "/categorydummyimg.png",
  },
  {
    title: "Monica Diara Party Dress",
    img: "/categorydummyimg.png",
  },
  {
    title: "Monica Diara Party Dress",
    img: "/categorydummyimg.png",
  },
  {
    title: "Monica Diara Party Dress",
    img: "/categorydummyimg.png",
  },
  {
    title: "Monica Diara Party Dress",
    img: "/categorydummyimg.png",
  },
];

function Category() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-wide">
        DISCOVER OUR PRODUCT CATEGORY
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="max-h-72 bg-white rounded-md overflow-hidden flex flex-col shadow-sm hover:scale-110 transition-transform duration-300"
          >
            <div className="flex-1 min-h-0 aspect-square w-full bg-gray-100 flex items-center justify-center">
              <img
                src={cat.img}
                alt={cat.title}
                className="object-cover w-full h-full"
                draggable="false"
              />
            </div>
            <div className="p-4 border-t text-center bg-white flex-shrink-0">
              <span className="font-medium text-gray-800 text-base md:text-lg">
                {cat.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
