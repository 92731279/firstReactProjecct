import React, { useState } from 'react';

const ProjectForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>TITLE </label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter project title"
        />
      </div>

      <div className="form-group">
        <label>DESCRIPTION </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description"
        />
      </div>

      <div className="form-group">
        <label>DUE DATE </label>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;