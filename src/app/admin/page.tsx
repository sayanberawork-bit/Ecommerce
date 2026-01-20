"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminChart from "@/components/AdminChart";

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user?.role !== "admin") {
      router.push("/");
    }
  }, [session, router]);

  if (!session || session.user?.role !== "admin") {
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {session.user?.name}</p>
          </div>

          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button className="px-6 py-3 border-b-2 border-blue-600 text-blue-600 font-semibold">
            📈 Analytics
          </button>
          <button className="px-6 py-3 text-gray-600 hover:text-gray-900 font-semibold">
            📦 Products
          </button>
          <button className="px-6 py-3 text-gray-600 hover:text-gray-900 font-semibold">
            🛒 Orders
          </button>
          <button className="px-6 py-3 text-gray-600 hover:text-gray-900 font-semibold">
            👥 Users
          </button>
        </div>

        {/* Dashboard Content */}
        <AdminChart />

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 rounded-lg transition">
                ➕ Add New Product
              </button>
              <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 rounded-lg transition">
                📧 Send Email Campaign
              </button>
              <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 rounded-lg transition">
                🔍 View Reports
              </button>
              <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-3 rounded-lg transition">
                ⚙️ Settings
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📅 Recent Activities</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-semibold text-gray-900">Order ORD001 Delivered</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="font-semibold text-gray-900">New User Registered</p>
                  <p className="text-sm text-gray-600">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💳</span>
                <div>
                  <p className="font-semibold text-gray-900">Payment Received</p>
                  <p className="text-sm text-gray-600">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
