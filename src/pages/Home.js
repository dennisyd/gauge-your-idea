import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/ideas');
        setIdeas(response.data);
      } catch (err) {
        setError('Failed to fetch ideas. Please try again later.');
        console.error('Error fetching ideas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Ideas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map(idea => (
          <Link key={idea._id} to={`/idea/${idea._id}`} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
            <p className="text-gray-600 mb-4">{idea.description.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500">Votes: {idea.votes?.length || 0}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;