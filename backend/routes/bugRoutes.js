const express = require('express');
const router = express.Router();
const { 
  getAllBugs, 
  createBug, 
  getBug, 
  updateBug, 
  deleteBug 
} = require('../controllers/bugController');

router.route('/')
  .get(getAllBugs) 
  .post(createBug);

router.route('/:id')
  .get(getBug)
  .put(updateBug)
  .delete(deleteBug);

module.exports = router;