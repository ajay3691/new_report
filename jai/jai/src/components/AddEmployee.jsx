import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    employee_id: '',
    employee_name: '',
    email: '',
    mobile_no: '',
    role: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/create', employeeData);
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
      setMessage('');
    }
  };

  return (
    <Container>
      <h2>Add Employee</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            name="employee_id"
            value={employeeData.employee_id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            type="text"
            name="employee_name"
            value={employeeData.employee_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            name="mobile_no"
            value={employeeData.mobile_no}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="role"
            value={employeeData.role}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Employee
        </Button>
      </Form>
    </Container>
  );
};

export default AddEmployee;
