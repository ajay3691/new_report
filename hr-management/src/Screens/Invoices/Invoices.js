import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Pagination, Modal, DateRangePicker } from "rsuite";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FetchData, DeleteData } from "../../apiservices";
import moment from "moment";
import { Loders } from "../Loders";
import { toast } from "react-toastify";
function Invoices() {
  const initialized = useRef(false);
  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [invoicesData, setinvoicesData] = useState([]);
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteInvoicesid, setdeleteInvoicesid] = useState();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [startinvoiceDate, setstartinvoiceDate] = useState("");
  const [endinvoiceDate, setendinvoiceDate] = useState("");
  const [clientnameselected, setclientnameselected] = useState("");
  const [Loder, setLoder] = useState(true);
  const [getInvoiceData,setgetInvoiceData]=useState([])
  const getinvoicesdata = () => {
    FetchData("Invoices")
      .then((res) => {
        setinvoicesData(res);
        setgetInvoiceData(res)
        setLoder(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error}`,{ autoClose: 1000 });
      });
  };
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getinvoicesdata();
    }
  }, []);
  const deleteitem = (id) => {
    DeleteData("Invoices", `${id}`)
      .then((res) => {
        getinvoicesdata();
        setLoder(false);
      })
      .catch((error) => {
        console.log(error);
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
  const data = invoicesData.filter((v, i) => {
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
  const SearchinvoiceData = () => {
    const date = getInvoiceData.filter(
      (item) =>
        item.createDate >= startinvoiceDate &&
        item.createDate <= endinvoiceDate &&
        item.clientName === clientnameselected
    );
    setinvoicesData(date);
  };
  const SearchByName = (Name) => {
    if (Name) {
      const Namedate = getInvoiceData.filter((item) => item.clientName === Name);
      setinvoicesData(Namedate);
    } else {
      getinvoicesdata();
    }
  };

  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100 p-10 card" : "h-100 p-10 card"}>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="pr-10">
              <select
                className="form-select"
                onChange={(e) => {
                  setclientnameselected(e.target.value);
                  SearchByName(e.target.value)
                }}
              >
                <option value="">Select Client Name</option>
                {getInvoiceData.map((item, index) => (
                  <option key={index} value={item.clientName}>
                    {item.clientName}
                  </option>
                ))}
              </select>
            </div>
            <div className="pr-10">
              <DateRangePicker
                onChange={(value) => {
                  if (value) {
                    setstartinvoiceDate(moment(value[0]).format("yyyy-MM-DD"));
                    setendinvoiceDate(moment(value[1]).format("yyyy-MM-DD"));
                  } else {
                    SearchByName(clientnameselected)
                    setstartinvoiceDate("");
                    setendinvoiceDate("");
                  }
                }}
              />
            </div>
            <button
              className="detailsbtn pr-10 text-center btn"
              onClick={() => {
                SearchinvoiceData();
              }}
              disabled={
                !(startinvoiceDate && endinvoiceDate && clientnameselected)
              }
            >
              <span>Search</span>
            </button>
          </div>
          <div>
            <button
              className="detailsbtn pl-15 text-center btn"
              onClick={() => {
                localStorage.removeItem("Invoices");
                navigate("/InvoicesForm");
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
            <Column width={65} align="center">
              <HeaderCell className="tableheader">Sl.NO</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column width={150} align="center">
              <HeaderCell className="tableheader">Invoice Number</HeaderCell>
              <Cell dataKey="invoiceNumber" />
            </Column>
            <Column width={150} align="center">
              <HeaderCell className="tableheader">Client</HeaderCell>
              <Cell dataKey="clientName" />
            </Column>
            <Column width={160} align="center">
              <HeaderCell className="tableheader">Create Date</HeaderCell>
              <Cell dataKey="createDate" />
            </Column>
            <Column width={160} align="center" wordWrap={true}>
              <HeaderCell className="tableheader">Due Date</HeaderCell>
              <Cell dataKey="dueDate" />
            </Column>
            <Column width={160} align="center" wordWrap={true}>
              <HeaderCell className="tableheader">Amount</HeaderCell>
              <Cell dataKey="amount" />
            </Column>
            <Column width={160} align="center" wordWrap={true}>
              <HeaderCell className="tableheader">Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>
            <Column width={180}>
              <HeaderCell className="tableheader">Actions</HeaderCell>
              <Cell align="center">
                {(item) => (
                  <div className="d-flex text-center">
                    <div
                      onClick={() => {
                        localStorage.setItem("Invoices", JSON.stringify(item));
                        navigate("/InvoicesForm");
                      }}
                    >
                      <FiEdit />
                    </div>
                    <div
                      className="pl-15"
                      onClick={() => {
                        setdeleteInvoicesid(item.deleteId);
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
            total={invoicesData.length}
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
              deleteitem(deleteInvoicesid);
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

export default Invoices;
