import React, { useState } from "react";
import Sidenav from "./Sidenav";
import Topnav from "./Topnav";
import Chart from "react-apexcharts";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const employees = 50;
  const employeeGrowth = "10% increase";
  const projects = 12;
  const projectGrowth = "5% increase";
  const tasksCompleted = 120;
  const taskCompletionRate = "95%";
  const income = "$5,456";
  const incomeGrowth = "+14%";

  // Static data for charts
  const barChartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    colors: ["#4CAF50"],
  };
  const barChartSeries = [
    {
      name: "Tasks",
      data: [20, 30, 25, 35],
    },
  ];

  const donutChartOptions = {
    labels: ["Completed", "Pending"],
    colors: ["#4CAF50", "#FFC107"],
  };
  const donutChartSeries = [75, 25];

  const lineChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: ["January", "February", "March", "April"],
    },
    colors: ["#FF5722"],
  };
  const lineChartSeries = [
    {
      name: "Performance",
      data: [70, 80, 90, 85],
    },
  ];

  const radialBarChartSeries = [75];
  const radialBarChartOptions = {
    chart: {
      type: "radialBar",
      offsetY: 0,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
          background: "transparent",
        },
        track: {
          background: "#e0e0e0",
          strokeWidth: "100%",
          opacity: 1,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "12px",
            fontWeight: "bold",
            color: "#666",
            offsetY: -5,
          },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: "bold",
            color: "#111",
            offsetY: 5,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    colors: ["#4CAF50"],
    labels: ["Rate"],
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidenav />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Topnav />
        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
          {/* Summary Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {[
              { label: "Income", value: income, growth: incomeGrowth, color: "green" },
              { label: "Employees", value: employees, growth: employeeGrowth, color: "blue" },
              { label: "Projects", value: projects, growth: projectGrowth, color: "purple" },
              { label: "Tasks Completed", value: tasksCompleted, growth: taskCompletionRate, color: "green" },
            ].map((card, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  padding: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h5>{card.label}</h5>
                <h2>{card.value}</h2>
                <span style={{ color: card.color }}>{card.growth}</span>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <h5>Task Completion</h5>
              <Chart
                options={donutChartOptions}
                series={donutChartSeries}
                type="donut"
                width="100%"
              />
            </div>
            <div style={{ flex: 1 }}>
              <h5>Monthly Reports</h5>
              <Chart
                options={lineChartOptions}
                series={lineChartSeries}
                type="line"
                width="100%"
              />
            </div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <h5 style={{ color: "#333" }}>Attendance Rate</h5>
              <Chart
                options={radialBarChartOptions}
                series={radialBarChartSeries}
                type="radialBar"
                width="120"
              />
            </div>
          </div>

          {/* <div style={{ marginTop: "20px" }}>
            <h5>Leave Status</h5>
            <Chart
              options={barChartOptions}
              series={barChartSeries}
              type="bar"
              width="100%"
            />
          </div> */}

          {/* Bottom Level Cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            {[
              { label: "Work Progress", percentage: "80%", color: "#4CAF50" },
              { label: "Bug Fix Rate", percentage: "65%", color: "#FF5722" },
            ].map((card, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  background: "#fff",
                  padding: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <h5>{card.label}</h5>
                <div
                  style={{
                    height: "10px",
                    background: "#e0e0e0",
                    borderRadius: "5px",
                    overflow: "hidden",
                    margin: "10px 0",
                  }}
                >
                  <div
                    style={{
                      height: "10px",
                      width: card.percentage,
                      background: card.color,
                    }}
                  ></div>
                </div>
                <span style={{ fontWeight: "bold" }}>{card.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
