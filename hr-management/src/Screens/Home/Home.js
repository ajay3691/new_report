import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Pagination } from "rsuite";
import { useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Avatar } from "rsuite";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { BiSolidFileExport } from "react-icons/bi";
import { FetchData, DeleteData } from "../../apiservices";
import { exportToExcel } from "react-json-to-excel";
import { Loders } from "../Loders";
import { toast } from "react-toastify";
function Home() {
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [Loder, setLoder] = useState(true);
  const { Column, HeaderCell, Cell } = Table;
  const [userdata, setuserdata] = useState([]);
  const [Employeedata, setEmployeedata] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [querydata, setquery] = useState();
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteid, setdeleteid] = useState();
  const [passwordhide, setpasswordhide] = useState(false);
  const [rowdata, setrowdata] = useState([]);
  const [rowhide, setrowhide] = useState(true);
  const [genderCount, setgenderCount] = useState([]);
  const [newemployees, setnewemployees] = useState([]);
  const closepopup = () => setdeletepopup(false);
  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  const getdata = () => {
    FetchData("Employees")
      .then((res) => {
        setuserdata(res);
        setEmployeedata(res);
        const count = res.filter((item) => item.gender === "Male");
        let timedays = 24*60 * 60 * 1000;
        const newEmployees = res.filter(
          (item) => item.TimeStamp + timedays > new Date().getTime()
        );
        setnewemployees(newEmployees);
        setgenderCount(count);
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`, { autoClose: 1000 });
      });
  };

  const deletedata = (deleteid) => {
    DeleteData("Employees", deleteid)
      .then((res) => {
        setrowhide(true);
        getdata();
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
      });
  };
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getdata();
    }
  }, []);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const data = userdata.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const getData = (j) => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.toLowerCase(); // Convert to lowercase
        }
        if (typeof y === "string") {
          y = y.toLowerCase(); // Convert to lowercase
        }
        if (sortColumn === "dob") {
          x = new Date(...a[sortColumn].split("/").reverse());
          y = new Date(...b[sortColumn].split("/").reverse());
        }
        if (sortType === "asc") {
          return x < y ? -1 : 1; // Compare in a case-insensitive manner
        } else {
          return x > y ? -1 : 1; // Compare in a case-insensitive manner
        }
      });
    }
    return data;
  };
  const changedata = (params) => {
    if (params.length === 0) {
      getdata();
    } else {
      const lowerCaseParams = params.toLowerCase();
      const searchData = userdata?.filter((item) => {
        return item.first_name.toLowerCase().match(lowerCaseParams);
      });
      setuserdata(searchData);
    }
  };

  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className={rowhide ? "h-100" : "d-none"}>
          <div className="d-flex">
            <div className="col-2">
              <div className="card mr-10 pt-10 text-center">
                <span>Total Employees</span>
                <p className="fw-bold">{Employeedata.length}</p>
              </div>
            </div>
            <div className="col-2">
              <div className="card mr-10 pt-10 text-center">
                <span>New Employees</span>
                <p className="fw-bold">{newemployees.length}</p>
              </div>
            </div>
            <div className="col-2">
              <div className="card mr-10 pt-10 text-center">
                <span>Male</span>
                <p className="fw-bold">{genderCount.length}</p>
              </div>
            </div>
            <div className="col-2">
              <div className="card pt-10 text-center">
                <span>Female</span>
                <p className="fw-bold">
                  {Employeedata.length - genderCount.length}
                </p>
              </div>
            </div>
            <div className="col-2">
              <div
                className="p-3"
                onClick={() => {
                  navigate("/Registered");
                  localStorage.removeItem("user");
                }}
              >
                <FiUserPlus size={30} color="#808080" />
              </div>
            </div>
            <div className="col-2"></div>
          </div>
          <div className="h-87 mt-2">
            <div className="p-10 h-100 card">
              <div className="d-flex align-items-center justify-content-between">
                <div className="input-group" style={{ width: 250 }}>
                  <span id="1" className="input-group-text">
                    <IoSearchOutline />
                  </span>
                  <input
                    type="search"
                    name="name"
                    className="form-control ml"
                    placeholder="Search by Name"
                    value={querydata}
                    onChange={(e) => {
                      setquery(e.target.value);
                      changedata(e.target.value);
                    }}
                    aria-describedby="1"
                  />
                </div>
                <div className="d-flex align-items-center">
                  <span className="mr-5">Export</span>
                  <BiSolidFileExport
                    color="244F96"
                    size={25}
                    onClick={() => exportToExcel(userdata, "EmployeesData")}
                    className="pointer"
                  />
                </div>
              </div>
              <div className="pt-10 h-85">
                <Table
                  // cellBordered
                  wordWrap="break-word"
                  bordered
                  data={getData()}
                  onRowClick={(rowData) => {}}
                  fillHeight={true}
                  sortColumn={sortColumn}
                  sortType={sortType}
                  onSortColumn={handleSortColumn}
                  loading={loading}
                  rowClassName={(rowData, rowIndex) => {
                    // Use a ternary operator to apply even and odd row colors
                    return rowIndex % 2 === 0 ? "even-row" : "odd-row";
                  }}
                >
                  <Column width={60} align="center" fixed sortable>
                    <HeaderCell className="tableheader">Id</HeaderCell>
                    <Cell dataKey="id" />
                  </Column>
                  <Column width={170} sortable>
                    <HeaderCell className="tableheader">First Name</HeaderCell>
                    <Cell dataKey="first_name">
                      {(item) => (
                        <div
                          className="d-flex align-items-center"
                          onClick={() => {
                            setrowdata(item);
                            setrowhide(false);
                          }}
                        >
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

                  <Column width={160} sortable>
                    <HeaderCell className="tableheader">Last Name</HeaderCell>
                    <Cell dataKey="last_name" />
                  </Column>

                  <Column width={110} sortable>
                    <HeaderCell className="tableheader">Gender</HeaderCell>
                    <Cell dataKey="gender" />
                  </Column>
                  <Column width={145} sortable>
                    <HeaderCell className="tableheader">
                      Date of Birth
                    </HeaderCell>
                    <Cell dataKey="dob" />
                  </Column>
                  <Column width={130} sortable>
                    <HeaderCell className="tableheader">Employ ID</HeaderCell>
                    <Cell dataKey="employee_id" style={{ marginLeft: 15 }} />
                  </Column>
                  <Column width={210} sortable>
                    <HeaderCell className="tableheader">Email</HeaderCell>
                    <Cell dataKey="email">
                      {(item) => (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}&su=Subject:%20 Things alive Credentials&body=Message:%20your Mail and Password is ${item.Office_Mail}, ${item.password}`}
                        >
                          {item.email}
                        </a>
                      )}
                    </Cell>
                  </Column>
                  <Column width={125}>
                    <HeaderCell className="tableheader">
                      Password{" "}
                      {passwordhide ? (
                        <BsEyeFill
                          onClick={() => {
                            setpasswordhide(false);
                          }}
                        />
                      ) : (
                        <BsEyeSlashFill
                          onClick={() => {
                            setpasswordhide(true);
                          }}
                        />
                      )}
                    </HeaderCell>
                    {passwordhide ? (
                      <Cell dataKey="password" />
                    ) : (
                      <Cell>
                        <span className="fs-20">............</span>
                      </Cell>
                    )}
                  </Column>
                  <Column width={80}>
                    <HeaderCell className="tableheader">Actions</HeaderCell>
                    <Cell>
                      {(item) => (
                        <div className="d-flex text-center">
                          <div
                            onClick={() => {
                              localStorage.setItem(
                                "user",
                                JSON.stringify(item)
                              );
                              navigate("/Registered");
                            }}
                          >
                            <FiEdit />
                          </div>
                          <div
                            className="pl-15"
                            onClick={() => {
                              setdeleteid(item.deleteId);
                              setdeletepopup(true);
                            }}
                          >
                            <RiDeleteBin6Line />
                          </div>
                        </div>
                      )}
                    </Cell>
                  </Column>
                </Table>
              </div>
              <div className="pt-15">
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="xs"
                  layout={["total", "-", "limit", "|", "pager", "skip"]}
                  total={userdata.length}
                  limitOptions={[2, 5, 10, 30, 50]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div>
            </div>
          </div>
          <Modal open={deletepopup} onClose={closepopup}>
            <Modal.Header>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              Are you sure you want to delete this item? This action cannot be
              undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setLoder(true);
                  deletedata(deleteid);
                  setdeletepopup(false);
                }}
                style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
              >
                Ok
              </Button>
              <Button
                onClick={() => {
                  setdeletepopup(false);
                }}
                style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className={rowhide ? "d-none" : "h-100"}>
          <div className="d-flex align-items-center p-10">
            <BsFillArrowLeftCircleFill
              size={25}
              color="#1EB0DF"
              onClick={() => {
                setrowhide(true);
              }}
            />
            <div className="pl-20">
              <span style={{ color: "#1EB0DF", fontSize: 20 }}>
                Profile Details
              </span>
            </div>
          </div>
          <div className="h-90 d-flex">
            <div className="col-3 d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center justify-content-center pt-5">
                <div className="cardStyle">
                  {rowdata.profilepic !== "" ? (
                    <img
                      src={rowdata.profilepic}
                      alt="Card"
                      width={"100%"}
                      height={"100%"}
                    />
                  ) : (
                    <div
                      style={{ background: "#244F96", borderRadius: 5 }}
                      className="h-100 align-items-center justify-content-center d-flex"
                    >
                      <p className="fs-60 white">
                        {rowdata.first_name.charAt(0)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Name:</span>
                <span className="pl-10">{rowdata.first_name}</span>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Last Name:</span>
                <span className="pl-10">{rowdata.last_name}</span>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Date of Birth:</span>
                <span className="pl-10"> {rowdata.dob}</span>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Gender:</span>
                <span className="pl-10">{rowdata.gender}</span>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Age:</span>
                <span className="pl-10">{rowdata.Age}</span>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Blood Group:</span>
                <span className="pl-10">{rowdata.blood_group}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Address:</span>
                <span className="pl-10">{rowdata.address}</span>
              </div>
            </div>
            <div className="col-3 pl-20 d-flex flex-column justify-content-between">
              <div className="p-10 bgwhite rounded">
                <span>Mobile Number:</span>
                <span className="pl-10">{rowdata.mobileno}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Employ ID:</span>
                <span className="pl-10">{rowdata.employee_id}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Job Title:</span>
                <span className="pl-10">{rowdata.job_title}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Job Role:</span>
                <span className="pl-10">{rowdata.job_role}</span>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Joining Date:</span>
                <span className="pl-10">{rowdata.joining_date}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Email:</span>
                <span className="pl-10">{rowdata.email}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Office Mail:</span>
                <span className="pl-10">{rowdata.Office_Mail}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Password:</span>
                <span className="pl-10">{rowdata.password}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Alternative Mobile No:</span>
                <span className="pl-10">{rowdata.Alternative_MobileNo}</span>
              </div>{" "}
            </div>
            <div className="col-3 pl-20 d-flex flex-column justify-content-between">
              <div className="p-10 bgwhite rounded">
                <span>Aadhar Number:</span>
                <span className="pl-10">{rowdata.AdharNo}</span>
              </div>
              <div className="p-10 bgwhite rounded">
                <span>Pan Number:</span>
                <span className="pl-10">{rowdata.PanNo}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Employee Work Mode:</span>
                <span className="pl-10">{rowdata.Employee_Workmode}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Employee Work Type:</span>
                <span className="pl-10">{rowdata.Employee_work}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>IFSC Code:</span>
                <span className="pl-10">{rowdata.IFSC_code}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Account Type:</span>
                <span className="pl-10"> {rowdata.Account_Type}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Bank Name:</span>
                <span className="pl-10">{rowdata.Bank_name}</span>
              </div>{" "}
              <div className="p-10 bgwhite rounded">
                <span>Account Number:</span>
                <span className="pl-10">{rowdata.Account_Number}</span>
              </div>{" "}
              <div className="p-20"></div>
              <div></div>
              <div></div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
