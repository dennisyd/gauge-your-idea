import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VoteForm from '../components/VoteForm';

function IdeaDetails() {
  const [idea, setIdea] = useState(null);
  const [vote, setVote] = useState('');
  const [voterType, setVoterType] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteSubmitting, setVoteSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    fetchIdea();
  }, [id]);

  const fetchIdea = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/ideas/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setIdea(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      setVoteSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await axios.post(
        `/api/ideas/${id}/vote`,
        { score: parseInt(vote), voterType, location, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Redirect to /app page upon successful vote
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setVoteSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this idea? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/ideas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/'); // Redirect to home page after successful deletion
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) {
    return (
      <div className="text-center mt-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-lg" role="alert">
          <p className="font-bold">Oops!</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  if (!idea) return <div className="text-center mt-8">No idea found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>
        <p className="text-gray-700 mb-4">{idea.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p>Target Audience: {idea.targetAudience}</p>
          <p>Industry: {idea.industry}</p>
          {isLoggedIn && <p>Total Votes: {idea.votes.length}</p>}
          {idea.creator && idea.creator.toString() === userId && (
            <>
              <p>Average Score: {(idea.votes.reduce((sum, vote) => sum + vote.score, 0) / idea.votes.length || 0).toFixed(1)}</p>
              <button
                onClick={handleDelete}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Idea
              </button>
            </>
          )}
        </div>
      </div>
      
      {isLoggedIn ? (
        <VoteForm
          vote={vote}
          setVote={setVote}
          voterType={voterType}
          setVoterType={setVoterType}
          location={location}
          setLocation={setLocation}
          comment={comment}
          setComment={setComment}
          handleVote={handleVote}
          voteSubmitting={voteSubmitting}
        />
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md shadow-md" role="alert">
          <p className="font-bold">Note</p>
          <p>You must be logged in to vote on this idea.</p>
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Back to Ideas
      </button>
    </div>
  );
}

export default IdeaDetails;
