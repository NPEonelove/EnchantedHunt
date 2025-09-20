import React from 'react';
import { motion } from 'framer-motion';
import './ParallaxBackground.css';

const ParallaxBackground = () => {
  return (
    <div className="parallax-container">
      {/* Фоновые элементы с разной скоростью параллакса */}
      <motion.div 
        className="parallax-layer layer-1"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          y: [0, -20, 0],
          transition: { 
            y: { 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        }}
      />
      
      <motion.div 
        className="parallax-layer layer-2"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        style={{
          y: [0, -15, 0],
          transition: { 
            y: { 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        }}
      />
      
      <motion.div 
        className="parallax-layer layer-3"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        style={{
          y: [0, -10, 0],
          transition: { 
            y: { 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        }}
      />
      
      <motion.div 
        className="parallax-layer layer-4"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          scale: [1, 1.05, 1],
          transition: { 
            scale: { 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }
        }}
      />
      
      {/* Плавающие частицы */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className={`particle particle-${i % 3}`}
          initial={{ 
            y: Math.random() * 100,
            x: Math.random() * 100,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: Math.random() * 100 - 50,
            x: Math.random() * 100 - 50,
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;