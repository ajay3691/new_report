import React, {useState } from "react";
import "./Registered.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "rsuite";
import { updateData, postData } from "../../apiservices";
import { Loders } from "../Loders";
import { toast } from "react-toastify";
function Registered() {
  const username = localStorage.getItem("user");
  const item = JSON.parse(username);
  const navigate = useNavigate();
  const [Loder, setLoder] = useState(false);
  const [name, setName] = useState(item ? item.first_name : "");
  const [password, setPassword] = useState(item ? item.password : "");
  const [Lastname, setlastname] = useState(item ? item.last_name : "");
  const [employID, setemployID] = useState(item ? item.employee_id : 0);
  const [emailID, setemailID] = useState(item ? item.email : "");
  const [officeMailID, setofficeMailID] = useState(
    item ? item.Office_Mail : ""
  );
  const [Jobrole, setjobrole] = useState(item ? item.job_role : "");
  const [joiningDate, setjoiningDate] = useState(item ? item.joining_date : "");
  const [Gender, setGender] = useState(item ? item.gender : "");
  const [DOB, setDOB] = useState(item ? item.dob : "");
  const [Address, setAddress] = useState(item ? item.address : "");
  const [jobTitle, setjobTitle] = useState(item ? item.job_title : "");
  const [bloodGroup, setbloodGroup] = useState(item ? item.blood_group : "");
  const [contactnumber, setcontactnumber] = useState(item ? item.mobileno : "");
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(item ? "Valid" : "");
  const [nameError, setnameError] = useState(item ? "Valid" : "");
  const [lastnameError, setlastnameError] = useState(item ? "Valid" : "");
  const [jobroleError, setjobroleError] = useState(item ? "Valid" : "");
  const [MobilenoError, setMobilenoError] = useState(item ? "Valid" : "");
  const [jobtitleError, setjobtitleError] = useState(item ? "Valid" : "");
  const [altMobileno, setaltMobileno] = useState(
    item ? item.Alternative_MobileNo : ""
  );
  const [altMobilenoError, setaltMobilenoError] = useState("Valid");
  const [Adharno, setAdharno] = useState(item ? item.AdharNo : "");
  const [AdharnoError, setAdharnoError] = useState(item ? "Valid" : "");
  const [PanNo, setpanNo] = useState(item ? item.PanNo : "");
  const [officeMailID_Error, setofficeMailID_Error] = useState("Valid");
  const [panNoError, setpaNoError] = useState(item ? "Valid" : "");
  const [employWorkmode, setemployWorkmode] = useState(
    item ? item.Employee_Workmode : ""
  );
  const [employWork, setemployWork] = useState(item ? item.Employee_work : "");
  const [BankName, setBankName] = useState(item ? item.Bank_name : "");
  const [AccountNo, setAccountNo] = useState(item ? item.Account_Number : "");
  const [IfscCode, setIfscCode] = useState(item ? item.IFSC_code : "");
  const [IfscCodeError, setIfscCodeError] = useState(item ? "Valid" : "");
  const [AccountType, setAccountType] = useState(item ? item.Account_Type : "");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem("user");
    navigate("/Home");
  };
  const calculateAge = (dateOfBirth) => {
    // Create a Date object for the selected date of birth
    const dob = new Date(dateOfBirth);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the current date and the date of birth
    const ageDifference = currentDate - dob;

    // Convert the age difference from milliseconds to years
    const ageInYears = Math.floor(
      ageDifference / (365.25 * 24 * 60 * 60 * 1000)
    );

    return ageInYears;
  };
  const data = {
    first_name: name,
    last_name: Lastname,
    gender: Gender,
    Age: calculateAge(DOB),
    employee_id: employID,
    email: emailID,
    joining_date: joiningDate,
    job_role: Jobrole,
    password: item ? password : generatePass(),
    address: Address,
    job_title: jobTitle,
    mobileno: contactnumber,
    blood_group: bloodGroup,
    dob: DOB,
    profilepic: item ? item.profilepic : "",
    Alternative_MobileNo: altMobileno,
    AdharNo: Adharno,
    PanNo: PanNo,
    Office_Mail: officeMailID,
    Employee_Workmode: employWorkmode,
    Employee_work: employWork,
    Bank_name: BankName,
    Account_Number: AccountNo,
    IFSC_code: IfscCode,
    Account_Type: AccountType,
    TimeStamp: item ? item.order : new Date().getTime(),
  };
  const AddEmployee = () => {
    postData("Employees", data)
      .then((res) => {
        if (res) {
          setLoder(false);
          handleOpen();
        }
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  const strongEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const onlyLetters = /^[A-Za-z\s]+$/;
  const numbers = /^[0-9]+$/;
  const strongMobileNumber = /^[6-9]{1}?[0-9]{9}$/;
  const BothnoAndletters = /^[a-zA-Z0-9\s]*$/;

  const updatefunction = (id) => {
    updateData("Employees", data, `${id}`)
      .then((res) => {
        setLoder(false);
        handleOpen();
      })
      .catch((error) => {
        setLoder(false);
        toast.error(`${error}`);
      });
  };
  function generatePass() {
    let pass = "";
    let str = "0123456789abcdefghijklmnopqrstuvwxyz0123456789@#$";
    for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }
    return pass;
  }

  return (
    <div className="h-100">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100 p-10" : "h-100 p-10"}>
        <div className="d-flex align-items-center">
          <BsFillArrowLeftCircleFill
            size={25}
            color="#244E96"
            onClick={() => {
              navigate("/Home");
              localStorage.removeItem("user");
            }}
          />
          <div className="pl-20">
            <span className="fs-20">Registration</span>
          </div>
        </div>
        <div className="d-flex pt-10">
          <div className="col-md-3">
            <div>
              <span className="form-span">First Name:</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  if (
                    onlyLetters.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    setnameError("Valid");
                  } else {
                    setnameError("Only Letters are allowed");
                  }
                  setName(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {nameError === "Valid" ? "" : nameError}
              </span>
            </div>
            <div className="pt-10">
              <span className="form-span">Last Name:</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                name="Lastname"
                value={Lastname}
                onChange={(e) => {
                  if (
                    onlyLetters.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    setlastnameError("Valid");
                  } else {
                    setlastnameError("Only Letters are allowed");
                  }
                  setlastname(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {lastnameError === "Valid" ? "" : lastnameError}
              </span>
            </div>
            <div className="pt-10">
              <span className="form-span">Gender:</span>
              <select
                className="form-select w-80 p-5"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                value={Gender}
              >
                <option></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="pt-10">
              <span className="form-span">Date of Birth:</span>
              <input
                className="form-control w-80 p-5"
                type="date"
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <span className="form-span">Age:</span>
              <input
                className="form-control w-80 p-5"
                type="number"
                name="Age"
                value={DOB ? calculateAge(DOB) : ""}
                disabled
              />
            </div>
            <div className="pt-10">
              <span className="form-span">Mobile Number:</span>
              <input
                className="form-control w-80 p-5"
                type=""
                value={contactnumber}
                maxLength={10}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setMobilenoError("Please Enter Mobile Number");
                  } else if (!strongMobileNumber.test(e.target.value)) {
                    setMobilenoError("Please Enter Vaild Mobile Number");
                  } else {
                    setMobilenoError("Valid");
                  }
                  setcontactnumber(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {MobilenoError === "Valid" ? "" : MobilenoError}
              </span>
            </div>
            <div className="pt-10 w-80">
              <span className="form-span">Alternative Mobile Number:</span>
              <input
                className="form-control p-5"
                type=""
                value={altMobileno}
                maxLength={10}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setaltMobilenoError("Valid");
                  } else if (!strongMobileNumber.test(e.target.value)) {
                    setaltMobilenoError("Please Enter Vaild Mobile Number");
                  } else if (e.target.value === contactnumber) {
                    setaltMobilenoError(
                      "Alternative number cannot be the same as the mobile number."
                    );
                  } else {
                    setaltMobilenoError("Valid");
                  }
                  setaltMobileno(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {altMobilenoError === "Valid" ? "" : altMobilenoError}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <span className="form-span">Blood Group:</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                value={bloodGroup}
                onChange={(e) => {
                  setbloodGroup(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <span className="form-span">Aadhar Number</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                value={Adharno}
                maxLength={12}
                onChange={(e) => {
                  if (numbers.test(e.target.value) || e.target.value === "") {
                    setAdharnoError("Valid");
                  } else {
                    setAdharnoError("Only Numbers are allowed");
                  }
                  setAdharno(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {AdharnoError === "Valid" ? "" : AdharnoError}
              </span>
            </div>
            <div className="pt-10">
              <span className="form-span">Pancard Number</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                value={PanNo}
                maxLength={10}
                onChange={(e) => {
                  if (
                    BothnoAndletters.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    setpaNoError("Valid");
                  } else {
                    setpaNoError("special characters are not allowed");
                  }
                  setpanNo(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {panNoError === "Valid" ? "" : panNoError}
              </span>
            </div>
            <div className="pt-10">
              <span className="form-span">Job Title:</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                value={jobTitle}
                onChange={(e) => {
                  if (
                    onlyLetters.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    setjobtitleError("Valid");
                  } else {
                    setjobtitleError("Only Letters are allowed");
                  }
                  setjobTitle(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {jobtitleError === "Valid" ? "" : jobtitleError}
              </span>
            </div>
            <div className="pt-10">
              <span className="form-span">Job Role:</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                name="Jobrole"
                value={Jobrole}
                onChange={(e) => {
                  if (
                    onlyLetters.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    setjobroleError("Valid");
                  } else {
                    setjobroleError("Only Letters are allowed");
                  }
                  setjobrole(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {jobroleError === "Valid" ? "" : jobroleError}
              </span>
            </div>
            <div className="d-flex pt-10" style={{ flexDirection: "column" }}>
              <span className="form-span">Joining Date:</span>
              <input
                className="form-control w-80 p-5"
                type="date"
                value={joiningDate}
                onChange={(e) => {
                  setjoiningDate(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <span className="form-span">Employ ID:</span>
              <input
                className="form-control w-80 p-5"
                type="number"
                name="employID"
                value={employID}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setemployID(parseInt(e.target.value));
                  } else {
                    setemployID("");
                  }
                }}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <span className="form-span">Employee Type</span>
              <div className="d-flex w-80 p-5">
                <div className="form-check formcheck">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Full Time"
                    name="employ"
                    id="Full Time"
                    checked={employWork === "Full Time"}
                    onChange={(e) => {
                      setemployWork(e.target.value);
                    }}
                  />
                  <span className="form-check-span" htmlFor="flexRadioDefault1">
                    Full Time
                  </span>
                </div>
                <div className="form-check formcheck ml">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Contract"
                    name="employ"
                    id="Contract"
                    checked={employWork === "Contract"}
                    onChange={(e) => {
                      setemployWork(e.target.value);
                    }}
                  />
                  <span className="form-check-span" htmlFor="flexRadioDefault2">
                    Contract
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-10">
              <span className="form-span">Work Mode</span>
              <div className="d-flex w-80 p-5 ">
                <div className="form-check formcheck">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value="Remote"
                    id="Remote"
                    checked={employWorkmode === "Remote"}
                    onChange={(e) => {
                      setemployWorkmode(e.target.value);
                    }}
                  />
                  <span className="form-check-span" htmlFor="flexRadioDefault1">
                    Remote
                  </span>
                </div>
                <div className="form-check formcheck ml-15">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value="Office"
                    id="Office"
                    checked={employWorkmode === "Office"}
                    onChange={(e) => {
                      setemployWorkmode(e.target.value);
                    }}
                  />
                  <span className="form-check-span" htmlFor="flexRadioDefault2">
                    Office
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-10">
              <span className="form-span">Address:</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                value={Address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <span className="form-span">Email ID:</span>
              <input
                className="form-control w-80 p-5"
                type="email"
                name="emailID"
                value={emailID}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setEmailError("Email is required");
                  } else if (!strongEmail.test(e.target.value)) {
                    setEmailError("Email must be email");
                  } else {
                    setEmailError("Valid");
                  }
                  setemailID(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {emailError === "Valid" ? "" : emailError}
              </span>
            </div>
            <div className="pt-10">
              <span className="form-span">Office Mail ID:</span>
              <input
                className="form-control w-80 p-5"
                type="email"
                name="emailID"
                value={officeMailID}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setofficeMailID_Error("Valid");
                  } else if (!strongEmail.test(e.target.value)) {
                    setofficeMailID_Error("Email must be email");
                  } else {
                    setofficeMailID_Error("Valid");
                  }
                  setofficeMailID(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {officeMailID_Error === "Valid" ? "" : officeMailID_Error}
              </span>
            </div>
            <div className="pt-10">
              <span className="form-span">Bank Name</span>
              <select
                className="form-select w-80 p-5"
                onChange={(e) => {
                  setBankName(e.target.value);
                }}
                value={BankName}
              >
                <option></option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Union Bank of India">Union Bank of India</option>
                <option value="Central Bank of India">
                  Central Bank of India
                </option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="Axis Bank">Axis Bank</option>
                <option value="YES BANK">YES BANK</option>
                <option value="Canara Bank">Canara Bank</option>
              </select>
            </div>
            <div className="pt-10">
              <span className="form-span">Account Type</span>
              <select
                className="form-select w-80 p-5"
                onChange={(e) => {
                  setAccountType(e.target.value);
                }}
                value={AccountType}
              >
                <option></option>
                <option value="Salary account">Salary account</option>
                <option value="Savings account">Savings account</option>
                <option value="Current account">Current account</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div>
              <span className="form-span">Account Number:</span>
              <input
                className="form-control w-80 p-5"
                type="number"
                value={AccountNo}
                // maxLength={}
                onChange={(e) => {
                  setAccountNo(e.target.value);
                }}
              />
            </div>
            <div className="pt-10">
              <span className="form-span">IFSC Code</span>
              <input
                className="form-control w-80 p-5"
                type="text"
                value={IfscCode}
                // maxLength={}
                onChange={(e) => {
                  if (
                    BothnoAndletters.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    setIfscCodeError("Valid");
                  } else {
                    setIfscCodeError("special characters are not allowed");
                  }
                  setIfscCode(e.target.value);
                }}
              />
              <span className="fs-12 red">
                {IfscCodeError === "Valid" ? "" : IfscCodeError}
              </span>
            </div>
            <div className="w-80">
              {item ? (
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    className="btn submitbtn"
                    onClick={() => {
                      setLoder(true);
                      updatefunction(item.deleteId);
                    }}
                    disabled={
                      !(
                        name &&
                        Lastname &&
                        Gender &&
                        employID &&
                        emailID &&
                        joiningDate &&
                        Jobrole &&
                        Address &&
                        jobTitle &&
                        contactnumber &&
                        bloodGroup &&
                        DOB &&
                        Adharno &&
                        PanNo &&
                        employWorkmode &&
                        employWork &&
                        BankName &&
                        AccountNo &&
                        IfscCode &&
                        AccountType &&
                        nameError === "Valid" &&
                        lastnameError === "Valid" &&
                        MobilenoError === "Valid" &&
                        altMobilenoError === "Valid" &&
                        AdharnoError === "Valid" &&
                        panNoError === "Valid" &&
                        jobtitleError === "Valid" &&
                        jobroleError === "Valid" &&
                        emailError === "Valid" &&
                        IfscCodeError === "Valid" &&
                        officeMailID_Error === "Valid"
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="mt-5 text-center">
                  <button
                    type="submit"
                    className="btn submitbtn"
                    onClick={() => {
                      setLoder(true);
                      AddEmployee();
                    }}
                    disabled={
                      !(
                        name &&
                        Lastname &&
                        Gender &&
                        employID &&
                        emailID &&
                        joiningDate &&
                        Jobrole &&
                        Address &&
                        jobTitle &&
                        contactnumber &&
                        bloodGroup &&
                        DOB &&
                        Adharno &&
                        PanNo &&
                        employWorkmode &&
                        employWork &&
                        BankName &&
                        AccountNo &&
                        IfscCode &&
                        AccountType &&
                        nameError === "Valid" &&
                        lastnameError === "Valid" &&
                        MobilenoError === "Valid" &&
                        altMobilenoError === "Valid" &&
                        AdharnoError === "Valid" &&
                        panNoError === "Valid" &&
                        jobtitleError === "Valid" &&
                        jobroleError === "Valid" &&
                        emailError === "Valid" &&
                        IfscCodeError === "Valid" &&
                        officeMailID_Error === "Valid"
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
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!item ? (
            <p>New Employee Registered Successfully!</p>
          ) : (
            <p>Employee Details Updated Successfully!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              navigate("/Home");
              localStorage.removeItem("user");
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

export default Registered;
