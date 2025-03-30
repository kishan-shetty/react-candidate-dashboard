import React from 'react';

function TotalStatsCard({ candidates, selectedBatch }) {
  // Calculate statistics
  const totalCandidates = candidates.length;
  const whatsappSent = candidates.filter(c => c.whatsappMsg === 'sent').length;
  const phoneEnquiryDone = candidates.filter(c => c.phoneEnquiry === 'done').length;
  
  return (
    <div className="card">
      <h3>{selectedBatch === 'All' ? 'All Batches' : selectedBatch} - Summary</h3>
      <div className="card-content">
        <div className="value">{totalCandidates}</div>
        <div className="secondary-value">Total Candidates</div>
        <div className="secondary-value">WhatsApp Sent: {whatsappSent}</div>
        <div className="secondary-value">Phone Enquiry Done: {phoneEnquiryDone}</div>
      </div>
    </div>
  );
}

export default TotalStatsCard;
