import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Back button that navigates to "/app" instead of going back in browser history */}
          {location.pathname !== '/' && location.pathname !== '/app' && (
            <button
              onClick={() => navigate('/app')}
              className="text-white bg-blue-700 px-3 py-2 rounded hover:bg-blue-800 transition duration-300"
            >
              Back
            </button>
          )}
          <Link to="/" className="text-white text-2xl font-bold">Gauge Your Idea</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-300">Home</Link>
          {auth.token ? (
            <>
              <Link to="/submit-idea" className="text-white hover:text-gray-300 transition duration-300">
                Submit Idea
              </Link>
              <Link to="/my-ideas" className="text-white hover:text-gray-300 transition duration-300">
                My Ideas
              </Link>
              <Link to="/reports" className="text-white hover:text-gray-300 transition duration-300">
                Reports
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300 transition duration-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300 transition duration-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
