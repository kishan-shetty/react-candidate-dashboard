import React from 'react';
import TotalStatsCard from './TotalStatsCard';
import TopYearsCard from './TopYearsCard';
import AttendanceCard from './AttendanceCard';

function StatisticsCards({ candidates, selectedBatch }) {
  return (
    <div className="statistics-cards">
      <TotalStatsCard candidates={candidates} selectedBatch={selectedBatch} />
      <TopYearsCard candidates={candidates} />
      <AttendanceCard candidates={candidates} />
    </div>
  );
}

export default StatisticsCards;
