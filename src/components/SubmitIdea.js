import React, { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function SubmitIdea() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sanitizeInput = useCallback((input) => {
    return input.replace(/[^\x20-\x7E]/g, '').trim();
  }, []);

  const handleChange = useCallback(
    (setter) => (e) => {
      const sanitizedValue = sanitizeInput(e.target.value);
      setter(sanitizedValue);
    },
    [sanitizeInput]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedTargetAudience = sanitizeInput(targetAudience);
    const sanitizedIndustry = sanitizeInput(industry);

    if (!sanitizedTitle || !sanitizedDescription) {
      setError('Title and description are required.');
      return;
    }

    try {
      const token = auth.token;
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        '/api/ideas',
        {
          title: sanitizedTitle,
          description: sanitizedDescription,
          targetAudience: sanitizedTargetAudience,
          industry: sanitizedIndustry,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setSuccess('Idea submitted successfully!');
        setTitle('');
        setDescription('');
        setTargetAudience('');
        setIndustry('');
        setTimeout(() => {
          navigate('/app');
        }, 1500);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      console.error('Error submitting idea:', err);
      setError(err.response?.data?.message || 'Failed to submit idea. Please try again.');
    }
  };

  return (
    <>
      <Navbar /> {/* Make sure the Navbar is correctly added */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="bg-white w-full max-w-3xl p-10 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Submit Your Idea</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-800 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={handleChange(setTitle)}
                required
                maxLength={100}
                placeholder="Enter your idea title"
              />
            </div>
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={handleChange(setDescription)}
                required
                rows="4"
                maxLength={1000}
                placeholder="Describe your idea"
              ></textarea>
            </div>
            {/* Target Audience */}
            <div>
              <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-800 mb-1">
                Target Audience
              </label>
              <input
                id="targetAudience"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={targetAudience}
                onChange={handleChange(setTargetAudience)}
                maxLength={100}
                placeholder="Who is this idea for?"
              />
            </div>
            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-800 mb-1">
                Industry
              </label>
              <input
                id="industry"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={industry}
                onChange={handleChange(setIndustry)}
                maxLength={100}
                placeholder="Related industry"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Submit Idea
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SubmitIdea;
