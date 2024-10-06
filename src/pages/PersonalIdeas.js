import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function PersonalIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editIdea, setEditIdea] = useState(null); // State to track the idea being edited
  const [formValues, setFormValues] = useState({ title: '', description: '', industry: '' });
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
      console.log('Deleting idea:', ideaId);
      const response = await axios.delete(`/api/ideas/${ideaId}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      console.log('Delete response:', response.data);
      setIdeas(ideas.filter(idea => idea._id !== ideaId));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setError(`Failed to delete idea. ${err.response?.data?.message || err.message}`);
    }
  };

  const editIdeaHandler = (idea) => {
    setEditIdea(idea);
    setFormValues({
      title: idea.title,
      description: idea.description,
      industry: idea.industry,
    });
  };

  const updateIdea = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/ideas/${editIdea._id}`, formValues, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setIdeas(ideas.map(idea => idea._id === editIdea._id ? response.data : idea));
      setEditIdea(null);
      setFormValues({ title: '', description: '', industry: '' });
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setError(`Failed to update idea. ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold mb-8">My Ideas</h1>
      {editIdea ? (
        <form onSubmit={updateIdea} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Edit Idea</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={formValues.title}
              onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={formValues.description}
              onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Industry</label>
            <input
              type="text"
              value={formValues.industry}
              onChange={(e) => setFormValues({ ...formValues, industry: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setEditIdea(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        ideas.length === 0 ? (
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
                    <strong>Industry:</strong> {idea.industry}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Created:</strong> {new Date(idea.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Votes:</strong> {idea.votesCount}
                  </p>
                  {idea.averageScore !== undefined && idea.averageScore !== null && (
                    <p className="text-sm text-gray-700">
                      <strong>Score:</strong> {idea.averageScore.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button
                    onClick={() => editIdeaHandler(idea)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteIdea(idea._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default PersonalIdeas;
