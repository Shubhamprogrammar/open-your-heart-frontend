import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Smooth scroll function
  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    setIsOpen(false); // Close navbar on mobile after selecting
  };

  // Close mobile navbar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link 
            className="navbar-brand" 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ♥ Hearts ♥
          </Link>
          <button
            className="navbar-toggler"
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                  aria-current="page" 
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link 
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                  to="/about"
                  onClick={() => scrollToSection('about-section')}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link 
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                  to="/contact"
                  onClick={() => scrollToSection('contact-section')}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="d-flex">
              {/* Check if the user is logged in */}
              {!localStorage.getItem('token') ? (
                <>
                  {/* Login button */}
                  <Link className="nav-link" to="/login">
                    <button className="btn btn-outline-success mx-3" type="button">Login</button>
                  </Link>

                  {/* Signup button */}
                  <Link className="nav-link" to="/signup">
                    <button className="btn btn-outline-success" type="button">Signup</button>
                  </Link>
                </>
              ) : (
                // Logout button
                <button className="btn btn-outline-success" onClick={handleLogOut} type="button" >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;