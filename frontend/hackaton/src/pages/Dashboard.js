import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from '../components/ParallaxBackground';
import EmployeeProfile from '../components/EmployeeProfile';

const Dashboard = () => {
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
          <EmployeeProfile />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Dashboard;