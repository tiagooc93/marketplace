import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage.jsx";
import SearchResultPage from "./pages/SearchResultPage.jsx";
import AddProductName from "./pages/add_product/AddProductName.jsx";
import AddProductCategory from "./pages/add_product/AddProductCategory.jsx";
import AddProductDetails from "./pages/add_product/AddProductDetails.jsx";
import AddProductImages from "./pages/add_product/AddProductImages.jsx";
import AddProductPrice from "./pages/add_product/AddProductPrice.jsx";
import AddProductCondition from "./pages/add_product/AddProductCondition.jsx";
import AddProductLayout from "./pages/add_product/AddProductLayout.jsx";
import MyAds from "./pages/MyAds.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/Register.jsx";
import Chat from "./pages/Chat.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthProvider } from "./AuthContext.jsx";

const token = localStorage.getItem("token");
const isAuthenticated = token !== null && token !== "";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />, // wraps children
    children: [
      {
        path: "/cart",
        element: <ShoppingCartPage />,
      },
      {
        path: "/my-ads",
        element: <MyAds />,
      },
      {
        path: "/add-product", // Parent layout with context
        element: <AddProductLayout />,
        children: [
          { path: "name", element: <AddProductName /> },
          { path: "category", element: <AddProductCategory /> },
          { path: "details", element: <AddProductDetails /> },
          { path: "images", element: <AddProductImages /> },
          { path: "price", element: <AddProductPrice /> },
          { path: "condition", element: <AddProductCondition /> },
        ],
      },

      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/my-chats",
        element: <Chat />,
      },
    ],
  },

  {
    path: "/search",
    element: <SearchResultPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
);
