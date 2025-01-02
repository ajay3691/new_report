import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination, Button, Modal, DateRangePicker } from "rsuite";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FetchData, DeleteData } from "../../apiservices";
import { BiSolidFileExport } from "react-icons/bi";
import { exportToExcel } from "react-json-to-excel";
import { Loders } from "../Loders";
import moment from "moment";
import { toast } from "react-toastify";
function WorkDetails() {
  const navigate = useNavigate();
  const initialized = useRef(false);
  const [WorkDetails, setWorkDetails] = useState([]);
  const { Column, HeaderCell, Cell } = Table;
  const [Loder, setLoder] = useState(true);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setquery] = useState();
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteid, setdeleteid] = useState();
  const [statusdata, setstatusdata] = useState([]);
  const [Statusdropdown, setStatusdropdown] = useState();
  const [ExcelName, setExcelName] = useState("Task Details");
  const closepopup = () => setdeletepopup(false);
  const get = () => {
    FetchData("Tasks")
      .then((res) => {
        setWorkDetails(res);
        setstatusdata(res);
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`,{ autoClose: 1000 });

      });
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      get();
    }
  }, []);
  const deletetask = (id) => {
    DeleteData("Tasks", `${id}`)
      .then((res) => {
        get();
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
      });
  };
  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };
  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };
  const worktabledata = WorkDetails.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const workdata = () => {
    if (sortColumn && sortType) {
      return worktabledata.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortColumn === "date") {
          x = new Date(...a[sortColumn].split("/").reverse());
          y = new Date(...b[sortColumn].split("/").reverse());
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return worktabledata;
  };
  const changedata = (params) => {
    const lowerCaseParams = params.toLowerCase();
    if (params.length === 0) {
      setExcelName("Task Details");
      get();
    } else {
      let SearchNamedata = statusdata.filter(
        (item) => item.firstname.toLowerCase().match(lowerCaseParams)
      );
      setExcelName(params);
      setWorkDetails(SearchNamedata);
    }
  };
  const statushandle = (e) => {
    let filterddata = statusdata.filter(
      (item) => item.status === e.target.value
    );
    setExcelName(e.target.value);
    setWorkDetails(filterddata);
  };
  const datestatusHandler = (e) => {
    if (e) {
      const daterange = statusdata.filter(
        (item) =>
          item.date >= moment(e[0]).format("yyyy-MM-DD") &&
          item.date <= moment(e[1]).format("yyyy-MM-DD")
      );
      setExcelName(
        `${moment(e[0]).format("yyyy-MM-DD")} TO ${moment(e[1]).format("yyyy-MM-DD")} Task_List`
      );
      setWorkDetails(daterange);
    } else {
      get();
    }
  };
  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="card p-10 h-100">
          <div className="d-flex align-items-center justify-content-between">
            <div className="input-group w-20">
              <span id="1" className="input-group-text">
                <IoSearchOutline />
              </span>
              <input
                type="text"
                name="name"
                className="form-control w-20"
                placeholder="Search by Name"
                value={query}
                onChange={(e) => {
                  setquery(e.target.value);
                  changedata(e.target.value);
                }}
              />
            </div>
            <div className="w-20">
              <select
                className="form-select"
                onChange={statushandle}
                value={Statusdropdown}
              >
                <option value="">Filter by Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Ongoing">Ongoing</option>
              </select>
            </div>
            <div className="w-20">
              <DateRangePicker onChange={datestatusHandler} />
            </div>
            <div
              className="detailsbtn text-center"
              onClick={() => {
                get();
                setStatusdropdown("");
                setExcelName("Task Details");
              }}
            >
              Clear Filters
            </div>
            <div
              className="detailsbtn text-center"
              onClick={() => {
                navigate("/WorkAssign");
                localStorage.removeItem("work");
              }}
            >
              Add Work
            </div>
            <div className="d-flex align-items-center">
              <span className="mr-5">Export</span>
              <BiSolidFileExport
                color="244F96"
                size={25}
                onClick={() => exportToExcel(WorkDetails, ExcelName)}
                className="pointer"
              />
            </div>
          </div>
          <div className="pt-10 h-90">
            <Table
              wordWrap="break-word"
              bordered
              data={workdata()}
              onRowClick={(rowData) => {}}
              fillHeight={true}
              sortColumn={sortColumn}
              sortType={sortType}
              onSortColumn={handleSortColumn}
              loading={loading}
              rowClassName={(rowData, rowIndex) => {
                return rowIndex % 2 === 0 ? "even-row" : "odd-row";
              }}
            >
              <Column width={60} align="center" sortable>
                <HeaderCell className="tableheader">Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column width={150} sortable>
                <HeaderCell className="tableheader">First Name</HeaderCell>
                <Cell dataKey="firstname" />
              </Column>
              <Column width={150} sortable>
                <HeaderCell className="tableheader">Date :</HeaderCell>
                <Cell dataKey="date" />
              </Column>
              <Column width={150} sortable>
                <HeaderCell className="tableheader">Employ ID</HeaderCell>
                <Cell dataKey="employid" style={{ marginLeft: 15 }} />
              </Column>
              <Column width={200} sortable>
                <HeaderCell className="tableheader">Job Role</HeaderCell>
                <Cell dataKey="Jobrole" />
              </Column>
              <Column width={200} sortable>
                <HeaderCell className="tableheader">Task</HeaderCell>
                <Cell dataKey="task" />
              </Column>
              <Column width={180}>
                <HeaderCell className="tableheader">Status</HeaderCell>
                <Cell dataKey="status" />
              </Column>
              <Column width={100}>
                <HeaderCell className="tableheader">Actions</HeaderCell>
                <Cell>
                  {(item) => (
                    <div className="d-flex text-center">
                      <div
                        onClick={() => {
                          localStorage.setItem("work", JSON.stringify(item));
                          navigate("/WorkAssign");
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
          <div className="h-10 pt-20">
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
              total={WorkDetails.length}
              limitOptions={[5, 10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
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
                deletetask(deleteid);
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
    </div>
  );
}

export default WorkDetails;
