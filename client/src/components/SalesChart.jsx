import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const SalesChart = ({ orders }) => {
  const salesData = {};

  orders.forEach(order => {
    const date = new Date(order.timestamp).toLocaleDateString();
    const total = order.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[₹$,]/g, '')) || 0;
      return sum + price;
    }, 0);
    salesData[date] = (salesData[date] || 0) + total;
  });

  const labels = Object.keys(salesData);
  const data = Object.values(salesData);

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h3 className="text-lg font-bold mb-2 text-center">Daily Sales Trend 📈</h3>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Total Sales (₹)',
              data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            title: { display: false },
          },
        }}
      />
    </div>
  );
};

export default SalesChart;