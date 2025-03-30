import React from 'react';

function TopYearsCard({ candidates }) {
  // Count candidates by year of completion
  const yearCounts = candidates.reduce((acc, candidate) => {
    const year = candidate.yearOfCompletion;
    if (year) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});
  
  // Sort years by count and take top 3
  const topYears = Object.entries(yearCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  return (
    <div className="card">
      <h3>Top 3 Completion Years</h3>
      <div className="card-content">
        {topYears.length > 0 ? (
          topYears.map(([year, count], index) => (
            <div key={year} style={{ marginBottom: '8px' }}>
              <div className="secondary-value">
                {index + 1}. Year {year}: {count} candidates
              </div>
            </div>
          ))
        ) : (
          <div className="secondary-value">No data available</div>
        )}
      </div>
    </div>
  );
}

export default TopYearsCard;
