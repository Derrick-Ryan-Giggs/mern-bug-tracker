// src/pages/NewBugPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BugForm from '../components/BugForm';
import { createBug } from '../services/bugService';

const NewBugPage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = React.useState(null);

  const handleSubmit = async (bugData) => {
    try {
      await createBug(bugData);
      navigate('/bugs');
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Report New Bug</h1>
      
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {submitError}
        </div>
      )}
      
      <BugForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewBugPage;