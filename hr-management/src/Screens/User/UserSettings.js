import React, { useContext, useEffect, useState } from "react";
import { FetchData, updateData } from "../../apiservices";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Loders } from "../Loders";
import { Context } from "../UseContext/context";
function Settings() {
  const { setUserName } = useContext(Context);
  const storedLogin = localStorage.getItem("login");
  const initialData = storedLogin ? JSON.parse(storedLogin) : {};
  const [item, setItem] = useState(initialData);
  const [percent, setPercent] = useState(0);
  const [Loder, setLoder] = useState(false);
  useEffect(() => {
    getEmployeeData();
  }, []); // Fetch employee data on component mount

  const getEmployeeData = () => {
    FetchData("Employees")
      .then((res) => {
        const newData = res.find((e) => e.first_name === item.first_name);
        let storeItem = {
          first_name: newData.first_name,
          profilepic: newData.profilepic,
          email: newData.email,
        };
        setItem(newData);
        setUserName(storeItem)
        localStorage.setItem("login", JSON.stringify(storeItem));
        setLoder(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    setLoder(true);
    const selectedFile = e.target.files[0];
    const storageRef = ref(storage, `/files/${selectedFile?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => {
        console.log("Error during file upload:", err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          if (url) {
            updateEmployeeData(url);
          }
        });
      }
    );
  };

  const updateEmployeeData = (newImagePath) => {
    const newData = { ...item, profilepic: newImagePath };
    updateData("Employees", newData, `${item.deleteId}`)
      .then((res) => {
        getEmployeeData(); // Refresh the employee data
      })
      .catch((error) => {
        console.log("Error updating employee data:", error);
      });
  };

  return (
    <div className="h-100">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="d-flex align-items-center p-10">
          <span className="fs-20 theamcolor">My Profile</span>
        </div>
        <div className="h-90 d-flex">
          <div className="col-3 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center justify-content-center flex-column pt-5">
              <div className="cardStyle">
                {item?.profilepic !== "" ? (
                  <img
                    src={item?.profilepic}
                    alt="Card"
                    width={"100%"}
                    height={"100%"}
                  />
                ) : (
                  <div
                    style={{ background: "#244F96", borderRadius: 5 }}
                    className="h-100 align-items-center justify-content-center d-flex"
                  >
                    <p className="fs-60 white">{item.first_name.charAt(0)}</p>
                  </div>
                )}
              </div>
              <div className="pt-10">
                <label
                  htmlFor="fileInput"
                  style={{
                    cursor: "pointer",
                    padding: "4px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  Change Profile
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".jpg, .jpeg, .png" // Optional: Specify allowed file types
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>First Name:</span>
              <span className="pl-10">{item?.first_name}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Last Name:</span>
              <span className="pl-10">{item?.last_name}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Date of Birth:</span>
              <span className="pl-10">{item?.dob}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Gender:</span>
              <span className="pl-10">{item?.gender}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Age:</span>
              <span className="pl-10">{item?.Age}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Blood Group:</span>
              <span className="pl-10">{item?.blood_group}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Address:</span>
              <span className="pl-10">{item?.address}</span>
            </div>
          </div>
          <div className="col-3 pl-20 d-flex flex-column justify-content-between">
            <div className="p-10 bgwhite rounded">
              <span>Mobile Number:</span>
              <span className="pl-10">{item?.mobileno}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Employ ID:</span>
              <span className="pl-10">{item?.employee_id}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Job Title:</span>
              <span className="pl-10">{item?.job_title}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Job Role:</span>
              <span className="pl-10">{item?.job_role}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Joining Date:</span>
              <span className="pl-10">{item?.joining_date}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Email:</span>
              <span className="pl-10">{item?.email}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Office Mail:</span>
              <span className="pl-10">{item?.Office_Mail}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Password:</span>
              <span className="pl-10">{item?.password}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Alternative Mobile No:</span>
              <span className="pl-10">{item?.Alternative_MobileNo}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Adhar Number:</span>
              <span className="pl-10">{item?.AdharNo}</span>
            </div>{" "}
          </div>
          <div className="col-3 pl-20 d-flex flex-column justify-content-between">
            <div className="p-10 bgwhite rounded">
              <span>Pan Number:</span>
              <span className="pl-10">{item?.PanNo}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Employee Work Mode:</span>
              <span className="pl-10">{item?.Employee_Workmode}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Employee Work Type:</span>
              <span className="pl-10">{item?.Employee_work}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>IFSC Code:</span>
              <span className="pl-10">{item?.IFSC_code}</span>
            </div>
            <div className="p-10 bgwhite rounded">
              <span>Account Type:</span>
              <span className="pl-10">{item?.Account_Type}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Bank Name:</span>
              <span className="pl-10">{item?.Bank_name}</span>
            </div>{" "}
            <div className="p-10 bgwhite rounded">
              <span>Account Number:</span>
              <span className="pl-10">{item?.Account_Number}</span>
            </div>{" "}
            <div className="p-20"></div>
            <div className="p-20"></div>
            <div className="p-20"></div>
            <div className="p-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
