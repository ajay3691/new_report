import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
import logo from '../img/logo/logo_bg_r.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { username, password }
      );
      const { message, token, userRole } = response.data;
  
      console.log('Login successful:', message);
      console.log('User Role:', userRole);
      console.log('Token:', token);
  
      setSuccess(message);
      setError('');
  
      localStorage.setItem('token', token);
  
      // Ensure the navigate function works correctly
      console.log('Navigating to:', userRole === 'admin' ? '/employee-dashboard' : '/admin-dashboard');
      navigate(userRole === 'admin' ? '/employee-dashboard' : '/admin-dashboard');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data.error : 'An error occurred');
      setError(err.response ? err.response.data.error : 'An error occurred');
      setSuccess('');
    }
  };
  

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" className="logo" />
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="login-input"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Login
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <Button variant="link" onClick={() => navigate('/register')}>
                  New User? Sign Up
                </Button>
              </div>
              <div className="mt-3 text-center">
                <Button variant="link" onClick={() => navigate('/forgot-password')}>
                  Forgot Password?
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
