import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateCustomer = ({ customer, token, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: customer.first_name,
    last_name: customer.last_name,
    street: customer.street,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    email: customer.email,
    phone: customer.phone,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateCustomer = async () => {
    try {
      const response = await fetch(`/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${customer.uuid}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Customer updated successfully');
        onClose();
      } else if (response.status === 500) {
        console.error('Failed to update customer');
      } else if (response.status === 400) {
        console.error('Bad request. Body is empty.');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Street:</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>State:</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateCustomer}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCustomer;
