import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      if (!userId || userId === "undefined") {
        return setCartCount(0);
      }

      const res = await api.get(`/cart/${userId}`);
      const total = res.data.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      setCartCount(total);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };
  return (
    <nav className="flex justify-between p-4 shadow">
      <Link to="/" className="font-bold text-xl">
        BAKHT STORE
      </Link>

      <div className="flex gap-4 items-center ">
        <Link
          to="/cart"
          className="relative flex items-center gap-2 px-5 py-2.5
    bg-linear-to-r from-indigo-600 to-purple-600
    text-white rounded-full font-semibold shadow-md
    hover:from-indigo-700 hover:to-purple-700
    hover:shadow-xl hover:scale-105
    transition-all duration-300"
        >
          {" "}
          Cart
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2
        flex items-center justify-center
        min-w-6 h-6 px-1
        bg-red-500 text-white text-xs font-bold
        rounded-full border-2 border-white
        shadow-md animate-bounce"
            >
              {cartCount}
            </span>
          )}
        </Link>
        {!userId ? (
          <>
            <Link to="/login" className="text-lg">
              Login
            </Link>
            <Link to="/signup" className="text-lg">
              SingUp
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-lg">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
