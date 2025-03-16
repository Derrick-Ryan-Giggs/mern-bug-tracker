// src/pages/EditBugPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BugForm from '../components/BugForm';
import { getBugById, updateBug } from '../services/bugService';

const EditBugPage = () => {
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

  const handleSubmit = async (bugData) => {
    try {
      await updateBug(id, bugData);
      navigate(`/bugs/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading bug data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!bug) return <div className="text-center py-8">Bug not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Bug</h1>
      <BugForm onSubmit={handleSubmit} initialData={bug} />
    </div>
  );
};

export default EditBugPage;