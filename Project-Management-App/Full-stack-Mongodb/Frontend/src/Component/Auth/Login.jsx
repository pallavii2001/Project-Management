import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { setDataToStorage } from '../../Utils/Libs.jsx'
import ApiResponse from '../../Utils/ApiResponse.jsx';
import Button from '../AtomComponent/Button.jsx';
import login from '../../Assests/login.jpg'
import Input from '../AtomComponent/Input.jsx';
import '../Auth/Style.css';
import Navbar from '../Navbar/Navbar.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await ApiResponse('post', 'login', null, {
        email,
        password,
      });

      setDataToStorage("token", response.data.token);
      
      navigate('/get-projects');
      window.location.reload();
      console.log('Login Successful:', response);
      setMessage('Login successful!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="outer-container">
    <div className="auth-container"> 
      <div className="auth-content">
        <h2>Login</h2>
        <div className="input-group">
          <label><b>Email:</b></label>
          <Input
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            className="input-field" 
          />
        </div>
        <div className="input-group">
          <label><b>Password:</b></label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter password"}
            className="input-field" 
          />
        </div>
        {error && <div className="error-message">{error}</div>} 
        <Button className="auth-button" onClick={handleLogin}>Login</Button>
        <div className="signup-link">
          <p>Don't have an account? <Link to="/users">Sign up</Link></p>
        </div>
      </div>
      <div className="auth-image">
        <img  src={login} alt="Auth Image" />
      </div>
    </div>
    </div>
  );
};

export default Login;


