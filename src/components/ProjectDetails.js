// import les fonctions nécessaires mel React
import React, { useState, useEffect } from 'react';
// import ta3 PropTypes bach na3mlou validation ta3 les props
import PropTypes from 'prop-types';

// composant ProjectDetails
const ProjectDetails = ({ 
  project: initialProject,       // props ta3 projet
  newTask: initialNewTask,       // prop ta3 task jdid
  onTaskChange,                  // fonction mtaa event ken ybadel el input
  onKeyPress,                    // event ken ykliqi 3al clavier
  onAddTask,                     // fonction bach tzid task
  onDeleteProject,               // fonction bach tsupprimé projet
  onDeleteTask                   // fonction bach tsupprimé task
}) => {

  // création ta3 state local mtaa projet
  const [localProject, setLocalProject] = useState(initialProject);
  // création ta3 state local mtaa task jdida
  const [localNewTask, setLocalNewTask] = useState(initialNewTask);

  // ken el prop project tbadel, nbadlou el state local b chnawa jdid
  useEffect(() => {
    setLocalProject(initialProject);
  }, [initialProject]);

  // ken el newTask tbadel, nbadlou el state local b chnawa jdid
  useEffect(() => {
    setLocalNewTask(initialNewTask);
  }, [initialNewTask]);

  // fonction li tzid task jdid
  const handleAddTask = () => {
    if (localNewTask.trim()) { // ken fama contenu
      onAddTask(localProject.id, localNewTask); // nzidouha
      setLocalNewTask(''); // nfarkes input
    }
  };

  // fonction ken ykliqi "Enter" fel clavier
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask(); // y3ayet lil fonction ta3 ajout
    }
  };

  // fonction mtaa changement fel input ta3 task
  const handleTaskChange = (e) => {
    const value = e.target.value;
    setLocalNewTask(value); // nbadel el input mtaa state
    onTaskChange(e);        // n3ayet lil parent
  };

  return (
    <div className="project-details">
      {/* header ta3 projet */}
      <div className="project-header">
        <h1>{localProject.title}</h1>
        <button 
          className="delete-btn"
          onClick={() => onDeleteProject(localProject.id)}
        >
          Delete Project {/* bouton pour supprimer projet */}
        </button>
      </div>

      {/* afficher date mtaa deadline */}
      <p className="project-date">
        {new Date(localProject.dueDate).toLocaleDateString()}
      </p>
      
      {/* afficher description ta3 projet */}
      <p className="project-description">{localProject.description}</p>

      {/* section ta3 les tâches */}
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
                  clear {/* bouton pour supprimer une tâche */}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tasks">No tasks yet</p> // ken ma fama hata tâche
        )}
      </div>

      {/* zone d’ajout mtaa tâche jdida */}
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

// déclaration ta3 types mtaa les props
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

// valeur par défaut ken ma b3athnach newTask
ProjectDetails.defaultProps = {
  newTask: ''
};

// export ta3 el composant bach najmou n3aytouh fih fil app
export default ProjectDetails;
