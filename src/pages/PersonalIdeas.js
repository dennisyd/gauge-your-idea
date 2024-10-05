import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';  // Import the updated Navbar component

function PersonalIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchIdeas();
  }, [auth.token]);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('/api/user/ideas', {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setIdeas(response.data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch ideas. ${err.response ? err.response.data.message : err.message}`);
      setLoading(false);
    }
  };

  const deleteIdea = async (ideaId) => {
    try {
      await axios.delete(`/api/ideas/${ideaId}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setIdeas(ideas.filter(idea => idea._id !== ideaId));
    } catch (err) {
      setError(`Failed to delete idea. ${err.response ? err.response.data.message : err.message}`);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <>
      <Navbar /> {/* Include the Navbar at the top */}
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-semibold mb-8">My Ideas</h1>
        {ideas.length === 0 ? (
          <p className="text-lg text-gray-600">You haven't submitted any ideas yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {ideas.map(idea => (
              <div
                key={idea._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative"
              >
                <h2 className="text-2xl font-bold mb-2 text-blue-900">{idea.title}</h2>
                <p className="text-gray-600 mb-4">{idea.description}</p>
                <div className="mb-4 space-y-1">
                  <p className="text-sm text-gray-700">
                    <strong>Target Audience:</strong> {idea.targetAudience}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Industry:</strong> {idea.industry}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Created:</strong> {new Date(idea.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteIdea(idea._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 absolute bottom-4 right-4"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PersonalIdeas;
