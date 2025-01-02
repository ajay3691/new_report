import React, { useState, useEffect } from 'react';
import { Table, Container, Alert, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from  '../Navbar/Navbar'

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
          <Navbar/>
   
    <Container className="mt-5">
      
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => navigate('/addEmployee')}>
            Add Employee
          </Button>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employee_id}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile_no}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  );
};

export default EmployeeTable;
