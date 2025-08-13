import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Orders = () => {
  const currency = '$';
  const [orders, setOrders] = useState([]);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login first");
        setOrders([]);
        return;
      }

      const res = await axios.get(`${backendUrl}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        alert(res.data.message || "Failed to fetch orders");
        setOrders([]);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Access denied: Admins only");
      } else {
        console.error('Fetch orders error:', error);
        alert("Error fetching orders");
      }
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setStatusUpdatingId(orderId);
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login to update order status");
        setStatusUpdatingId(null);
        return;
      }

      const res = await axios.post(
        `${backendUrl}/api/order/update-status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated");
        setErrorMsg('');
      } else {
        setErrorMsg(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setErrorMsg("Error updating order status");
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    return [
      address.street,
      address.city,
      address.state,
      address.zipcode,
      address.country,
    ].filter(Boolean).join(", ");
  };

  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
      const dateKey = new Date(order.date).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(order);
    });
    return grouped;
  };

  const todayDateKey = new Date().toDateString();

  const filteredOrders =
    filterStatus === 'All'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const groupedOrders = groupOrdersByDate(filteredOrders);

  const todaysDeliveredEarnings = orders
    .filter(
      (order) =>
        new Date(order.date).toDateString() === todayDateKey &&
        order.status === 'Delivered'
    )
    .reduce((total, order) => total + order.amount, 0);

  const deliveredTotalIncome = orders
    .filter((order) => order.status === 'Delivered')
    .reduce((total, order) => total + order.amount, 0);

  const statusCounts = {
    Pending: orders.filter((o) => o.status === 'Pending').length,
    Processing: orders.filter((o) => o.status === 'Processing').length,
    Shipped: orders.filter((o) => o.status === 'Shipped').length,
    Delivered: orders.filter((o) => o.status === 'Delivered').length,
    Cancelled: orders.filter((o) => o.status === 'Cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-16 text-sm">
      <div className="max-w-6xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold mb-6">ADMIN ORDERS</h1>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
            {errorMsg}
          </div>
        )}

        {/* Earnings Summary */}
        <div className="mb-4 space-y-2">
          <div className="text-xl font-semibold text-green-700">
            💰 Today's Delivered Earnings: {currency}
            {todaysDeliveredEarnings.toFixed(2)}
          </div>
          <div className="text-md font-medium text-blue-700">
            ✅ Total Delivered Income: {currency}{deliveredTotalIncome.toFixed(2)}
          </div>
          <div className="text-sm text-gray-700">
            🟡 Pending: {statusCounts.Pending} | 🔄 Processing: {statusCounts.Processing} | 📦 Shipped: {statusCounts.Shipped} | ✅ Delivered: {statusCounts.Delivered} | ❌ Cancelled: {statusCounts.Cancelled}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <>
            {Object.entries(groupedOrders).map(([date, ordersOnDate]) => (
              <div key={date} className="mb-8">
                <h2 className="text-lg font-bold text-gray-700 mb-3">
                  📅 {date === todayDateKey ? 'Today' : date}
                </h2>

                {ordersOnDate.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white p-4 rounded-md shadow flex items-center gap-6 mb-3"
                  >
                    {/* Image Left */}
                    <img
                      src={order.items[0]?.image || ''}
                      alt={order.items[0]?.name || ''}
                      className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                    />

                    {/* Details Middle */}
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800 text-lg">{order.items[0]?.name}</p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Amount:</span> {currency}{order.amount}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Quantity:</span> {order.items[0]?.quantity}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Size:</span> {order.items[0]?.size || 'N/A'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Address:</span> {formatAddress(order.address)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Date:</span> {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status Right */}
                    <div className="flex flex-col items-end">
                      <label className="font-semibold mb-2">
                        Status:
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          disabled={statusUpdatingId === order._id}
                          className="ml-2 rounded border-gray-300 p-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Orders;
