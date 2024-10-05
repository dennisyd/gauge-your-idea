import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function AppPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOtherUsersIdeas();
  }, [auth.token]);

  const fetchOtherUsersIdeas = async () => {
    try {
      const response = await axios.get('/api/ideas/other-users', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setIdeas(response.data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch ideas. ${err.response ? err.response.data.message : err.message}`);
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Other Users' Ideas
        </h2>
        {ideas.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">No ideas from other users are available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all p-6 max-w-sm cursor-pointer"
                onClick={() => navigate(`/idea/${idea._id}`)}
              >
                <h3 className="font-bold text-2xl text-blue-800 mb-4">
                  {idea.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {idea.description.length > 100
                    ? `${idea.description.substring(0, 100)}...`
                    : idea.description}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppPage;
