import React from "react";
import PropTypes from "prop-types";

const AddProject = ({ onClick, isLarge = false }) => (
  <button 
    className={isLarge ? "create-btn" : "add-project-btn"} 
    onClick={onClick}
  >
    {isLarge ? "Create New Project" : "+ Add Project"}
  </button>
);

AddProject.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLarge: PropTypes.bool
};

export default AddProject;