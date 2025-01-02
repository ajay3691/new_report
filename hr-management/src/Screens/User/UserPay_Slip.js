import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FetchData } from "../../apiservices";
import moment from "moment";
ChartJS.register(ArcElement, Tooltip, Legend);
function UserPaySlip() {
  const loginitem = localStorage.getItem("login");
  const Employeesitems = JSON.parse(loginitem);
  const [PaySlips, setPaySlip] = useState([]);
  const [showpaySlip, setshowpaySlip] = useState({
    Salary: 0,
    Insurance: 0,
    Basic: 0,
    conveyancePay: 0,
    HouseRent: 0,
    othersPay: 0,
  }); // Initialize with an empty object

  useEffect(() => {
    getpaySlipdata();
  }, []);

  const getpaySlipdata = () => {
    FetchData("Payroll")
      .then((res) => {
        const payslipItem = res.filter(
          (item) => item.name === Employeesitems.first_name
        );
        if (payslipItem.length !== 0) {
          setshowpaySlip(payslipItem[0]);
        }
        setPaySlip(payslipItem);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Set display property to false to hide labels
        position: "top", // You can adjust the position if needed
        labels: {
          boxWidth: 15, // Adjust the box width as needed
          usePointStyle: true, // Use point style for legend items if desired
        },
      },
    },
  };
  const data = {
    labels: ["Gross Pay", "Deductions"],
    datasets: [
      {
        data: [showpaySlip?.Salary, showpaySlip?.Insurance],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      },
    ],
  };
  function getDaysInMonth(date) {
    const month = moment(date).format("MM");
    const year = moment(date).format("yyyy");
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
  }
  return (
    <div className="h-100 p-10" style={{ overflowY: "auto" }}>
      <div className="d-flex">
        <div className="">
          <select
            className="form-select"
            onChange={(e) => {
              if (e.target.value !== "SelectMonth") {
                const slip = PaySlips.filter(
                  (item) => item.month === e.target.value
                );
                setshowpaySlip(...slip);
              } else {
                console.log(e.target.value);
              }
            }}
          >
            <option>SelectMonth</option>
            {PaySlips.map((item, index) => (
              <option value={item.month} key={index}>
                {moment(item.month).format("MMMM YYYY")}
              </option>
            ))}
          </select>
          <p style={{ fontWeight: "bold" }} className="fs-20 pt-20">
            Take Home :{" "}
            <span>
              {"\u20B9"}
              {(showpaySlip?.Salary - showpaySlip?.Insurance).toFixed(2)}
            </span>
          </p>
          <div className="d-flex">
            <div>
              <span>Deductions</span>
              <p>
                {"\u20B9"}
                {(showpaySlip?.Insurance).toFixed(2)}
              </p>
            </div>
            <div className="pl-20">
              <span>Gross Pay</span>
              <p>
                {"\u20B9"}
                {(showpaySlip?.Salary).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="ms-5">
          <Pie data={data} options={options} width={190} height={190} />
        </div>
      </div>
      <div className="">
        <div>
          <p className="fs-20">
            Pay Slip Details :{" "}
            <span>
              {"\u20B9"}
              {(showpaySlip?.Salary).toFixed(2)}
            </span>
          </p>
        </div>
        <div className="card">
          <div className="p-10 d-flex">
            <div>
              <p>{moment(showpaySlip?.month).format("MMMM YYYY")}</p>
              <span>
                Paid Days {getDaysInMonth(showpaySlip?.month)}. LOP Days : 0
              </span>
            </div>
            <div style={{ marginInline: 50 }}>
              <p>Bank Account Number</p>
              <span>{showpaySlip?.accNumber}</span>
            </div>
            <div>
              <p>UAN</p>
              <span className="pl-10"> - </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
        <div className="d-flex h-100">
          <div className="w-40 card p-10">
            <div style={{ fontWeight: "bold" }} className="text-center">
              <p>Earnings</p>
            </div>
            <div className="h-75">
              <div className="d-flex justify-content-between">
                <p>Basic</p>
                <p>
                  {"\u20B9"}
                  {(showpaySlip?.Basic).toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>House Rent Allowance</p>
                <p>
                  {"\u20B9"}
                  {(showpaySlip?.HouseRent).toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Conveyance Allowance</p>
                <p>
                  {"\u20B9"}
                  {(showpaySlip?.conveyancePay).toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Other Allowance</p>
                <p>
                  {"\u20B9"}
                  {(showpaySlip?.othersPay).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Total</h6>
              <h6>
                {"\u20B9"}
                {(showpaySlip?.Salary).toFixed(2)}
              </h6>
            </div>
          </div>
          <div className="w-40 card p-10 ml">
            <div style={{ fontWeight: "bold" }} className="text-center">
              <p>Deductions</p>
            </div>
            <div className="h-75">
              <div className="d-flex justify-content-between">
                <p>Insurance</p>
                <p>
                  {"\u20B9"}
                  {(showpaySlip?.Insurance).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Total</h6>
              <h6>
                {"\u20B9"}
                {(showpaySlip?.Insurance).toFixed(2)}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex  align-items-center">
        <div className="w-40 pt-10">
          Your Take Home Salary Amount (Net Pay){" "}
          {(showpaySlip?.Salary - showpaySlip?.Insurance).toFixed(2)}
        </div>
        <div className="w-40 ml pt-10">
          Net Pay = Total Earnings - Total Deductions
        </div>
      </div>
    </div>
  );
}

export default UserPaySlip;
