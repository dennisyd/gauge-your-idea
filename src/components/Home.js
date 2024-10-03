// src/components/Home.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { auth } = useContext(AuthContext);
  const userId = auth.userId;

  useEffect(() => {
    fetchIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const token = auth.token;
      const response = await axios.get('/api/ideas', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setIdeas(response.data);
    } catch (err) {
      setError('Failed to fetch ideas. Please try again later.');
      console.error('Error fetching ideas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ideaId, event) => {
    event.preventDefault(); // Prevent navigating to idea details
    if (
      window.confirm(
        'Are you sure you want to delete this idea? This action cannot be undone.'
      )
    ) {
      try {
        const token = auth.token;
        await axios.delete(`/api/ideas/${ideaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Refresh the ideas list after deletion
        fetchIdeas();
      } catch (err) {
        setError('Failed to delete idea. Please try again.');
        console.error('Error deleting idea:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Ideas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div key={idea._id} className="bg-white p-6 rounded shadow relative">
            <Link to={`/idea/${idea._id}`}>
              <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
              <p className="text-gray-600 mb-4">
                {idea.description.substring(0, 100)}...
              </p>
              <p className="text-sm text-gray-500">Votes: {idea.votes?.length || 0}</p>
            </Link>
            {idea.creator && idea.creator._id === userId && (
              <button
                onClick={(e) => handleDelete(idea._id, e)}
                className="absolute bottom-2 left-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
