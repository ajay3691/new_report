import React, { useState } from "react";
import Sidenav from "./Sidenav";
import Chart from "react-apexcharts";

const Admin = () => {
  const [loading, setLoading] = useState(false);

  // Static data for charts
  const income = "$5,456";
  const incomeGrowth = "+14%";

  const barChartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Product A", "Product B", "Product C", "Product D"],
    },
    colors: ["#4CAF50"],
  };

  const barChartSeries = [
    {
      name: "Sales",
      data: [450, 650, 300, 500],
    },
  ];

  const pieChartOptions = {
    labels: ["Category A", "Category B", "Category C", "Category D"],
    colors: ["#FF5733", "#4CAF50", "#FFC107", "#00BFFF"],
  };

  const pieChartSeries = [35, 25, 20, 20];

  const lineChartData = {
    labels: ["Jan 01", "Jan 02", "Jan 03", "Jan 04"],
    datasets: [
      {
        label: "Website Blog",
        data: [300, 400, 350, 450],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Social Media",
        data: [200, 300, 250, 400],
        borderColor: "green",
        fill: false,
      },
    ],
  };

  const donutChartOptions = {
    labels: ["Completed", "Remaining"],
    colors: ["#4CAF50", "#FFC107"],
  };

  const donutChartSeries = [75, 25];

  const sparkOptions = {
    chart: {
      type: "line",
      sparkline: { enabled: true },
    },
    stroke: { curve: "smooth" },
    colors: ["#FF5733"],
  };

  const sparkSeries = [{ data: [10, 20, 15, 25, 30] }];

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidenav />
      <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
        {/* <h1>Admin Dashboard</h1> */}

        {/* Income Card */}
        <div
          className="card"
          style={{
            background: "linear-gradient(to bottom, #fff, #f8f9fa)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <h5>Income</h5>
          <h2>{income}</h2>
          <span className="text-success" style={{ color: "green" }}>
            {incomeGrowth}
          </span>
        </div>

        {/* Line Chart */}
       {/*  <div style={{ marginBottom: "20px" }}>
          <h5>Line Chart</h5>
          <Chart
            options={{
              chart: { id: "basic-line" },
              xaxis: { categories: lineChartData.labels },
            }}
            series={lineChartData.datasets.map((dataset) => ({
              name: dataset.label,
              data: dataset.data,
            }))}
            type="line"
            width="100%"
          />
        </div> */}

        {/* Donut Chart */}
        <div className="flex" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
  {/* Donut Chart */}
  <div style={{ flex: "1", marginBottom: "20px" }}>
    <h5>Task Completion</h5>
    <Chart
      options={donutChartOptions}
      series={donutChartSeries}
      type="donut"
      width="380"
    />
  </div>

  {/* Bar Chart */}
  <div style={{ flex: "2", marginBottom: "20px" }}>
    <h5>Sales Bar Chart</h5>
    <Chart
      options={barChartOptions}
      series={barChartSeries}
      type="bar"
      width="100%"
    />
  </div>
</div>

       

        {/* Pie Chart */}
        {/* <div style={{ marginBottom: "20px" }}>
          <h5>Category Distribution</h5>
          <Chart
            options={pieChartOptions}
            series={pieChartSeries}
            type="pie"
            width="380"
          />
        </div> */}

        {/* Sparkline Chart */}
        {/* <div>
          <h5>Sparkline Chart</h5>
          <Chart
            options={sparkOptions}
            series={sparkSeries}
            type="line"
            width="100%"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Admin;
