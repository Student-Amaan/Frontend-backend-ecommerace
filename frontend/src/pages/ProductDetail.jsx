import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    const res = await api.get("/products/");
    const p = res.data.find((item) => item._id === id);
    setProduct(p);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Loading product...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Product Card */}
        <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          {/* Product Image */}
          <div className="flex items-center justify-center rounded-xl bg-gray-50 p-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-72 w-full object-contain transition duration-300 hover:scale-105 md:h-96"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Product Details
            </p>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {product.title}
            </h1>

            <p className="mt-5 text-3xl font-bold text-blue-600">
              ${product.price}
            </p>

            <div className="my-6 border-t border-gray-100"></div>

            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Description
            </h2>

            <p className="text-base leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Add to Cart Button */}
            <button className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95 sm:w-auto">
              Add to Cart
            </button>

            {/* Delivery Information */}
            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Quality product
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Easy and convenient shopping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
