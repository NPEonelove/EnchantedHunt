import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ParallaxBackground from '../components/ParallaxBackground';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <ParallaxBackground />
      <motion.div 
        className="dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="dashboard-container"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="logo-container">
            <img src="/logo512.png" alt="Logo" className="logo" />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to Dashboard!
          </motion.h1>
          
          <motion.div 
            className="user-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>User Information</h2>
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>User ID:</strong> {currentUser.id}</p>
          </motion.div>
          
          <motion.button 
            onClick={handleLogout} 
            className="logout-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Dashboard;