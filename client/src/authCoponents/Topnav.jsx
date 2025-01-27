import React from "react";
import { FaBell } from "react-icons/fa";
//import "bootstrap/dist/css/bootstrap.min.css";

const TopNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="navbar-brand">Company Logo</div>

      <div className="ms-auto d-flex align-items-center">
        <span className="me-3 fw-bold">John Doe</span> {/* Replace with dynamic employee name */}
        <div className="position-relative">
          <FaBell size={20} />
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.6rem" }}
          >
            3 {/* Replace with dynamic notification count */}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
