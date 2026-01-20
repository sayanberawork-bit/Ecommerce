"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SupportPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user?.role !== "support") {
      router.push("/");
    }
  }, [session, router]);

  if (!session || session.user?.role !== "support") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You dont have permission to access this page
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🎧 Customer Support</h1>
            <p className="text-gray-600">Welcome, {session.user?.name}</p>
          </div>

          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold">Open Tickets</p>
            <p className="text-4xl font-bold text-blue-700 mt-2">24</p>
            <p className="text-sm text-gray-600 mt-2">12 pending response</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-semibold">Resolved Today</p>
            <p className="text-4xl font-bold text-green-700 mt-2">8</p>
            <p className="text-sm text-gray-600 mt-2">Avg. time: 45 mins</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-semibold">Satisfaction</p>
            <p className="text-4xl font-bold text-purple-700 mt-2">4.8/5</p>
            <p className="text-sm text-gray-600 mt-2">From 156 reviews</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tickets List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">📋 Support Tickets</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
                  + New Ticket
                </button>
              </div>

              <div className="divide-y divide-gray-200">
                {[
                  {
                    id: "TKT-001",
                    customer: "John Doe",
                    subject: "Order not received",
                    status: "urgent",
                    time: "2 hours ago",
                  },
                  {
                    id: "TKT-002",
                    customer: "Jane Smith",
                    subject: "Product defective",
                    status: "open",
                    time: "4 hours ago",
                  },
                  {
                    id: "TKT-003",
                    customer: "Mike Johnson",
                    subject: "Refund status",
                    status: "in_progress",
                    time: "6 hours ago",
                  },
                  {
                    id: "TKT-004",
                    customer: "Sarah Williams",
                    subject: "Shipping delay",
                    status: "resolved",
                    time: "8 hours ago",
                  },
                ].map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-6 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{ticket.subject}</p>
                        <p className="text-sm text-gray-600">
                          {ticket.id} • {ticket.customer}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ticket.status === "urgent"
                            ? "bg-red-100 text-red-800"
                            : ticket.status === "open"
                            ? "bg-yellow-100 text-yellow-800"
                            : ticket.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.status === "urgent" && "🔴 Urgent"}
                        {ticket.status === "open" && "⏳ Open"}
                        {ticket.status === "in_progress" && "⚙️ In Progress"}
                        {ticket.status === "resolved" && "✅ Resolved"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{ticket.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 rounded-lg transition">
                  📞 Call Customer
                </button>
                <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 rounded-lg transition">
                  📧 Send Email
                </button>
                <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 rounded-lg transition">
                  💬 Live Chat
                </button>
                <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-3 rounded-lg transition">
                  📋 Create Ticket
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Knowledge Base</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    → Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    → Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    → Product FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    → Troubleshooting
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
