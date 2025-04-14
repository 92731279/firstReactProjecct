import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProjectDetails = ({ 
  project: initialProject, 
  newTask: initialNewTask,
  onTaskChange,
  onKeyPress,
  onAddTask,
  onDeleteProject,
  onDeleteTask
}) => {
  const [localProject, setLocalProject] = useState(initialProject);
  const [localNewTask, setLocalNewTask] = useState(initialNewTask);

  // Synchronise les props avec l'état local
  useEffect(() => {
    setLocalProject(initialProject);
  }, [initialProject]);

  useEffect(() => {
    setLocalNewTask(initialNewTask);
  }, [initialNewTask]);

  const handleAddTask = () => {
    if (localNewTask.trim()) {
      onAddTask(localProject.id, localNewTask);
      setLocalNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleTaskChange = (e) => {
    const value = e.target.value;
    setLocalNewTask(value);
    onTaskChange(e);
  };

  return (
    <div className="project-details">
      <div className="project-header">
        <h1>{localProject.title}</h1>
        <button 
          className="delete-btn"
          onClick={() => onDeleteProject(localProject.id)}
        >
          Delete Project
        </button>
      </div>

      <p className="project-date">
        {new Date(localProject.dueDate).toLocaleDateString()}
      </p>
      <p className="project-description">{localProject.description}</p>

      <div className="tasks-section">
        <h2>Tasks</h2>
        {localProject.tasks?.length > 0 ? (
          <ul className="tasks-list">
            {localProject.tasks.map((task, index) => (
              <li key={index} className="task-item">
                {task}
                <button 
                  className="task-delete-btn"
                  onClick={() => onDeleteTask(localProject.id, index)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks">No tasks yet</p>
        )}
      </div>

      <div className="task-input-container">
        <input
          type="text"
          value={localNewTask}
          onChange={handleTaskChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter new task"
          className="task-input"
        />
        <button 
          onClick={handleAddTask}
          className="add-task-btn"
          disabled={!localNewTask.trim()}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    description: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  newTask: PropTypes.string,
  onTaskChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

ProjectDetails.defaultProps = {
  newTask: ''
};

export default ProjectDetails;