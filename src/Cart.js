import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity } from './redux/cartSlice';
import CartBreakup from './CartBreakup';
import './Cart.css'; // Import your CSS file for styling
import { FaTrashAlt } from 'react-icons/fa';


function Cart() {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div className="container cart-container">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={item.name} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text">Price: ${item.price}</p>
                <p className="card-text">Size: {item.size}</p>
                <p className="card-text">Toppings: {item.toppings.join(', ')}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
                <div className="button-group">
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => dispatch(removeFromCart(item.name))}
                  >
                    <FaTrashAlt /> 
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => dispatch(increaseQuantity(item.name))}
                  >
                    Increase Quantity
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <CartBreakup />
    </div>
  );
}

export default Cart;
