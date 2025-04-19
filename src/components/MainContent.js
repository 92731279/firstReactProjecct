import React, { useState } from 'react';
// Nimportiw React w hook useState bch nesta3mlou state (ma3loumet temporair)

import PropTypes from 'prop-types';
// Nimportiw PropTypes bch na3mlou validation lil props (tawa chnchouf kifah)

import ProjectForm from './ProjectForm';
// Nimportiw l’component mta3 formulaire projet

import ErrorModal from './ErrorModal';
// Nimportiw l’component mta3 erreur (popup taffichi error)

import ProjectDetails from './ProjectDetails';
// Nimportiw l’component li yaffichi détails mta3 projet

// Component principal li yedhhar contenu principal
const MainContent = ({ 
  selectedProject,     // projet li selected men user
  showForm,            // true si formulaire maftouh
  onCancel,            // fonction pour annuler formulaire
  onShowForm,          // fonction pour afficher formulaire
  onSave,              // fonction pour sauvegarder projet
  onAddTask,           // fonction pour ajout tâche
  onDeleteProject,     // fonction pour suppression projet
  showError,           // true si erreur mawjouda
  errorMessage,        // message erreur
  onCloseError,        // fonction pour fermer l'erreur
  onDeleteTask         // fonction pour supprimer tâche
}) => {
  const [newTask, setNewTask] = useState('');
  // State mta3 tâche jdida, initialement vide

  const handleAddTask = () => {
    // Ki user y7eb yzid tâche
    if (newTask.trim() && selectedProject) {
      // Vérifier elli fama texte w fama projet sélectionné
      onAddTask(selectedProject.id, newTask);
      // N3aytou l'fonction mel parent b id projet w text mta3 tâche
      setNewTask('');
      // Nfarkou l'input ba3d l'ajout
    }
  };

  const handleKeyPress = (e) => {
    // Fonction ta3 clavier
    if (e.key === 'Enter') {
      // Si user nezel 'Entrée', tzid tâche
      handleAddTask();
    }
  };

  return (
    <div className="main-content">
      {selectedProject ? (
        // Si fama projet sélectionné, n'affichi les détails mta3ou
        <ProjectDetails 
          project={selectedProject}
          newTask={newTask}
          onTaskChange={(e) => setNewTask(e.target.value)} // chaque modification fi input
          onKeyPress={handleKeyPress} // ki yenzel 'Entrée'
          onAddTask={handleAddTask} // ki yenzel 3la bouton ajout
          onDeleteProject={() => onDeleteProject(selectedProject.id)} // Supprimer projet
          onDeleteTask={onDeleteTask} // Supprimer tâche spécifique
        />
      ) : showForm ? (
        // Si formulaire maftouh w ma fama ch projet sélectionné
        <ProjectForm 
          onCancel={onCancel} 
          onSave={onSave} 
        />
      ) : (
        // Si la y projet sélectionné w la formulaire maftouh => page d’accueil
        <div class="home-header">
          <img 
            src="/iconpro.png" 
            alt="Icône projet" 
            className="icon" 
            style={{ height: "60px", width: "60px" }} 
          />
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
        // Si fama erreur, naffichi popup mta3 erreur
        <ErrorModal 
          errorMessage={errorMessage} 
          onClose={onCloseError} 
        />
      )}
    </div>
  );
};

// Validation mta3 les props li yjiw lel composant
MainContent.propTypes = {
  selectedProject: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // id projet : soit string soit number
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.string) // liste de tâches
  }),
  showForm: PropTypes.bool.isRequired,            // est-ce que formulaire maftouh ?
  onCancel: PropTypes.func.isRequired,            // fonction annulation
  onShowForm: PropTypes.func.isRequired,          // afficher formulaire
  onSave: PropTypes.func.isRequired,              // sauvegarder projet
  onAddTask: PropTypes.func.isRequired,           // ajouter tâche
  onDeleteProject: PropTypes.func.isRequired,     // supprimer projet
  showError: PropTypes.bool.isRequired,           // y'a-t-il une erreur ?
  errorMessage: PropTypes.string,                 // message erreur
  onCloseError: PropTypes.func.isRequired,        // fermer popup erreur
  onDeleteTask: PropTypes.func.isRequired         // supprimer tâche spécifique
};

export default MainContent;
// Nexportiw l’component bch nesta3mlouh fi app principal
