// File: src/pages/AppPage.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AppPage() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50">
      {/* Blue Header / Navbar */}
      <nav className="bg-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">IdeaVote</h1>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/home')}
              className="text-white hover:text-blue-300 font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/submit-idea')}
              className="text-white hover:text-blue-300 font-semibold"
            >
              Submit Idea
            </button>
            <button
              onClick={() => navigate('/my-ideas')}
              className="text-white hover:text-blue-300 font-semibold"
            >
              My Ideas
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="text-white hover:text-blue-300 font-semibold"
            >
              Reports
            </button>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-12">
          {/* Card: Submit Idea */}
          <div
            className="bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all max-w-sm cursor-pointer"
            onClick={() => navigate('/submit-idea')}
          >
            <div className="p-6">
              <h3 className="font-bold text-2xl text-blue-800 mb-4">
                Submit Your Idea
              </h3>
              <p className="text-gray-700 mb-6">
                Got a great idea? Share it with the community and get valuable
                feedback.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
                Submit Idea
              </button>
            </div>
          </div>

          {/* Card: My Ideas */}
          <div
            className="bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all max-w-sm cursor-pointer"
            onClick={() => navigate('/my-ideas')}
          >
            <div className="p-6">
              <h3 className="font-bold text-2xl text-blue-800 mb-4">My Ideas</h3>
              <p className="text-gray-700 mb-6">
                View and manage your submitted ideas, get insights, and make
                improvements.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
                My Ideas
              </button>
            </div>
          </div>

          {/* Card: Reports */}
          <div
            className="bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all max-w-sm cursor-pointer"
            onClick={() => navigate('/reports')}
          >
            <div className="p-6">
              <h3 className="font-bold text-2xl text-blue-800 mb-4">Reports</h3>
              <p className="text-gray-700 mb-6">
                Generate detailed reports on your ideas and voting trends.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppPage;
