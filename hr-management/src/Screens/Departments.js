import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination, Modal, Button } from "rsuite";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FetchData, DeleteData } from ".././apiservices";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
function Departments() {
  const initialized = useRef(false);
  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [departmentData, setdepartmentData] = useState([]);
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteDepartmentid, setdeleteDepartmentid] = useState();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [Loder, setLoder] = useState(true);

  const Getdata = () => {
    FetchData("Departments")
      .then((res) => {
        setdepartmentData(res);
        setLoder(false)
      })
      .catch((error) => {
        setLoder(false)
        toast.error(`${error}`,{ autoClose: 1000 });
      });
  };
  const deletedeparment = (id) => {
    DeleteData("Departments", `${id}`)
      .then((res) => {
        Getdata();
        setLoder(false)
      })
      .catch((error) => {
        setLoder(false)
        toast.error(`${error}`,{ autoClose: 1000 });
      });
  };
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      Getdata();
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
  const data = departmentData.filter((v, i) => {
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
       {Loder ?  <Loders/>  : ""}
      <div className={Loder ? "loder h-100 p-10 card" : "h-100 p-10 card"}>
        <div className="d-flex justify-content-between">
          <div>
            Departments
          </div>
          <div
            className="detailsbtn"
            onClick={() => {
              localStorage.removeItem("Department");
              navigate("/Adddepartmentform");
            }}
          >
            Add Department
          </div>
        </div>
        <div className="h-90 pt-10">
          <Table
            cellBordered
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
            <Column width={65}>
              <HeaderCell className="tableheader">Sl.No</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell className="tableheader">Department Name</HeaderCell>
              <Cell dataKey="departmentname" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell className="tableheader">Department Head</HeaderCell>
              <Cell dataKey="departmentHead" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell className="tableheader">Total Employees</HeaderCell>
              <Cell dataKey="TotallEmployees" />
            </Column>
            <Column width={100}>
              <HeaderCell className="tableheader">Actions</HeaderCell>
              <Cell>
                {(item) => (
                  <div className="d-flex text-center">
                    <div
                      onClick={() => {
                        localStorage.setItem(
                          "Department",
                          JSON.stringify(item)
                        );
                        navigate("/Adddepartmentform");
                      }}
                    >
                      <FiEdit />
                    </div>
                    <div
                      className="pl-15"
                      onClick={() => {
                        setdeleteDepartmentid(item.deleteId);
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
            total={departmentData.length}
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
              setLoder(true)
              deletedeparment(deleteDepartmentid);
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

export default Departments;
