import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={currentUser ? <Navigate to="/dashboard" /> : <Register />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;