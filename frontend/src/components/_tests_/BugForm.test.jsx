// src/components/__tests__/BugForm.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BugForm from '../BugForm';

// Mock React Router's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

describe('BugForm Component', () => {
  const mockSubmit = jest.fn();
  
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  test('renders the form with empty fields when no initial data', () => {
    render(
      <BrowserRouter>
        <BugForm onSubmit={mockSubmit} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    expect(screen.getByLabelText(/status/i)).toHaveValue('open');
    expect(screen.getByLabelText(/priority/i)).toHaveValue('medium');
  });

  test('renders the form with initial data when provided', () => {
    const initialData = {
      title: 'Test Bug',
      description: 'This is a test bug description',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'John Doe'
    };

    render(
      <BrowserRouter>
        <BugForm onSubmit={mockSubmit} initialData={initialData} />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue('Test Bug');
    expect(screen.getByLabelText(/description/i)).toHaveValue('This is a test bug description');
    expect(screen.getByLabelText(/status/i)).toHaveValue('in-progress');
    expect(screen.getByLabelText(/priority/i)).toHaveValue('high');
    expect(screen.getByLabelText(/assigned to/i)).toHaveValue('John Doe');
  });

  test('displays validation errors when submitting empty form', async () => {
    render(
      <BrowserRouter>
        <BugForm onSubmit={mockSubmit} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/submit bug/i));

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('submits the form when valid data is entered', async () => {
    render(
      <BrowserRouter>
        <BugForm onSubmit={mockSubmit} />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Valid Bug Title' }
    });
    
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a valid bug description with enough characters' }
    });
    
    fireEvent.change(screen.getByLabelText(/assigned to/i), {
      target: { value: 'Jane Smith' }
    });

    // Submit the form
    fireEvent.click(screen.getByText(/submit bug/i));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        title: 'Valid Bug Title',
        description: 'This is a valid bug description with enough characters',
        status: 'open',
        priority: 'medium',
        assignedTo: 'Jane Smith'
      });
    });
  });
});