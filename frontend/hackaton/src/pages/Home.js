import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home">
      <h1>Welcome to Our App</h1>
      {currentUser ? (
        <p>You are logged in as {currentUser.email}</p>
      ) : (
        <div>
          <p>Please log in or register to continue</p>
          <div className="home-links">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;