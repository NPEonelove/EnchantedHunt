import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResumeForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    position: initialData.position || '',
    department: initialData.department || '',
    phone: initialData.phone || '',
    skills: initialData.skills.join(', ') || '',
    experience: initialData.experience || '',
    education: initialData.education || '',
    languages: initialData.languages || '',
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
Phone: ${formData.phone}
Skills: ${formData.skills}
Experience: ${formData.experience}
Education: ${formData.education}
Languages: ${formData.languages}
    `.trim();

    onSave({
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
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