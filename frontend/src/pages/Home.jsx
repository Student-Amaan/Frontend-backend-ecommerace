
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
    <div className="min-h-screen bg-[#f5f6fa] text-slate-900">

      {/* Top Announcement */}
      <div className="bg-slate-950 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        Discover your next favorite product at ShopSphere.
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-4 md:px-8">

          <Link to="/" className="shrink-0 text-2xl font-black tracking-tight">
            shop<span className="text-violet-600">sphere</span>
            <span className="text-violet-600">.</span>
          </Link>

          <div className="hidden flex-1 md:block">
            <div className="flex overflow-hidden rounded-xl border-2 border-slate-200 transition focus-within:border-violet-500">
              <input
                type="search"
                placeholder="Search for products, brands and more..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 text-sm outline-none"
              />
              <span className="flex items-center bg-violet-600 px-5 text-xl text-white">
                ⌕
              </span>
            </div>
          </div>

          <a
            href="#products"
            className="ml-auto shrink-0 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-600 md:ml-0"
          >
            Explore Store
          </a>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-4 md:hidden">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-500"
          />
        </div>

        {/* Category Navigation */}
        <div className="border-t border-slate-100">
          <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-4 py-3 text-sm font-semibold text-slate-600 md:px-8">
            {[
              { label: "All Products", value: "" },
              { label: "Laptops", value: "laptop" },
              { label: "Apple", value: "apple" },
              { label: "Dell", value: "Dell" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setCatagory(item.value)}
                className={`shrink-0 border-b-2 pb-1 transition ${
                  catagory === item.value
                    ? "border-violet-600 text-violet-700"
                    : "border-transparent hover:text-violet-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-9">

        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-violet-800 via-indigo-700 to-slate-900 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-100">
                Your everyday marketplace
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Find what you
                <span className="block text-violet-300">really love.</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-indigo-100 sm:text-base">
                Discover technology, everyday essentials and products
                that make life a little better.
              </p>

              <a
                href="#products"
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-slate-900 transition hover:-translate-y-1 hover:bg-violet-100"
              >
                Start Shopping <span>→</span>
              </a>
            </div>

            <div className="hidden items-center justify-center md:flex">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/20 bg-white/10 text-8xl shadow-2xl backdrop-blur-sm transition duration-500 hover:scale-105 lg:h-80 lg:w-80 lg:text-9xl">
                🛍️
                <div className="absolute -right-2 top-5 rounded-2xl bg-white p-4 text-3xl shadow-xl">
                  🎧
                </div>
                <div className="absolute -bottom-2 -left-3 rounded-2xl bg-white p-4 text-3xl shadow-xl">
                  💻
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Strip */}
        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: "✦", title: "Curated Products", desc: "Explore our collection" },
            { icon: "⌕", title: "Easy Discovery", desc: "Find products quickly" },
            { icon: "↗", title: "Simple Shopping", desc: "Browse with ease" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl text-violet-700">
                {item.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Product Section */}
        <section id="products" className="pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                The marketplace
              </p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Explore Products
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Find something made for you.
              </p>
            </div>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              {products.length} items
            </span>
          </div>

          {/* Active Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-500">
              Category:
            </span>

            <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-bold text-violet-700">
              {catagory || "All Products"}
            </span>

            {(search || catagory) && (
              <button
                onClick={() => {
                  setSearch("");
                  setCatagory("");
                }}
                className="text-sm font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-violet-600"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-slate-200/70"
              >
                <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#f8f8fc] p-6">
                  <span className="absolute left-3 top-3 rounded-md bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                    Product
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
                    {product.category || "General"}
                  </p>

                  <h3 className="mt-2 line-clamp-2 min-h-12 font-bold leading-6 text-slate-800 transition group-hover:text-violet-700">
                    {product.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">Price</p>
                      <p className="mt-1 text-xl font-black text-slate-900">
                        ${product.price}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg text-white transition group-hover:bg-violet-600">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
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
                className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
              >
                View All Products
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="mt-14 flex flex-col justify-between gap-5 rounded-3xl border border-violet-100 bg-violet-50 p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Your next great find awaits.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Explore the products and discover something new.
            </p>
          </div>
          <a
            href="#products"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-bold text-white transition hover:bg-violet-700"
          >
            Browse Products →
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <Link to="/" className="text-xl font-black">
            shop<span className="text-violet-600">sphere</span>.
          </Link>

          <p className="text-sm text-slate-500">
            Discover more. Choose better.
          </p>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} ShopSphere
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
