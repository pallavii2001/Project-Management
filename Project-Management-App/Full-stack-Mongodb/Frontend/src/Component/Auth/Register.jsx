import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiResponse from '../../Utils/ApiResponse.jsx';
import '../Auth/Style.css';
import Button from '../AtomComponent/Button.jsx';
import Input from '../AtomComponent/Input.jsx';
import signup from '../../Assests/signup.jpg'
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await ApiResponse('post', 'users', null, {
        name: name,
        email: email,
        password: password,
      });
      
      navigate('/login');
      console.log('Registration Successful:', response);
      setMessage('Successfully Registered!')

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="outer-container">
    <div className="auth-container">
      <div className="auth-image">
        <img  src={signup} alt="image" />
      </div>
      <div className="auth-content">
        <h2>Register</h2>
        <div className="input-group">
          <label><b>Name</b>:</label>
          <Input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
           
          />
        </div >
        <div className="input-group">
          <label><b>Email:</b></label>
          <Input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
           
          />
        </div>
        <div className="input-group">
          <label><b>Password:</b></label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
          />
        </div>
      
        {error && <div className="error-message">{error}</div>}
        <Button onClick={handleRegister}>Register</Button>
        <div className="signup-link">
          <p>Already Registered? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
