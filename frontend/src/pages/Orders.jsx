import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const backendUrl = 'http://localhost:4000'; // your backend URL

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [trackedOrderId, setTrackedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        setOrders([]);
        setLoading(false);
        return;
      }

      const res = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.data || []);
        if ((res.data.data || []).length === 0) setError('No orders found.');
      } else {
        setError('Failed to fetch orders.');
        setOrders([]);
      }
    } catch (err) {
      console.error('Fetch orders error:', err.response || err);
      if (err.response?.status === 401) {
        setError('Unauthorized. Please login again.');
      } else {
        setError('An error occurred while fetching orders.');
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center mt-4">Loading orders...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-16 text-sm">
      <div className="max-w-6xl mx-auto space-y-6">
        <Title text1="MY" text2=" ORDERS" />

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          {orders.length === 0 && !error ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            orders.map((order) => {
              const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;

              return (
                <div
                  key={order._id}
                  className="bg-white p-4 rounded-md shadow flex flex-col md:flex-row justify-between items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={firstItem?.image || ''}
                      alt={firstItem?.name || 'Product image'}
                      className="w-20 h-20 object-cover rounded-md"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{firstItem?.name || 'Unknown Item'}</p>
                      <p className="text-gray-500">
                        {currency}
                        {order.amount.toFixed(2)}
                      </p>
                      <p className="text-gray-500">Quantity: {firstItem?.quantity || '-'}</p>
                      <p className="text-gray-500">Size: {firstItem?.size || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="text-gray-600 text-sm text-right">
                    <p>
                      Date:{' '}
                      <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                    </p>
                    <p>
                      Status:{' '}
                      <span
                        className={`font-semibold ${
                          order.status.toLowerCase().includes('pending')
                            ? 'text-yellow-600'
                            : order.status.toLowerCase() === 'cancelled'
                            ? 'text-red-600'
                            : 'text-green-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() =>
                        setTrackedOrderId(trackedOrderId === order._id ? null : order._id)
                      }
                      className="mt-2 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow text-sm"
                      aria-expanded={trackedOrderId === order._id}
                      aria-controls={`tracking-info-${order._id}`}
                    >
                      {trackedOrderId === order._id ? 'Hide Tracking' : 'Track Order'}
                    </button>
                    {trackedOrderId === order._id && (
                      <div
                        id={`tracking-info-${order._id}`}
                        className="mt-2 p-2 border rounded bg-yellow-50 text-yellow-900 text-xs max-w-xs"
                      >
                        <p>Tracking info:</p>
                        <p>
                          Status - <strong>{order.status}</strong>
                        </p>
                        <p>Order Date - {new Date(order.date).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
