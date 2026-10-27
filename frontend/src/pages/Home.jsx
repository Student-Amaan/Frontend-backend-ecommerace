
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [catagory, setCatagory] = useState("");

  const loadProduct = async () => {
    try {
      const res = await api.get(
        `/products?search=${encodeURIComponent(search)}&catagory=${encodeURIComponent(catagory)}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [search, catagory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="text-2xl font-black tracking-tight">
            Nova<span className="text-violet-600">Mart.</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#home" className="transition hover:text-violet-600">
              Home
            </a>
            <a href="#products" className="transition hover:text-violet-600">
              Products
            </a>
            <a href="#categories" className="transition hover:text-violet-600">
              Categories
            </a>
          </div>

          <a
            href="#products"
            className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Explore Store ↗
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="px-5 pt-8 lg:px-8 lg:pt-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
              ✦ Discover something new
            </span>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Upgrade your
              <span className="block text-violet-400">
                everyday life.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
              Discover quality tech, iconic devices, and everyday essentials
              picked for your lifestyle.
            </p>

            <a
              href="#products"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-violet-100"
            >
              Shop collection <span>→</span>
            </a>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/15 pt-6">
              <div>
                <p className="text-2xl font-bold">Premium</p>
                <p className="mt-1 text-sm text-slate-400">Product picks</p>
              </div>
              <div>
                <p className="text-2xl font-bold">Easy</p>
                <p className="mt-1 text-sm text-slate-400">Shopping experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold">Modern</p>
                <p className="mt-1 text-sm text-slate-400">Everyday essentials</p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-10 right-8 hidden rotate-[-12deg] items-center justify-center rounded-3xl border border-white/15 bg-white/5 p-8 text-8xl shadow-2xl backdrop-blur-xl lg:flex">
            ✨
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-5 pt-14 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
              Browse your way
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Explore categories
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Find something you'll love.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { name: "All Products", value: "", icon: "✦" },
            { name: "Laptops", value: "laptop", icon: "💻" },
            { name: "Apple", value: "apple", icon: "" },
            { name: "Dell", value: "Dell", icon: "⚡" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setCatagory(item.value)}
              className={`group rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                catagory === item.value
                  ? "border-violet-500 bg-violet-50 shadow-md shadow-violet-100"
                  : "border-slate-200 bg-white hover:border-violet-200"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="mt-4 font-bold">{item.name}</p>
              <p className="mt-1 text-xs text-slate-500">
                Explore collection ↗
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
              The collection
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Find your next favorite.
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Explore our latest products and everyday essentials.
            </p>
          </div>

          <div className="flex w-full gap-3 md:max-w-md">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
              <span className="text-lg text-slate-400">⌕</span>
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="mb-5 mt-7 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">
            {products.length} products found
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCatagory("");
            }}
            className="text-sm font-semibold text-violet-600 hover:text-violet-800"
          >
            Clear filters ↗
          </button>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="text-5xl">🔎</div>
            <h3 className="mt-4 text-xl font-bold">No products found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search or select a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCatagory("");
              }}
              className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Show all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-100 p-5">
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                    Featured
                  </span>

                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                    {product.category || "Collection"}
                  </p>

                  <h3 className="mt-2 line-clamp-1 text-lg font-bold transition group-hover:text-violet-700">
                    {product.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xl font-black">
                      ${product.price}
                    </p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg text-white transition group-hover:bg-violet-600">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="text-xl font-black">
            Nova<span className="text-violet-600">Mart.</span>
          </Link>
          <p className="text-sm text-slate-500">
            Discover more. Choose better. Shop smarter.
          </p>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} NovaMart
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
