import React, { useState, useContext } from 'react';
import heartContext from '../context/heart/HeartNoteContext';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const {addFeedback} = useContext(heartContext);

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
        const { name, email, feedback } = formData;

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!feedback.trim()) {
            newErrors.feedback = 'Feedback is required';
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            const { name, email, feedback } = formData;
            try {
                addFeedback(name,email,feedback);
                setSuccessMessage('Feedback Saved Successfully!');
                setFormData({
                    name: '',
                    email: '',
                    feedback: '',
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
        <>
        <div className="container my-5 about">
      <h2 className="text-center mb-4" style={{color: '#86003C'}}>Contact Us</h2>
      <p className="lead text-center">
        We’d love to hear from you! Whether you want to get involved, share your story, or simply learn more about how we’re making a difference, please don’t hesitate to reach out.
      </p>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h3 style={{color: '#86003C'}}>General Inquiries</h3>
          <p>
            For questions, comments, or more information about our initiatives, please contact us at:
            <br />
            <i className="fas fa-envelope"></i> <strong>Email:</strong> <a href="mailto:mauryashubham12349@gmail.com">mauryashubham@hearts.com</a>
            <br />
            📞 <strong>Phone:</strong> +91 8850093749
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h3 style={{color: '#86003C'}}>Volunteer Opportunities</h3>
          <p>
            Interested in volunteering with Open Your Hearts? We’re always looking for compassionate individuals to join our mission. Please contact our volunteer coordinator for more details:
            <br />
            <i className="fas fa-envelope"></i> <strong>Email:</strong> <a href="mailto:mauryashubham12349@gmail.com">mauryashubham@hearts.com</a>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h3 style={{color: '#86003C'}}>Follow Us</h3>
          <p>
            Stay updated with our latest events, stories, and opportunities to get involved by following us on social media:
            <br />
            🌐 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/shubham-maurya-9932a3268/" target="_blank" rel="noopener noreferrer">Shubham Maurya</a>
            <br />
            📸 <strong>Instagram:</strong> @mauryashubham29
            <br />
            🐦 <strong>GitHub:</strong> <a href="https://github.com/ShubhamProgrammar" target="_blank" rel="noopener noreferrer">Shubhamprogrammar</a>
          </p>
        </div>

        <div className="col-md-6 mb-4">
          <h3 style={{color: '#86003C'}}>Mailing Address</h3>
          <p>
            Open Your Hearts
            <br />
            Navi Mumbai, Maharashtra, India
            <br />
          </p>
        </div>
      </div>

      <div className="text-center">
        <h3 style={{color: '#86003C'}}>We’re here to help!</h3>
        <p>
          If you have any questions or need assistance, please don’t hesitate to contact us. We look forward to connecting with you and working together to spread compassion and kindness in our community.
        </p>
      </div>
        <hr />
            <h2 className='text-center' style={{color: '#86003C'}}>Feedback Form</h2>
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

                {/* Feedback Field */}
                <div className="mb-3">
                    <label htmlFor="feedback" className="form-label">Feedback</label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        rows="3"
                        className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
                        value={formData.feedback}
                        onChange={handleChange}>
                    </textarea>
                    {errors.feedback && <div className="invalid-feedback" style={{ color: 'white' }}>{errors.feedback}</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-success w-100">Submit</button>
                {successMessage && <div className="mt-4 text-center" style={{ fontSize: '1rem' }}>{successMessage}</div>}
            </form>
            </div>
        </>
    )
}

export default Contact
