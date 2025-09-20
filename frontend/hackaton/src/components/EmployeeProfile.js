import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ResumeForm from './ResumeForm';

const EmployeeProfile = () => {
  const { currentUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Данные сотрудника (в реальном приложении брались бы из API)
  const [employeeData, setEmployeeData] = useState({
    position: 'Frontend Developer',
    department: 'IT Department',
    hireDate: '2024-01-15',
    phone: '+7 (999) 123-45-67',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    resume: ''
  });

  const handleLogout = () => {
    logout();
  };

  const handleSaveResume = (resumeData) => {
    setEmployeeData(prev => ({
      ...prev,
      ...resumeData
    }));
    setIsEditing(false);
  };

  return (
    <div className="employee-profile">
      <div className="logo-container">
        <img src="/logo512.png" alt="Logo" className="logo" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Employee Profile
      </motion.h1>

      {!isEditing ? (
        <>
          <motion.div 
            className="profile-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="info-section">
              <h2>Personal Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{currentUser.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{currentUser.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{employeeData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Employee ID:</span>
                  <span className="value">{currentUser.id}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>Work Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Position:</span>
                  <span className="value">{employeeData.position}</span>
                </div>
                <div className="info-item">
                  <span className="label">Department:</span>
                  <span className="value">{employeeData.department}</span>
                </div>
                <div className="info-item">
                  <span className="label">Hire Date:</span>
                  <span className="value">{employeeData.hireDate}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>Skills & Competencies</h2>
              <div className="skills-list">
                {employeeData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {employeeData.resume && (
              <div className="info-section">
                <h2>Resume</h2>
                <div className="resume-preview">
                  <p>{employeeData.resume}</p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="profile-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-btn"
            >
              {employeeData.resume ? 'Edit Resume' : 'Create Resume'}
            </button>
            <button 
              onClick={handleLogout} 
              className="logout-btn"
            >
              Logout
            </button>
          </motion.div>
        </>
      ) : (
        <ResumeForm 
          initialData={employeeData}
          onSave={handleSaveResume}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default EmployeeProfile;