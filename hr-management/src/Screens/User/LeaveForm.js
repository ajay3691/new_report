import React, {useState } from "react";
import { postData } from "../../apiservices";
import { Modal, Button } from "rsuite";
import { Loders } from "../Loders";
function LeaveForm() {
  const Employees = localStorage.getItem("login");
  const item = JSON.parse(Employees);
  const [LeaveStartDate, setLeaveStartDate] = useState("");
  const [LeaveEndDate, setLeaveEndDate] = useState("");
  const [LeaveReason, setLeaveReason] = useState("");
  const [LeaveType, setLeaveType] = useState("");
  const [showpopup, setshowpopup] = useState(false);
  const [Loder, setLoder] = useState(false);
  const sendNotifications = () => {
    const data = {
      msg: LeaveReason,
      first_name: item.first_name,
      startDate: LeaveStartDate,
      endDate: LeaveEndDate,
      isread: "false",
    };
    postData("Notifications", data)
      .then((res) => {
        setshowpopup(true);
        setLoder(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid h-100">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="pt-10">
          <span className="fs-20">Leave Request form</span>
        </div>
        <div className="d-flex py-2">
          <div className="col-8">
            <div className="d-flex">
              <div className="col-6">
                <div className="pt-10">
                  <label className="form-label">Leave Start Date:</label>
                  <input
                    className="form-control w-80 p-10"
                    type="date"
                    name="employID"
                    onChange={(e) => {
                      setLeaveStartDate(e.target.value);
                    }}
                    value={LeaveStartDate}
                  />
                </div>
                <div className="pt-10">
                  <label className="form-label">Reason:</label>
                  <input
                    className="form-control w-80 p-10"
                    type="text"
                    name="Jobrole"
                    onChange={(e) => {
                      setLeaveReason(e.target.value);
                    }}
                    value={LeaveReason}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="pt-10">
                  <label className="form-label">Leave Type:</label>
                  <select
                    className="form-select w-80 p-10"
                    onChange={(e) => {
                      setLeaveType(e.target.value);
                    }}
                    value={LeaveType}
                  >
                    <option>Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                    <option value="Special Leave">Special Leave</option>
                    <option value="Study or Educational Leave">
                      Study or Educational Leave
                    </option>
                    <option value="Personal/Carer's Leave">
                      Personal/Carer's Leave
                    </option>
                  </select>
                </div>
                <div className="pt-10">
                  <label className="form-label">Leave End Date:</label>
                  <input
                    className="form-control w-80 p-10"
                    type="date"
                    name="Jobrole"
                    onChange={(e) => {
                      setLeaveEndDate(e.target.value);
                    }}
                    value={LeaveEndDate}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 w-80 ms-5">
              <div className="pt-20 text-center">
                <button
                  type="submit"
                  className="btn mb-3 submitbtn"
                  disabled={
                    !(
                      LeaveReason &&
                      LeaveEndDate &&
                      LeaveStartDate &&
                      LeaveType
                    )
                  }
                  onClick={() => {
                    setLoder(true)
                    sendNotifications();
                    setLeaveEndDate("");
                    setLeaveReason("");
                    setLeaveStartDate("");
                    setLeaveType("");
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
        <Modal
          open={showpopup}
          onClose={() => {
            setshowpopup(false);
          }}
        >
          <Modal.Header>
            <Modal.Title>Leave Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>Leave Submitted!</Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setshowpopup(false);
              }}
              style={{ backgroundColor: "#1EB0DF", color: "#fff" }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default LeaveForm;
