import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
const Login = ({ setToken }) => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/sunbase/portal/api/assignment_auth.jsp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login_id: loginId, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const token = data.access_token;
          setToken(token);
        } else if (response.status === 401) {
          console.error('Invalid credentials');
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
  
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={6}>
            <Form onSubmit={handleLogin}>
              <h2 className="mb-4">Login</h2>
              <Form.Group controlId="loginId">
                <Form.Label>Login ID:</Form.Label>
                <Form.Control
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Login;
  