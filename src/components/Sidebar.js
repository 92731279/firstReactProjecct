import React from 'react';

const Sidebar = ({ projects, selectedProject, onSelectProject, onShowForm }) => {
  return (
    <div className="sidebar">
      <h2>YOUR PROJECTS</h2>
      
      <button className="add-project-btn" onClick={onShowForm}>
        + Add Project
      </button>

      <div className="project-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
            onClick={() => onSelectProject(project)}
          >
            {project.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;