import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import home from '../../src/Assests/home.jpg'; 

import '../Home/Style.css'

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <div className="left-section">
          <img src={home} alt="Background" className="background-image" />
        </div>
        <div className="right-section">
          <h1 className="welcome-text">Welcome to Our Website</h1>
          <p className="sub-text">Login or Signup to experience!</p>
        </div>
      </div>
    </div>
  );
};
export default Home;