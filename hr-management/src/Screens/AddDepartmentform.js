import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postData, updateData } from "../apiservices";
import { Modal, Button } from "rsuite";
import { Loders } from "./Loders";
import { toast } from "react-toastify";

function Adddepartmentform() {
  const departmentitem = localStorage.getItem("Department");
  const item = JSON.parse(departmentitem);
  const navigate = useNavigate();
  const [DepartmentName, setDepartmentName] = useState(item ? item.departmentname : "");
  const [DepartmentHead, setDepartmentHead] = useState(item ? item.departmentHead : "");
  const [TotalEmployes, setTotalEmployes] = useState(item ? item.TotallEmployees : "");
  const [openpopUp, setopenpopUp] = useState(false);
  const [departmentNameError, setdepartmentNameError] = useState(item ?"Valid":"");
  const [departmentHeadError, setdepartmentHeadError] = useState(item ?'Valid':"");
  const [Loder, setLoder] = useState(false);

  const bodydata = {
    departmentname: DepartmentName,
    departmentHead: DepartmentHead,
    TotallEmployees: TotalEmployes,
  };
  const postdata = () => {
    postData("Departments", bodydata)
      .then((res) => {
        if (res) {
          setLoder(false)
          setopenpopUp(true);
        }
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const updatefunction = (id) => {
    updateData("Departments", bodydata, `${id}`)
      .then((res) => {
        setLoder(false)
        setopenpopUp(true);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const onlyLetters = /^[A-Za-z\s]+$/;

  return (
    <div className="container-fluid">
       {Loder ? <Loders/> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
      <div className="d-flex pt-15">
        <div className="text-center d-flex align-items-center">
          <div>
            <BsFillArrowLeftCircleFill
              size={25}
              color="#244E96"
              onClick={() => {
                navigate("/Departments");
                localStorage.removeItem("Department");
              }}
            />
          </div>
          <div className="pl-20">
            <span className="fs-20">Add Department</span>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="col-md-3">
          <div className="pt-10">
            <label className="form-label">Department Name:</label>
            <input
              className="form-control p-5"
              type="text"
              name="Lastname"
              value={DepartmentName}
              onChange={(e) => {
                if (onlyLetters.test(e.target.value) || e.target.value === "") {
                  setdepartmentNameError("Valid");
                } else {
                  setdepartmentNameError("Only Letters are allowed");
                }
                setDepartmentName(e.target.value);
              }}
            />
            <span className="fs-12 red">
              {departmentNameError === "Valid" ? "" : departmentNameError}
            </span>
          </div>
          <div className="pt-10">
            <label className="form-label">Department Head:</label>
            <input
              className="form-control p-5"
              type="text"
              name="employID"
              value={DepartmentHead}
              onChange={(e) => {
                if (onlyLetters.test(e.target.value) || e.target.value === "") {
                  setdepartmentHeadError("Valid");
                } else {
                  setdepartmentHeadError("Only Letters are allowed");
                }
                setDepartmentHead(e.target.value);
              }}
            />
            <span className="fs-12 red">
              {departmentHeadError === "Valid" ? "" : departmentHeadError}
            </span>
          </div>
        </div>
        <div className="col-md-3 pl-15">
          <div className="pt-10 d-flex" style={{ flexDirection: "column" }}>
            <label className="form-label">Total Employees:</label>
            <input
              className="form-control p-5"
              type="number"
              value={TotalEmployes}
              onChange={(e) => {
                setTotalEmployes(e.target.value);
              }}
            />
          </div>
          <div className="">
            {item ? (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  className="btn submitbtn"
                  onClick={() => {
                    setLoder(true)
                    updatefunction(item.deleteId);
                  }}
                  disabled={
                    !(
                      DepartmentName &&
                      DepartmentHead &&
                      TotalEmployes &&
                      departmentNameError === "Valid" &&
                      departmentHeadError === "Valid"
                    )
                  }
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="btn submitbtn"
                  onClick={() => {
                    setLoder(true)
                    postdata();
                  }}
                  disabled={
                    !(
                      DepartmentName &&
                      DepartmentHead &&
                      TotalEmployes &&
                      departmentNameError === "Valid" &&
                      departmentHeadError === "Valid"
                    )
                  }
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
      </div>
      <Modal
        open={openpopUp}
        onClose={() => {
          setopenpopUp(false);
          navigate("/Departments");
          localStorage.removeItem("Department");
        }}
      >
        <Modal.Header>
          <Modal.Title>Departments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!item ? (
            <p>Department Added Successfully!</p>
          ) : (
            <p>Department Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/Departments");
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

export default Adddepartmentform;
