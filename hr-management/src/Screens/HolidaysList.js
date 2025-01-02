import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Table, Button, Modal, Pagination } from "rsuite";
import { FetchData, DeleteData } from "../apiservices";
import { Loders } from "./Loders";
import moment from "moment";
import { toast } from "react-toastify";
function HolidaysList() {
  const initialized = useRef(false);
  const loginitem = localStorage.getItem("login");
  const item = JSON.parse(loginitem);
  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [Holidaysdata, setHolidaysdata] = useState([]);
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteHolidayid, setdeleteHolidayid] = useState();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = React.useState(10);
  const [Loder, setLoder] = useState(true);
  const [page, setPage] = React.useState(1);
  const getHolidays = () => {
    FetchData("Holidays")
      .then((res) => {
        setHolidaysdata(res);
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`, { autoClose: 1000 });
      });
  };
  const holidaydelete = (id) => {
    DeleteData("Holidays", `${id}`)
      .then((res) => {
        getHolidays();
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
      getHolidays();
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
  const data = Holidaysdata.filter((v, i) => {
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
  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100 p-10 card" : "h-100 p-10 card"}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="w-20">
            <span>Holidays List</span>
          </div>
          {item.first_name === "Admin" ? (
            <div
              className="detailsbtn text-center"
              onClick={() => {
                localStorage.removeItem("Holidays");
                navigate("/HolidaysListForm");
              }}
            >
              Add Holiday
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="pt-10 h-90">
          <Table
            wordWrap="break-word"
            bordered
            data={getData()}
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
            <Column width={60} align="center">
              <HeaderCell className="tableheader">Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell className="tableheader">Date</HeaderCell>
              <Cell>{(item) => moment(item.date).format("DD-MM-YYYY")}</Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell className="tableheader">Day</HeaderCell>
              <Cell dataKey="day" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell className="tableheader">Holiday</HeaderCell>
              <Cell dataKey="Holiday" />
            </Column>
            {item.first_name === "Admin" ? (
              <Column flexGrow={1}>
                <HeaderCell className="tableheader">Actions</HeaderCell>
                <Cell align="center">
                  {(item) => (
                    <div className="d-flex text-center">
                      <div
                        onClick={() => {
                          localStorage.setItem(
                            "Holidays",
                            JSON.stringify(item)
                          );
                          navigate("/HolidaysListForm");
                        }}
                      >
                        <FiEdit />
                      </div>
                      <div
                        className="pl-15"
                        onClick={() => {
                          setdeleteHolidayid(item.deleteId);
                          setdeletepopup(true);
                        }}
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  )}
                </Cell>
              </Column>
            ) : (
              ""
            )}
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
            total={Holidaysdata.length}
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
              holidaydelete(deleteHolidayid);
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

export default HolidaysList;
