import React from 'react';
import { Bar } from 'react-chartjs-2';

const ReportHistoryChart = ({ data }) => {
  // Provide a fallback in case data is not an array
  const chartData = Array.isArray(data)
    ? {
        labels: data.map((item) => item.date || 'N/A'),
        datasets: [
          {
            label: 'Reports',
            data: data.map((item) => item.totalReports || 0),
            backgroundColor: '#FFC107',
          },
        ],
      }
    : {
        labels: [],
        datasets: [],
      };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ flex: 1, minWidth: '300px' }}>
      <h3>Report History</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ReportHistoryChart;
