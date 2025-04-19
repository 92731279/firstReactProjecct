import React from "react";
// Nimportiw React bch nesta3mlou JSX

import PropTypes from "prop-types";
// Nimportiw PropTypes bch na3mlou validation lil props li jeyin lel component

// Component AddProject ya5ou props: onClick w isLarge (optionnelle)
const AddProject = ({ onClick, isLarge = false }) => (
  // isLarge par défaut false si ma b3athnash
  <button 
    className={isLarge ? "create-btn" : "add-project-btn"} 
    // Si isLarge true => className = "create-btn"
    // Sinon => className = "add-project-btn"
    onClick={onClick}
    // ki user yenzel 3la bouton, n3aytou fonction onClick
  >
    {isLarge ? "Create New Project" : "+ Add Project"}
    {/* Si isLarge true => texte = "Create New Project", sinon "+ Add Project" */}
  </button>
);

// Validation mta3 les props
AddProject.propTypes = {
  onClick: PropTypes.func.isRequired, // onClick obligatoire w lazim tkoun fonction
  isLarge: PropTypes.bool             // isLarge optionnelle, boolean
};

export default AddProject;
// Nexportiw AddProject bch nesta3mlouh fi autres composants
