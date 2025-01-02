import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState(""); // Role selection state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secretCode: "",
  }); // Form data state
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(""); // Success message state
  const [isAdmin, setIsAdmin] = useState(false); // Admin flag to display the registration form
  const navigate = useNavigate();

  // Handle input changes for the form
  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread existing form data
      [e.target.name]: e.target.value, // Update only the changed field
    });
  };

  // Handle role selection form submission
  const handleRoleSubmit = (e) => {
    e.preventDefault();
    if (role === "admin") {
      setIsAdmin(true); // Show the registration form
      setError("");
    } else {
      setError("Only admins can register new users.");
      setIsAdmin(false);
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:9000/register", {
        ...formData, // Spread the form data into the request body
      });
  
      setSuccess(response.data.message);
      setError("");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response ? err.response.data.error : "An error occurred");
      setSuccess("");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {isAdmin ? (
            <>
              <h2 className="text-center mb-4">Register New User</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email" // Corrected to email
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password" // Correctly matches the key in formData
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSecretCode" className="mt-3">
                  <Form.Label>Secret Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter secret code"
                    name="secretCode" // Correctly matches the key in formData
                    value={formData.secretCode}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Register
                </Button>
              </Form>
            </>
          ) : (
            <>
              <h2 className="text-center mb-4">Select Role</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleRoleSubmit}>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Proceed
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
