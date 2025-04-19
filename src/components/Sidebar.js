import React from 'react';
// Nimportiw React bch na3mlou component

const Sidebar = ({ projects, selectedProject, onSelectProject, onShowForm }) => {
  // Component ya5ou 4 props :
  // - projects: liste des projets
  // - selectedProject: projet li fama tawa sélectionné
  // - onSelectProject: fonction li tselecti projet
  // - onShowForm: fonction li t'affichi formulaire ajout

  return (
    <div className="sidebar">
      {/* Sidebar — partie gauche ta3 app */}

      <h2>YOUR PROJECTS</h2>
      {/* Titre ta3 section */}

      <button className="add-project-btn" onClick={onShowForm}>
        + Add Project
      </button>
      {/* Bouton bch y'affichi formulaire ajout projet */}

      <div className="project-list">
        {/* Container ta3 les projets */}

        {projects.map((project) => (
          // Nmapiw 3la kol projet w naffichiw titre mta3ou
          <div
            key={project.id}
            className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
            // Si projet mselectionné, n'ajouti classe 'active'
            onClick={() => onSelectProject(project)}
            // Ki user yenzel 3la projet, n3aytou onSelectProject b projet kima paramètre
          >
            {project.title}
            {/* Naffichi titre projet */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
// Nexportiw component bch nesta3mlouh fi App principal
