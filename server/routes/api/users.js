const express = require('express');
const router = express.Router();
const appController = require("../../controllers/appController");
const passport = require('passport');

// Register
router.post('/register', (req, res) => {
  appController.register(req, res);
});

// Login
router.post('/login', (req, res, next) => {
  appController.login(req, res);
});

// Test Json Web Token not expired
router.get('/test',passport.authenticate('jwt',{session:false}), (req, res, next) => {
  res.json({ success: true })
});

// Get user data
router.get('/mydata',passport.authenticate('jwt',{session:false}), (req, res, next) => {
  appController.findUserData(req, res);
});

// Post or update user data
router.post('/mydata',passport.authenticate('jwt',{session:false}), (req, res, next) => {
  console.log('test')
  appController.saveUserData(req, res);
});

router
  .post('/mydata/:id',passport.authenticate('jwt',{session:false}), (req, res, next) => {
    console.log('test')
    appController.updateUser(req, res);
  })
  .put('/mydata/:id',passport.authenticate('jwt',{session:false}), (req, res, next) => {
    console.log('test')
    appController.updateUser(req, res);
  });


module.exports = router;