import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Local state to manage collapse toggle
  const [isOpen, setIsOpen] = useState(false);

  // Handle user logout 
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/'); 
    window.location.reload();
  };

  // Function to toggle navbar
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">♥ Hearts ♥</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation" onClick={toggleNavbar} aria-expanded={isOpen}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="/contact">Contact Us</Link>
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
