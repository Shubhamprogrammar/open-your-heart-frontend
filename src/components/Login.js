import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';  // Updated the import

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Validate email using regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous errors
    setSuccess(false);
  
    // Check if email or password fields are empty
    if (!email || !password) {
      setError('Please fill in both email and password fields.');
      return;
    }
  
    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const json = await response.json();
  
      // Handle successful login
      if (json.success) {
        localStorage.setItem('token', json.authToken);  // Store token in localStorage
        localStorage.setItem('userId', json.userId);    // Store userId in localStorage
        setSuccess(true);
        setError('');
        navigate("/");  // Navigate to the home page or another page after successful login
      } else {
        setError('Invalid email or password.');
      }
  
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };
  
  return (
    <div className="bg container mt-5 w-100 mx-auto"> 
      <h2 className="text-center">Login Form</h2>

      {/* Display error and success messages */}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {success && <div className="alert alert-success" role="alert">Login successful!</div>}

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">Login</button>
        <div className="mt-2 text-center" style={{ color: 'white',fontSize:'1rem' }}>Not having an account. <Link to="/signup" style={{color:'#86003C'}}>Register Here</Link></div>
      </form>
    </div>
  );
};

export default LoginForm;
