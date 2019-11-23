const express = require('express');
const router = express.Router();
const appController = require('../../controllers/appController');
const passport = require('passport');

// Register
router.post('/register', appController.register);

// Login
router.post('/login', appController.login);

// Test Json Web Token not expired
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ success: true });
});

// Retrieve user data
router
  .route('/mydata')
  .get(passport.authenticate('jwt', { session: false }), appController.findUserData)
  .post(passport.authenticate('jwt', { session: false }), appController.saveUserData);

// Update specific user data, Post specific user data


module.exports = router;
