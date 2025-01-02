import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import AddEmployee from './components/AddEmployee';
import EmployeeTable from './components/EmployeeTable';
import CreateProject from './components/CreateProject';
import CreateReport from './components/CreateReport'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/addEmployee" element={<AddEmployee />} />
      <Route path="/employeeTable" element={<EmployeeTable />} />
      <Route path="/createProject" element={<CreateProject />} />
      <Route path="/createReport" element={<CreateReport />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
