import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaCheckCircle size={100} color="green" />
        <h2>Order Successful</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Success;