import React, { useState } from 'react';

// Components for the right-side content
import CreateHeart from './CreateHeart';
import Hnotes from './Hnotes';
import HeartState from '../context/heart/HeartState';

const YourData = () => {
  // State to track which component should be shown
  const [activeComponent, setActiveComponent] = useState(null);

  // List of components with titles and their corresponding components
  const componentsList = [
    { id: 1, title: 'Shape a Heart', component: <CreateHeart /> },
    { id: 2, title: 'Explore Your Heart', component: <Hnotes /> },
  ];
  
  // Helper function to decode JWT and extract the user's name
  const getUserNameFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return 'Guest'; // Fallback if no token is found

    try {
      // Decode the base64 JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user.name || 'Guest'; // Return the user's name, or 'Guest' if not found
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'Guest';
    }
  };
  const username=getUserNameFromToken();

  return (
    <HeartState>
      <div style={{margin:"2rem"}}>
        <h3>Welcome, {username}!</h3> 
      </div>
      <div className="container-fluid mt-4">

        <div className="row">
          {/* Left-side: List of items */}
          <div className="col-md-3" style={{ height: '400px', overflowY: 'auto', backgroundImage: "linear-gradient(to bottom, #ff8ba0, #f97695, #f35f8b, #ec4482, #e41f7b)" }}>
            <ul className="list-group">
              {componentsList.map((item) => (
                <li
                  key={item.id}
                  className={`list-group-item ${activeComponent === item.id ? 'active' : ''}`}
                  style={{ cursor: 'pointer', padding: '1rem', margin: '1rem', borderRadius: '1rem', borderStyle: 'none', backgroundColor: "#E13485", color: 'white' }}
                  onClick={() => setActiveComponent(item.id)} // Set active component
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Right-side: Display selected component */}

          <div className="col-md-9">
            {activeComponent !== null ? (
              <div className="p-4">
                {componentsList.find((item) => item.id === activeComponent).component}
              </div>
            ) : (
              <div className="p-4">

              </div>
            )}
          </div>

        </div>
      </div>
    </HeartState>
  );
};

export default YourData;
