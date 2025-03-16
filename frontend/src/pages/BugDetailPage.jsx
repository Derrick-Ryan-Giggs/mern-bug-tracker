
// src/pages/BugDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BugDetail from '../components/BugDetail';
import { getBugById, updateBug, deleteBug } from '../services/bugService';

const BugDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const data = await getBugById(id);
        setBug(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBug();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const updatedBug = await updateBug(id, { status: newStatus });
      setBug(updatedBug);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await deleteBug(id);
        navigate('/bugs');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading bug details...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!bug) return <div className="text-center py-8">Bug not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BugDetail 
        bug={bug} 
        onStatusUpdate={handleStatusUpdate} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default BugDetailPage;