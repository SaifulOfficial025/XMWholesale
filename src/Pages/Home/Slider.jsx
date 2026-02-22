import React, { useState, useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { IoMdArrowRoundForward } from "react-icons/io";
import slider1 from "../../../public/slider1.JPG";
import slider2 from "../../../public/slider2.JPG";
import slider3 from "../../../public/slider3.JPG";
import slider4 from "../../../public/slider4.JPG";
import slider5 from "../../../public/slider5.JPG";
import slider6 from "../../../public/slider6.JPG";
import slider7 from "../../../public/slider7.JPG";

const slides = [slider1, slider2, slider3, slider4, slider5, slider6, slider7];

function Slider() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:mt-16 -mt-10">
      <div className="relative rounded-md shadow-sm">
        <div
          className="w-full h-56 sm:h-56 md:h-72 lg:h-[580px] bg-center"
          style={{
            backgroundImage: `url(${slides[index]})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 lg:w-8 lg:h-8 bg-white/90 text-gray-700 rounded-full flex items-center justify-center shadow"
        >
          <IoMdArrowRoundForward className="text-red-600 h-6 w-6 lg:h-8 lg:w-8 rotate-180" />
        </button>

        {/* Right arrow (red) */}
        <button
          onClick={next}
          aria-label="next"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-7 h-7 lg:w-8 lg:h-8 bg-white text-red-600 rounded-full flex items-center justify-center shadow"
          style={{ backgroundColor: "#fff" }}
        >
          <IoMdArrowRoundForward className="text-red-600 h-6 w-6 lg:h-8 lg:w-8" />
        </button>

        {/* Dots */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 lg:w-2.5 lg:h-2.5 rounded-full ${
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
