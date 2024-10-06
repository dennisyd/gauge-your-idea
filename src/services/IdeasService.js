// services/IdeasService.js

import axios from 'axios';

export const fetchIdeas = async ({ token, sortOption, targetAudienceFilter, industryFilter }) => {
  try {
    console.log(
      `Fetching ideas with sort option: ${sortOption}, target audience: ${targetAudienceFilter}, industry: ${industryFilter}`
    );
    const response = await axios.get('/api/ideas/other-users', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        sort: sortOption,
        targetAudience: targetAudienceFilter || undefined,
        industry: industryFilter || undefined,
      },
    });
    console.log('Fetched ideas:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching ideas:', err.response || err);
    throw new Error('Failed to fetch ideas.');
  }
};
