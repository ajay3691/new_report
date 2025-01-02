import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import logo from "../img/logo/logo_bg_r.png";
import { logOut } from "../Redux/slice/loginSlice";
const EmployeeReport = React.lazy(() => import(/* webpackPrefetch: true */ "./EmployeeReport"));
const IdCardReport = React.lazy(() => import(/* webpackPrefetch: true */ "./IdCardReport"));
const ReportHistory = React.lazy(() => import(/* webpackPrefetch: true */ "./ReportHistory"));
const EmployeeList = React.lazy(() => import(/* webpackPrefetch: true */ "./EmployeeList"));

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, userData } = useSelector((state) => state.login);
  const [isToggled, setIsToggled] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const isAdmin = userData.userType === "Admin";
  
  useEffect(() => {
    const handleResize = () => {
      setIsToggled(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const logOuts = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 640 && sidebarRef.current && !sidebarRef.current.contains(event.target) && !isToggled) {
        setIsToggled(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggled]);

  return (
    <>
      <button onClick={() => handleToggle()} className="sidebar-toggle" type="button">
        {/* <span className="sr-only">Open sidebar</span> */}
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside ref={sidebarRef} id="sidebar-multi-level-sidebar" className={isToggled ? "sidebar active" : "sidebar"} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/dashboard" className="flex justify-center items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <span className="ms-3 mr-4">
                  <img alt="logo" className="h-14 w-auto" src={logo}></img>
                </span>
              </Link>
            </li>
            {isAdmin ? (
              <>
                <li>
                  <Link to="/dashboard/employee-list" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${location.pathname === "/dashboard/employee-list" && "bg-gray-100"}`}>
                    <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-orange-500 ${location.pathname === "/dashboard/employee-list" && "text-orange-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                    </svg>
                    <span className="flex-1 text-left ml-3 ms-3 whitespace-nowrap">Employee List</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/report-history" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${location.pathname === "/dashboard/report-history" && "bg-gray-100"}`}>
                    <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-orange-500 ${location.pathname.startsWith("/dashboard/report-history") && "text-orange-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <span className="flex-1 text-left ml-3 ms-3 whitespace-nowrap">Report History</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${location.pathname === "/dashboard" && "bg-gray-100"}`}>
                    <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-orange-500 ${location.pathname === "/dashboard" && "text-orange-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                    </svg>
                    <span className="flex-1 text-left ml-3 ms-3 whitespace-nowrap">Employee Report</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/id-card-report" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${location.pathname === "/dashboard/id-card-report" && "bg-gray-100"}`}>
                    <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-orange-500 ${location.pathname === "/dashboard/id-card-report" && "text-orange-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                    </svg>
                    <span className="flex-1 text-left ml-3 ms-3 whitespace-nowrap">ID Card Report</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/report-history" className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${location.pathname.startsWith("/dashboard/report-history") && "bg-gray-100"}`}>
                    <svg className={`flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-orange-500 ${location.pathname.startsWith("/dashboard/report-history") && "text-orange-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className="flex-1 text-left ml-3 ms-3 whitespace-nowrap">Report History</span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <div onClick={(e) => logOuts()} className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                </svg>
                <span className="flex-1 text-left ml-3 ms-3 select-none whitespace-nowrap">Logout</span>
              </div>
            </li>
          </ul>
          <div class="flex items-center absolute bottom-0 mb-3 pl-4 pr-14 py-2 border-t border-indigo-150 rounded-md">
            <div class="flex-shrink-0">
              <img alt="profile pic" class="w-10 h-10 rounded-full" src={userData.profileUrl} />
            </div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{userData.employeeName}</p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">{userData.designation}</p>
            </div>
            <div></div>
          </div>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Routes>
            <Route path="/" element={<EmployeeReport />} />
            <Route path="/id-card-report" element={<IdCardReport />} />
            <Route path="/report-history/*" element={<ReportHistory />} />
            <Route path="/employee-list" element={<EmployeeList />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
