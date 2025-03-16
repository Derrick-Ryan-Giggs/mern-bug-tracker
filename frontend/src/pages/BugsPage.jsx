import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BugList from '../components/BugList';
import { getAllBugs } from '../services/bugService';

const BugsPage = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await getAllBugs();
        setBugs(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchBugs();
  }, []);
  
  if (loading) return <div className="text-center py-8">Loading bugs...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Bugs</h1>
        <Link
          to="/bugs/new"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Report New Bug
        </Link>
      </div>
      
      {bugs.length === 0 ? (
        <div className="text-center py-8 bg-gray-100 rounded-lg">
          <p className="text-xl">No bugs found! That's a good thing, right?</p>
          <Link to="/bugs/new" className="text-blue-500 hover:underline mt-2 inline-block">
            Report your first bug
          </Link>
        </div>
      ) : (
        <BugList bugs={bugs} />
      )}
    </div>
  );
};

export default BugsPage;