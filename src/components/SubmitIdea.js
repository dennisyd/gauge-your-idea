// src/components/SubmitIdea.js
import React, { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function SubmitIdea() {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sanitizeInput = useCallback((input) => {
    // Remove any non-printable characters
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

      console.log('Submitting idea:', {
        sanitizedTitle,
        sanitizedDescription,
        sanitizedTargetAudience,
        sanitizedIndustry,
      });

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

      console.log('Server response:', response);

      if (response.status === 201) {
        setSuccess('Idea submitted successfully!');
        setTitle('');
        setDescription('');
        setTargetAudience('');
        setIndustry('');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      console.error('Error submitting idea:', err);
      setError(err.response?.data?.message || 'Failed to submit idea. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit a New Idea</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title:
          </label>
          <input
            id="title"
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={handleChange(setTitle)}
            required
            maxLength={100}
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description:
          </label>
          <textarea
            id="description"
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={handleChange(setDescription)}
            required
            rows="4"
            maxLength={1000}
          ></textarea>
        </div>
        {/* Target Audience */}
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium">
            Target Audience:
          </label>
          <input
            id="targetAudience"
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={targetAudience}
            onChange={handleChange(setTargetAudience)}
            maxLength={100}
          />
        </div>
        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium">
            Industry:
          </label>
          <input
            id="industry"
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={industry}
            onChange={handleChange(setIndustry)}
            maxLength={100}
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Submit Idea
        </button>
      </form>
    </div>
  );
}

export default SubmitIdea;