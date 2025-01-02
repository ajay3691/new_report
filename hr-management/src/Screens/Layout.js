import { Outlet } from "react-router-dom";
import Header from "./Header";
import DashBoard2 from "./Loginpage/DashBoard2";
function Layout() {
  return (
    <div className="bggray" style={{ height: "100vh"}}>
      <div className="d-flex h-100">
        <div className="w-20">
          <DashBoard2 />
        </div>
        <div className="w-80">
          <div style={{height:'8vh'}} className="bgwhite d-flex align-center justify-content-end pr-10">
            <Header/>
          </div>
          <div style={{height:'92vh',overflowY:'auto'}} className="px-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Layout;
