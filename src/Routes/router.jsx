import { createBrowserRouter } from "react-router-dom";
import { CartProvider } from "../Context/CartContext";
import Home from "../Pages/Home/Home";
import ProductHome from "../Pages/Product/Home";
import ProductDetails from "../Pages/Product/ProductDetails";
import ConfirmOrder from "../Pages/Product/ConfirmOrder";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

// Wrapper component to provide CartContext to all routes
const RoutesWithProvider = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductHome />,
  },
  {
    path: "/product/details/:id",
    element: <ProductDetails />,
  },
  {
    path: "/checkout",
    element: <ConfirmOrder />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);
