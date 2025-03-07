const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyImpact,
  updateCompanyImpact
} = require('../controllers/companyController');

// Routes for /api/companies
router
  .route('/')
  .get(getCompanies)
  .post(createCompany);

// Routes for /api/companies/:id
router
  .route('/:id')
  .get(getCompany)
  .put(updateCompany)
  .delete(deleteCompany);

// Routes for /api/companies/:id/impact
router
  .route('/:id/impact')
  .get(getCompanyImpact)
  .put(updateCompanyImpact);

module.exports = router; 