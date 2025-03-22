import React, { useState,useContext } from 'react';
import heartContext from '../context/heart/HeartNoteContext';

const CreateHeart = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const {addHeart} = useContext(heartContext);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addHeart(formData.title, formData.description)
    // You can handle form data submission here
    console.log('Form data:', formData);
    // Reset form after submission
    setFormData({ title: '', description: '' });
    setSuccessMessage('Heart is surrendered successfully!');
  };

  return (
    <div className="bg container mt-5">
      <h2 className='text-center'>🤍Shape a Heart🤍</h2>
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter the title"
            required
          />
        </div>

        {/* Description textarea */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter the description"
            required
          ></textarea>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-success w-100">
          Surrender Your Heart
        </button>
         {successMessage && <div className="mt-4 text-center" style={{ color: 'white',fontSize:'1rem' }}>{successMessage}</div>}
      </form>
    </div>
  );
};

export default CreateHeart;
