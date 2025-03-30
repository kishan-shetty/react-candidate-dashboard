import axios from 'axios';

// Define your API base URL here (your express proxy server)
const API_BASE_URL = 'https://your-render-url.onrender.com/api';

// Fetch all candidates
export async function fetchCandidates() {
  try {
    const response = await axios.get(`${API_BASE_URL}/candidates`);
    return response.data.map((candidate, index) => ({
      id: index.toString(), // Use a unique identifier
      ...candidate,
      // Ensure status fields have default values if not present
      whatsappMsg: candidate.whatsappMsg || 'pending',
      phoneEnquiry: candidate.phoneEnquiry || 'not done',
      online: candidate.online || 'absent',
      program: candidate.program || 'ghosted'
    }));
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
}

// Fetch all available batches
export async function fetchBatches() {
  try {
    const response = await axios.get(`${API_BASE_URL}/batches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching batches:', error);
    throw error;
  }
}

// Update candidate status
export async function updateCandidateStatus(candidateId, field, value) {
  try {
    const response = await axios.put(`${API_BASE_URL}/candidates/${candidateId}/status`, {
      field,
      value
    });
    return response.data;
  } catch (error) {
    console.error('Error updating candidate status:', error);
    throw error;
  }
}

// Send reminder emails to candidates
export async function sendReminderEmails(batchName, daysRemaining) {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-reminders`, {
      batch: batchName,
      daysRemaining
    });
    return response.data;
  } catch (error) {
    console.error('Error sending reminder emails:', error);
    throw error;
  }
}
