import React, { useState } from 'react'; 
// Nasta3mlou React w nimportiw useState, hook ykhalina nstokho data temporairment fi component

const ProjectForm = ({ onCancel, onSave }) => { 
  // Houni 3malna component esmou ProjectForm, ya5ou deux props: onCancel w onSave

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  // Initialisation mta3 state formData b 3 valeurs fergha (title, description, dueDate)
  // setFormData tbadl l'etat mta3 formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // handleChange: kol ma user yekteb wala ybaddel haja fi input, tbaddel l'etat mta3 formData
  // [e.target.name] ya3ni name ta3 input (title, description, wala dueDate)

  const handleSubmit = (e) => {
    e.preventDefault();
    // preventDefault: tbattel l'action par défaut (ya3ni page matrechargich)
    onSave(formData);
    // onSave tbaath les données l'bara (parent component)
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      {/* formulaire principal, ki ndakhlo 3lih w nsubmitiw, yet3ayet l'handleSubmit */}

      <div className="form-group">
        <label>TITLE </label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter project title"
        />
        {/* input mta3 l'title, lié b value formData.title, w ki yetbaddel, yet3ayet l'handleChange */}
      </div>

      <div className="form-group">
        <label>DESCRIPTION </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description"
        />
        {/* textarea mta3 description, nafs l'idee kifkif */}
      </div>

      <div className="form-group">
        <label>DUE DATE </label>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
        {/* input mta3 date, lié b formData.dueDate */}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        {/* bouton "Cancel", ki tenzel 3lih yet3ayet l'fonction onCancel (ya3ni fermeture formulaire par exemple) */}

        <button type="submit" className="save-btn">
          Save
        </button>
        {/* bouton "Save", ki tenzel 3lih yet3ayet l'handleSubmit */}
      </div>
    </form>
  );
};

export default ProjectForm;
// Nexportiw l'component bch najmou nesta3mlouh fi fichiers okhrin
