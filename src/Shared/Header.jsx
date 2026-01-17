import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { NavLink, Link } from "react-router-dom";
import { LuPhone } from "react-icons/lu";

import { useState } from "react";
import SignIn from "../Pages/Authentication/SignIn";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between">
          <nav className="hidden sm:flex items-center gap-8 text-white">
            <ul className="flex items-center gap-8 font-semibold uppercase tracking-wide">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "hover:text-red-400"
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "hover:text-red-400"
                  }
                >
                  PRODUCT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "hover:text-red-400"
                  }
                >
                  ABOUT
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4 text-white">
            {/* Mobile hamburger */}
            <button
              onClick={() => setShowMenu(true)}
              className="sm:hidden inline-flex flex-col items-center justify-center p-2 rounded-md text-white"
              aria-label="Open menu"
            >
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white mt-1" />
              <span className="block w-5 h-0.5 bg-white mt-1" />
            </button>
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <div className="leading-tight text-right">
                <div className="text-md opacity-80">Call Us Now:</div>
                <div className="font-semibold">+(258) 2159-2159</div>
              </div>
              <LuPhone className="h-8 w-8 bg-white text-black rounded-full p-1.5 hover:bg-red-400 flex items-center justify-center" />
            </div>

            <Link to="/checkout">
              <button className="h-8 w-8 bg-white text-black rounded-full p-1.5 hover:bg-red-400 flex items-center justify-center">
                <IoCartOutline size={18} />
              </button>
            </Link>

            <button
              className="ml-2 inline-block bg-red-600 text-white px-3 py-1 text-sm font-semibold hover:bg-red-700"
              onClick={() => setShowSignIn(true)}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-over menu */}
      {showMenu && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-black text-white p-6">
            {/* <button
              onClick={() => setShowMenu(false)}
              className="mb-6 text-2xl"
              aria-label="Close menu"
            >
              ✕
            </button> */}

            <nav>
              <ul className="flex flex-col gap-4 font-semibold uppercase tracking-wide mt-10">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : "hover:text-red-400"
                    }
                    onClick={() => setShowMenu(false)}
                  >
                    HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : "hover:text-red-400"
                    }
                    onClick={() => setShowMenu(false)}
                  >
                    PRODUCT
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : "hover:text-red-400"
                    }
                    onClick={() => setShowMenu(false)}
                  >
                    ABOUT
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="mt-6 border-t border-white/10 pt-4 text-sm">
              <div className="opacity-80">Call Us Now:</div>
              <div className="font-semibold">+(258) 2159-2159</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {/* <Link to="/checkout" onClick={() => setShowMenu(false)}>
                <button className="h-8 w-8 bg-white text-black rounded-full p-1.5 hover:bg-red-400 flex items-center justify-center">
                  <IoCartOutline size={18} />
                </button>
              </Link> */}

              {/* <button
                className="ml-2 inline-block bg-red-600 text-white px-3 py-1 text-sm font-semibold hover:bg-red-700"
                onClick={() => {
                  setShowSignIn(true);
                  setShowMenu(false);
                }}
              >
                SIGN IN
              </button> */}
            </div>
          </div>

          <div className="flex-1" onClick={() => setShowMenu(false)} />
        </div>
      )}

      {/* Modal for Sign In */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="rounded-2xl shadow-xl overflow-y-auto">
              <SignIn onClose={() => setShowSignIn(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
