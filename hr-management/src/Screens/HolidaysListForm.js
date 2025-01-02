import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Modal, Button } from "rsuite";
import { postData, updateData } from "../apiservices";
import moment from "moment";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
function HolidaysListForm() {
  const HolidaysItem = localStorage.getItem("Holidays");
  const Holidaysitem = JSON.parse(HolidaysItem);
  const navigate = useNavigate();
  const onlyLetters = /^[A-Za-z\s]+$/;
  const [holidayDate, setholidayDate] = useState(
    Holidaysitem ? Holidaysitem.date : ""
  );
  const [holidayDay, setholidayDay] = useState(
    Holidaysitem ? Holidaysitem.day : ""
  );
  const [holidayreason, setholidayreason] = useState(
    Holidaysitem ? Holidaysitem.Holiday : ""
  );
  const [holidayerror, setholidayerror] = useState(Holidaysitem?"Valid":"");
  const [openpopUp, setopenpopUp] = useState(false);
  const [Loder, setLoder] = useState(false);

  const data = {
    date: holidayDate,
    day: holidayDay,
    Holiday: holidayreason,
  };
  const postHolidys = () => {
    postData("Holidays", data)
      .then((res) => {
        setLoder(false)
        setopenpopUp(true);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const updateHolidys = (id) => {
    updateData("Holidays", data, `${id}`)
      .then((res) => {
        setLoder(false)
        setopenpopUp(true);
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  return (
    <div className="container-fluid">
       {Loder ? <Loders/> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
      <div className="text-center d-flex align-items-center pt-15">
        <div>
          <BsFillArrowLeftCircleFill
            size={25}
            color="#244E96"
            onClick={() => {
              navigate("/HolidaysList");
              localStorage.removeItem("Holidays");
            }}
          />
        </div>
        <div className="pl-20">
          <span className="fs-20">Add Holiday</span>
        </div>
      </div>
      <div className="w-25">
        <div className="pt-10">
          <label className="form-label">Date</label>
          <input
            className="form-control p-5"
            type="date"
            value={holidayDate}
            onChange={(e) => {
              setholidayDate(e.target.value);
              let day = moment(e.target.value).format("dddd");
              setholidayDay(day);
            }}
          />
        </div>
        <div className="pt-10">
          <label className="form-label">Day</label>
          <input
            className="form-control p-5"
            type="text"
            disabled
            value={holidayDay}
            onChange={(e) => {
              setholidayDay(e.target.value);
            }}
          />
        </div>
        <div className="pt-10">
          <label className="form-label">Holiday</label>
          <input
            className="form-control p-5"
            type="text"
            value={holidayreason}
            onChange={(e) => {
              if (onlyLetters.test(e.target.value) || e.target.value === "") {
                setholidayerror("Valid");
              } else {
                setholidayerror("Only Letters are allowed");
              }
              setholidayreason(e.target.value);
            }}
          />
          <span className="fs-12 red">
            {holidayerror === "Valid" ? "" : holidayerror}
          </span>
        </div>
        <div className="mt-5">
          {Holidaysitem ? (
            <div className="pt-20 text-center">
              <button
                type="button"
                className="btn mb-3 submitbtn"
                onClick={() => {
                  setLoder(true)
                  updateHolidys(Holidaysitem.deleteId);
                }}
                disabled={!(holidayDate && holidayDay && holidayreason &&holidayerror==='Valid')}
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
                  setLoder(true)
                  postHolidys();
                }}
                disabled={!(holidayDate && holidayDay && holidayreason &&holidayerror==='Valid')}
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
          navigate("/HolidaysList");
          localStorage.removeItem("Holidays");
        }}
      >
        <Modal.Header>
          <Modal.Title>Holidays</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!Holidaysitem ? (
            <p>Holiday Added Successfully!</p>
          ) : (
            <p>Holiday Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/HolidaysList");
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

export default HolidaysListForm;
