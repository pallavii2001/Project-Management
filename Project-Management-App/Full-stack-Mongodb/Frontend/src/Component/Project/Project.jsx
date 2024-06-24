import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApiResponse from '../../Utils/ApiResponse';

import "../../ProjectPage/Style.css";

const Project = ({ id, image, title, description, token }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await ApiResponse('GET', 'get-tasks', { projectId: id }, null, headers);
      console.log(response); 
      navigate(`/get-tasks?projectId=${id}`);
    } catch (error) {
      console.error('Error navigating to TaskPage:', error);
    }
  };

  return (
    <div className="project-link" onClick={handleClick}>
      <div className="project">
        <img src={image} alt={title} className="project-image" />
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
    </div>
  );
};

export default Project;




