import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import moment from "moment";

const GenericPdfDownloader = ({ downloadFileName, content }) => {
  const contentRef = useRef();
  useEffect(() => {
  }, [content]);
  const downloadPdfDocument = () => {
    html2canvas(contentRef.current, {
      scale: 2,
      windowWidth: 595,
      windowHeight: 842,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", [595, 842]);
      pdf.addImage(imgData, "PNG", 0, 0, 595, 842);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };
  function getDaysInMonth(date) {
    const month = moment(date).format("MM");
    const year = moment(date).format("yyyy");
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
  }
  return (
    <div>
      <div className="detailsbtn" onClick={downloadPdfDocument}>
        Download Pay Slip
      </div>
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "100%",
          height: "100%",
          padding: "20px",
          boxSizing: "border-box",
          //   backgroundColor: "#f0f0f0",
        }}
      >
        <div className="d-flex align-items-center">
          <div className="col-3 text-start">
            <img
              src={require("../../src/Assets/TA_logo.png")}
              width={"90%"}
              alt="Things alive logo"
            />
          </div>
          <div className="col-6">
            <span className="fs-13 text-start fw-bold">
              THINGS ALIVE SOLUTIONS PRIVATE LIMITED
            </span>
            <p className="fs-10 text-start">
              # 54, 1st cross, Planet Building, 4th Floor, Whitefield Main Road,
              Brooke Bond, Whitefield Bengaluru Karnataka 560066 India
            </p>
          </div>
          <div className="flex-column d-flex col-3">
            <span className="fs-10 text-end">Payslip For the Month</span>
            <span className="fs-10 text-end fw-bold">
              {moment(content.month).format("MMMM YYYY")}
            </span>
          </div>
        </div>
        <hr />
        <div className="text-start">
          <p className="fw-bold fs-10">EMPLOYEE SUMMARY</p>
          <div className="d-flex">
            <div className="col-5 d-flex justify-content-between">
              <div>
                <p className="fs-10">Employee Name</p>
                <p className="fs-10">Designation</p>
                <p className="fs-10">Employee ID</p>
                <p className="fs-10">Date of Joining</p>
                <p className="fs-10">Pay Period</p>
                <p className="fs-10">Pay Date</p>
              </div>
              <div>
                <p className="fs-10">: {content.name}</p>
                <p className="fs-10">: {content.Roll}</p>
                <p className="fs-10">: {content.Employee_ID}</p>
                <p className="fs-10">: {content.DateOfJoining}</p>
                <p className="fs-10">
                  : {moment(content.month).format("MMMM YYYY")}
                </p>
                <p className="fs-10">
                  : {moment(content.order).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
            <div className="col-7">
              <div className="d-flex justify-content-end">
                <div className="card p-20 w-70 text-center">
                  <span className="fw-bold">
                    {" "}
                    {"\u20B9"} {(content.Salary - content.Insurance).toFixed(2)}
                  </span>
                  <span className="fs-10">Employee Net Pay</span>
                  <hr />
                  <div className="d-flex justify-content-center">
                    <div className="flex-column d-flex">
                      <span className="fs-10">Paid Days</span>
                      <span className="fs-10">LOP Days</span>
                    </div>
                    <div className="flex-column d-flex">
                      <span className="fs-10">
                        : {getDaysInMonth(content.month)}.
                      </span>
                      <span className="fs-10">: 0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex">
          <div className="col-7 text-start">
            <span className="fs-10 fw-bold">Bank Account No</span>
            <span className="ms-2 fs-10">: {content.accNumber}</span>
          </div>
          <div className="col-5 text-start">
            <span className="fs-10 fw-bold"> Pan</span>
            <span className="ms-2 fs-10">:  {content.Pan_Number}</span>
          </div>
        </div>
        <div className="mt-10">
          <div className="d-flex">
            <div className="w-40 text-start card p-15 flex-row">
              <div className="col-6">
                <p className="fs-10 fw-bold">EARNINGS</p>
                <p className="fs-10">Basic</p>
                <p className="fs-10">House Rent Allowance</p>
                <p className="fs-10">Conveyance Allowance</p>
                <p className="fs-10">Other Allowance</p>
                <span className="fs-10 fw-bold">Gross Earnings</span>
              </div>
              <div className="col-3">
                <p className="fs-10 fw-bold">AMOUNT</p>
                <p className="fs-10">
                  {"\u20B9"}
                  {(content.Basic).toFixed(2)}
                </p>
                <p className="fs-10">
                  {"\u20B9"}
                  {(content.HouseRent).toFixed(2)}
                </p>
                <p className="fs-10">
                  {"\u20B9"}
                  {(content.conveyancePay).toFixed(2)}
                </p>
                <p className="fs-10">
                  {"\u20B9"}
                  {(content.othersPay).toFixed(2)}
                </p>
                <span className="fs-10 fw-bold">
                  {"\u20B9"}
                  {(content.Salary).toFixed(2)}
                </span>
              </div>
              <div className="col-3">
                <p className="fs-10 fw-bold">YTD</p>
                <p className="fs-10">{"\u20B9"}72,000.00</p>
                <p className="fs-10">{"\u20B9"}24,008.00</p>
                <p className="fs-10">{"\u20B9"}12,000.00</p>
                <p className="fs-10">{"\u20B9"}11,992.00</p>
                <p className="fs-10"></p>
              </div>
            </div>
            <div className="w-40  text-start card p-15 ml flex-row">
              <div className="col-6">
                <p className="fs-10 fw-bold">DEDUCTIONS</p>
                <p className="fs-10">Insurance</p>
                <p className="fs-10">&nbsp;</p>
                <p className="fs-10">&nbsp;</p>
                <p className="fs-10">&nbsp;</p>
                <span className="fs-10 fw-bold">Total Deductions</span>
              </div>
              <div className="col-3">
                <p className="fs-10 fw-bold">AMOUNT</p>
                <p className="fs-10">
                  {"\u20B9"}
                  {(content.Insurance).toFixed(2)}
                </p>
                <p className="fs-10">&nbsp;</p>
                <p className="fs-10">&nbsp;</p>
                <p className="fs-10">&nbsp;</p>
                <span className="fs-10 fw-bold">
                  {"\u20B9"}
                  {(content.Insurance).toFixed(2)}
                </span>
              </div>
              <div className="col-3">
                <p className="fs-10 fw-bold">YTD</p>
                <p className="fs-10">{"\u20B9"}12,240.00</p>
                <p className="fs-10"></p>
                <p className="fs-10"></p>
                <p className="fs-10"></p>
                <p className="fs-10"></p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="card p-10">
              <div className="d-flex justify-content-between align-items-center">
                <div className="flex-column d-flex text-start">
                  <span className="fw-bold fs-10">TOTAL NET PAYABLE</span>
                  <span className="fs-10">
                    Gross Earnings - Total Deductions
                  </span>
                </div>
                <div>
                  <span className="fs-10">
                    {"\u20B9"}
                    {(content.Salary).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericPdfDownloader;
