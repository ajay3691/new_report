import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FetchData, updateData, postData } from "../apiservices";
import moment from "moment";
import { Modal, Button, DatePicker } from "rsuite";
import { Loders } from "./Loders";
import { toast } from "react-toastify";

function PayrollForm() {
  const payrooldata = localStorage.getItem("payroolitem");
  const payslipitem = JSON.parse(payrooldata);
  const [Name, setName] = useState(payslipitem ? payslipitem.name : "");
  const [ACNumber, setACNumber] = useState(
    payslipitem ? payslipitem.accNumber : ""
  );
  const [Month, setMonth] = useState(payslipitem ? payslipitem.month : "");
  const [Insurance, setInsurance] = useState(
    payslipitem ? payslipitem.Insurance : ""
  );
  const [basic, setbasic] = useState(payslipitem ? payslipitem.Basic : "");
  const [houseRent, sethouseRent] = useState(
    payslipitem ? payslipitem.HouseRent : ""
  );
  const [ConveyanceAllowance, setConveyanceAllowance] = useState(
    payslipitem ? payslipitem.conveyancePay : ""
  );
  const [otherAllowance, setotherAllowance] = useState(
    payslipitem ? payslipitem.othersPay : ""
  );
  const [UserData, setUserData] = useState([]);
  const [Jobrole, setJobroll] = useState(payslipitem ? payslipitem.Roll : "");
  const [status, setstatus] = useState(payslipitem ? payslipitem.Status : "");
  const [EmployeeID, setEmployeeID] = useState(
    payslipitem ? payslipitem.Employee_ID : ""
  );
  const [Pan_No, setPan_No] = useState(
    payslipitem ? payslipitem.Pan_Number : ""
  );
  const [DateOf_Joining, setDateOf_Joining] = useState(
    payslipitem ? payslipitem.DateOfJoining : ""
  );
  const [profilepic, setprofilepic] = useState("");
  const [openpopUp, setopenpopUp] = useState(false);
  const [Loder, setLoder] = useState(false);
  const TotalPay =
    parseFloat(basic || 0) +
    parseFloat(houseRent || 0) +
    parseFloat(ConveyanceAllowance || 0) +
    parseFloat(otherAllowance || 0);

  const navigate = useNavigate();
  const data = {
    name: Name,
    Roll: Jobrole,
    Salary: TotalPay,
    paySlip: "View",
    Status: status,
    profilepic: profilepic,
    month: moment(Month).format("YYYY-MM-DD"),
    Insurance: Insurance,
    Basic: basic,
    HouseRent: houseRent,
    conveyancePay: ConveyanceAllowance,
    othersPay: otherAllowance,
    accNumber: ACNumber,
    Employee_ID: EmployeeID,
    DateOfJoining: DateOf_Joining,
    Pan_Number: Pan_No,
  };
  const postdata = () => {
    postData("Payroll", data)
      .then((res) => {
        if (res) {
          setLoder(false);
          setopenpopUp(true);
        }
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const Updatepayroolitem = (id) => {
    updateData("Payroll", data, `${id}`)
      .then((res) => {
        setLoder(false);
        setopenpopUp(true);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const getdata = () => {
    FetchData("Employees")
      .then((res) => {
        setUserData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="container-fluid">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="d-flex pt-15">
          <div className="text-center d-flex align-items-center">
            <div>
              <BsFillArrowLeftCircleFill
                size={25}
                color="#244E96"
                onClick={() => {
                  navigate("/Payroll");
                  localStorage.removeItem("payroolitem");
                }}
              />
            </div>
            <div className="pl-20">
              <span className="fs-20">Add Pay Slip</span>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="d-flex">
            <div className="col-6">
              <div className="pt-10">
                <label className="form-label">Name</label>
                <select
                  className="form-select w-80 p-5"
                  onChange={(e) => {
                    UserData.forEach((item) => {
                      if (e.target.value === item.first_name) {
                        setACNumber(item.Account_Number);
                        setJobroll(item.job_role);
                        setEmployeeID(item.employee_id);
                        setPan_No(item.PanNo);
                        setDateOf_Joining(item.joining_date);
                      }
                    });
                    setName(e.target.value);
                  }}
                  value={Name}
                >
                  <option></option>
                  {UserData.map((item, index) => (
                    <option key={index} value={item.first_name}>
                      {item.first_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-10">
                <label className="form-label">Bank Acc Number</label>
                <input
                  className="form-control w-80 p-5"
                  type="number"
                  name="ACNumber"
                  value={ACNumber}
                  disabled
                />
              </div>
              <div className="pt-10">
                <label htmlFor="monthYearInput" className="form-label">
                  Select Month
                </label>
                <DatePicker
                  format="yyyy-MM"
                  placeholder={
                    payslipitem
                      ? moment(payslipitem.month).format("MMMM yyyy")
                      : ""
                  }
                  className="w-80"
                  oneTap
                  onChange={(e, date) => {
                    setMonth(e);
                  }}
                />
              </div>
              <div className="pt-10">
                <label className="form-label">Insurance</label>
                <input
                  className="form-control w-80 p-5"
                  type="number"
                  value={Insurance}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setInsurance(parseFloat(e.target.value));
                    } else {
                      setInsurance("");
                    }
                  }}
                />
              </div>
              <div className="pt-10">
                <label className="form-label">Basic</label>
                <input
                  className="form-control w-80 p-5"
                  type="number"
                  value={basic}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setbasic(parseFloat(e.target.value));
                    } else {
                      setbasic("");
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="pt-10">
                <label className="form-label">House Rent Allowance</label>
                <input
                  className="form-control w-80 p-5"
                  type="number"
                  name="Jobrole"
                  value={houseRent}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      sethouseRent(parseFloat(e.target.value));
                    } else {
                      sethouseRent("");
                    }
                  }}
                />
              </div>
              <div className="pt-10">
                <label className="form-label">Conveyance Allowance</label>
                <input
                  className="form-control w-80 p-5"
                  type="Number"
                  name="Jobrole"
                  value={ConveyanceAllowance}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setConveyanceAllowance(parseFloat(e.target.value));
                    } else {
                      setConveyanceAllowance("");
                    }
                  }}
                />
              </div>
              <div className="pt-10">
                <label className="form-label">Other Allowance</label>
                <input
                  className="form-control w-80 p-5"
                  type="Number"
                  name="Jobrole"
                  value={otherAllowance}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setotherAllowance(parseFloat(e.target.value));
                    } else {
                      setotherAllowance("");
                    }
                  }}
                />
              </div>
              <div className="pt-10">
                <label className="form-label">Gross Pay</label>
                <input
                  className="form-control w-80 p-5"
                  type="number"
                  value={TotalPay}
                  onChange={(e) => {}}
                />
              </div>
              <div className="pt-10">
                <label className="form-label">Salary Status</label>
                <select
                  className="form-select w-80 p-5"
                  onChange={(e) => {
                    setstatus(e.target.value);
                  }}
                  value={status}
                >
                  <option></option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-5 w-80 ms-5">
            {payslipitem ? (
              <div className="pt-20 text-center">
                <button
                  type="button"
                  className="btn mb-3 submitbtn"
                  onClick={() => {
                    setLoder(true);
                    Updatepayroolitem(payslipitem.deleteId);
                  }}
                  disabled={
                    !(
                      Name &&
                      ACNumber &&
                      Month &&
                      basic &&
                      Insurance &&
                      houseRent &&
                      ConveyanceAllowance &&
                      otherAllowance &&
                      status
                    )
                  }
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="pt-20 text-center">
                <button
                  type="submit"
                  className="btn mb-3 submitbtn"
                  onClick={() => {
                    setLoder(true);
                    postdata();
                  }}
                  disabled={
                    !(
                      Name &&
                      ACNumber &&
                      Month &&
                      basic &&
                      Insurance &&
                      houseRent &&
                      ConveyanceAllowance &&
                      otherAllowance &&
                      status
                    )
                  }
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-4"></div>
      </div>
      <Modal
        open={openpopUp}
        onClose={() => {
          setopenpopUp(false);
          navigate("/Payroll");
          localStorage.removeItem("payroolitem");
        }}
      >
        <Modal.Header>
          <Modal.Title>Pay Slip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!payslipitem ? (
            <p>Pay Slip Created Successfully!</p>
          ) : (
            <p>Pay Slip Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/Payroll");
              localStorage.removeItem("payroolitem");
            }}
            style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PayrollForm;
