import React from 'react';
import logo from '../../Assests/logo.jpg';
import { Link, useLocation,useNavigate } from 'react-router-dom'; 
import { getDataFromStorage, removeDataFromStorage } from '../../Utils/Libs'; 

import '../../Home/Style.css';

const Navbar = ({ showCreateButton, onLogout,onCreateProject }) => { 
  const handleLogout = () => {
    removeDataFromStorage("token");
    navigate("/")
    window.location.reload();
  };
const navigate = useNavigate(); 
  const location = useLocation(); 

  return (
    <nav className="navbar">
     <Link to="/"> <img className="logo" src={logo} alt="Logo" /></Link>
      <div className="nav-links">
        {showCreateButton && location.pathname === "/get-projects" && ( 
          <button onClick={onCreateProject} className="signup-btn"><span style={{marginRight:"4px"}}>Create </span><span> Project</span></button>
        )}
        {getDataFromStorage("token") ? ( 
         <button className="login-btn"onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/users"><button className="signup-btn">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

