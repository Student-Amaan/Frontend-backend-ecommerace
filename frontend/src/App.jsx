import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/product/:id", element: <ProductDetail /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
