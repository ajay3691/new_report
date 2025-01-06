import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically registers Chart.js components
import Sidenav from './Sidenav';


const AttendanceChart = ({ data }) => {
  // Check if data is an array and has at least one item
  const isValidData = Array.isArray(data) && data.length > 0;

  // Prepare the chart data
  const chartData = isValidData
    ? {
        labels: data.map((item) => item.date || 'N/A'),
        datasets: [
          {
            label: 'Attendance (%)',
            data: data.map((item) => item.attendance || 0),
            backgroundColor: data.map((item) =>
              item.attendance >= 75 ? '#4CAF50' : '#F44336'
            ), // Green for >=75%, red otherwise
          },
        ],
      }
    : null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}% Attendance`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    
    <div style={{ flex: 1, minWidth: '50px', textAlign: 'center' }}>
      <h3>Daily Attendance</h3>
      {isValidData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p style={{ color: '#757575' }}>No attendance data available to display.</p>
      )}
    </div>
  );
};

export default AttendanceChart;
