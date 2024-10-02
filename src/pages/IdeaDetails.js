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
    const fetchIdea = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/ideas/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setIdea(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIdea();
  }, [id]);

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      setVoteSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      console.log('Submitting vote with data:', { score: parseInt(vote), voterType, location, comment }); // Add this line for debugging
      const response = await axios.post(
        `/api/ideas/${id}/vote`,
        { score: parseInt(vote), voterType, location, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Vote submission response:', response.data); // Add this line for debugging
      setIdea(response.data.idea);
      setVote('');
      setVoterType('');
      setLocation('');
      setComment('');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setVoteSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
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
          {userId === idea.creator && (
            <p>Average Score: {(idea.votes.reduce((sum, vote) => sum + vote.score, 0) / idea.votes.length || 0).toFixed(1)}</p>
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
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
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