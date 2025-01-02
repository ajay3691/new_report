import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Navbar/Sidebar'; // Ensure the path is correct

const EmployeeDashboard = () => {
  return (
    <Container fluid className="dashboard-container">
      <Row className="h-100">
        <Col xs={2} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col xs={10} className="content-col">
          <h2 className="dashboard-title">Employee Dashboard</h2>
          {/* Your dashboard content here */}
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDashboard;
