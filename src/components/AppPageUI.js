// components/AppPageUI.js

import React from 'react';

function AppPageUI({ 
  sortOption, 
  targetAudienceFilter, 
  industryFilter, 
  ideas, 
  error, 
  handleSortChange, 
  handleTargetAudienceFilterChange, 
  handleIndustryFilterChange, 
  navigate 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50">
      {/* Sort and Filter Options */}
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Explore Ideas</h1>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Sort Dropdown */}
          <div>
            <label htmlFor="sortOptions" className="mr-2 font-semibold text-gray-700">
              Sort By:
            </label>
            <select
              id="sortOptions"
              value={sortOption}
              onChange={handleSortChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value="recent">Recent</option>
              <option value="old">Old</option>
              <option value="most-voted">Most Voted</option>
              <option value="least-voted">Least Voted</option>
              <option value="title">Title</option>
            </select>
          </div>

          {/* Target Audience Filter */}
          <div>
            <label htmlFor="targetAudienceFilter" className="mr-2 font-semibold text-gray-700">
              Target Audience:
            </label>
            <select
              id="targetAudienceFilter"
              value={targetAudienceFilter}
              onChange={handleTargetAudienceFilterChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value="">All</option>
              <option value="General Enthusiast">General Enthusiast</option>
              <option value="Industry Expert">Industry Expert</option>
              <option value="Experienced Entrepreneur">Experienced Entrepreneur</option>
              <option value="Potential Customer/User">Potential Customer/User</option>
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <label htmlFor="industryFilter" className="mr-2 font-semibold text-gray-700">
              Industry:
            </label>
            <select
              id="industryFilter"
              value={industryFilter}
              onChange={handleIndustryFilterChange}
              className="p-2 rounded border border-gray-300"
            >
              <option value="">All</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
              <option value="Gaming">Gaming</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="flex flex-wrap justify-center gap-12">
          {ideas.length === 0 ? (
            <p className="text-lg text-gray-600">No ideas available from other users at the moment.</p>
          ) : (
            ideas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all max-w-sm cursor-pointer"
                onClick={() => navigate(`/idea/${idea._id}`)}
              >
                <div className="p-6">
                  <h3 className="font-bold text-2xl text-blue-800 mb-4">{idea.title}</h3>
                  <p className="text-gray-700 mb-4">
                    {idea.description.length > 150 ? `${idea.description.substring(0, 150)}...` : idea.description}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Target Audience:</strong> {idea.targetAudience}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Industry:</strong> {idea.industry}
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    <strong>Votes:</strong> {idea.votesCount}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AppPageUI;
