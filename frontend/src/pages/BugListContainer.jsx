import React, { useState, useEffect } from 'react';
import BugList from '../components/BugList'; // Adjust the import path if needed

const BugListContainer = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bugs when component mounts
  useEffect(() => {
    fetch('/api/bugs')
      .then(res => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Success:', data);
        setBugs(data.data || []); // Extract only the array of bugs
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  console.log("Bugs state:", bugs);

  // Handle delete functionality
  const handleDelete = async (bugId) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        const response = await fetch(`/api/bugs/${bugId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete bug');
        
        // Remove the deleted bug from state
        setBugs(prevBugs => prevBugs.filter(bug => bug._id !== bugId));
      } catch (err) {
        console.error('Error deleting bug:', err);
        alert('Error deleting bug');
      }
    }
  };

  if (loading) return <div className="text-center py-12">Loading bugs...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;

  return <BugList bugs={bugs} onDelete={handleDelete} />;
};

export default BugListContainer;
