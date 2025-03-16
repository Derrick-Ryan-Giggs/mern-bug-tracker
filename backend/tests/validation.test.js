const { validateBugInput } = require('../utils/validation');

describe('Bug Validation', () => {
  test('should validate correct bug input', () => {
    const bugData = {
      title: 'Test Bug',
      description: 'This is a test bug',
      status: 'open',
      severity: 'medium'
    };
    
    const { error } = validateBugInput(bugData);
    expect(error).toBeNull();
  });
  
  test('should return error for missing title', () => {
    const bugData = {
      description: 'This is a test bug',
      status: 'open',
      severity: 'medium'
    };
    
    const { error } = validateBugInput(bugData);
    expect(error).not.toBeNull();
    expect(error.message).toBe('Title is required');
  });
  
  test('should return error for title exceeding max length', () => {
    const bugData = {
      title: 'a'.repeat(101),
      description: 'This is a test bug',
      status: 'open',
      severity: 'medium'
    };
    
    const { error } = validateBugInput(bugData);
    expect(error).not.toBeNull();
    expect(error.message).toBe('Title cannot be more than 100 characters');
  });

  test('should return error for missing description', () => {
    const bugData = {
      title: 'Test Bug',
      status: 'open',
      severity: 'medium'
    };
    
    const { error } = validateBugInput(bugData);
    expect(error).not.toBeNull();
    expect(error.message).toBe('Description is required');
  });
  
  test('should return error for invalid status', () => {
    const bugData = {
      title: 'Test Bug',
      description: 'This is a test bug',
      status: 'invalid',
      severity: 'medium'
    };
    
    const { error } = validateBugInput(bugData);
    expect(error).not.toBeNull();
    expect(error.message).toBe('Status must be one of: open, in-progress, resolved');
  });
  
  test('should return error for invalid severity', () => {
    const bugData = {
      title: 'Test Bug',
      description: 'This is a test bug',
      status: 'open',
      severity: 'invalid'
    };
    
    const { error } = validateBugInput(bugData);
    expect(error).not.toBeNull();
    expect(error.message).toBe('Severity must be one of: low, medium, high, critical');
  });
});