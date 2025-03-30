import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CandidateTable from './components/CandidateTable';
import StatisticsCards from './components/StatisticsCards';
import { fetchCandidates, fetchBatches } from './services/apiService';
import './styles.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch batches first
        const batchesData = await fetchBatches();
        setBatches(['All', ...batchesData]);
        
        // Then fetch all candidates
        const candidatesData = await fetchCandidates();
        setCandidates(candidatesData);
        setFilteredCandidates(candidatesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    loadData();
  }, []);

  // Filter candidates when batch changes
  useEffect(() => {
    if (selectedBatch === 'All') {
      setFilteredCandidates(candidates);
    } else {
      setFilteredCandidates(
        candidates.filter(candidate => candidate.batch === selectedBatch)
      );
    }
  }, [selectedBatch, candidates]);

  const handleBatchChange = (batch) => {
    setSelectedBatch(batch);
  };

  const handleStatusUpdate = async (candidateId, field, value) => {
    try {
      // Create a copy of the candidates array to update
      const updatedCandidates = candidates.map(candidate => {
        if (candidate.id === candidateId) {
          return { ...candidate, [field]: value };
        }
        return candidate;
      });
      
      // Update the state with the new data
      setCandidates(updatedCandidates);
      
      // Update filtered candidates too if needed
      if (selectedBatch === 'All' || updatedCandidates.find(c => c.id === candidateId)?.batch === selectedBatch) {
        setFilteredCandidates(
          selectedBatch === 'All' 
            ? updatedCandidates 
            : updatedCandidates.filter(c => c.batch === selectedBatch)
        );
      }
      
      // Call API to update the Google Sheet (to be implemented in apiService)
      // await updateCandidateStatus(candidateId, field, value);
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.error('Error updating status:', err);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Sidebar 
        batches={batches} 
        selectedBatch={selectedBatch} 
        onBatchChange={handleBatchChange} 
      />
      <div className="main-content">
        <h1>Internship Candidates Dashboard</h1>
        <StatisticsCards 
          candidates={filteredCandidates} 
          selectedBatch={selectedBatch} 
        />
        <CandidateTable 
          candidates={filteredCandidates}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
}

export default App;
