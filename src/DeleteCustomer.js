

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCustomer = ({ customer, token, onClose }) => {
  const handleDeleteCustomer = async () => {
    try {
      const response = await fetch(`/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${customer.uuid}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Customer deleted successfully');
        onClose();
      } else if (response.status === 500) {
        console.error('Failed to delete customer');
      } else if (response.status === 400) {
        console.error('UUID not found');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this customer?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteCustomer}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCustomer;
