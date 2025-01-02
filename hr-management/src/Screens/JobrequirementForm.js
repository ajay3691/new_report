import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { postData, updateData } from "../apiservices";
import { Modal, Button } from "rsuite";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
function JobrequirementForm() {
  const jobrequiredata = localStorage.getItem("Jobrequirement");
  const item = JSON.parse(jobrequiredata);
  const navigate = useNavigate();
  const [jobposition, setjobposition] = useState(item ? item.jobposition : "");
  const [Qualification, setQualification] = useState(item ? item.qualification : "");
  const [Skills, setSkills] = useState(item ? item.Skills : "");
  const [Availability, setAvailability] = useState(item ? item.availability : "");
  const [Salary, setSalary] = useState(item ? item.salary : "");
  const [relevantexperience, setrelevantexperience] = useState(item ? item.relevantExperience : "");
  const [openpopUp, setopenpopUp] = useState(false);
  const [jobpositionError, setjobpositionError] = useState(item ? "Valid" : "");
  const [QualificationError, setQualificationError] = useState(item ? "Valid" : "");
  const [SkillsError, setSkillsError] = useState(item ? "Valid" : "");
  const [AvailabilityError, setAvailabilityError] = useState(item ? "Valid" : "");
  const [Loder, setLoder] = useState(false);
  const [jobLocation, setjobLocation] = useState(item ? item.job_location : "");
  const [NoticePeriod, setNoticePeriod] = useState(item ? item.Notice_Period : "");
  const [jobDescription, setjobDescription] = useState(item ? item.job_Description : "");
  const onlyLetters = /^[A-Za-z\s]+$/;
  const numbers = /^[0-9]+$/;
  const jobrequirebodydata = {
    jobposition: jobposition,
    Skills: Skills,
    qualification: Qualification,
    salary: Salary,
    availability: Availability,
    relevantExperience: relevantexperience,
    job_location: jobLocation,
    Notice_Period: NoticePeriod,
    job_Description: jobDescription,
  };
  const jobdatapost = () => {
    postData("Jobrequirement", jobrequirebodydata)
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
  const updatefunction = (id) => {
    updateData("Jobrequirement", jobrequirebodydata, `${id}`)
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
    <div className="h-100 px-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="text-center d-flex align-items-center pt-10">
          <div>
            <BsFillArrowLeftCircleFill
              size={25}
              color="#1EB0DF"
              onClick={() => {
                navigate("/Jobrequirement");
                localStorage.removeItem("Jobrequirement");
              }}
            />
          </div>
          <div className="pl-20 fs-20">
            <span className="" style={{ color: "#1EB0DF" }}>
              {" "}
              Add Job Requirement
            </span>
          </div>
        </div>
        <div className="h-90">
          <div>
            <div className="d-flex">
              <div className="col-md-4">
                <div className="pt-10">
                  <label className="form-label">Job Position:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="jobposition"
                    value={jobposition}
                    onChange={(e) => {
                      if (
                        onlyLetters.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        setjobpositionError("Valid");
                      } else {
                        setjobpositionError("Only Letters are allowed");
                      }
                      setjobposition(e.target.value);
                    }}
                  />
                  <span className="fs-12 red">
                    {jobpositionError === "Valid" ? "" : jobpositionError}
                  </span>
                </div>
                <div className="pt-10">
                  <label className="form-label">Qualification:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Qualification"
                    value={Qualification}
                    onChange={(e) => {
                      if (
                        onlyLetters.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        setQualificationError("Valid");
                      } else {
                        setQualificationError("Only Letters are allowed");
                      }
                      setQualification(e.target.value);
                    }}
                  />
                  <span className="fs-12 red">
                    {QualificationError === "Valid" ? "" : QualificationError}
                  </span>
                </div>
                <div className="pt-10">
                  <label className="form-label">Skills:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Lastname"
                    value={Skills}
                    onChange={(e) => {
                      if (
                        !numbers.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        setSkillsError("Valid");
                      } else {
                        setSkillsError("Numbers are Not allowed");
                      }
                      setSkills(e.target.value);
                    }}
                  />
                  <span className="fs-12 red">
                    {SkillsError === "Valid" ? "" : SkillsError}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="pt-10">
                  <label className="form-label">Salary:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Lastname"
                    value={Salary}
                    onChange={(e) => {
                      setSalary(e.target.value);
                    }}
                  />
                </div>
                <div className="pt-10">
                  <label className="form-label">Work Mode:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Lastname"
                    value={Availability}
                    onChange={(e) => {
                      if (
                        onlyLetters.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        setAvailabilityError("Valid");
                      } else {
                        setAvailabilityError("Only Letters are allowed");
                      }
                      setAvailability(e.target.value);
                    }}
                  />
                  <span className="fs-12 red">
                    {AvailabilityError === "Valid" ? "" : AvailabilityError}
                  </span>
                </div>
                <div className="pt-10">
                  <label className="form-label">Experience:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Lastname"
                    value={relevantexperience}
                    onChange={(e) => {
                      setrelevantexperience(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="pt-10">
                  <label className="form-label">Job Location:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Lastname"
                    value={jobLocation}
                    onChange={(e) => {
                      setjobLocation(e.target.value);
                    }}
                  />
                </div>
                <div className="pt-10">
                  <label className="form-label">Notice Period:</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Lastname"
                    value={NoticePeriod}
                    onChange={(e) => {
                      setNoticePeriod(e.target.value);
                    }}
                  />
                </div>
                <div className="pt-10">
                  <label className="form-label">Job Discription</label>
                  <input
                    className="form-control w-80 p-5"
                    type="text"
                    name="Lastname"
                    value={jobDescription}
                    onChange={(e) => {
                      setjobDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="">
              {item ? (
                <div className="mt-5 ms-5 text-center">
                  <button
                    type="button"
                    className="btn submitbtn"
                    onClick={() => {
                      setLoder(true);
                      updatefunction(item.deleteId);
                    }}
                    disabled={
                      !(
                        jobposition &&
                        Qualification &&
                        Skills &&
                        Availability &&
                        Salary &&
                        jobDescription &&
                        jobLocation &&
                        NoticePeriod &&
                        relevantexperience &&
                        jobpositionError === "Valid" &&
                        QualificationError === "Valid" &&
                        SkillsError === "Valid" &&
                        AvailabilityError === "Valid"
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="text-center mt-5 mr-45">
                  <button
                    type="submit"
                    className="btn submitbtn"
                    onClick={() => {
                      setLoder(true);
                      jobdatapost();
                    }}
                    disabled={
                      !(
                        jobposition &&
                        Qualification &&
                        Skills &&
                        Availability &&
                        Salary &&
                        jobDescription &&
                        jobLocation &&
                        NoticePeriod &&
                        relevantexperience &&
                        jobpositionError === "Valid" &&
                        QualificationError === "Valid" &&
                        SkillsError === "Valid" &&
                        AvailabilityError === "Valid"
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
      </div>
      <Modal
        open={openpopUp}
        onClose={() => {
          setopenpopUp(false);
          navigate("/Jobrequirement");
          localStorage.removeItem("Jobrequirement");
        }}
      >
        <Modal.Header>
          <Modal.Title>Job Requirement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!item ? (
            <p>Requirement Position Added Successfully!</p>
          ) : (
            <p>Requirement Position Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/Jobrequirement");
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

export default JobrequirementForm;
