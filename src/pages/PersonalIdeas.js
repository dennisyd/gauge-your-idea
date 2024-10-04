import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function PersonalIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        console.log('Fetching ideas...');
        const response = await axios.get('/api/user/ideas', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        console.log('Response:', response.data);
        setIdeas(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ideas:', err.response ? err.response.data : err.message);
        setError(`Failed to fetch ideas. ${err.response ? err.response.data.message : err.message}`);
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [auth.token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Ideas</h1>
      {ideas.length === 0 ? (
        <p>You haven't submitted any ideas yet.</p>
      ) : (
        <ul className="space-y-4">
          {ideas.map(idea => (
            <li key={idea._id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{idea.title}</h2>
              <p>{idea.description}</p>
              <p>Target Audience: {idea.targetAudience}</p>
              <p>Industry: {idea.industry}</p>
              <p>Created: {new Date(idea.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PersonalIdeas;