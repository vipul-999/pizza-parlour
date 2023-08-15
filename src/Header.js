import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const [textColor, setTextColor] = useState('black'); // State for changing text color

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'lightgray',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const linkStyle = {
    textDecoration: 'none',
    margin: '0 10px',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  };

  const cart = useSelector(state => state.cart.cart);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextColor(prevColor => (prevColor === 'black' ? 'red' : 'black'));
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Run once when component mounts

  return (
    <header style={headerStyle}>
      <h1 style={{ margin: 0, color: textColor }}>Pizza Store</h1>
      <nav>
        <Link to="/" style={linkStyle}>
          Product List
        </Link>
        <Link to="/cart" style={linkStyle}>
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
