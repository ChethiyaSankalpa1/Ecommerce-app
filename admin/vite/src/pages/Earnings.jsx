import React, { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Earnings = () => {
  const currency = "$";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("day");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.get(`${backendUrl}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        alert(res.data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const todayKey = today.toDateString();
  const monthKey = today.getMonth();
  const yearKey = today.getFullYear();

  const todaysEarnings = orders
    .filter(
      (o) =>
        new Date(o.date).toDateString() === todayKey &&
        o.status === "Delivered"
    )
    .reduce((sum, o) => sum + o.amount, 0);

  const monthlyEarnings = orders
    .filter(
      (o) =>
        new Date(o.date).getMonth() === monthKey &&
        new Date(o.date).getFullYear() === yearKey &&
        o.status === "Delivered"
    )
    .reduce((sum, o) => sum + o.amount, 0);

  const yearlyEarnings = orders
    .filter(
      (o) =>
        new Date(o.date).getFullYear() === yearKey &&
        o.status === "Delivered"
    )
    .reduce((sum, o) => sum + o.amount, 0);

  const totalEarnings = orders
    .filter((o) => o.status === "Delivered")
    .reduce((sum, o) => sum + o.amount, 0);

  // Prepare chart data (labels + values) based on filter
  const chartLabels = [];
  const chartDataValues = [];

  if (filter === "day") {
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateKey = date.toDateString();
      chartLabels.push(date.toLocaleDateString());

      const dailyTotal = orders
        .filter(
          (o) =>
            new Date(o.date).toDateString() === dateKey &&
            o.status === "Delivered"
        )
        .reduce((sum, o) => sum + o.amount, 0);

      chartDataValues.push(dailyTotal);
    }
  } else if (filter === "month") {
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(today.getMonth() - i);
      const m = date.getMonth();
      const y = date.getFullYear();
      chartLabels.push(date.toLocaleString("default", { month: "short" }));

      const monthlyTotal = orders
        .filter(
          (o) =>
            new Date(o.date).getMonth() === m &&
            new Date(o.date).getFullYear() === y &&
            o.status === "Delivered"
        )
        .reduce((sum, o) => sum + o.amount, 0);

      chartDataValues.push(monthlyTotal);
    }
  } else if (filter === "year") {
    for (let i = 4; i >= 0; i--) {
      const year = today.getFullYear() - i;
      chartLabels.push(year);

      const yearlyTotal = orders
        .filter(
          (o) =>
            new Date(o.date).getFullYear() === year &&
            o.status === "Delivered"
        )
        .reduce((sum, o) => sum + o.amount, 0);

      chartDataValues.push(yearlyTotal);
    }
  }

  // Find max for scaling bars
  const maxValue = Math.max(...chartDataValues, 1);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 Earnings Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow text-center">
                <h2 className="text-gray-600">Today's Earnings</h2>
                <p className="text-2xl font-bold text-green-600">
                  {currency}
                  {todaysEarnings.toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <h2 className="text-gray-600">This Month</h2>
                <p className="text-2xl font-bold text-blue-600">
                  {currency}
                  {monthlyEarnings.toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <h2 className="text-gray-600">This Year</h2>
                <p className="text-2xl font-bold text-purple-600">
                  {currency}
                  {yearlyEarnings.toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow text-center">
                <h2 className="text-gray-600">Total Earnings</h2>
                <p className="text-2xl font-bold text-orange-600">
                  {currency}
                  {totalEarnings.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Filter */}
            <div className="mb-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="day">Daily (Last 7 Days)</option>
                <option value="month">Monthly (Last 12 Months)</option>
                <option value="year">Yearly (Last 5 Years)</option>
              </select>
            </div>

            {/* Simple Bar Chart */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex items-end space-x-2 h-48">
                {chartDataValues.map((value, i) => {
                  const heightPercent = (value / maxValue) * 100;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className="bg-blue-500 w-6 rounded-t"
                        style={{ height: `${heightPercent}%` }}
                        title={`${currency}${value.toFixed(2)}`}
                      ></div>
                      <span className="text-xs mt-1">{chartLabels[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Earnings;
