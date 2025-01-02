import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from '../img/logo/logo_bg_r.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css'; // Import custom styles

const TopNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar">
      <Navbar.Brand as={Link} to="/" className="logo-container">
        <img
          src={logo}
          alt="KST Infotech Logo"
          className="logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto navbar-nav">
          <Nav.Link as={Link} to="/createProject">
             Add Project
          </Nav.Link>
          <Nav.Link as={Link} to="/admin-Dashboard">
            DashBoard
          </Nav.Link>
          <Nav.Link as={Link} to="/employeeTable">
            Employees
          </Nav.Link>
          <Nav.Link as={Link} to="/settings">
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;
