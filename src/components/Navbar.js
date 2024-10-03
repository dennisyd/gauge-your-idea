import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">IdeaVote</Link>
        <div>
          <Link to="/" className="text-white mr-4">Home</Link>
          {auth.token ? (
            <>
              <Link to="/submit-idea" className="text-white mr-4">Submit Idea</Link>
              <Link to="/my-ideas" className="text-white mr-4">My Ideas</Link>
              <Link to="/reports" className="text-white mr-4">Reports</Link>
              <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white mr-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;