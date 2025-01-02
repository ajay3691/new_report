import React, { useEffect, useState } from "react";
import "./WorkAssign.css";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FetchData } from "../../apiservices";
import { Modal, Button } from "rsuite";
import { updateData, postData } from "../../apiservices";
import { Loders } from "../Loders";
import { toast } from "react-toastify";
function WorkAssign() {
  const workitem = localStorage.getItem("work");
  const item = JSON.parse(workitem);
  const navigate = useNavigate();
  const [name, setName] = useState(item ? item.firstname : "");
  const [Jobroll, setJobroll] = useState(item ? item.Jobrole : "");
  const [employID, setemployID] = useState(item ? item.employid : "");
  const [Task, setTask] = useState(item ? item.task : "");
  const [workdate, setdate] = useState(item ? item.date : "");
  const [status, setstatus] = useState(item ? item.status : "");
  const [array, setarray] = useState([]);
  const [taskerror, settaskerror] = useState(item ? "Valid" : "");
  const [openpopUp, setopenpopUp] = useState(false);
  const [Loder, setLoder] = useState(false);
  const bodydata = {
    firstname: name,
    Jobrole: Jobroll,
    employid: parseInt(employID),
    task: Task,
    status: status,
    date: workdate,
  };
  const onlyLetters = /^[A-Za-z\s]+$/;
  const getusers = () => {
    FetchData("Employees")
      .then((res) => {
        setarray([]);
        res.forEach((item) => {
          setarray((preview) => [...preview, item]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (event) => {
    setLoder(true);
    event.preventDefault();
    postData("Tasks", bodydata)
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
  const updatework = (id) => {
    updateData("Tasks", bodydata, `${id}`)
      .then((res) => {
        setLoder(false);
        setopenpopUp(true);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  useEffect(() => {
    getusers();
  }, []);

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
                localStorage.removeItem("work");
                navigate("/WorkDetails");
              }}
            />
          </div>
          <div className="pl-20">
            <span className="fs-20">Work Assign</span>
          </div>
        </div>
        <div className="d-flex py-2">
          <div className="col-8">
            <div className="d-flex">
              <div className="col-6">
                <div className="w-80">
                  <div className="pt-10">
                    <label className="form-label"> Employee Name:</label>
                    <select
                      className="form-select p-5"
                      onChange={(e) => {
                        array.forEach((item) => {
                          if (e.target.value === item.first_name) {
                            setJobroll(item.job_role);
                            setemployID(item.employee_id);
                          }
                        });
                        setName(e.target.value);
                      }}
                      value={name}
                    >
                      <option></option>
                      {array.map((item, index) => (
                        <option key={index} value={item.first_name}>
                          {item.first_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="pt-10">
                    <label className="form-label">Jobrole:</label>
                    <input
                      className="form-control p-5"
                      type="text"
                      name="Lastname"
                      disabled
                      value={Jobroll}
                      onChange={(e) => {
                        setJobroll(e.target.value);
                      }}
                    />
                  </div>
                  <div className="pt-10">
                    <label className="form-label">Employ ID:</label>
                    <input
                      className="form-control p-5"
                      type="number"
                      name="employID"
                      value={employID}
                      disabled
                      onChange={(e) => {
                        setemployID(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="pt-10">
                  <label className="form-label">Date:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="date"
                    value={workdate}
                    onChange={(e) => {
                      setdate(e.target.value);
                    }}
                  />
                </div>
                <div className="pt-10">
                  <label className="form-label">Task :</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Jobrole"
                    value={Task}
                    onChange={(e) => {
                      if (
                        onlyLetters.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        settaskerror("Valid");
                      } else {
                        settaskerror("Only Letters are allowed");
                      }
                      setTask(e.target.value);
                    }}
                  />
                  <span className="fs-12 red">
                    {taskerror === "Valid" ? "" : taskerror}
                  </span>
                </div>
                <div className="pt-10">
                  <label className="form-label">Status :</label>
                  <select
                    className="form-select w-80 p-5"
                    onChange={(e) => {
                      setstatus(e.target.value);
                    }}
                    value={status}
                  >
                    <option></option>
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5 w-80 ms-5">
              {item ? (
                <div className="pt-20 text-center">
                  <button
                    type="button"
                    className="btn mb-3 submitbtn"
                    onClick={() => {
                      setLoder(true);
                      updatework(item.deleteId);
                    }}
                    disabled={
                      !(
                        name &&
                        workdate &&
                        status &&
                        taskerror === "Valid" &&
                        Task
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
                    onClick={handleSubmit}
                    disabled={
                      !(
                        name &&
                        workdate &&
                        status &&
                        taskerror === "Valid" &&
                        Task
                      )
                    }
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
      <Modal
        open={openpopUp}
        onClose={() => {
          setopenpopUp(false);
          localStorage.removeItem("work");
          navigate("/WorkDetails");
        }}
      >
        <Modal.Header>
          <Modal.Title>Work Assign Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!item ? (
            <p>Task Assigned Successfully!</p>
          ) : (
            <p>Task Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/WorkDetails");
              localStorage.removeItem("work");
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

export default WorkAssign;
