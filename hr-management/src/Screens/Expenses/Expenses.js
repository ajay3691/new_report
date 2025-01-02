import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Pagination, DateRangePicker, Modal } from "rsuite";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FetchData, DeleteData } from "../../apiservices";
import moment from "moment";
import { BiSolidFileExport } from "react-icons/bi";
import { exportToExcel } from "react-json-to-excel";
import { Loders } from "../Loders";
import { toast } from "react-toastify";
function Expenses() {
  const initialized = useRef(false);
  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [getData, setgetData] = useState([]);
  const [selectbuyer, setselectbuyer] = useState("");
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteExpensesid, setdeleteExpensesid] = useState();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [ExpensesData, setExpensesData] = useState([]);
  const [Loder, setLoder] = useState(true);
  const [excelName, setexcelName] = useState("Expenses_List");
  const getexpenses = () => {
    FetchData("Expenses")
      .then((res) => {
        setExpensesData(res);
        setgetData(res);
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`, { autoClose: 1000 });
      });
  };
  const DeleteItem = (id) => {
    DeleteData("Expenses", `${id}`)
      .then((res) => {
        getexpenses();
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`, { autoClose: 1000 });
      });
  };
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getexpenses();
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
  const data = ExpensesData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  const paginationdata = (j) => {
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
  const SearchData = () => {
    const date = getData.filter(
      (item) =>
        item.purchasedate >= startDate &&
        item.purchasedate <= endDate &&
        item.purchaseby === selectbuyer
    );
    setExpensesData(date);
  };
  const SearchByName = (Name) => {
    if (Name) {
      setexcelName(Name + "_Expenses_List");
      const Namedate = getData.filter((item) => item.purchaseby === Name);
      setExpensesData(Namedate);
    } else {
      setexcelName("Expenses_List");
      getexpenses();
    }
  };
  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100 p-10 card" : "h-100 p-10 card"}>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center w-80">
            <div className="w-20 pr-10">
              <select
                className="form-select"
                onChange={(e) => {
                  setselectbuyer(e.target.value);
                  SearchByName(e.target.value);
                }}
              >
                <option value="">Select Buyer Name</option>
                {getData.map((item, index) => (
                  <option key={index} value={item.purchaseby}>
                    {item.purchaseby}
                  </option>
                ))}
              </select>
            </div>
            <div className="pr-10">
              <DateRangePicker
                onChange={(value) => {
                  if (value) {
                    setstartDate(moment(value[0]).format("yyyy-MM-DD"));
                    setendDate(moment(value[1]).format("yyyy-MM-DD"));
                  } else {
                    SearchByName(selectbuyer);
                    setstartDate("");
                    setendDate("");
                  }
                }}
              />
            </div>
            <button
              className="detailsbtn pr-10 text-center btn"
              onClick={() => {
                SearchData();
              }}
              disabled={!(selectbuyer && startDate && endDate)}
            >
              <span>Search</span>
            </button>
            <div className="d-flex align-items-center pl-15">
              <span className="mr-5">Export</span>
              <BiSolidFileExport
                color="244F96"
                size={25}
                onClick={() => exportToExcel(ExpensesData, excelName)}
                className="pointer"
              />
            </div>
          </div>
          <div>
            <button
              className="detailsbtn pl-15 text-center btn"
              onClick={() => {
                localStorage.removeItem("Expenses");
                navigate("/ExpensesForm");
              }}
            >
              <span>Add Expenses</span>
            </button>
          </div>
        </div>
        <div className="pt-10 h-90">
          <Table
            wordWrap="break-word"
            bordered
            data={paginationdata()}
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
            <Column width={65} align="center">
              <HeaderCell className="tableheader">Sl.NO</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column width={150} align="center">
              <HeaderCell className="tableheader">Items</HeaderCell>
              <Cell dataKey="item" />
            </Column>
            <Column width={150} align="center">
              <HeaderCell className="tableheader">Purchase From</HeaderCell>
              <Cell dataKey="purchasefrom" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Purchase Date</HeaderCell>
              <Cell dataKey="purchasedate" />
            </Column>
            <Column width={160} align="center">
              <HeaderCell className="tableheader">Purchase By</HeaderCell>
              <Cell dataKey="purchaseby" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Amount</HeaderCell>
              <Cell dataKey="Amount" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Paid By</HeaderCell>
              <Cell dataKey="paidby" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Status</HeaderCell>
              <Cell dataKey="Status" />
            </Column>
            <Column width={100}>
              <HeaderCell className="tableheader">Actions</HeaderCell>
              <Cell align="center">
                {(item) => (
                  <div className="d-flex text-center">
                    <div
                      onClick={() => {
                        localStorage.setItem("Expenses", JSON.stringify(item));
                        navigate("/ExpensesForm");
                      }}
                    >
                      <FiEdit />
                    </div>
                    <div
                      className="pl-15"
                      onClick={() => {
                        setdeleteExpensesid(item.deleteId);
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
        <div className="pt-20 h-10">
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
            total={getData.length}
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
              DeleteItem(deleteExpensesid);
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

export default Expenses;
