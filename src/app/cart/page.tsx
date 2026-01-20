"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeItem, updateQty, getTotal, clearCart } = useCart();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = getTotal();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setPaymentLoading(true);

    try {
      // Mock payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setOrderPlaced(true);
      clearCart();

      setTimeout(() => {
        setOrderPlaced(false);
      }, 5000);
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-green-50 p-12 rounded-lg border border-green-200">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">Order Placed!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase</p>
          <Link
            href="/orders"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            View Order History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 last:border-b-0 p-6 flex gap-6 hover:bg-gray-50 transition"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-blue-700 font-semibold">
                        ₹{item.price.toLocaleString()}
                      </p>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold transition"
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₹{Math.round(total * 0.18).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-blue-700">
                    ₹{(total + Math.round(total * 0.18)).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={paymentLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 rounded-lg transition-all mb-3"
                >
                  {paymentLoading ? "Processing..." : "Proceed to Checkout"}
                </button>

                <button
                  onClick={() => clearCart()}
                  className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-semibold py-2 rounded-lg transition"
                >
                  Clear Cart
                </button>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">
                    🔒 Secure checkout with 100% payment protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
