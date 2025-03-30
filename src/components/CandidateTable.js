import React, { useState } from 'react';
import StatusToggle from './StatusToggle';

function CandidateTable({ candidates, onStatusUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  
  // Calculate the current page's data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = candidates.slice(indexOfFirstRow, indexOfLastRow);
  
  // Calculate total pages
  const totalPages = Math.ceil(candidates.length / rowsPerPage);
  
  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className="candidate-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>College</th>
            <th>Year of Completion</th>
            <th>Stream</th>
            <th>Batch</th>
            <th>WhatsApp Msg</th>
            <th>Phone Enquiry</th>
            <th>Online</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.fullName}</td>
              <td>{candidate.email}</td>
              <td>{candidate.contactNumber}</td>
              <td>{candidate.collegeName}</td>
              <td>{candidate.yearOfCompletion}</td>
              <td>{candidate.stream}</td>
              <td>{candidate.batch}</td>
              <td>
                <StatusToggle 
                  status={candidate.whatsappMsg === 'sent'} 
                  labels={['pending', 'sent']}
                  onChange={(value) => onStatusUpdate(candidate.id, 'whatsappMsg', value ? 'sent' : 'pending')}
                />
              </td>
              <td>
                <StatusToggle 
                  status={candidate.phoneEnquiry === 'done'} 
                  labels={['not done', 'done']}
                  onChange={(value) => onStatusUpdate(candidate.id, 'phoneEnquiry', value ? 'done' : 'not done')}
                />
              </td>
              <td>
                <StatusToggle 
                  status={candidate.online === 'attended'} 
                  labels={['absent', 'attended']}
                  onChange={(value) => onStatusUpdate(candidate.id, 'online', value ? 'attended' : 'absent')}
                />
              </td>
              <td>
                <StatusToggle 
                  status={candidate.program === 'attended'} 
                  labels={['ghosted', 'attended']}
                  onChange={(value) => onStatusUpdate(candidate.id, 'program', value ? 'attended' : 'ghosted')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CandidateTable;
