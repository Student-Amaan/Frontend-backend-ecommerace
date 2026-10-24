import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp"
import AddProduct from "./admin/AddProduct"
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/product/:id", element: <ProductDetail /> },

  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/add", element: <AddProduct /> },
  { path: "/admin/products/edit/:id", element: <EditProduct /> },
]);

 function App() {
  return <RouterProvider router={router} />;
}

export default  App
