import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState({ show: false, message: '' });

  const validateProject = ({ title, description, dueDate }) => {
    if (!title.trim()) return 'Please enter a valid title';
    if (!description.trim()) return 'Please enter a valid description';
    if (!dueDate) return 'Please select a due date';
    return null;
  };

  const addProject = async (project) => {
    const errorMessage = validateProject(project);
    if (errorMessage) return setError({ show: true, message: errorMessage });
  
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...project,
        tasks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      console.log("Project added with ID: ", docRef.id);
      setShowForm(false);
    } catch (err) {
      console.error('Error adding project:', err);
      setError({ show: true, message: 'Failed to add project' });
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setSelectedProject(null);
    } catch (err) {
      console.error('Erreur suppression projet:', err);
    }
  };

  const addTask = async (projectId, taskContent) => {
    const project = projects.find(p => p.id === projectId);
    const updatedTasks = [...(project.tasks || []), taskContent];

    try {
      await updateDoc(doc(db, 'projects', projectId), {
        tasks: updatedTasks,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Erreur ajout tâche:', err);
    }
  };

  const deleteTask = async (projectId, taskIndex) => {
    const project = projects.find(p => p.id === projectId);
    const updatedTasks = project.tasks.filter((_, index) => index !== taskIndex);

    try {
      await updateDoc(doc(db, 'projects', projectId), {
        tasks: updatedTasks
      });
    } catch (err) {
      console.error('Erreur suppression tâche:', err);
    }
  };

  const openForm = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setError({ ...error, show: false });
  };

  const closeError = () => setError({ ...error, show: false });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);

      if (selectedProject) {
        const updatedProject = projectsData.find(p => p.id === selectedProject.id);
        setSelectedProject(updatedProject);
      }
    });

    return () => unsubscribe();
  }, [selectedProject]);

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
