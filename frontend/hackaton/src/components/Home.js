import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="home-container">
      {/* Хедер */}
      <header className="home-header">
        <div className="header-content">
          <h1>Enchanted Hunt</h1>
          <div className="header-actions">
            <span className="user-email">{currentUser.email}</span>
            <button onClick={logout} className="logout-btn">Выйти</button>
          </div>
        </div>
      </header>

      {/* Навигационные вкладки */}
      <nav className="tabs-navigation">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Профиль сотрудника
        </button>
        <button 
          className={`tab-btn ${activeTab === 'vacancies' ? 'active' : ''}`}
          onClick={() => setActiveTab('vacancies')}
        >
          💼 Вакансии
        </button>
      </nav>

      {/* Контент вкладок */}
      <main className="tab-content">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'vacancies' && <VacanciesTab />}
      </main>
    </div>
  );
}

// Компонент вкладки "Профиль сотрудника" (оставляем без изменений)
function ProfileTab() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Иван Иванов',
    position: 'Frontend Developer',
    department: 'IT',
    skills: ['React', 'JavaScript', 'CSS', 'HTML'],
    experience: '3 года',
    level: 'Middle',
    phone: '+7 (999) 123-45-67',
    location: 'Москва',
    bio: 'Опытный фронтенд-разработчик с passion к созданию пользовательских интерфейсов.'
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillsChange = (newSkills) => {
    setEditForm(prev => ({
      ...prev,
      skills: newSkills.split(',').map(skill => skill.trim()).filter(skill => skill)
    }));
  };

  return (
    <div className="profile-tab">
      <div className="profile-header">
        <h2>Профиль сотрудника</h2>
        <p>Личная информация и профессиональные данные</p>
        {!isEditing && (
          <button className="edit-btn" onClick={handleEdit}>
            ✏️ Редактировать профиль
          </button>
        )}
      </div>

      <div className="profile-horizontal-layout">
        {/* Левая колонка - Основная информация */}
        <div className="profile-column">
          <div className="profile-card">
            <h3>👤 Основная информация</h3>
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>ФИО:</label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>Должность:</label>
                  <input
                    type="text"
                    value={editForm.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>Отдел:</label>
                  <select
                    value={editForm.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="edit-input"
                  >
                    <option value="IT">IT</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Уровень:</label>
                  <select
                    value={editForm.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className="edit-input"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Middle">Middle</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Опыт работы:</label>
                  <input
                    type="text"
                    value={editForm.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="edit-input"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{currentUser.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">ФИО:</span>
                  <span className="value">{profile.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="label">Должность:</span>
                  <span className="value">{profile.position}</span>
                </div>
                <div className="info-item">
                  <span className="label">Отдел:</span>
                  <span className="value">{profile.department}</span>
                </div>
                <div className="info-item">
                  <span className="label">Уровень:</span>
                  <span className="value level-badge">{profile.level}</span>
                </div>
                <div className="info-item">
                  <span className="label">Опыт работы:</span>
                  <span className="value">{profile.experience}</span>
                </div>
              </>
            )}
          </div>

          <div className="profile-card">
            <h3>📝 О себе</h3>
            {isEditing ? (
              <div className="form-group">
                <textarea
                  value={editForm.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="edit-textarea"
                  rows="4"
                  placeholder="Расскажите о себе..."
                />
              </div>
            ) : (
              <p className="bio-text">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Правая колонка - Навыки и контакты */}
        <div className="profile-column">
          <div className="profile-card">
            <h3>🎯 Профессиональные навыки</h3>
            {isEditing ? (
              <div className="form-group">
                <label>Навыки (через запятую):</label>
                <input
                  type="text"
                  value={editForm.skills.join(', ')}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  className="edit-input"
                  placeholder="React, JavaScript, CSS..."
                />
              </div>
            ) : (
              <div className="skills-list">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            )}
          </div>

          <div className="profile-card">
            <h3>📞 Контактная информация</h3>
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Телефон:</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="edit-input"
                  />
                </div>
                <div className="form-group">
                  <label>Местоположение:</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="edit-input"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="info-item">
                  <span className="label">Телефон:</span>
                  <span className="value">{profile.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Местоположение:</span>
                  <span className="value">{profile.location}</span>
                </div>
              </>
            )}
          </div>

          {/* Кнопки редактирования */}
          {isEditing && (
            <div className="profile-card">
              <h3>💾 Сохранение изменений</h3>
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  ✅ Сохранить
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  ❌ Отменить
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Компонент вкладки "Вакансии" с горизонтальным layout
function VacanciesTab() {
  const [vacancies] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Frontend',
      level: 'Senior',
      location: 'Москва / Удаленно',
      salary: 'от 200 000 ₽',
      skills: ['React', 'TypeScript', 'Redux', 'Webpack'],
      status: 'active',
      applicants: 15,
      description: 'Разработка сложных пользовательских интерфейсов для высоконагруженных приложений.'
    },
    {
      id: 2,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      level: 'Middle+',
      location: 'Санкт-Петербург',
      salary: 'от 180 000 ₽',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      status: 'active',
      applicants: 8,
      description: 'Настройка и поддержка инфраструктуры, автоматизация процессов разработки.'
    },
    {
      id: 3,
      title: 'Backend Developer (Node.js)',
      department: 'Backend',
      level: 'Middle',
      location: 'Удаленно',
      salary: 'от 150 000 ₽',
      skills: ['Node.js', 'PostgreSQL', 'Redis', 'REST API'],
      status: 'active',
      applicants: 12,
      description: 'Разработка серверной части веб-приложений, работа с базами данных.'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      department: 'Design',
      level: 'Junior+',
      location: 'Москва',
      salary: 'от 120 000 ₽',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      status: 'active',
      applicants: 25,
      description: 'Создание пользовательских интерфейсов, прототипирование, исследование пользовательского опыта.'
    },
    {
      id: 5,
      title: 'Data Scientist',
      department: 'Data',
      level: 'Senior',
      location: 'Удаленно',
      salary: 'от 220 000 ₽',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      status: 'active',
      applicants: 7,
      description: 'Анализ больших данных, построение ML-моделей, работа с нейросетями.'
    },
    {
      id: 6,
      title: 'QA Automation Engineer',
      department: 'Testing',
      level: 'Middle',
      location: 'Москва',
      salary: 'от 140 000 ₽',
      skills: ['Selenium', 'Java', 'TestNG', 'Jenkins'],
      status: 'active',
      applicants: 9,
      description: 'Автоматизация тестирования, написание тестовых сценариев, обеспечение качества.'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesDepartment = selectedDepartment === 'all' || vacancy.department === selectedDepartment;
    const matchesLevel = selectedLevel === 'all' || vacancy.level === selectedLevel;
    const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vacancy.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesLevel && matchesSearch;
  });

  return (
    <div className="vacancies-tab">
      <div className="vacancies-header">
        <h2>Открытые вакансии</h2>
        <p>Найдите свою следующую возможность в Enchanted Hunt</p>
      </div>

      {/* Фильтры и поиск */}
      <div className="vacancies-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск вакансий..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все отделы</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Design">Design</option>
            <option value="Data">Data</option>
            <option value="Testing">Testing</option>
          </select>

          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все уровни</option>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </div>
      </div>

      {/* Горизонтальная сетка вакансий */}
      <div className="vacancies-horizontal-grid">
        {filteredVacancies.map(vacancy => (
          <div key={vacancy.id} className="vacancy-card-horizontal">
            <div className="vacancy-card-header">
              <h3>{vacancy.title}</h3>
              <span className={`status-badge ${vacancy.status}`}>
                {vacancy.status === 'active' ? 'Активна' : 'Закрыта'}
              </span>
            </div>
            
            <div className="vacancy-card-body">
              <div className="vacancy-meta">
                <div className="meta-item">
                  <span className="meta-label">Отдел</span>
                  <span className="meta-value">{vacancy.department}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Уровень</span>
                  <span className="meta-value">{vacancy.level}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Локация</span>
                  <span className="meta-value">{vacancy.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Зарплата</span>
                  <span className="meta-value salary">{vacancy.salary}</span>
                </div>
              </div>

              <div className="vacancy-description">
                <p>{vacancy.description}</p>
              </div>

              <div className="vacancy-skills">
                <h4>Требуемые навыки:</h4>
                <div className="skills-list">
                  {vacancy.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="vacancy-card-footer">
              <div className="applicants-info">
                <span className="applicants-count">{vacancy.applicants}</span>
                <span className="applicants-label">кандидатов</span>
              </div>
              <div className="vacancy-actions">
                <button className="details-btn">
                  📋 Подробнее
                </button>
                <button className="apply-btn">
                  📨 Откликнуться
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVacancies.length === 0 && (
        <div className="no-vacancies">
          <h3>😔 Вакансии не найдены</h3>
          <p>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      )}
    </div>
  );
}

export default Home;