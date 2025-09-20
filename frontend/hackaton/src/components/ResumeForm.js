import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResumeForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    position: initialData.position || '',
    department: initialData.department || '',
    phone: initialData.phone || '',
    level: initialData.level || '', // Новое поле: Уровень
    hireDate: initialData.hireDate || '', // Новое поле: Дата приема
    experience: initialData.experience || '',
    education: initialData.education || '',
    languages: initialData.languages || '',
    skills: Array.isArray(initialData.skills) ? initialData.skills.join(', ') : '',
    responsibilities: Array.isArray(initialData.responsibilities) 
      ? initialData.responsibilities.join('\n') 
      : '', // Новое поле: Обязанности (каждая с новой строки)
    resume: initialData.resume || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const resumeText = `
Position: ${formData.position}
Department: ${formData.department}
Level: ${formData.level}
Phone: ${formData.phone}
Hire Date: ${formData.hireDate}
Experience: ${formData.experience}
Education: ${formData.education}
Languages: ${formData.languages}
Skills: ${formData.skills}
Responsibilities:
${formData.responsibilities.split('\n').map(resp => `• ${resp}`).join('\n')}
    `.trim();

    onSave({
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      responsibilities: formData.responsibilities.split('\n')
        .map(resp => resp.trim())
        .filter(resp => resp), // Преобразуем текст в массив обязанностей
      resume: resumeText
    });
  };

  return (
    <motion.form 
      className="resume-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <h2>Edit Resume</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Position *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="Enter your position"
          />
        </div>

        <div className="form-group">
          <label>Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="Enter department"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Level *</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
          </select>
        </div>

        <div className="form-group">
          <label>Hire Date *</label>
          <input
            type="date"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter phone number"
        />
      </div>

      <div className="form-group">
        <label>Skills (comma separated) *</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
          placeholder="React, JavaScript, CSS, HTML"
        />
      </div>

      <div className="form-group">
        <label>Work Experience *</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Describe your work experience..."
        />
      </div>

      <div className="form-group">
        <label>Education *</label>
        <textarea
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Describe your education..."
        />
      </div>

      <div className="form-group">
        <label>Responsibilities (one per line) *</label>
        <textarea
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Разработка пользовательского интерфейса
Оптимизация производительности
Код-ревью"
        />
        <div className="form-hint">Enter each responsibility on a new line</div>
      </div>

      <div className="form-group">
        <label>Languages</label>
        <input
          type="text"
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          placeholder="English, Russian, etc."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save Resume
        </button>
      </div>
    </motion.form>
  );
};

export default ResumeForm;