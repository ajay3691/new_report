import React from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/Sidebar.css'; // Import your custom CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/createReport">Report</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
        {/* Add more links as needed */}
      </Nav>
    </div>
  );
};

export default Sidebar;
