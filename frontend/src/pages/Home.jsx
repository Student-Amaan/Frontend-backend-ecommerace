
import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [catagory, setCatagory] = useState("");

  const loadProduct = async () => {
    const res = await api.get(
      `/products?search=${search}&catagory=${catagory}`
    );
    setProducts(res.data);
  };

  useEffect(() => {
    loadProduct();
  }, [search, catagory]);

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login to add items to your cart");
        return;
      }

      const res = await api.post("/cart/add", {
        userId,
        productId,
      });

      console.log("Cart Response:", res.data);

      const items = res.data.cartDoc.items;

      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

      localStorage.setItem("cartCount", totalItems);

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error(
        "Add To Cart Error:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-blue-200 font-semibold uppercase tracking-widest text-sm mb-3">
              Welcome to our store
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Discover Products
              <span className="block text-yellow-300">
                You Will Love
              </span>
            </h1>

            <p className="mt-5 text-blue-100 text-lg">
              Explore our collection and find the perfect products for your needs.
            </p>

            <a
              href="#products"
              className="inline-block mt-8 bg-white text-blue-700 font-bold px-7 py-3 rounded-xl hover:bg-yellow-300 hover:text-gray-900 transition duration-300 shadow-lg"
            >
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Our Products
            </h2>
            <p className="text-gray-500 mt-2">
              Find your favourite products here
            </p>
          </div>

          {/* Search and Category */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

            <input
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 border border-gray-300 bg-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            />

            <select
              value={catagory}
              onChange={(e) => setCatagory(e.target.value)}
              className="w-full sm:w-44 border border-gray-300 bg-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            >
              <option value="">All Catagory</option>
              <option value="laptop">Laptop</option>
              <option value="apple">Apple</option>
              <option value="Dell">Dell</option>
            </select>

          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

          {products.map((products) => (

            <div
              key={products._id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >

              <Link to={`/product/${products._id}`}>

                <div className="h-56 bg-gray-100 p-5 flex items-center justify-center overflow-hidden">
                  <img
                    src={products.image}
                    alt={products.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5">

                  <h2 className="font-bold text-lg text-gray-800 truncate group-hover:text-blue-600 transition">
                    {products.title}
                  </h2>

                  <p className="text-xl font-extrabold text-blue-700 mt-3">
                    ${products.price}
                  </p>

                </div>

              </Link>

              <div className="px-5 pb-5">
                <button
                  onClick={() => addToCart(products._id)}
                  className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition duration-300 shadow-md hover:shadow-lg"
                >
                  Add To Cart
                </button>
              </div>

            </div>

          ))}

        </div>

        {/* Empty Products */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700">
              No Products Found
            </h3>
            <p className="text-gray-500 mt-2">
              Try searching for another product.
            </p>
          </div>
        )}

      </section>

    </div>
  );
};

export default Home;