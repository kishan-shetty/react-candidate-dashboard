import React from 'react';

function AttendanceCard({ candidates }) {
  // Calculate program attendance rate
  const totalCandidates = candidates.length;
  const attended = candidates.filter(c => c.program === 'attended').length;
  const attendanceRate = totalCandidates > 0 
    ? Math.round((attended / totalCandidates) * 100) 
    : 0;
  
  return (
    <div className="card">
      <h3>Program Attendance Rate</h3>
      <div className="card-content">
        <div className="value">{attendanceRate}%</div>
        <div className="secondary-value">
          {attended} attended / {totalCandidates} total
        </div>
      </div>
    </div>
  );
}

export default AttendanceCard;
