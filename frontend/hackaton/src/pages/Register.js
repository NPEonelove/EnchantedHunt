import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RegisterForm from '../components/RegisterForm';
import ParallaxBackground from '../components/ParallaxBackground';

const Register = () => {
  return (
    <>
      <ParallaxBackground />
      <motion.div 
        className="auth-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="auth-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <RegisterForm />
          <div className="auth-link">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Register;