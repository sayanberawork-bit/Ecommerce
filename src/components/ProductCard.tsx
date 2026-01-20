"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-white overflow-hidden">
      {/* Image */}
      <div className="relative bg-gray-100 h-64 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-2">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm text-gray-600 ml-1">{product.rating} / 5.0</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-700">₹{product.price.toLocaleString()}</p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg font-semibold transition-all ${
            added
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
