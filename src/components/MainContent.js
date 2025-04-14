import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectForm from './ProjectForm';
import ErrorModal from './ErrorModal';
import ProjectDetails from './ProjectDetails';

const MainContent = ({ 
  selectedProject,
  showForm,
  onCancel,
  onShowForm,
  onSave,
  onAddTask,
  onDeleteProject,
  showError,
  errorMessage,
  onCloseError,  // <-- Virgule ajoutée ici
  onDeleteTask
}) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() && selectedProject) {
      onAddTask(selectedProject.id, newTask);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="main-content">
      {selectedProject ? (
        <ProjectDetails 
          project={selectedProject}
          newTask={newTask}
          onTaskChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          onAddTask={handleAddTask}
          onDeleteProject={() => onDeleteProject(selectedProject.id)}
          onDeleteTask={onDeleteTask} 
        />
      ) : showForm ? (
        <ProjectForm 
          onCancel={onCancel} 
          onSave={onSave} 
        />
      ) : (
        <div className="welcome-section">
          <h1>React Project Manager</h1>
          <p>Select a project or get started with a new one</p>
          <button 
            className="create-btn" 
            onClick={onShowForm}
          >
            Create New Project
          </button>
        </div>
      )}

      {showError && (
        <ErrorModal 
          errorMessage={errorMessage} 
          onClose={onCloseError} 
        />
      )}
    </div>
  );
};

MainContent.propTypes = {
  selectedProject: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.string)
  }),
  showForm: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onShowForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  showError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  onCloseError: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired  // <-- Ajoutez aussi la propType pour onDeleteTask
};

export default MainContent;