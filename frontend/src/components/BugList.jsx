import React from 'react';
import { Link } from 'react-router-dom';

const BugList = ({ bugs, onDelete }) => {
  // Ensure bugs is an array
  const bugsArray = Array.isArray(bugs) ? bugs : [];

  if (!bugsArray.length) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg" data-testid="empty-bug-list">
        <p className="text-gray-600">No bugs reported yet. Create a new bug to get started!</p>
      </div>
    );
  }

  // Helper function to get appropriate status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get appropriate severity badge class
  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto" data-testid="bug-list">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Severity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned To
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bugsArray.map(bug => (
            <tr key={bug._id} data-testid={`bug-item-${bug._id}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  to={`/bugs/${bug._id}`} 
                  className="text-blue-600 hover:text-blue-900"
                  data-testid={`bug-link-${bug._id}`}
                >
                  {bug.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(bug.status)}`}>
                  {bug.status && bug.status.replace('-', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityClass(bug.severity)}`}>
                  {bug.severity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {bug.assignedTo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/bugs/${bug._id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  data-testid={`edit-bug-${bug._id}`}
                >
                  Edit
                </Link>
                {onDelete && (
                  <button
                    onClick={() => onDelete(bug._id)}
                    className="text-red-600 hover:text-red-900"
                    data-testid={`delete-bug-${bug._id}`}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BugList;