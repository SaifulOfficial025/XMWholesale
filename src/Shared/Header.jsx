import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { LuPhone } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import SignIn from "../Pages/Authentication/SignIn";
import Profile from "../Pages/Authentication/Profile";
import OrderHistory from "../Pages/OrderHistory";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const readAuth = () => {
      const accessToken =
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("access");
      if (accessToken && accessToken !== "undefined") {
        setIsLoggedIn(true);
        const userInfoRaw =
          localStorage.getItem("user_info") ||
          localStorage.getItem("user") ||
          localStorage.getItem("user_info") ||
          localStorage.getItem("login_user_info");
        if (userInfoRaw && userInfoRaw !== "undefined") {
          try {
            const user = JSON.parse(userInfoRaw);
            // Try different name fields
            setUserName(
              user.full_name ||
                user.name ||
                user.fullName ||
                user.email ||
                "User",
            );
          } catch (err) {
            console.error("Failed to parse user_info:", err);
            setUserName("User");
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    readAuth();

    const handleAuthChange = () => readAuth();
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    // Remove both legacy and newer key variants
    [
      "access_token",
      "refresh_token",
      "user_info",
      "accessToken",
      "refreshToken",
      "user",
      "tokens",
      "login_user_info",
    ].forEach((k) => localStorage.removeItem(k));
    setIsLoggedIn(false);
    setUserName("");
    setShowDropdown(false);
    // notify others
    try {
      window.dispatchEvent(new Event("authChanged"));
    } catch (e) {}
    navigate("/");
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between">
          <nav className="hidden sm:flex items-center gap-8 text-white">
            <Link to="/">
              <img
                src="/xmlogo.png"
                alt="XM Logo"
                className="h-10 w-auto ml-4 object-contain"
              />
            </Link>
            <ul className="flex items-center gap-8 font-semibold uppercase tracking-wide">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "hover:text-red-400"
                  }
                >
                  {t("navbar.home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "hover:text-red-400"
                  }
                >
                  {t("navbar.product")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "hover:text-red-400"
                  }
                >
                  {t("navbar.about")}
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
                <div className="text-md opacity-80">{t("navbar.call_us")}</div>
                <div className="font-semibold">{t("navbar.phone_number")}</div>
              </div>
              <LuPhone className="h-8 w-8 bg-white text-black rounded-full p-1.5 hover:bg-red-400 flex items-center justify-center" />
            </div>

            <Link to="/checkout">
              <button className="h-8 w-8 bg-white text-black rounded-full p-1.5 hover:bg-red-400 flex items-center justify-center">
                <IoCartOutline size={18} />
              </button>
            </Link>

            <button
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")
              }
              className="bg-white text-black px-2 py-0.5 rounded-sm hover:bg-black hover:text-white transition duration-300"
            >
              {i18n.language === "en" ? "FR" : "EN"}
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="ml-2 inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 text-sm font-semibold hover:bg-red-700 rounded"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {userName}
                  <FaChevronDown size={12} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl z-50">
                    <button
                      onClick={() => {
                        setShowProfile(true);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 font-semibold border-b border-gray-200"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowOrderHistory(true);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 font-semibold border-b border-gray-200"
                    >
                      Order History
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 font-semibold text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="ml-2 inline-block bg-red-600 text-white px-3 py-1 text-sm font-semibold hover:bg-red-700"
                onClick={() => setShowSignIn(true)}
              >
                SIGN IN
              </button>
            )}
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
                  <Link to="/">
                    <img
                      src="/xmlogo.png"
                      alt="XM Logo"
                      className="h-10 w-auto mt-5 object-contain"
                    />
                  </Link>
                </li>
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : "hover:text-red-400"
                    }
                    onClick={() => setShowMenu(false)}
                  >
                    {t("navbar.home")}
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
                    {t("navbar.product")}
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
                    {t("navbar.about")}
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="mt-6 border-t border-white/10 pt-4 text-sm">
              <div className="opacity-80">{t("navbar.call_us")}</div>
              <div className="font-semibold">{t("navbar.phone_number")}</div>
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

      {/* Modal for Profile */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative w-full max-w-md mx-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold z-10"
              onClick={() => setShowProfile(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <div className="bg-white rounded-2xl shadow-xl overflow-y-auto">
              <Profile onClose={() => setShowProfile(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Modal for Order History */}
      {showOrderHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            <OrderHistory onClose={() => setShowOrderHistory(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
