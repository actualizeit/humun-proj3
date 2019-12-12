const router = require('express').Router();
const userRoutes = require('./users');
// const transactionRoutes = require('./transactions');

// User routes
router.use('/users', userRoutes);

// Transaction routes
// router.use('/transactions', transactionRoutes);

module.exports = router;
