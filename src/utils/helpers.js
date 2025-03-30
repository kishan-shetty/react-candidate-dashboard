/**
 * Format date string from Google Sheets to a more readable format
 * @param {string} dateString - Date string from the sheet
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Calculate statistics for a set of candidates
 * @param {Array} candidates - Array of candidate objects
 * @returns {Object} Statistics object
 */
export function calculateStats(candidates) {
  if (!candidates || candidates.length === 0) {
    return {
      total: 0,
      whatsappSent: 0,
      whatsappPending: 0,
      phoneEnquiryDone: 0,
      phoneEnquiryNotDone: 0,
      onlineAttended: 0,
      onlineAbsent: 0,
      programAttended: 0,
      programGhosted: 0,
      attendanceRate: 0,
      topYears: []
    };
  }
  
  const whatsappSent = candidates.filter(c => c.whatsappMsg === 'sent').length;
  const phoneEnquiryDone = candidates.filter(c => c.phoneEnquiry === 'done').length;
  const onlineAttended = candidates.filter(c => c.online === 'attended').length;
  const programAttended = candidates.filter(c => c.program === 'attended').length;
  
  // Calculate attendance rate
  const attendanceRate = Math.round((programAttended / candidates.length) * 100);
  
  // Calculate top years
  const yearCounts = candidates.reduce((acc, candidate) => {
    const year = candidate.yearOfCompletion;
    if (year) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});
  
  const topYears = Object.entries(yearCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([year, count]) => ({ year, count }));
  
  return {
    total: candidates.length,
    whatsappSent,
    whatsappPending: candidates.length - whatsappSent,
    phoneEnquiryDone,
    phoneEnquiryNotDone: candidates.length - phoneEnquiryDone,
    onlineAttended,
    onlineAbsent: candidates.length - onlineAttended,
    programAttended,
    programGhosted: candidates.length - programAttended,
    attendanceRate,
    topYears
  };
}

/**
 * Filter candidates by search term
 * @param {Array} candidates - Array of candidate objects
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered candidates
 */
export function searchCandidates(candidates, searchTerm) {
  if (!searchTerm) return candidates;
  
  const term = searchTerm.toLowerCase();
  
  return candidates.filter(candidate => {
    // Search in these fields
    const searchFields = [
      'fullName',
      'email',
      'contactNumber',
      'collegeName',
      'stream',
      'yearOfCompletion',
      'batch',
      'reference'
    ];
    
    return searchFields.some(field => {
      const value = candidate[field];
      return value && value.toString().toLowerCase().includes(term);
    });
  });
}

/**
 * Sort candidates by a field
 * @param {Array} candidates - Array of candidate objects
 * @param {string} field - Field to sort by
 * @param {boolean} ascending - Sort direction
 * @returns {Array} Sorted candidates
 */
export function sortCandidates(candidates, field, ascending = true) {
  return [...candidates].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];
    
    // Convert to lowercase for string comparison
    if (typeof valueA === 'string') valueA = valueA.toLowerCase();
    if (typeof valueB === 'string') valueB = valueB.toLowerCase();
    
    // Handle missing values
    if (valueA === undefined || valueA === null) return ascending ? 1 : -1;
    if (valueB === undefined || valueB === null) return ascending ? -1 : 1;
    
    // Compare based on type
    if (valueA < valueB) return ascending ? -1 : 1;
    if (valueA > valueB) return ascending ? 1 : -1;
    return 0;
  });
}
