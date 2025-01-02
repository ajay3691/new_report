import { Context } from "./Screens/UseContext/context";
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Screens/Loginpage/Login";
import Home from "./Screens/Home/Home";
import Registered from "./Screens/Registered/Registered";
import WorkAssign from "./Screens/WorkAssign/WorkAssign";
import WorkDetails from "./Screens/WorkAssign/WorkDetails";
import Userwork from "./Screens/User/Userwork";
import "./App.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import Layout from "./Screens/Layout";
import Googlemap from "./Screens/googlemap";
import Sidemenu from "./Screens/Sidemenu";
import DashBoard from "./Screens/DashBoard/DashBoard";
import HolidaysList from "./Screens/HolidaysList";
import TrainingAndDev from "./Screens/TrainingAndDev";
import Jobrequirement from "./Screens/Jobrequirement";
import HrPolicies from "./Screens/HrPolicies";
import Projects from "./Screens/Projects";
import Departments from "./Screens/Departments";
import JobrequirementForm from "./Screens/JobrequirementForm";
import Adddepartmentform from "./Screens/AddDepartmentform";
import Expenses from "./Screens/Expenses/Expenses";
import Invoices from "./Screens/Invoices/Invoices";
import ExpensesForm from "./Screens/Expenses/ExpensesForm";
import InvoicesForm from "./Screens/Invoices/InvoicesForm";
import HolidaysListForm from "./Screens/HolidaysListForm";
import PayrollForm from "./Screens/PayrollForm";
import ProjectForm from "./Screens/ProjectsForm";
import LeaveForm from "./Screens/User/LeaveForm";
import Settings from "./Screens/User/UserSettings";
import Notification from "./Screens/Notification";
import AttendanceTable from "./Screens/Attendance/Attendance";
import PaySlip from "./Screens/Pay_Slip";
import Payroll from "./Screens/Payroll";
import UserPaySlip from "./Screens/User/UserPay_Slip";
import Unauthorized from "./Screens/Unauthorized";
import RequireAuth from "./Screens/RequireAuth";
import Missing from "./Screens/Missing";
import LeaveApplications from "./Screens/LeaveAcces";
import DashBoard2 from "./Screens/Loginpage/DashBoard2";
import Device from "./Screens/Loginpage/Device";
import Geo from "./Screens/Loginpage/Geo";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { setUserName } = useContext(Context);

  useEffect(() => {
    const loginitem = localStorage.getItem("login");
    if (loginitem) {
      const item = JSON.parse(loginitem);
      try {
        const { first_name, profilepic, email } = item;
        setUserName({ first_name, profilepic, email });
      } catch (e) {
        console.error("Error setting user information:", e);
      }
    } else {
      console.log("LocalStorage Item not found");
    }

    setIsLoading(false);
  }, [setUserName, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="DashBoard2" element={<DashBoard2 />} />
      {/* <Route path="Attendance" element={<Attendance />} /> */}
      <Route path="/" element={<Layout />}>
        {/* <Route element={<RequireAuth />}> */}
          <Route path="DashBoard" element={<DashBoard />} />
          <Route path="Geo" element={<Geo />} />
          <Route path="Device" element={<Device />} />
          <Route path="Expenses" element={<Expenses />} />
          <Route path="ExpensesForm" element={<ExpensesForm />} />
          <Route path="Invoices" element={<Invoices />} />
          <Route path="InvoicesForm" element={<InvoicesForm />} />
          <Route path="HrPolicies" element={<HrPolicies />} />
          <Route path="WorkAssign" element={<WorkAssign />} />
          <Route path="Registered" element={<Registered />} />
          <Route path="Adddepartmentform" element={<Adddepartmentform />} />
          <Route path="JobrequirementForm" element={<JobrequirementForm />} />
          <Route path="Projects" element={<Projects />} />
          <Route path="Departments" element={<Departments />} />
          <Route path="Jobrequirement" element={<Jobrequirement />} />
          <Route path="HolidaysList" element={<HolidaysList />} />
          <Route path="Home" element={<Home />} />
          <Route path="TrainingAndDev" element={<TrainingAndDev />} />
          <Route path="PaySlip" element={<PaySlip />} />
          <Route path="WorkDetails" element={<WorkDetails />} />
          <Route path="HolidaysListForm" element={<HolidaysListForm />} />
          <Route path="PayrollForm" element={<PayrollForm />} />
          <Route path="ProjectForm" element={<ProjectForm />} />
          <Route path="Googlemap" element={<Googlemap />} />
          <Route path="AttendanceTable" element={<AttendanceTable />} />
          <Route path="Userwork" element={<Userwork />} />
          <Route path="UserPaySlip" element={<UserPaySlip />} />
          <Route path="Payroll" element={<Payroll />} />
          <Route path="LeaveForm" element={<LeaveForm />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Notification" element={<Notification />} />
        {/* </Route> */}
      </Route>
      <Route path="*" element={<Missing />} />
     </Routes>
    // <Routes>
    //   <Route path="/" element={<LeaveApplications />} />
    // </Routes>
  );
}

export default App;
