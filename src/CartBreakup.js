import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PriceBreakdown() {
  const cart = useSelector(state => state.cart.cart);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-light rounded p-3 m-3">
      <h2>Price Breakdown</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${totalAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Tax (10%)</td>
            <td>${(totalAmount * 0.1).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>${(totalAmount + totalAmount * 0.1).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/success" className="btn btn-primary">
        Proceed to Pay
      </Link>
    </div>
  );
}

export default PriceBreakdown;