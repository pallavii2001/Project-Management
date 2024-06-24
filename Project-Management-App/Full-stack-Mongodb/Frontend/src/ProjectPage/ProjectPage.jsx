import React, { useEffect, useState } from 'react';
import ApiResponse from '../Utils/ApiResponse'; 
import Navbar from '../Component/Navbar/Navbar';
import Project from '../Component/Project/Project'; 
import { getDataFromStorage } from '../Utils/Libs';
import projectimg from "../Assests/projectimg.jpg"

import '../ProjectPage/Style.css'

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: `Bearer ${token}` }; 
      const response = await ApiResponse('GET', 'get-projects', null, null, headers);
      console.log(response.data.projects); 
      if (Array.isArray(response.data.projects)) {
        setProjects(response.data.projects);
      } else {
        throw new Error('Projects data is not an array');
      }
    } catch (error) {
      console.error(error); 
      setError('No projects found');
    }
  };

  const handleCreateProject = async () => {
    try {
      const token = getDataFromStorage('token'); 
      const headers = { Authorization: `Bearer ${token}` }; 
      const data = { title, description };
      const response = await ApiResponse('POST', 'create-project', null, data, headers);
      console.log('Project created:', response);
     
      fetchProjects();
      setShowForm(false); 
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating project:', error); 
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="container-fluid">
      <div className='container'>
        <Navbar 
          onCreateProject={() => setShowForm(true)} 
          showCreateButton={!showForm} 
        />
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div>  
            <div className="project-list">
              {projects.map((project) => (
                <div className="project-box" key={project._id}>
                  <Project
                    id={project._id}
                    image={projectimg}
                    title={project.title}
                    description={project.description}
                    token={getDataFromStorage('token')}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {showForm && (
          <div>
            <div className="overlay" onClick={() => setShowForm(false)}></div>
            <div className="popup-form">
              <h3>Create Project</h3>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={handleCreateProject}>Submit</button>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;









