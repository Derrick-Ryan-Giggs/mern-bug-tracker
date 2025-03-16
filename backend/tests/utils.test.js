// tests/utils.test.js
const { validateBug } = require('../utils/validation');

describe('Validation Utils', () => {
  describe('validateBug function', () => {
    it('should return true for valid bug data', () => {
      const validBug = {
        title: 'Valid Bug Title',
        description: 'This is a valid bug description',
        status: 'open',
        priority: 'medium'
      };
      
      const { isValid, errors } = validateBug(validBug);
      
      expect(isValid).toBe(true);
      expect(Object.keys(errors).length).toBe(0);
    });
    
    it('should return false for missing title', () => {
      const invalidBug = {
        description: 'Bug description without title',
        status: 'open',
        priority: 'medium'
      };
      
      const { isValid, errors } = validateBug(invalidBug);
      
      expect(isValid).toBe(false);
      expect(errors.title).toBeTruthy();
    });
    
    it('should return false for title that is too short', () => {
      const invalidBug = {
        title: 'Bug', // Too short
        description: 'Bug description with short title',
        status: 'open',
        priority: 'medium'
      };
      
      const { isValid, errors } = validateBug(invalidBug);
      
      expect(isValid).toBe(false);
      expect(errors.title).toBeTruthy();
    });
    
    it('should return false for missing description', () => {
      const invalidBug = {
        title: 'Bug Without Description',
        status: 'open',
        priority: 'medium'
      };
      
      const { isValid, errors } = validateBug(invalidBug);
      
      expect(isValid).toBe(false);
      expect(errors.description).toBeTruthy();
    });
    
    it('should return false for invalid status', () => {
      const invalidBug = {
        title: 'Bug With Invalid Status',
        description: 'This is a valid bug description',
        status: 'invalid-status', // Not a valid status
        priority: 'medium'
      };
      
      const { isValid, errors } = validateBug(invalidBug);
      
      expect(isValid).toBe(false);
      expect(errors.status).toBeTruthy();
    });
    
    it('should return false for invalid priority', () => {
      const invalidBug = {
        title: 'Bug With Invalid Priority',
        description: 'This is a valid bug description',
        status: 'open',
        priority: 'super-high' // Not a valid priority
      };
      
      const { isValid, errors } = validateBug(invalidBug);
      
      expect(isValid).toBe(false);
      expect(errors.priority).toBeTruthy();
    });
  });
});