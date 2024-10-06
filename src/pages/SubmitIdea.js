// SubmitIdea.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SubmitIdea() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to submit an idea.');
      return;
    }

    if (!targetAudience || !industry) {
      setError('Please select both Target Audience and Industry.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await axios.post(
        '/api/ideas',
        {
          title,
          description,
          targetAudience,
          industry,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/app');
    } catch (error) {
      setError(
        error.response?.data?.message || 'Idea submission failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Submit Your Idea</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg">
        {/* Title Field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Idea Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your idea"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Target Audience Dropdown */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="targetAudience"
          >
            Target Audience
          </label>
          <select
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>
              Select Target Audience
            </option>
            <option value="General Enthusiast">General Enthusiast</option>
            <option value="Industry Expert">Industry Expert</option>
            <option value="Experienced Entrepreneur">Experienced Entrepreneur</option>
            <option value="Potential Customer/User">Potential Customer/User</option>
          </select>
        </div>

        {/* Industry Dropdown */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="industry"
          >
            Industry
          </label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>
              Select Industry
            </option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Gaming">Gaming</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Idea'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitIdea;
