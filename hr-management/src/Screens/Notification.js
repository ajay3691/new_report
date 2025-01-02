import React, {useEffect, useState } from "react";
import { FetchData, postData, updateData } from "../apiservices";
import { InputGroup, Input } from "rsuite";
import { TbSend } from "react-icons/tb";
import moment from "moment";
import { Loders } from "./Loders";
import { toast } from "react-toastify";
function Notification() {
  const Employees = localStorage.getItem("login");
  const item = JSON.parse(Employees);
  const [totalnotification, settotalnotification] = useState([]);
  const [message, setmessage] = useState("");
  const [EmployeeNames, setEmployeeNames] = useState([]);
  const [selectedName, setselectedName] = useState();
  const [Loder, setLoder] = useState(true);
  const getnotifications = () => {
    FetchData("Notifications")
      .then((res) => {
        settotalnotification(res);
        // const count = res.filter(
        //   (item) => item.isread === "false" && item.first_name !== "Admin"
        // ).length;
        if (item.first_name === "Admin") {
          isreadTrue();
        } else {
          isreadTrueForUser();
        }

        setLoder(false);
      })
      .catch((error) => {
        setLoder(false)
        toast.error(`${error}`,{ autoClose: 1000 });
      });
  };

  const isreadTrue = () => {
    totalnotification.forEach((item) => {
      if (item.isread === "false" && item.first_name !== "Admin") {
        updateData("Notifications", { isread: "true" }, item.deleteId)
          .then((res) => {
            console.log("updatesuccessfull");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const isreadTrueForUser = () => {
    totalnotification.forEach((item) => {
      if (item?.isread === "false" && item?.first_name === "Admin") {
        updateData("Notifications", { isread: "true" }, item.deleteId)
          .then((res) => {
            console.log("updatesuccessfull");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  const getEmployessList = () => {
    FetchData("Employees")
      .then((res) => {
        setEmployeeNames(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const NotificationPost = () => {
    const data = {
      msg: message,
      first_name: "Admin",
      receiver: selectedName,
      isread: "false",
    };
    postData("Notifications", data)
      .then((res) => {
        getnotifications();
        setmessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getnotifications();
    getEmployessList();
  }, []);

  useEffect(() => {
    if (totalnotification.length > 0) {
      if (item.first_name === "Admin") {
        isreadTrue();
        console.log("Admin");
      } else {
        isreadTrueForUser();
        console.log("user");
      }
    }
  }, [totalnotification]);
  return (
    <div className="h-100 p-10">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100" : "h-100"}>
        <div className="h-5">Notifications</div>
        {item.first_name !== "Admin" ? (
          <div className="h-85 pr-10" style={{ overflowY: "auto" }}>
            {totalnotification.map((res, index) => (
              <div key={index} className="mb-3">
                {res.receiver === item.first_name ? (
                  <div className="text-start">
                    <div>
                      <span className="fs-13">{res.name}</span>
                      <span className="pl-10 fs-13">
                        {moment(res.order).format("lll")}
                      </span>
                    </div>
                    <div
                      className="p-5 d-inline-block card"
                      style={{ maxWidth: "40%" }}
                    >
                      <span className="px-2">{res.msg}</span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="h-85 pr-10" style={{ overflowY: "auto" }}>
              {totalnotification.map((res, index) => (
                <div key={index} className="mb-3">
                  {res.first_name !== "Admin" ? (
                    <div className="text-start">
                      <div>
                        <span className="fs-13">{res.name}</span>
                        <span className="pl-10 fs-13">
                          {moment(res.order).format("lll")}
                        </span>
                      </div>
                      <div
                        className="p-5 d-inline-block card"
                        style={{ maxWidth: "40%" }}
                      >
                        <div className="flex-column d-flex">
                          <span className="px-2 fs-13">
                            Start Date: {res.startDate}
                          </span>
                          <span className="px-2 fs-13">
                            End Date: {res.endDate}
                          </span>
                          <span className="px-2 fs-15">{res.msg}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-end">
                      <div className="fs-13">
                        {" "}
                        {moment(res.order).format("lll")}
                      </div>
                      <div
                        className="p-5 d-inline-block card"
                        style={{ maxWidth: "40%" }}
                      >
                        <span className="px-2">{res.msg}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 d-flex">
              <div className="w-30">
                <select
                  className="form-select p-10"
                  onChange={(e) => {
                    setselectedName(e.target.value);
                  }}
                  value={selectedName}
                >
                  <option>Select Employee</option>
                  {EmployeeNames?.map((item, index) => {
                    return (
                      <option value={item.first_name} key={index}>
                        {item.first_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <InputGroup inside>
                <Input
                  value={message}
                  onChange={(value, e) => {
                    setmessage(value);
                  }}
                />
                <InputGroup.Addon>
                  <TbSend
                    color="#244F96"
                    size={20}
                    onClick={() => {
                      NotificationPost();
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </InputGroup.Addon>
              </InputGroup>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Notification;
