import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  // États principaux
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState({ show: false, message: '' });

  // Gestion des projets
  const validateProject = ({ title, description, dueDate }) => {
    if (!title.trim()) return 'Please enter a valid title';
    if (!description.trim()) return 'Please enter a valid description';
    if (!dueDate) return 'Please select a due date';
    return null;
  };

  const addProject = (project) => {
    const errorMessage = validateProject(project);
    if (errorMessage) return setError({ show: true, message: errorMessage });
    
    const newProject = {
      ...project,
      id: Date.now(),
      tasks: []
    };
    
    setProjects([...projects, newProject]);
    setShowForm(false);
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
    setSelectedProject(null);
  };

  const addTask = (projectId, taskContent) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId
        ? {
            ...project,
            tasks: [...(project.tasks || []), taskContent],
            updatedAt: new Date().toISOString()
          }
        : project
    );
  
    setProjects(updatedProjects);
  
    // 🔁 Synchroniser selectedProject si c’est celui qu’on modifie
    if (selectedProject?.id === projectId) {
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedProject);
    }
  };
  
  const deleteTask = (projectId, taskIndex) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId
        ? {
            ...project,
            tasks: project.tasks.filter((_, index) => index !== taskIndex)
          }
        : project
    );
  
    setProjects(updatedProjects);
  
    // 🔁 Synchroniser selectedProject si c’est celui qu’on modifie
    if (selectedProject?.id === projectId) {
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedProject);
    }
  };
  
  // Gestion des UI
  const openForm = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setError({ ...error, show: false });
  };

  const closeError = () => setError({ ...error, show: false });

  return (
    <div className="app-container">
      <Sidebar 
        projects={projects} 
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onShowForm={openForm}
      />
      
      <MainContent 
        selectedProject={selectedProject}
        showForm={showForm}
        onCancel={closeForm}
        onShowForm={openForm}
        onSave={addProject}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
        onDeleteProject={deleteProject}
        showError={error.show}
        errorMessage={error.message}
        onCloseError={closeError}
      />
    </div>
  );
}

export default App;