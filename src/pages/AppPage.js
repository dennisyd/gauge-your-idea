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
  const [industryFilter, setIndustryFilter] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getIdeas = async () => {
      try {
        const fetchedIdeas = await fetchIdeas({
          token: auth.token,
          sortOption,
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
  }, [sortOption, industryFilter, auth.token]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleIndustryFilterChange = (event) => {
    setIndustryFilter(event.target.value);
  };

  return (
    <AppPageUI
      sortOption={sortOption}
      industryFilter={industryFilter}
      ideas={ideas}
      error={error}
      handleSortChange={handleSortChange}
      handleIndustryFilterChange={handleIndustryFilterChange}
      navigate={navigate}
    />
  );
}

export default AppPage;
