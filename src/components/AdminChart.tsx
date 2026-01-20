"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminChart() {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales (₹)",
        data: [120000, 190000, 150000, 220000, 180000, 250000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [100000, 170000, 130000, 200000, 160000, 230000],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Sales",
        font: { size: 16 },
      },
      legend: {
        display: true,
        labels: { padding: 15 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Revenue Trend",
        font: { size: 16 },
      },
      legend: {
        display: true,
        labels: { padding: 15 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-gray-600 text-sm font-semibold">Total Sales</p>
          <p className="text-3xl font-bold text-blue-700">₹11,90,000</p>
          <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <p className="text-gray-600 text-sm font-semibold">Total Orders</p>
          <p className="text-3xl font-bold text-green-700">324</p>
          <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <p className="text-gray-600 text-sm font-semibold">Avg Order Value</p>
          <p className="text-3xl font-bold text-purple-700">₹3,672</p>
          <p className="text-green-600 text-sm mt-2">↑ 5% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <Bar data={salesData} options={barOptions as any} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <Line data={revenueData} options={lineOptions as any} />
      </div>
    </div>
  );
}
