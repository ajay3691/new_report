import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination, Modal, Button } from "rsuite";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FetchData, DeleteData } from "../apiservices";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
function Jobrequirement() {
  const initialized = useRef(false);
  const loginitem = localStorage.getItem("login");
  const item = JSON.parse(loginitem);
  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [JobrequirementData, setJobrequirementData] = useState([]);
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteJobid, setdeleteJobid] = useState();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = React.useState(10);
  const [Loder, setLoder] = useState(true);
  const [page, setPage] = React.useState(1);
  const Getdata = () => {
    FetchData("Jobrequirement")
      .then((res) => {
        setJobrequirementData(res);
        setLoder(false)
      })
      .catch((error) => {
        setLoder(false)
        toast.error(`${error}`,{ autoClose: 1000 });
      });
  };
  const deletejobrequirement = (id) => {
    DeleteData("Jobrequirement", `${id}`)
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
  const data = JobrequirementData.filter((v, i) => {
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
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span>Job Requirement</span>
          </div>
          {item.first_name === "Admin" ? (
            <div
              className="detailsbtn text-center"
              onClick={() => {
                localStorage.removeItem("Jobrequirement");
                navigate("/JobrequirementForm");
              }}
            >
              Add Requirement
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="h-90 pt-10">
          <Table
            cellBordered
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
              <HeaderCell className="tableheader">Sl.No</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Job Position</HeaderCell>
              <Cell dataKey="jobposition" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Qualification</HeaderCell>
              <Cell dataKey="qualification" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Work Mode</HeaderCell>
              <Cell dataKey="availability" />
            </Column>
            <Column width={200} align="center">
              <HeaderCell className="tableheader">Skills</HeaderCell>
              <Cell dataKey="Skills" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Experience</HeaderCell>
              <Cell dataKey="relevantExperience" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Job Description</HeaderCell>
              <Cell dataKey="job_Description" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Notice Period</HeaderCell>
              <Cell dataKey="Notice_Period" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Job Location</HeaderCell>
              <Cell dataKey="job_location" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Salary</HeaderCell>
              <Cell dataKey="salary" />
            </Column>
            {item.first_name === "Admin" ? (
              <Column width={130} align="center">
                <HeaderCell className="tableheader">Actions</HeaderCell>
                <Cell>
                  {(item) => (
                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        onClick={() => {
                          localStorage.setItem(
                            "Jobrequirement",
                            JSON.stringify(item)
                          );
                          navigate("/JobrequirementForm");
                        }}
                      >
                        <FiEdit />
                      </div>
                      <div
                        className="pl-15"
                        onClick={() => {
                          setdeleteJobid(item.deleteId);
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
          <div className="">
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
              total={JobrequirementData.length}
              limitOptions={[2, 5, 10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
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
              deletejobrequirement(deleteJobid);
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

export default Jobrequirement;
