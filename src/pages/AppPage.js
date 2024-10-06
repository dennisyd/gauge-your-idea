// AppPage.js

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchIdeas } from '../services/IdeasService';
import AppPageUI from '../components/AppPageUI';

function AppPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [ideas, setIdeas] = useState([]);
  const [sortOption, setSortOption] = useState('recent');
  const [targetAudienceFilter, setTargetAudienceFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getIdeas = async () => {
      try {
        const fetchedIdeas = await fetchIdeas({
          token: auth.token,
          sortOption,
          targetAudienceFilter,
          industryFilter,
        });
        setIdeas(fetchedIdeas);
        if (fetchedIdeas.length === 0) {
          setError('No ideas available from other users at the moment.');
        } else {
          setError('');
        }
      } catch (e) {
        setError(e.message);
      }
    };

    getIdeas();
  }, [sortOption, targetAudienceFilter, industryFilter, auth.token]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleTargetAudienceFilterChange = (event) => {
    setTargetAudienceFilter(event.target.value);
  };

  const handleIndustryFilterChange = (event) => {
    setIndustryFilter(event.target.value);
  };

  return (
    <AppPageUI
      sortOption={sortOption}
      targetAudienceFilter={targetAudienceFilter}
      industryFilter={industryFilter}
      ideas={ideas}
      error={error}
      handleSortChange={handleSortChange}
      handleTargetAudienceFilterChange={handleTargetAudienceFilterChange}
      handleIndustryFilterChange={handleIndustryFilterChange}
      navigate={navigate}
    />
  );
}

export default AppPage;
