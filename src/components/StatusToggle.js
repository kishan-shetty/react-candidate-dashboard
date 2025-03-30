import React from 'react';

function StatusToggle({ status, labels, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <label className="status-toggle">
      <input
        type="checkbox"
        checked={status}
        onChange={handleChange}
      />
      <span className="toggle-slider"></span>
      <span className="toggle-label">
        {status ? labels[1] : labels[0]}
      </span>
    </label>
  );
}

export default StatusToggle;
