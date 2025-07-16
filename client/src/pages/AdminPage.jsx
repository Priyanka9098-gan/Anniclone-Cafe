import React, { useEffect, useState } from 'react';
import SalesChart from '../components/SalesChart';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeReceipt, setActiveReceipt] = useState(null);

  useEffect(() => {
    fetch('https://anniclone-cafe.onrender.com/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  }, []);

  const updateOrderStatus = (orderIndex, newStatus) => {
    fetch(`http://localhost:5000/api/orders/${orderIndex}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => {
        const updatedOrders = [...orders];
        updatedOrders[orderIndex].status = newStatus;
        setOrders(updatedOrders);
      })
      .catch(err => console.error('Failed to update status:', err));
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    window.location.href = '/admin-login';
  };

  const getTotalEarnings = () => {
    return orders.reduce((total, order) => {
      const orderTotal = (order.items || []).reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[₹$,]/g, '')) || 0;
        return sum + price;
      }, 0);
      return total + orderTotal;
    }, 0);
  };

  const formattedEarnings = `₹${getTotalEarnings().toFixed(2)}`;

  const filteredOrders =
    statusFilter === 'All'
      ? orders
      : orders.filter(order => order.status === statusFilter);

  const generateCSV = () => {
    const header = ['Order #', 'Status', 'Timestamp', 'Item Title', 'Item Price'];
    const rows = [];

    orders.forEach((order, index) => {
      order.items.forEach(item => {
        rows.push([
          index + 1,
          order.status,
          new Date(order.timestamp).toLocaleString(),
          item.title,
          item.price
        ]);
      });
    });

    const csvContent =
      header.join(',') +
      '\n' +
      rows.map(row => row.map(val => `"${val}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard 📋</h1>

      <div className="flex justify-end items-center mb-4 gap-3">
        <button
          onClick={generateCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Export CSV 📤
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout 🔓
        </button>
      </div>

      {!loading && orders.length > 0 && (
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-green-700">
            Total Earnings: {formattedEarnings}
          </p>
          <p className="text-sm text-gray-600">
            Orders placed: {orders.length}
          </p>
        </div>
      )}

      {!loading && orders.length > 0 && <SalesChart orders={orders} />}

      {!loading && orders.length > 0 && (
        <div className="flex justify-center mb-6 flex-wrap gap-3">
          {['All', 'Pending', 'Preparing', 'Ready', 'Delivered'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded text-sm font-medium ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600">
          No orders found for "{statusFilter}"
        </p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order, i) => (
            <div key={i} className="bg-white rounded shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">
                  Status: <span className="font-medium">{order.status}</span>
                </p>
                <select
                  value={order.status}
                  onChange={e => updateOrderStatus(i, e.target.value)}
                  className="border px-2 py-1 rounded text-sm"
                >
                  {['Pending', 'Preparing', 'Ready', 'Delivered'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500">
                Time: {order.timestamp ? new Date(order.timestamp).toLocaleString() : 'N/A'}
              </p>
              <ul className="mt-2 space-y-1">
                {(order.items || []).map((item, index) => (
                  <li key={index} className="flex justify-between text-gray-700">
                    <span>{item.title}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActiveReceipt(order)}
                className="mt-2 text-blue-600 text-sm underline hover:text-blue-800"
              >
                View Receipt
              </button>
            </div>
          ))}
        </div>
      )}

      {activeReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-2">Receipt 🧾</h2>
            <p className="text-sm text-gray-500 mb-1">
              Time: {new Date(activeReceipt.timestamp).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Status: {activeReceipt.status}
            </p>
            <ul className="space-y-1">
              {activeReceipt.items.map((item, i) => (
                <li key={i} className="flex justify-between text-gray-700 border-b pb-1">
                  <span>{item.title}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveReceipt(null)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
