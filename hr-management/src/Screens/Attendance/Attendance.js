import React, { useState, useEffect } from "react";
import { Table } from "rsuite";
import { FetchData, postData, updateData } from "../../apiservices";
import { BiSolidFileExport } from "react-icons/bi";
import { exportToExcel } from "react-json-to-excel";
import moment from "moment";
import { Loders } from "../Loders";
const { Column, HeaderCell, Cell } = Table;

const AttendanceTable = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tableData, setTableData] = useState([]);
  const [DailyAttendance, setDailyAttendance] = useState([]);
  const [Loder, setLoder] = useState(true);
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 2);
    const lastDay = new Date(year, month + 1);

    const daysInMonth = [];
    let currentDate = new Date(firstDay);

    while (currentDate <= lastDay) {
      const dateString = currentDate.toISOString().split("T")[0];
      daysInMonth.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysInMonth;
  };

  const initializeTableData = (emp, daily) => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const initialData = emp.map((item, index) => {
      const employeeData = {
        id: item.employee_id,
        name: item.first_name,
        totalP: 0,
        totalA: 0,
        totalAP: 0,
        totalPA: 0,
        totalDays: 0,
      };

      daysInMonth.forEach((day) => {
        const attendanceForDay = daily.find(
          (item) => item.EmployeeID === employeeData.id && item.Day === day
        );
        const AttendanceStatus = attendanceForDay
          ? attendanceForDay.Status
          : "";
        employeeData[day] = AttendanceStatus;
        if (AttendanceStatus === "P") {
          employeeData.totalP += 1;
        } else if (AttendanceStatus === "A") {
          employeeData.totalA += 1;
        } else if (AttendanceStatus === "P/A") {
          employeeData.totalPA += 1;
        } else if (AttendanceStatus === "A/P") {
          employeeData.totalAP += 1;
        }
        employeeData.totalDays =
          employeeData.totalP +
          (employeeData.totalPA + employeeData.totalAP) / 2;
      });

      setLoder(false);
      return employeeData;
    });
    setTableData(initialData);
  };

  useEffect(() => {
    getEmployees();
  }, [selectedDate]);
  const getEmployees = () => {
    FetchData("Employees")
      .then((res) => {
        getDailyAttendance(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDailyAttendance = (emp) => {
    FetchData("Attendance")
      .then((res) => {
        setDailyAttendance(res);
        initializeTableData(emp, res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (id, day, value, name) => {
    const havingItem = DailyAttendance.find(
      (item) => item.Day === day && item.EmployeeName === name
    );
    if (havingItem) {
      updateData(
        "Attendance",
        {
          EmployeeID: id,
          Day: day,
          Status: value,
          EmployeeName: name,
        },
        havingItem.deleteId
      )
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      postData("Attendance", {
        EmployeeID: id,
        Day: day,
        Status: value,
        EmployeeName: name,
      })
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    }
    const updatedData = tableData.map((employee) =>
      employee.id === id ? { ...employee, [day]: value } : employee
    );
    setTableData(updatedData);
  };
  return (
    <div className="h-100 py-2">
      {Loder ? <Loders /> : ""}
      <div className={Loder ? "loder h-100 p-10" : "h-100 p-10"}>
        <div className="h-8 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span>Select Date: </span>
            <div className="pl-10">
              <input
                className="form-control"
                type="month" // Use type="month" for year and month selection
                value={`${selectedDate.getFullYear()}-${(
                  selectedDate.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}`}
                onChange={(e) => {
                  setLoder(true);
                  const [year, month] = e.target.value.split("-");
                  setSelectedDate(new Date(year, parseInt(month, 10) - 1));
                }}
              />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <span className="mr-5">Export</span>
            <BiSolidFileExport
              color="244F96"
              size={25}
              onClick={() =>
                exportToExcel(tableData, moment(selectedDate).format("MMMM"))
              }
            />
          </div>
        </div>
        <div className="h-92 pt-5">
          <Table
            data={tableData}
            fillHeight={true}
            wordWrap="break-word"
            bordered
          >
            <Column width={110} fixed>
              <HeaderCell className="tableheader">Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>
            <Column width={90} fixed align="center">
              <HeaderCell className="tableheader">EMP ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            {getDaysInMonth(selectedDate).map((day) => (
              <Column key={day} width={130} align="center">
                <HeaderCell className="tableheader" align="center">
                  {day}
                </HeaderCell>
                <EditableCell dataKey={day} onChange={handleChange} />
              </Column>
            ))}
            <Column width={60} align="center">
              <HeaderCell className="tableheader">T_P</HeaderCell>
              <Cell dataKey="totalP" />
            </Column>
            <Column width={60} align="center">
              <HeaderCell className="tableheader">T_A</HeaderCell>
              <Cell dataKey="totalA" />
            </Column>
            <Column width={70} align="center">
              <HeaderCell className="tableheader">T_A/P</HeaderCell>
              <Cell dataKey="totalAP" />
            </Column>
            <Column width={70} align="center">
              <HeaderCell className="tableheader">T_P/A</HeaderCell>
              <Cell dataKey="totalPA" />
            </Column>
            <Column width={140} align="center">
              <HeaderCell className="tableheader">Total(w) Days</HeaderCell>
              <Cell dataKey="totalDays" />
            </Column>
          </Table>
        </div>
      </div>
    </div>
  );
};

const EditableCell = ({ rowData, dataKey, onChange, ...props }) => {
  return (
    <Cell {...props}>
      <select
        className="form-select w-80 p-5"
        onChange={(event) => {
          onChange &&
            onChange(rowData.id, dataKey, event.target.value, rowData.name);
        }}
        value={rowData[dataKey]}
        style={{ opacity: 0.5 }}
      >
        <option></option>
        <option value="A">A</option>
        <option value="P">P</option>
        <option value="A/P">A/P</option>
        <option value="P/A">P/A</option>
      </select>
    </Cell>
  );
};
export default AttendanceTable;
