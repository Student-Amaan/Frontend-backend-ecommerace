import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp";

import AddProduct from "./admin/AddProductTemp";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import CheckOutAddress from "./pages/CheckOutAddress";
import CheckOut from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/product/:id", element: <ProductDetail /> },

      { path: "/cart", element: <Cart /> },

      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/checkout-address", element: <CheckOutAddress /> },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
