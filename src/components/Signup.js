import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  let navigate = useNavigate();

  const [errors, setErrors] = useState({});
  // const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    const { name, email, mobile, password, confirmPassword } = formData;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const { name, email, mobile, password } = formData;
      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name, email, mobile, password })
        })
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('token', data.authToken);
          localStorage.setItem('userId', data.userId);
          // setSuccessMessage('Sign up successful!');
          navigate('/');
        }
        console.log('Form data:', formData);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
      } catch (error) {
        console.log(error);
      }


    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="bg container mt-5">
      <h2 className='text-center'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback" style={{ color: 'white' }}>{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback" style={{ color: 'white' }}>{errors.email}</div>}
        </div>

        {/* Mobile Number Field */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <div className="invalid-feedback" style={{ color: 'white' }}>{errors.mobile}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback" style={{ color: 'white' }}>{errors.password}</div>}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="invalid-feedback" style={{ color: 'white' }}>{errors.confirmPassword}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">Sign Up</button>
        {/* {successMessage && <div className="mt-4 text-center" style={{ color: 'white',fontSize:'2rem' }}>{successMessage}</div>} */}
      </form>
    </div>
  );
};

export default SignUp;
