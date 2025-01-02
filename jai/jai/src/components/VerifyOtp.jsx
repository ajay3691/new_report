import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-otp`, { email, otp });
      setMessage(response.data.message);
      setError('');
      navigate('/reset-password', { state: { email } }); // Redirect to reset password page
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
      setMessage('');
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="text-center mb-4">Verify OTP</h4>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleVerifyOTP}>
                <Form.Group controlId="formOtp">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="login-input"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Verify OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOTP;
