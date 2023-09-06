import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';

function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">
      {token ? (
        <>
        <AddCustomer token= {token}/>
        <CustomerList token={token} />
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;
