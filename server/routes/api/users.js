const express = require('express');
const router = express.Router();
const appController = require('../../controllers/appController');
const testController = require('../../controllers/testController');
const passport = require('passport');

// Register
router.post('/register', appController.register);

// Login
router.post('/login', appController.login);

// Update user allocations
router
  .route('/allocation')
  .post(passport.authenticate('jwt', { session: false }), appController.allocationCalc);

// Test Json Web Token not expired
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ success: true });
});

// Retrieve user data
router
  .route('/mydata')
  .get(passport.authenticate('jwt', { session: false }), appController.findUserData)
  .post(passport.authenticate('jwt', { session: false }), appController.saveUserData);

router.post('/getResetToken', appController.getPwResetToken);

router.post('/resetPW', appController.resetPW);
  
module.exports = router;
