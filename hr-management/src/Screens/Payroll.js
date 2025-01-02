import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Modal, Pagination } from "rsuite";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FetchData, DeleteData } from "../apiservices";
import { Loders } from "./Loders";
import moment from "moment";
import { toast } from "react-toastify";
function Payroll() {
  const initialized = useRef(false);
  const { Column, HeaderCell, Cell } = Table;
  const [payrollData, setpayrollData] = useState([]);
  const [deletepopup, setdeletepopup] = useState(false);
  const [deletepayroolid, setdeletepayroolid] = useState();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [Loder, setLoder] = useState(true);
  const navigate = useNavigate();
  const getdata = () => {
    FetchData("Payroll")
      .then((res) => {
        setpayrollData(res);
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`,{ autoClose: 1000 });
      });
  };
  const deletepayroolitem = (id) => {
    DeleteData("Payroll", `${id}`)
      .then((res) => {
        getdata();
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
      getdata();
    }
  }, []);
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
  const data = payrollData.filter((v, i) => {
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
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortColumn === "joiningdate") {
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
    return data;
  };
  const Searchdata = (params) => {
    if (params.length === 0) {
      getdata();
    } else {
      const lowerCaseParams = params.toLowerCase();
      const searchData = payrollData.filter((item) =>
        item.name.toLowerCase().match(lowerCaseParams)
      );
      setpayrollData(searchData);
    }
  };
  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100 p-10 card" : "h-100 p-10 card"}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="input-group" style={{width:250}}>
            <span id="1" className="input-group-text">
              <IoSearchOutline />
            </span>
            <input
              type="search"
              name="name"
              className="form-control ml"
              placeholder="Search by Name"
              //   value={query}
              onChange={(e) => {
                Searchdata(e.target.value);
              }}
              aria-describedby="1"
            />
          </div>
          <div className="">
            <div
              className="detailsbtn"
              onClick={() => {
                localStorage.removeItem("payroolitem");
                navigate("/PayrollForm");
              }}
            >
              Add Pay Slip
            </div>
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
            <Column width={65} align="center" fixed>
              <HeaderCell className="tableheader">Sl.No</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column width={150}>
              <HeaderCell className="tableheader">Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>
            <Column width={150}>
              <HeaderCell className="tableheader">Roll</HeaderCell>
              <Cell dataKey="Roll" />
            </Column>

            <Column width={150}>
              <HeaderCell className="tableheader">Salary</HeaderCell>
              <Cell dataKey="Salary" />
            </Column>
            <Column width={150}>
              <HeaderCell className="tableheader">Month</HeaderCell>
              <Cell>{(item) => moment(item.month).format("MMMM YYYY")}</Cell>
            </Column>
            <Column width={150}>
              <HeaderCell className="tableheader">Pay Slip</HeaderCell>
              <Cell>
                {(item) => {
                  return (
                    <div
                      onClick={() => {
                        localStorage.setItem("payslip", JSON.stringify(item));
                        navigate("/PaySlip");
                      }}
                    >
                      View
                    </div>
                  );
                }}
              </Cell>
            </Column>
            <Column width={150}>
              <HeaderCell className="tableheader">Status</HeaderCell>
              <Cell dataKey="Status" />
            </Column>
            <Column width={150}>
              <HeaderCell className="tableheader">Actions</HeaderCell>
              <Cell>
                {(item) => (
                  <div className="d-flex text-center">
                    <div
                      onClick={() => {
                        localStorage.setItem(
                          "payroolitem",
                          JSON.stringify(item)
                        );
                        navigate("/PayrollForm");
                      }}
                    >
                      <FiEdit />
                    </div>
                    <div
                      className="pl-15"
                      onClick={() => {
                        setdeletepayroolid(item.deleteId);
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
            total={payrollData.length}
            limitOptions={[2, 5, 10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
      <Modal
        open={deletepopup}
        onClose={() => {
          setdeletepopup(false);
        }}
      >
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
              deletepayroolitem(deletepayroolid);
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
  );
}

export default Payroll;
