import React, { useState, useEffect } from 'react';
// n'importiw React w les hooks li bech nst3mlouhom

import './App.css';
// n'importiw fichier CSS

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
// n'importiw les composants principaux

import { db } from './firebase';
// n'importiw la base Firebase

import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
// n'importiw les fonctions mta3 Firestore bech najmou nzidou, na3mlou update, delete w ncha9lou b real-time

function App() { //declaration mtaa l composant principal APP 
  // etat li fih liste mta3 projets
  const [projects, setProjects] = useState([]);

  // etat bch naarfou quel projet selected tawa
  const [selectedProject, setSelectedProject] = useState(null);

  // etat pour masquer / afficher le formulaire
  const [showForm, setShowForm] = useState(false);

  // gestion des erreurs
  const [error, setError] = useState({ show: false, message: '' });

  // fonction li ta3ml validation lel formulaire (titre, description, date)
  const validateProject = ({ title, description, dueDate }) => {
    if (typeof title !== 'string' || !title.trim()) {
      return 'the title should be string & no empty case';
    }

    if (typeof description !== 'string' || !description.trim()) {
      return 'the desc should be string & no empty case';
    }

    if (!dueDate) {
      return 'u should select a correct date';
    }

    const due = new Date(dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // n7ottou saa3 00:00 bech comparaison tkoun b nhar bark

    if (due <= now) {
      return 'La date d\'échéance doit être postérieure à aujourd\'hui';
    }

    return null; // ken kol chay labes, nraja3 null
  };

  // fonction bech nzid projet jdida
  const addProject = async (project) => {
    const errorMessage = validateProject(project); // nvalidiw les données sinon une err va etre affiché
    if (errorMessage) return setError({ show: true, message: errorMessage });

    try { // nhebou nzidou le projet dans la collection projects 
      const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        tasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      console.log("Project added with ID: ", docRef.id);
      setShowForm(false); // kn loumour mchet mrigla n5abiw formulaire 
    } catch (err) {
      console.error('Error adding project:', err);
      setError({ show: true, message: 'Failed to add project' }); // ken sar erreur
    }
  };

  // fonction bech tsuppprimi projet
  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setSelectedProject(null); // nfes5ou li selected
    } catch (err) {
      console.error('Erreur suppression projet:', err);
    }
  };

  // fonction bech tzid tâche fi projet mou3ayn
  const addTask = async (projectId, taskContent) => {
    const project = projects.find(p => p.id === projectId);
    const updatedTasks = [...(project.tasks || []), taskContent]; //nal9a le projet, puis nzidou la nouvelle tâche à la liste existante.

    try {
      await updateDoc(doc(db, 'projects', projectId), {
        tasks: updatedTasks,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Erreur ajout tâche:', err);
    }
  };

  // fonction bech tnahi tâche men projet w bch taaml m-à-j fl firestore
  const deleteTask = async (projectId, taskIndex) => { //tsupprimi une tâche à un index donné dans un projet.

    const project = projects.find(p => p.id === projectId);
    const updatedTasks = project.tasks.filter((_, index) => index !== taskIndex);
//Met à jour le projet dans Firestore bl les tâches restantes.
    try {
      await updateDoc(doc(db, 'projects', projectId), {
        tasks: updatedTasks
      });
    } catch (err) {
      console.error('Erreur suppression tâche:', err);
    }
  };

  // Ouvre le formulaire d’ajout en désélectionnant tout projet actif.

  const openForm = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  // ki n9oul annuler formulaire
  const closeForm = () => {
    setShowForm(false);
    setError({ ...error, show: false });
  };
 // Ferme le formulaire et cache toute erreur.

  // n9oul fermer le formulaie & tt erreur
  const closeError = () => setError({ ...error, show: false });

  // useEffect bech nceooiw Firebase en temps réel , Hook useEffect pour écouter en temps réel les changements dans la collection projects.

  useEffect(() => { 
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })); //wa9t les données yetbadlou, on met à jour la liste des projets.

      setProjects(projectsData);

      if (selectedProject) {
        const updatedProject = projectsData.find(p => p.id === selectedProject.id);
        setSelectedProject(updatedProject);
      }
    }); //Si un projet est sélectionné, on le met à jour avec les nouvelles données.

    return () => unsubscribe(); // cleanup ki component yetna7a
  }, [selectedProject]);

  // affichage principal
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
