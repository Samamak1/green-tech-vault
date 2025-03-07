const express = require('express');
const router = express.Router();
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  generateReport,
  publishReport
} = require('../controllers/reportController');

// Routes for /api/reports
router
  .route('/')
  .get(getReports)
  .post(createReport);

// Route for generating reports
router.route('/generate').post(generateReport);

// Routes for /api/reports/:id
router
  .route('/:id')
  .get(getReport)
  .put(updateReport)
  .delete(deleteReport);

// Route for publishing reports
router.route('/:id/publish').put(publishReport);

module.exports = router; 