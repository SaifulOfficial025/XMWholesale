import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ProductHome from "../Pages/Product/Home";
import ProductDetails from "../Pages/Product/ProductDetails";
import ConfirmOrder from "../Pages/Product/ConfirmOrder";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

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
    path: "/products/details",
    element: <ProductDetails />,
  },
  {
    path: "/products/confirmation",
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
