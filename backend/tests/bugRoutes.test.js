const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Bug = require('../models/Bug');

let mongoServer;

// Setup MongoDB Memory Server before tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// Clear database between tests
beforeEach(async () => {
  await Bug.deleteMany({});
});

// Close MongoDB connection after tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Bug API Routes', () => {
  const sampleBug = {
    title: 'Test Bug',
    description: 'This is a test bug',
    status: 'open',
    severity: 'medium'
  };

  describe('GET /api/bugs', () => {
    test('should return empty array when no bugs', async () => {
      const res = await request(app).get('/api/bugs');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toEqual([]);
    });
    
    test('should return all bugs', async () => {
      await Bug.create(sampleBug);
      
      const res = await request(app).get('/api/bugs');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].title).toBe(sampleBug.title);
    });
  });
  
  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const res = await request(app)
        .post('/api/bugs')
        .send(sampleBug);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(sampleBug.title);
      
      // Verify bug was saved to database
      const bug = await Bug.findById(res.body.data._id);
      expect(bug).toBeTruthy();
      expect(bug.title).toBe(sampleBug.title);
    });
    
    test('should return 400 for invalid bug data', async () => {
      const invalidBug = {
        description: 'Missing title',
        status: 'open'
      };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(invalidBug);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBeTruthy();
    });
  });
  
  describe('GET /api/bugs/:id', () => {
    test('should return a single bug', async () => {
      const bug = await Bug.create(sampleBug);
      
      const res = await request(app).get(`/api/bugs/${bug._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(bug._id.toString());
      expect(res.body.data.title).toBe(sampleBug.title);
    });
    
    test('should return 404 for non-existent bug', async () => {
        const fakeId = new mongoose.Types.ObjectId();
      
        const res = await request(app).get(`/api/bugs/${fakeId}`);
        
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('Bug not found');
      });
    });
    
    describe('PUT /api/bugs/:id', () => {
      test('should update a bug', async () => {
        const bug = await Bug.create(sampleBug);
        
        const updatedData = {
          title: 'Updated Bug',
          status: 'in-progress'
        };
        
        const res = await request(app)
          .put(`/api/bugs/${bug._id}`)
          .send(updatedData);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe(updatedData.title);
        expect(res.body.data.status).toBe(updatedData.status);
        // Description should remain the same
        expect(res.body.data.description).toBe(sampleBug.description);
        
        // Verify bug was updated in database
        const updatedBug = await Bug.findById(bug._id);
        expect(updatedBug.title).toBe(updatedData.title);
      });
      
      test('should return 404 for non-existent bug', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        
        const res = await request(app)
          .put(`/api/bugs/${fakeId}`)
          .send({ title: 'Updated Bug' });
        
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
      });
    });
    
    describe('DELETE /api/bugs/:id', () => {
      test('should delete a bug', async () => {
        const bug = await Bug.create(sampleBug);
        
        const res = await request(app).delete(`/api/bugs/${bug._id}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        
        // Verify bug was removed from database
        const deletedBug = await Bug.findById(bug._id);
        expect(deletedBug).toBeNull();
      });
      
      test('should return 404 for non-existent bug', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        
        const res = await request(app).delete(`/api/bugs/${fakeId}`);
        
        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
      });
    });
  })
  