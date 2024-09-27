import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IdeaManagement() {
  const [ideas, setIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('dateDesc');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchIdeas();
    fetchIndustries();
    fetchLocations();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('/api/ideas');
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const fetchIndustries = async () => {
    try {
      const response = await axios.get('/api/industries');
      setIndustries(response.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    sortIdeas(e.target.value);
  };

  const sortIdeas = (sortType) => {
    let sortedIdeas = [...ideas];
    switch (sortType) {
      case 'dateDesc':
        sortedIdeas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'dateAsc':
        sortedIdeas.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'votesDesc':
        sortedIdeas.sort((a, b) => b.votes.length - a.votes.length);
        break;
      case 'votesAsc':
        sortedIdeas.sort((a, b) => a.votes.length - b.votes.length);
        break;
      case 'mostCommented':
        sortedIdeas.sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        break;
    }
    setIdeas(sortedIdeas);
  };

  const filterIdeas = () => {
    return ideas.filter(idea => 
      (!filterIndustry || idea.industry === filterIndustry) &&
      (!filterLocation || idea.location === filterLocation)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange} className="border p-2 rounded">
            <option value="dateDesc">Date (Newest First)</option>
            <option value="dateAsc">Date (Oldest First)</option>
            <option value="votesDesc">Most Votes</option>
            <option value="votesAsc">Least Votes</option>
            <option value="mostCommented">Most Commented</option>
          </select>
        </div>
        <div>
          <label htmlFor="industry" className="mr-2">Industry:</label>
          <select id="industry" value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)} className="border p-2 rounded mr-4">
            <option value="">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <label htmlFor="location" className="mr-2">Location:</label>
          <select id="location" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="border p-2 rounded">
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterIdeas().map(idea => (
          <div key={idea._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{idea.title}</h2>
            <p className="mb-2">{idea.description}</p>
            <p className="text-sm text-gray-500">Industry: {idea.industry}</p>
            <p className="text-sm text-gray-500">Location: {idea.location}</p>
            <p className="text-sm text-gray-500">Votes: {idea.votes.length}</p>
            <p className="text-sm text-gray-500">Comments: {idea.comments.length}</p>
            <p className="text-sm text-gray-500">Created: {new Date(idea.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IdeaManagement;