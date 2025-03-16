const Bug = require('../models/Bug');
const { validateBugInput } = require('../utils/validation');

// Get all bugs
exports.getAllBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.status(200).json({ success: true, count: bugs.length, data: bugs });
  } catch (error) {
    next(error);
  }
};

// Create a new bug
exports.createBug = async (req, res, next) => {
  try {
    // Validate input
    const { error } = validateBugInput(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    const bug = await Bug.create(req.body);
    res.status(201).json({ success: true, data: bug });
  } catch (error) {
    next(error);
  }
};

// Get a single bug
exports.getBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ success: false, error: 'Bug not found' });
    }
    res.status(200).json({ success: true, data: bug });
  } catch (error) {
    next(error);
  }
};

// Update a bug
exports.updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!bug) {
      return res.status(404).json({ success: false, error: 'Bug not found' });
    }
    
    res.status(200).json({ success: true, data: bug });
  } catch (error) {
    next(error);
  }
};

// Delete a bug
exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    
    if (!bug) {
      return res.status(404).json({ success: false, error: 'Bug not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};