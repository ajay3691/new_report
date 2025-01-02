import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination, Modal, Button } from "rsuite";
import { IoSearchOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FetchData, DeleteData } from "../apiservices";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
function Projects() {
  const initialized = useRef(false);
  const loginitem = localStorage.getItem("login");
  const item = JSON.parse(loginitem);
  const navigate = useNavigate();
  const { Column, HeaderCell, Cell } = Table;
  const [projects, setprojects] = useState([]);
  const [search, setsearch] = useState("");
  const [Loder, setLoder] = useState(true);
  const [deletepopup, setdeletepopup] = useState(false);
  const [deleteprojectid, setdeleteprojectid] = useState();
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

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
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const deleteprojectitem = (id) => {
    DeleteData("Projects",id)
      .then((res) => {
        getprojectsdata();
        setLoder(false);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const Searchdata = (params) => {
    const lowerCaseParams = params.toLowerCase();
    if (params.length === 0) {
      getprojectsdata();
    } else {
      const search_Data = projects.filter((item) =>
        item.projectname.toLowerCase().match(lowerCaseParams)
      );
      setprojects(search_Data);
    }
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
  const data = projects.filter((v, i) => {
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
          <div className="input-group" style={{ width: 250 }}>
            <span id="1" className="input-group-text">
              <IoSearchOutline />
            </span>
            <input
              type="search"
              name="name"
              className="form-control ml"
              placeholder="Search by project Name"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
                Searchdata(e.target.value);
              }}
              aria-describedby="1"
            />
          </div>
          {item.first_name === "Admin" ? (
            <div
              className="detailsbtn text-center"
              onClick={() => {
                navigate("/ProjectForm");
                localStorage.removeItem("Projects");
              }}
            >
              Add Project
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="pt-10 h-90">
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
            <Column width={65} align="center">
              <HeaderCell className="tableheader">Sl.No</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column width={150} align="center" sortable>
              <HeaderCell className="tableheader" wordWrap>
                Project Name
              </HeaderCell>
              <Cell dataKey="projectname" />
            </Column>
            <Column width={175} align="center" sortable>
              <HeaderCell className="tableheader">Project Manager</HeaderCell>
              <Cell dataKey="manager" />
            </Column>
            <Column width={140} align="center" sortable>
              <HeaderCell className="tableheader">Project Lead</HeaderCell>
              <Cell dataKey="projectlead" />
            </Column>
            <Column width={150} align="center">
              <HeaderCell className="tableheader" wordWrap>
                Total Employees
              </HeaderCell>
              <Cell dataKey="totalemployes" />
            </Column>
            <Column width={130} align="center" sortable>
              <HeaderCell className="tableheader">Start Date</HeaderCell>
              <Cell dataKey="startdate" />
            </Column>
            <Column width={160} align="center">
              <HeaderCell className="tableheader">Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
            <Column width={140} align="center" sortable>
              <HeaderCell className="tableheader">Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>
            {item.first_name === "Admin" ? (
              <Column width={80}>
                <HeaderCell className="tableheader">Actions</HeaderCell>
                <Cell align="center">
                  {(item) => (
                    <div className="d-flex text-center">
                      <div
                        onClick={() => {
                          localStorage.setItem(
                            "Projects",
                            JSON.stringify(item)
                          );
                          navigate("/ProjectForm");
                        }}
                      >
                        <FiEdit />
                      </div>
                      <div
                        className="pl-15"
                        onClick={() => {
                          setdeleteprojectid(item.deleteId);
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
            total={projects.length}
            limitOptions={[2, 5, 10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
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
                deleteprojectitem(deleteprojectid);
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

export default Projects;
