import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reports() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/ideas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIdeas(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while fetching ideas');
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const handleGenerateReport = async (ideaId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/ideas/${ideaId}/report`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `idea_report_${ideaId}.pdf`;
      link.click();
      URL.revokeObjectURL(fileURL);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while generating the report');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Ideas</h1>
      {ideas.length === 0 ? (
        <p>You haven't created any ideas yet.</p>
      ) : (
        <ul className="space-y-4">
          {ideas.map(idea => (
            <li key={idea._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{idea.title}</h2>
              <p className="text-sm text-gray-500">Created: {new Date(idea.createdAt).toLocaleDateString()}</p>
              <button
                onClick={() => handleGenerateReport(idea._id)}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Generate Report
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reports;