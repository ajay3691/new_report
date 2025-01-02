import React from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import moment from "moment";
import GenericPdfDownloader from "./pay_slip_PDF";
ChartJS.register(ArcElement, Tooltip, Legend);
function PaySlip() {
  let payslip = localStorage.getItem("payslip");
  let payslipitem = JSON.parse(payslip);
  const navigate = useNavigate();
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
        data: [payslipitem?.Salary, payslipitem?.Insurance],
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
    <div className="h-100 p-20">
      <div className="">
        <div className="d-flex align-items-center h-10">
          <div>
            <BsFillArrowLeftCircleFill
              size={25}
              color="#244E96"
              onClick={() => {
                navigate("/Payroll");
                localStorage.removeItem("payslip");
              }}
            />
          </div>
          <div className="pl-20">
            <span className="fs-20">Pay Slip</span>
          </div>
        </div>
        <div className="d-flex h-90 justify-content-between">
          <div className="d-flex">
            <div style={{ paddingLeft: 50 }} className="justify-content-center">
              <p style={{ fontWeight: "bold" }} className="fs-20">
                Take Home :{" "}
                <span>
                  {"\u20B9"}
                  {(payslipitem.Salary - payslipitem.Insurance).toFixed(2)}
                </span>
              </p>
              <div className="d-flex">
                <div>
                  <span>Gross Pay</span>
                  <p>
                    {"\u20B9"}
                    {payslipitem.Salary.toFixed(2)}
                  </p>
                </div>
                <div className="pl-20">
                  <span>Deductions</span>
                  <p>
                    {"\u20B9"}
                    {payslipitem.Insurance.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="fs-20">
                Pay Slip Details :{" "}
                <span>
                  {"\u20B9"}
                  {payslipitem.Salary.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="ms-5">
              <Pie data={data} options={options} width={190} height={190} />
            </div>
          </div>
          <div className="text-end">
            <GenericPdfDownloader downloadFileName={payslipitem.name+'_Pay_Slip'} content={payslipitem} />
          </div>
        </div>
      </div>
      <div className="pt-10">
        <div className="card">
          <div className="p-10 d-flex">
            <div>
              <p>{moment(payslipitem.month).format("MMMM YYYY")}</p>
              <span>
                Paid Days {getDaysInMonth(payslipitem.month)}. LOP Days : 0
              </span>
            </div>
            <div style={{ marginInline: 50 }}>
              <p>Bank Account Number</p>
              <span>{payslipitem.accNumber}</span>
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
                  {payslipitem.Basic.toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>House Rent Allowance</p>
                <p>
                  {"\u20B9"}
                  {payslipitem.HouseRent.toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Conveyance Allowance</p>
                <p>
                  {"\u20B9"}
                  {payslipitem.conveyancePay.toFixed(2)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Other Allowance</p>
                <p>
                  {"\u20B9"}
                  {payslipitem.othersPay.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Gross Earning</h6>
              <h6>
                {"\u20B9"}
                {payslipitem.Salary.toFixed(2)}
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
                  {payslipitem.Insurance.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Total Deductions</h6>
              <h6>
                {"\u20B9"}
                {payslipitem.Insurance.toFixed(2)}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex h-5 align-items-center">
        <div className="w-40 p-10">
          Your Take Home Salary Amount (Net Pay){" "}
          <span>
            {"\u20B9"}
            {(payslipitem.Salary - payslipitem.Insurance).toFixed(2)}
          </span>
        </div>
        <div className="w-40 ml p-10">
          Net Pay = Total Earnings - Total Deductions
        </div>
      </div>
    </div>
  );
}

export default PaySlip;
