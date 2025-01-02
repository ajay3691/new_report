import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Modal, Button } from "rsuite";
import { updateData, postData } from "../apiservices";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
function ProjectForm() {
  const projects = localStorage.getItem("Projects");
  const projectitem = JSON.parse(projects);
  const navigate = useNavigate();
  const [projectname, setprojectname] = useState(
    projectitem ? projectitem.projectname : ""
  );
  const [projectmanager, setprojectmanager] = useState(
    projectitem ? projectitem.manager : ""
  );
  const [projectLead, setprojectLead] = useState(
    projectitem ? projectitem.projectlead : ""
  );
  const [TotalEmployees, setTotalEmployees] = useState(
    projectitem ? projectitem.totalemployes : ""
  );
  const [projectnameerror, setprojectnameerror] = useState(
    projectitem ? "Valid" : ""
  );
  const [projectmanagererror, setprojectmanagererror] = useState(
    projectitem ? "Valid" : ""
  );
  const [projectleaderror, setprojectleaderror] = useState(
    projectitem ? "Valid" : ""
  );
  const [startDate, setstartDate] = useState(
    projectitem ? projectitem.startdate : ""
  );
  const [Status, setstatus] = useState(projectitem ? projectitem.status : "");
  const [description, setdescription] = useState(
    projectitem ? projectitem.description : ""
  );
  const [descriptionError, setdescriptionError] = useState(
    projectitem ? "Valid" : ""
  );
  const [statusError, setstatusError] = useState(projectitem ? "Valid" : "");
  const [openpopUp, setopenpopUp] = useState(false);
  const [Loder, setLoder] = useState(false);

  const onlyLetters = /^[A-Za-z\s]+$/;
  const data = {
    manager: projectmanager,
    totalemployes: TotalEmployees,
    projectlead: projectLead,
    projectname: projectname,
    startdate: startDate,
    status: Status,
    description: description,
  };
  const postdata = () => {
    postData("Projects", data)
      .then((res) => {
        if (res) {
          setLoder(false);
          setopenpopUp(true);
        }
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const updatedata = (id) => {
    updateData("Projects", data, `${id}`)
      .then((res) => {
        setLoder(false);
        setopenpopUp(true);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };

  return (
    <div className="container-fluid h-100">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="text-center d-flex align-items-center pt-10">
          <div>
            <BsFillArrowLeftCircleFill
              size={25}
              color="#244E96"
              onClick={() => {
                navigate("/Projects");
                localStorage.removeItem("Projects");
              }}
            />
          </div>
          <div className="pl-20">
            <span className="fs-20">Add Project</span>
          </div>
        </div>
        <div className="py-2">
          <div className="d-flex">
            <div className="col-4">
              <div className="pt-10">
                <label className="form-label">Project Name</label>
                <input
                  className="form-control w-80 p-5"
                  type="text"
                  name="Lastname"
                  value={projectname}
                  onChange={(e) => {
                    if (
                      onlyLetters.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      setprojectnameerror("Valid");
                    } else {
                      setprojectnameerror("Only Letters are allowed");
                    }
                    setprojectname(e.target.value);
                  }}
                />
                <span className="fs-12 red">
                  {projectnameerror === "Valid" ? "" : projectnameerror}
                </span>
              </div>
              <div className="pt-10">
                <label className="form-label">Project Lead</label>
                <input
                  className="form-control w-80 p-5"
                  type="text"
                  name="Lastname"
                  value={projectLead}
                  onChange={(e) => {
                    if (
                      onlyLetters.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      setprojectleaderror("Valid");
                    } else {
                      setprojectleaderror("Only Letters are allowed");
                    }
                    setprojectLead(e.target.value);
                  }}
                />
                <span className="fs-12 red">
                  {projectleaderror === "Valid" ? "" : projectleaderror}
                </span>
              </div>
              <div className="pt-10">
                <label className="form-label">Start Date</label>
                <input
                  className="form-control w-80 p-5"
                  type="date"
                  name="Lastname"
                  value={startDate}
                  onChange={(e) => {
                    setstartDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="pt-10">
                <label className="form-label">Total Employees</label>
                <input
                  className="form-control w-80 p-5"
                  type="Number"
                  value={TotalEmployees}
                  onChange={(e) => {
                    setTotalEmployees(e.target.value);
                  }}
                />
              </div>
              <div className="pt-10">
                <label className="form-label">Manager</label>
                <input
                  className="form-control w-80 p-5"
                  type="text"
                  name="Jobrole"
                  value={projectmanager}
                  onChange={(e) => {
                    if (
                      onlyLetters.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      setprojectmanagererror("Valid");
                    } else {
                      setprojectmanagererror("Only Letters are allowed");
                    }
                    setprojectmanager(e.target.value);
                  }}
                />
                <span className="fs-12 red">
                  {projectmanagererror === "Valid" ? "" : projectmanagererror}
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="pt-10">
                <label className="form-label">Description</label>
                <input
                  className="form-control w-80 p-5"
                  type="text"
                  name="Jobrole"
                  value={description}
                  onChange={(e) => {
                    if (
                      onlyLetters.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      setdescriptionError("Valid");
                    } else {
                      setdescriptionError("Only Letters are allowed");
                    }
                    setdescription(e.target.value);
                  }}
                />
                <span className="fs-12 red">
                  {descriptionError === "Valid" ? "" : descriptionError}
                </span>
              </div>
              <div className="pt-10">
                <label className="form-label">Status</label>
                <input
                  className="form-control w-80 p-5"
                  type="text"
                  name="Jobrole"
                  value={Status}
                  onChange={(e) => {
                    if (
                      onlyLetters.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      setstatusError("Valid");
                    } else {
                      setstatusError("Only Letters are allowed");
                    }
                    setstatus(e.target.value);
                  }}
                />
                <span className="fs-12 red">
                  {statusError === "Valid" ? "" : statusError}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 mr-40">
            {projectitem ? (
              <div className="pt-20 text-center">
                <button
                  type="button"
                  className="btn mb-3 submitbtn"
                  onClick={() => {
                    setLoder(true);
                    updatedata(projectitem.deleteId);
                  }}
                  disabled={
                    !(
                      projectLead &&
                      projectmanager &&
                      projectname &&
                      TotalEmployees &&
                      projectmanagererror === "Valid" &&
                      projectnameerror === "Valid" &&
                      projectleaderror === "Valid" &&
                      statusError === "Valid" &&
                      descriptionError === "Valid" &&
                      startDate &&
                      Status &&
                      description
                    )
                  }
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="pt-20 text-center">
                <button
                  type="submit"
                  className="btn mb-3 submitbtn"
                  onClick={() => {
                    setLoder(true);
                    postdata();
                  }}
                  disabled={
                    !(
                      projectLead &&
                      projectmanager &&
                      projectname &&
                      TotalEmployees &&
                      projectmanagererror === "Valid" &&
                      projectnameerror === "Valid" &&
                      projectleaderror === "Valid" &&
                      statusError === "Valid" &&
                      descriptionError === "Valid" &&
                      startDate &&
                      Status &&
                      description
                    )
                  }
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={openpopUp}
        onClose={() => {
          setopenpopUp(false);
          navigate("/Projects");
          localStorage.removeItem("Projects");
        }}
      >
        <Modal.Header>
          <Modal.Title>Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!projectitem ? (
            <p>Project Added Successfully!</p>
          ) : (
            <p>Project Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/Projects");
              localStorage.removeItem("Projects");
            }}
            style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectForm;
