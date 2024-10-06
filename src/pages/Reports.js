import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reports() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Fetching ideas with token:', token);
      const response = await axios.get('/api/user/ideas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched ideas:', response.data);
      setIdeas(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching ideas:', err);
      setError(err.response?.data?.message || 'An error occurred while fetching ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (ideaId) => {
    try {
      setGeneratingReport(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/ideas/${ideaId}/report`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `idea_report_${ideaId}.pdf`;
      link.click();
      URL.revokeObjectURL(fileURL);
      setError(null);
    } catch (err) {
      console.error('Error generating report:', err);
      setError(err.response?.data?.message || 'An error occurred while generating the report');
    } finally {
      setGeneratingReport(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading your ideas...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Ideas</h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      {ideas.length === 0 ? (
        <p className="text-gray-600 text-center">You haven't created any ideas yet.</p>
      ) : (
        <ul className="space-y-6">
          {ideas.map((idea) => (
            <li
              key={idea._id}
              className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">{idea.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                Created: {new Date(idea.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">
                {idea.description.length > 150
                  ? `${idea.description.substring(0, 150)}...`
                  : idea.description}
              </p>
              <button
                onClick={() => handleGenerateReport(idea._id)}
                disabled={generatingReport}
                className={`${
                  generatingReport
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out`}
              >
                {generatingReport ? 'Generating...' : 'Generate Report'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reports;
