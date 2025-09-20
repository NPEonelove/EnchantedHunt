import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ResumeForm from './ResumeForm';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const { currentUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [employeeData, setEmployeeData] = useState({
    position: 'Frontend Developer',
    department: 'IT Department',
    hireDate: '2024-01-15',
    phone: '+7 (999) 123-45-67',
    level: 'Middle',
    experience: '3 года коммерческого опыта в разработке на React',
    education: 'Высшее техническое образование',
    languages: 'English (Intermediate), Russian (Native)',
    responsibilities: [
      'Разработка пользовательского интерфейса',
      'Оптимизация производительности',
      'Код-ревью',
      'Взаимодействие с командой'
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Redux', 'Git'],
    resume: ''
  });

  const [vacancies] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'IT Department',
      level: 'Senior',
      location: 'Москва / Удаленно',
      salary: 'от 200 000 руб.',
      requirements: ['5+ лет опыта с React', 'TypeScript', 'Redux', 'Опыт руководства командой'],
      status: 'active'
    },
    {
      id: 2,
      title: 'Frontend Team Lead',
      department: 'Product Development',
      level: 'Lead',
      location: 'Санкт-Петербург',
      salary: 'от 300 000 руб.',
      requirements: ['7+ лет опыта', 'React, Vue или Angular', 'Управление командой 5+ человек', 'Архитектурные навыки'],
      status: 'active'
    }
  ]);

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

  const InfoItem = ({ label, value, color }) => (
    <div className="info-item" style={{ borderLeftColor: color }}>
      <span className="label" style={{ color }}>{label}:</span>
      <span className="value">{value}</span>
    </div>
  );

  const BulletedItem = ({ children, color }) => (
    <div className="bulleted-item">
      <span className="bullet" style={{ color }}>•</span>
      <span>{children}</span>
    </div>
  );

  const renderProfileTab = () => (
    !isEditing ? (
      <motion.div 
        className="profile-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="left-column">
          <motion.div 
            className="info-card personal-card"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>👤 Personal Information</h2>
            <div className="info-grid">
              <InfoItem label="Full Name" value={currentUser.name} color="#667eea" />
              <InfoItem label="Email" value={currentUser.email} color="#667eea" />
              <InfoItem label="Phone" value={employeeData.phone} color="#667eea" />
              <InfoItem label="Employee ID" value={currentUser.id} color="#667eea" />
            </div>
          </motion.div>

          <motion.div 
            className="info-card work-card"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>💼 Work Information</h2>
            <div className="info-grid">
              <InfoItem label="Position" value={employeeData.position} color="#ed8936" />
              <InfoItem label="Department" value={employeeData.department} color="#ed8936" />
              <InfoItem label="Level" value={employeeData.level} color="#ed8936" />
              <InfoItem label="Hire Date" value={employeeData.hireDate} color="#ed8936" />
            </div>
          </motion.div>
        </div>

        <div className="center-column">
          <motion.div 
            className="info-card skills-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2>🚀 Skills & Technologies</h2>
            <div className="skills-grid">
              {employeeData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="skill-tag"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="info-card responsibilities-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2>📋 Responsibilities</h2>
            <div className="bulleted-list">
              {employeeData.responsibilities.map((responsibility, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BulletedItem color="#48bb78">{responsibility}</BulletedItem>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="right-column">
          <motion.div 
            className="info-card experience-card"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2>🎓 Experience & Education</h2>
            <div className="bulleted-list">
              <BulletedItem color="#f56565">
                <strong>Experience:</strong> {employeeData.experience}
              </BulletedItem>
              <BulletedItem color="#f56565">
                <strong>Education:</strong> {employeeData.education}
              </BulletedItem>
              <BulletedItem color="#f56565">
                <strong>Languages:</strong> {employeeData.languages}
              </BulletedItem>
            </div>
          </motion.div>
        </div>
      </motion.div>
    ) : (
      <ResumeForm 
        initialData={employeeData}
        onSave={handleSaveResume}
        onCancel={() => setIsEditing(false)}
      />
    )
  );

  const renderVacanciesTab = () => (
    <motion.div 
      className="vacancies-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="vacancies-header">
        <h2>📋 Available Vacancies</h2>
        <p>Актуальные вакансии в компании</p>
      </div>

      <div className="vacancies-grid">
        {vacancies.map((vacancy, index) => (
          <motion.div
            key={vacancy.id}
            className="vacancy-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="vacancy-header">
              <h3>{vacancy.title}</h3>
              <span className="status-badge active">
                Активная
              </span>
            </div>
            
            <div className="vacancy-details">
              <div className="detail-item">
                <span className="label">Департамент:</span>
                <span className="value">{vacancy.department}</span>
              </div>
              <div className="detail-item">
                <span className="label">Уровень:</span>
                <span className="value">{vacancy.level}</span>
              </div>
              <div className="detail-item">
                <span className="label">Локация:</span>
                <span className="value">{vacancy.location}</span>
              </div>
              <div className="detail-item">
                <span className="label">Зарплата:</span>
                <span className="value salary">{vacancy.salary}</span>
              </div>
            </div>

            <div className="vacancy-requirements">
              <h4>Требования:</h4>
              <div className="bulleted-list">
                {vacancy.requirements.map((requirement, reqIndex) => (
                  <BulletedItem key={reqIndex} color="#667eea">
                    {requirement}
                  </BulletedItem>
                ))}
              </div>
            </div>

            <button className="apply-btn">
              Подать заявку
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="employee-profile">
      <motion.header 
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <img src="/logo512.png" alt="Logo" className="logo" />
          <h1>Employee Portal</h1>
          <div className="header-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="tabs-navigation">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Мой профиль
        </button>
        <button 
          className={`tab-btn ${activeTab === 'vacancies' ? 'active' : ''}`}
          onClick={() => setActiveTab('vacancies')}
        >
          📋 Вакансии
        </button>
      </div>

      {activeTab === 'profile' && !isEditing && (
        <div className="edit-profile-btn">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="edit-btn"
          >
            {employeeData.resume ? 'Edit Resume' : 'Create Resume'}
          </motion.button>
        </div>
      )}

      {activeTab === 'profile' ? renderProfileTab() : renderVacanciesTab()}
    </div>
  );
};

export default EmployeeProfile;