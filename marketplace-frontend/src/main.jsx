import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage.jsx";
import SearchResultPage from "./pages/SearchResultPage.jsx";
import AddProductPage from "./pages/AddProduct.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <ShoppingCartPage />,
  },
  {
    path: "/search",
    element: <SearchResultPage />,
  },
  {
    path: "/add-product",
    element: <AddProductPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
