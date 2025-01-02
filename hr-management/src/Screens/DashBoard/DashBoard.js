import React, { useEffect, useRef, useState } from "react";
import "./DashBoard.css";
import { FiUsers } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { BsIntersect } from "react-icons/bs";
import { Table, Avatar } from "rsuite";
import { FetchData } from "../../apiservices";
import { Loders } from "../Loders";
import moment from "moment";
import { toast } from "react-toastify";

function DashBoard() {
  const initialized = useRef(false);
  const { Column, HeaderCell, Cell } = Table;
  const [projects, setprojects] = useState([]);
  const [jobrequirements, setjobrequirements] = useState([]);
  const [employees, setemployees] = useState([]);
  const [holidays, setholidays] = useState([]);
  const [count, setcount] = useState([]);
  const [Loder, setLoder] = useState(true);
  const todayDate = moment(new Date()).format("YYYY-MM-DD");
  const [present, setpresent] = useState([]);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getprojectsdata();
    }
  }, []);
  const getprojectsdata = () => {
    FetchData("Projects")
      .then((res) => {
        setprojects(res);
        getEmployeesdata();
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error}`, { autoClose: 1000 });
      });
  };
  const getEmployeesdata = () => {
    FetchData("Employees")
      .then((res) => {
        setemployees(res);
        getAttendancedata(res);
        const maleCount = res.filter((item) => item.gender === "Male");
        setcount(maleCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAttendancedata = (DailyAttendance) => {
    FetchData("Attendance")
      .then((res) => {
        DailyAttendance.forEach((e) => {
          const todayAttendance = res.filter(
            (item) => item.Day === todayDate && item.Status === "P" && e.first_name===item.EmployeeName
          );
          setpresent((prevPresent) => [...prevPresent, ...todayAttendance]);
        });
        Getdata();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Getdata = () => {
    FetchData("Jobrequirement")
      .then((res) => {
        getHolidays();
        setjobrequirements(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getHolidays = () => {
    FetchData("Holidays")
      .then((res) => {
        setLoder(false);
        setholidays(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="px-20">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="d-flex justify-content-between pt-10 h-15">
          <div className="w-24 card py-1">
            <div className="d-flex justify-content-around">
              <span>Total Employees</span>
              <span className="fw-bold">{employees.length}</span>
            </div>
            <div className="d-flex justify-content-around align-items-center pt-5">
              <FiUsers size={40} color="gray" />
              <div className="text-center">
                <div>Male</div>
                <div className="fw-bold">{count.length}</div>
              </div>
              <div className="text-center">
                <div>FeMale</div>
                <div className="fw-bold">{employees.length - count.length}</div>
              </div>
            </div>
          </div>
          <div className="w-24 card py-1">
            <div className="d-flex justify-content-around align-items-center h-100">
              <div>
                <FiUsers size={40} color="gray" />
              </div>
              <div className="text-center">
                <div>Today Attendance</div>
                <div className="fw-bold">{present.length}</div>
              </div>
            </div>
          </div>
          <div className="w-24 card">
            <div className="d-flex justify-content-around align-items-center h-100">
              <div>
                <GrProjects size={30} color="gray" />
              </div>
              <div className="text-center">
                <div>Projects</div>
                <div className="fw-bold">{projects.length}</div>
              </div>
            </div>
          </div>
          <div className="w-24 card">
            <div className="d-flex justify-content-around align-items-center h-100">
              <div>
                <BsIntersect size={40} color="gray" />
              </div>
              <div className="text-center">
                <div>Total Vacancies</div>
                <div className="fw-bold">{jobrequirements.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-42 pt-10">
          <div className="d-flex justify-content-between h-100">
            <div className="card w-40 mr-10 p-10">
              <div>Projects</div>
              <div className="pt-10">
                <Table
                  wordWrap="break-word"
                  bordered
                  data={projects}
                  onRowClick={(rowData) => {}}
                  fillHeight={true}
                  rowClassName={(rowData, rowIndex) => {
                    return rowIndex % 2 === 0 ? "even-row" : "odd-row";
                  }}
                >
                  <Column width={65} align="center" fixed>
                    <HeaderCell className="tableheader">Sl.No</HeaderCell>
                    <Cell dataKey="id" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">
                      Project Name
                    </HeaderCell>
                    <Cell dataKey="projectname" />
                  </Column>
                  <Column width={145} align="center" wordWrap>
                    <HeaderCell className="tableheader">
                      Project Manager
                    </HeaderCell>
                    <Cell dataKey="manager" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">
                      Project Lead
                    </HeaderCell>
                    <Cell dataKey="projectlead" />
                  </Column>
                  <Column width={145} align="center" wordWrap={true}>
                    <HeaderCell className="tableheader">
                      Total Employees
                    </HeaderCell>
                    <Cell dataKey="totalemployes" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">Start Date</HeaderCell>
                    <Cell dataKey="startdate" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">Status</HeaderCell>
                    <Cell dataKey="status" />
                  </Column>
                </Table>
              </div>
            </div>
            <div className="card w-40 p-10">
              <div>Employees</div>
              <div className="pt-10">
                <Table
                  wordWrap="break-word"
                  bordered
                  data={employees}
                  onRowClick={(rowData) => {}}
                  fillHeight={true}
                  rowClassName={(rowData, rowIndex) => {
                    // Use a ternary operator to apply even and odd row colors
                    return rowIndex % 2 === 0 ? "even-row" : "odd-row";
                  }}
                >
                  <Column width={65} align="center" fixed>
                    <HeaderCell className="tableheader">Sl.No</HeaderCell>
                    <Cell dataKey="id" />
                  </Column>
                  <Column width={170}>
                    <HeaderCell className="tableheader">First Name</HeaderCell>
                    <Cell>
                      {(item) => (
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            {item.profilepic !== "" ? (
                              <Avatar
                                size="sm"
                                circle
                                src={item.profilepic}
                                alt="@SevenOutman"
                              />
                            ) : (
                              <Avatar
                                size="sm"
                                style={{
                                  background: "#244E96",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                circle
                              >
                                <span className="fs-18">
                                  {item.first_name.charAt(0)}
                                </span>
                              </Avatar>
                            )}
                          </div>
                          <div className="pl-10">
                            <span>{item.first_name}</span>
                          </div>
                        </div>
                      )}
                    </Cell>
                  </Column>

                  <Column width={160}>
                    <HeaderCell className="tableheader">Last Name</HeaderCell>
                    <Cell dataKey="last_name" />
                  </Column>

                  <Column width={110}>
                    <HeaderCell className="tableheader">Gender</HeaderCell>
                    <Cell dataKey="gender" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell className="tableheader">
                      Date of Birth
                    </HeaderCell>
                    <Cell dataKey="dob" />
                  </Column>
                  <Column width={130}>
                    <HeaderCell className="tableheader">Employee ID</HeaderCell>
                    <Cell dataKey="employee_id" style={{ marginLeft: 15 }} />
                  </Column>
                  <Column width={210}>
                    <HeaderCell className="tableheader">Email</HeaderCell>
                    <Cell dataKey="email" />
                  </Column>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <div className="h-42 pt-10">
          <div className="d-flex justify-content-between h-100">
            <div className="card w-40 mr-10 p-10">
              <div>Job Requirement</div>
              <div className="pt-10">
                <Table
                  wordWrap="break-word"
                  bordered
                  data={jobrequirements}
                  onRowClick={(rowData) => {}}
                  fillHeight={true}
                  rowClassName={(rowData, rowIndex) => {
                    // Use a ternary operator to apply even and odd row colors
                    return rowIndex % 2 === 0 ? "even-row" : "odd-row";
                  }}
                >
                  <Column width={65} align="center" fixed>
                    <HeaderCell className="tableheader">Sl.No</HeaderCell>
                    <Cell dataKey="id" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">
                      Job Position
                    </HeaderCell>
                    <Cell dataKey="jobposition" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">
                      Qualification
                    </HeaderCell>
                    <Cell dataKey="qualification" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">Work Mode</HeaderCell>
                    <Cell dataKey="availability" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">Experience</HeaderCell>
                    <Cell dataKey="relevantExperience" />
                  </Column>
                  <Column width={140} align="center">
                    <HeaderCell className="tableheader">Salary</HeaderCell>
                    <Cell dataKey="salary" />
                  </Column>
                </Table>
              </div>
            </div>
            <div className="card w-40 p-10">
              <div>Holidays List</div>
              <div className="pt-10">
                <Table
                  wordWrap="break-word"
                  bordered
                  data={holidays}
                  onRowClick={(rowData) => {}}
                  fillHeight={true}
                  rowClassName={(rowData, rowIndex) => {
                    // Use a ternary operator to apply even and odd row colors
                    return rowIndex % 2 === 0 ? "even-row" : "odd-row";
                  }}
                >
                  <Column width={65} align="center">
                    <HeaderCell className="tableheader">Sl.No</HeaderCell>
                    <Cell dataKey="id" />
                  </Column>

                  <Column flexGrow={1}>
                    <HeaderCell className="tableheader">Date</HeaderCell>
                    <Cell dataKey="date" />
                  </Column>

                  <Column flexGrow={1}>
                    <HeaderCell className="tableheader">Day</HeaderCell>
                    <Cell dataKey="day" />
                  </Column>

                  <Column flexGrow={1}>
                    <HeaderCell className="tableheader">Holiday</HeaderCell>
                    <Cell dataKey="Holiday" />
                  </Column>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
