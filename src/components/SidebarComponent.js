import React from 'react';

function Sidebar({ batches, selectedBatch, onBatchChange }) {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul className="sidebar-nav">
        {batches.map((batch) => (
          <li key={batch}>
            <button 
              className={selectedBatch === batch ? 'active' : ''}
              onClick={() => onBatchChange(batch)}
            >
              {batch === 'All' ? 'All Batches' : batch}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
