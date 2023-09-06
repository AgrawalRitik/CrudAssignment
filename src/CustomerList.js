// CustomerList.js

import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import UpdateCustomer from './UpdateCustomer.js'; // Make sure to provide the correct path
import DeleteCustomer from './DeleteCustomer'; // Make sure to provide the correct path

const CustomerList = ({ token }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerForUpdate, setSelectedCustomerForUpdate] = useState(null);
  const [selectedCustomerForDelete, setSelectedCustomerForDelete] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else if (response.status === 401) {
          console.error('Invalid authorization token');
        } else {
          console.error('Failed to fetch customer list');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    if (token) {
      fetchCustomers();
    }
  }, [token]);

  const handleUpdateClick = (customer) => {
    setSelectedCustomerForUpdate(customer);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomerForDelete(customer);
  };

  return (
    <Container fluid className="m-3 p-3">
      <h2>Customer List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleUpdateClick(customer)}
                >
                  Update
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(customer)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Customer Modal */}
      {selectedCustomerForUpdate && (
        <UpdateCustomer
          customer={selectedCustomerForUpdate}
          token={token}
          onClose={() => setSelectedCustomerForUpdate(null)}
        />
      )}

      {/* Delete Customer Modal */}
      {selectedCustomerForDelete && (
        <DeleteCustomer
          customer={selectedCustomerForDelete}
          token={token}
          onClose={() => setSelectedCustomerForDelete(null)}
        />
      )}
    </Container>
  );
};

export default CustomerList;
