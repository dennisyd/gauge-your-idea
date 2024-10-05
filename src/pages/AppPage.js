import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function AppPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [ideas, setIdeas] = useState([]);
  const [sortOption, setSortOption] = useState('recent');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIdeas();
  }, [sortOption]);

  const fetchIdeas = async () => {
    try {
      console.log(`Fetching ideas with sort option: ${sortOption}`);
      const response = await axios.get('/api/ideas/other-users', {
        headers: { Authorization: `Bearer ${auth.token}` },
        params: { sort: sortOption },
      });
      console.log('Fetched ideas:', response.data);
      setIdeas(response.data);
      if (response.data.length === 0) {
        setError('No ideas available from other users at the moment.');
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Error fetching ideas:', err.response || err);
      setError('Failed to fetch ideas.');
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50">
      {/* Sort Dropdown */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Explore Ideas</h1>
        <div>
          <label htmlFor="sortOptions" className="mr-2 font-semibold text-gray-700">Sort By:</label>
          <select
            id="sortOptions"
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 rounded border border-gray-300"
          >
            <option value="recent">Recent</option>
            <option value="old">Old</option>
            <option value="most-voted">Most Voted</option>
            <option value="least-voted">Least Voted</option>
            <option value="title">Title</option>
            <option value="target-audience">Target Audience</option>
            <option value="industry">Industry</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="flex flex-wrap justify-center gap-12">
          {ideas.length === 0 ? (
            <p className="text-lg text-gray-600">No ideas available from other users at the moment.</p>
          ) : (
            ideas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all max-w-sm cursor-pointer"
                onClick={() => navigate(`/idea/${idea._id}`)}
              >
                <div className="p-6">
                  <h3 className="font-bold text-2xl text-blue-800 mb-4">{idea.title}</h3>
                  <p className="text-gray-700 mb-4">{idea.description}</p>
                  <p className="text-sm text-gray-700">
                    <strong>Target Audience:</strong> {idea.targetAudience}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Industry:</strong> {idea.industry}
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    <strong>Votes:</strong> {idea.votesCount}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AppPage;
