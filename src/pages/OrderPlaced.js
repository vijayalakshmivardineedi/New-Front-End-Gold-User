import React from 'react';
import { Link } from 'react-router-dom';
import './OrderPlaced.css'

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <h1>Order Placed Successfully!!!</h1>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;