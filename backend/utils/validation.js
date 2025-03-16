exports.validateBugInput = (data) => {
    const { title, description, status, severity } = data;
    
    // Title validation
    if (!title) {
      return { error: { message: 'Title is required' } };
    }
    
    if (title.length > 100) {
      return { error: { message: 'Title cannot be more than 100 characters' } };
    }
    
    // Description validation
    if (!description) {
      return { error: { message: 'Description is required' } };
    }
    
    // Status validation
    if (status && !['open', 'in-progress', 'resolved'].includes(status)) {
      return { error: { message: 'Status must be one of: open, in-progress, resolved' } };
    }
    
    // Severity validation
    if (severity && !['low', 'medium', 'high', 'critical'].includes(severity)) {
      return { error: { message: 'Severity must be one of: low, medium, high, critical' } };
    }
    
    return { error: null };
  };