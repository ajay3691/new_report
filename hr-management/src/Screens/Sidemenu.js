import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { Modal, Button } from "rsuite";
import { googleLogout } from '@react-oauth/google';
export function Sidemenu() {
  const loginitem = localStorage.getItem("login");
  const item = JSON.parse(loginitem);
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const from = useLocation().pathname || "/";
  const [locationFrom, setlocationFrom] = useState(from);
  const [reportcollapse, setreportcollapse] = useState(false);
  const [logoutpopUp, setlogoutpopUp] = useState(false);
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  const reportcollapsed = () => {
    setreportcollapse(!reportcollapse);
  };
  return (
    <div className="w-20">
      <div id="mySidenav" className="sidenav w-20">
        <div className="text-center">
          <img
            src={require("../Assets/thingsalivelogo.png")}
            width={"70%"}
            alt="Things alive logo"
          />
        </div>
        {item?.first_name === "Admin" ? (
          <>
            <div className="m-20">
              <div
                className={
                  locationFrom === "/DashBoard" ? "menuitemActive" : "menuitem"
                }
              >
                <span
                  onClick={() => {
                    setlocationFrom("/DashBoard");
                    navigate("/DashBoard");
                  }}
                >
                  DashBoard
                </span>
              </div>
            </div>
            <div className={collapse ? "submenubg m-3 pt-7 rounded" : "m-20"}>
              <div
                className="d-flex justify-content-between"
                data-bs-toggle="collapse"
                data-bs-target="#demo"
                onClick={toggleCollapse}
              >
                <span className={collapse ? "pl-10 menuitem" : "menuitem"}>
                  Employees
                </span>
                <div className="pr-10">
                  {collapse ? (
                    <BsChevronDown color="#fff" size={20} />
                  ) : (
                    <BsChevronRight color="#fff" size={20} />
                  )}
                </div>
              </div>
              <div id="demo" className="collapse mx-3">
                <div className="p-10">
                  <div
                    className={
                      locationFrom === "/Home" ? "menuitemActive2" : "menuitem"
                    }
                  >
                    <span
                      onClick={() => {
                        setlocationFrom("/Home");
                        navigate("/Home");
                      }}
                    >
                      Employees Details
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <div
                    className={
                      locationFrom === "/AttendanceTable"
                        ? "menuitemActive2"
                        : "menuitem"
                    }
                  >
                    <span
                      onClick={() => {
                        setlocationFrom("/AttendanceTable");
                        navigate("/AttendanceTable");
                      }}
                    >
                      Attendance Details
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <div
                    className={
                      locationFrom === "/WorkDetails"
                        ? "menuitemActive2"
                        : "menuitem"
                    }
                  >
                    <span
                      onClick={() => {
                        setlocationFrom("/WorkDetails");
                        navigate("/WorkDetails");
                      }}
                    >
                      Work Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="m-20">
            <div
              className={
                locationFrom === "/Userwork" ? "menuitemActive" : "menuitem"
              }
            >
              <span
                onClick={() => {
                  setlocationFrom("/Userwork");
                  navigate("/Userwork");
                }}
              >
                Work Details
              </span>
            </div>
          </div>
        )}
        <div className="m-20">
          <div
            className={
              locationFrom === "/Projects" ? "menuitemActive" : "menuitem"
            }
          >
            <span
              onClick={() => {
                setlocationFrom("/Projects");
                navigate("/Projects");
              }}
            >
              Projects
            </span>
          </div>
        </div>
        <div className="m-20">
          <div
            className={
              locationFrom === "/HolidaysList" ? "menuitemActive" : "menuitem"
            }
          >
            <span
              onClick={() => {
                setlocationFrom("/HolidaysList");
                navigate("/HolidaysList");
              }}
            >
              Holidays List
            </span>
          </div>
        </div>
        <div className="m-20">
          <div
            className={
              locationFrom === "/TrainingAndDev" ? "menuitemActive" : "menuitem"
            }
          >
            <span
              onClick={() => {
                setlocationFrom("/TrainingAndDev");
                navigate("/TrainingAndDev");
              }}
            >
              Training Development
            </span>
          </div>
        </div>
        {item?.first_name === "Admin" ? (
          <div className="m-20">
            <div
              className={
                locationFrom === "/Payroll" ? "menuitemActive" : "menuitem"
              }
            >
              <span
                onClick={() => {
                  setlocationFrom("/Payroll");
                  navigate("/Payroll");
                }}
              >
                Payroll
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="m-20">
              <div
                className={
                  locationFrom === "/UserPaySlip" ? "menuitemActive" : "menuitem"
                }
              >
                <span
                  onClick={() => {
                    setlocationFrom("/UserPaySlip");
                    navigate("/UserPaySlip");
                  }}
                >
                  Pay Slip
                </span>
              </div>
            </div>
            <div className="m-20">
              <div
                className={
                  locationFrom === "/LeaveForm" ? "menuitemActive" : "menuitem"
                }
              >
                <span
                  onClick={() => {
                    setlocationFrom("/LeaveForm");
                    navigate("/LeaveForm");
                  }}
                >
                  Leave Request
                </span>
              </div>
            </div>
          </>
        )}
        <div className="m-20">
          <div
            className={
              locationFrom === "/Jobrequirement" ? "menuitemActive" : "menuitem"
            }
          >
            <span
              onClick={() => {
                setlocationFrom("/Jobrequirement");
                navigate("/Jobrequirement");
              }}
            >
              Job Requirements
            </span>
          </div>
        </div>
        {item?.first_name === "Admin" ? (
          <>
            <div className="m-20">
              <div
                className={
                  locationFrom === "/HrPolicies" ? "menuitemActive" : "menuitem"
                }
              >
                <span
                  onClick={() => {
                    setlocationFrom("/HrPolicies");
                    navigate("/HrPolicies");
                  }}
                >
                  HR. Policies
                </span>
              </div>
            </div>
            <div className="m-20">
              <div
                className={
                  locationFrom === "/Departments"
                    ? "menuitemActive"
                    : "menuitem"
                }
              >
                <span
                  onClick={() => {
                    setlocationFrom("/Departments");
                    navigate("/Departments");
                  }}
                >
                  Department
                </span>
              </div>
            </div>
            <div
              className={reportcollapse ? "submenubg m-3 pt-7 rounded" : "m-20"}
            >
              <div
                className="d-flex justify-content-between"
                data-bs-toggle="collapse"
                data-bs-target="#reports"
                onClick={reportcollapsed}
              >
                <span
                  className={reportcollapse ? "pl-10 menuitem" : "menuitem"}
                >
                  Reports
                </span>
                <div className="pr-10">
                  {reportcollapse ? (
                    <BsChevronDown color="#fff" size={20} />
                  ) : (
                    <BsChevronRight color="#fff" size={20} />
                  )}
                </div>
              </div>
              <div id="reports" className="collapse mx-3">
                <div className="p-10">
                  <div
                    className={
                      locationFrom === "/Expenses"
                        ? "menuitemActive2"
                        : "menuitem"
                    }
                  >
                    <span
                      onClick={() => {
                        setlocationFrom("/Expenses");
                        navigate("/Expenses");
                      }}
                    >
                      Expenses
                    </span>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <div
                    className={
                      locationFrom === "/Invoices"
                        ? "menuitemActive2"
                        : "menuitem"
                    }
                  >
                    <span
                      onClick={() => {
                        setlocationFrom("/Invoices");
                        navigate("/Invoices");
                      }}
                    >
                      Invoices
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="m-20">
            <div
              className={
                locationFrom === "/Settings" ? "menuitemActive" : "menuitem"
              }
            >
              <span
                onClick={() => {
                  setlocationFrom("/Settings");
                  navigate("/Settings");
                }}
              >
                Settings
              </span>
            </div>
          </div>
        )}
        <div className="m-20">
          <span
            className="menuitem"
            onClick={() => {
              setlogoutpopUp(true);
            }}
          >
            Logout
          </span>
        </div>
      </div>

      <Modal
        open={logoutpopUp}
        onClose={() => {
          setlogoutpopUp(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to Logout ?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              localStorage.clear();
              googleLogout()
              navigate("/");
            }}
            style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              setlogoutpopUp(false)
            }}
            style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sidemenu;
