"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  userId: string;
  total: number;
  date: string;
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered";
  paymentId?: string;
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Download invoice handler
  const handleDownloadInvoice = async (orderId: string) => {
    const res = await fetch(`/api/invoice?id=${orderId}`);
    if (!res.ok) {
      alert("Failed to download invoice");
      return;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${orderId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        // Filter orders for current user
        setOrders(data.filter((order: Order) => order.userId === session.user?.id || data));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please login to view your orders</p>
          <button
            onClick={() => signIn()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">📦 Order History</h1>
        <p className="text-gray-600 mb-8">Welcome, {session.user.name}!</p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin text-4xl">⏳</div>
            <p className="text-gray-600 mt-4">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to create your first order</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <h3 className="text-2xl font-bold text-gray-900">{order.id}</h3>
                  </div>

                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="text-lg font-semibold text-gray-900">{order.date}</p>
                  </div>

                  <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status === "delivered" && "✅"} {order.status === "shipped" && "🚚"}{" "}
                      {order.status === "processing" && "⏳"} {order.status === "pending" && "⏸"}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-3">Items:</p>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-gray-700">
                        <div className="flex justify-between">
                          <span>
                            {item.name} x {item.qty}
                          </span>
                          <span className="font-semibold">
                            ₹{(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total & Actions */}
                <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <p className="text-lg font-bold text-gray-900">
                    Total: <span className="text-blue-700">₹{order.total.toLocaleString()}</span>
                  </p>

                  <div className="mt-4 md:mt-0 flex gap-3">
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                      📄 Download Invoice
                    </button>

                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-semibold transition">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
