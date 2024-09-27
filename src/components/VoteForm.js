import React from 'react';
import { CONTINENTS, VOTER_TYPES } from '../constants/voteConstants';

function VoteForm({ vote, setVote, voterType, setVoterType, location, setLocation, comment, setComment, handleVote, voteSubmitting }) {
  return (
    <form onSubmit={handleVote} className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="vote">
            Your Score (1-10)
          </label>
          <input
            id="vote"
            type="number"
            min="1"
            max="10"
            value={vote}
            onChange={(e) => setVote(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="voterType">
            Voter Type
          </label>
          <select
            id="voterType"
            value={voterType}
            onChange={(e) => setVoterType(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select type</option>
            {VOTER_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="location">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select location</option>
            {CONTINENTS.map((continent) => (
              <option key={continent} value={continent}>{continent}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="comment">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="2"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        disabled={voteSubmitting}
        className={`mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          voteSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {voteSubmitting ? 'Submitting...' : 'Submit Vote'}
      </button>
    </form>
  );
}

export default VoteForm;