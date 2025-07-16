import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);  // ✅ confirmation state

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[₹$,]/g, '')) || 0;
    return sum + price;
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setIsPlacing(true);

    const order = {
      items: cartItems,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };

    // ✅ FULL URL USED — NO DEPENDENCE ON PROXY
    fetch('https://anniclone-cafe.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Order failed');
        }
        return res.json();
      })
      .then(() => {
        setCartItems([]);
        localStorage.removeItem('cart');
        generateBill(order);
        setOrderPlaced(true);  // ✅ show confirmation
        navigate('/order-success', { state: { order } });
      })
      .catch(err => {
        console.error('Order failed:', err);
        alert('Something went wrong while placing the order!');
      })
      .finally(() => setIsPlacing(false));
  };

  const generateBill = (order) => {
    let content = `Aniicone Café Bill 🧾\n\nDate: ${new Date(order.timestamp).toLocaleString()}\nStatus: ${order.status}\n\nItems:\n`;

    order.items.forEach((item, i) => {
      content += `${i + 1}. ${item.title} - ${item.price}\n`;
    });

    content += `\nTotal: ₹${totalAmount.toFixed(2)}\n\nThank you for dining with us!`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aniicone_Bill.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Checkout 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="max-w-md mx-auto bg-white p-4 shadow rounded">
          <ul className="mb-4 space-y-2">
            {cartItems.map((item, i) => (
              <li key={i} className="flex justify-between text-gray-800">
                <span>{item.title}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="text-right font-semibold text-green-700 mb-4">
            Total: ₹{totalAmount.toFixed(2)}
          </p>
          <button
            onClick={handleCheckout}
            className={`w-full py-2 rounded transition text-white ${
              isPlacing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isPlacing}
          >
            {isPlacing ? 'Placing Order...' : 'Place Order & Download Bill 📤'}
          </button>

          {orderPlaced && (
            <p className="text-center text-green-600 font-semibold mt-4">
              ✅ Order Confirmed! Your bill has been downloaded.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
