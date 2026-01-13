import React, { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { IoMdArrowRoundForward } from "react-icons/io";

const slides = ["/sliderdummyimg.png"];

function Slider() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-16">
      <div className="relative rounded-md shadow-sm">
        <div
          className="w-full h-56 md:h-72 lg:h-80 bg-center bg-cover"
          style={{ backgroundImage: `url(${slides[index]})` }}
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white/90 text-gray-700 rounded-full flex items-center justify-center shadow"
        >
          <IoMdArrowRoundForward className="text-red-600 h-8 w-8 rotate-180" />
        </button>

        {/* Right arrow (red) */}
        <button
          onClick={next}
          aria-label="next"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-white text-red-600 rounded-full flex items-center justify-center shadow  "
          style={{ backgroundColor: "#fff" }}
        >
          <IoMdArrowRoundForward className="text-red-600 h-8 w-8" />
        </button>

        {/* Dots */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === index ? "bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
