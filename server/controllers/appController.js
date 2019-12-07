const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const charities = require('./../controllers/charities');
const { Charities, Transactions, User } = require('../models');

// Defining methods for the appController
module.exports = {
  register: function (req, res) {
    const { firstName, lastName, email, password, password2 } = req.body;
    const errors = [];

    if (!firstName) {
      errors.push({ firstName: 'Please enter your first name.' });
    }
    if (!lastName) {
      errors.push({ lastName: 'Please enter your last name.' });
    }
    if (!email) {
      errors.push({ email: 'Please enter a valid email.' });
    }
    if (!password) {
      errors.push({ password: 'Password cannot be empty.' });
    }
    if (password !== password2) {
      errors.push({ password2: 'Passwords do not match' });
    }
    if (password.length < 6) {
      errors.push({ password: 'Password must be at least 6 characters' });
    }
    if (errors.length > 0) {
      res.send({
        success: false,
        errors
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ email: 'Email already exists' });
          res.send({
            success: false,
            errors
          });
        } else {
          const newUser = new User({
            firstName,
            lastName,
            email,
            password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  user.password = undefined;
                  res.send({ success: true, user });
                })
                .catch(err => res.status(422).json(err));
            });
          });
        }
      });
    }
  },
  login: function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];
    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        errors.push({ email: 'Email not registered' });
        return res.json({ success: false, errors });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800
          });
          console.log(token);
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        } else {
          errors.push({ password: 'Incorrect password' });
          return res.json({ success: false, errors });
        }
      });
    });
  },
  findUserData: function (req, res) {
    User.findById(req.user._id)
      .then(user => {
        user.password = undefined;
        res.json({ success: true, user });
      })
      .catch(err => res.status(422).json(err));
  },
  saveUserData: function (req, res) {
    User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true })
      .then(user => {
        user.password = undefined;
        res.json({ success: true, user });
      })
      .catch(err => res.status(422).json(err));
  },
  allocationCalc: function (req, res) {
    User.findById(req.user._id)
      .then(userResp => {
        const profileData = userResp.profileData;
        console.log(profileData);
        const userArray = Object.values(profileData);
        // .map(i => profileData[i]);
        const profileArray = Object.keys(profileData);
        // .map(i => profileData[i]);
        console.log('userArray: ' + userArray);
        console.log('profileArray: ' + profileArray);
        const SvERatio = profileData.socialVenvironmental / 6;
        const portions = [];
        const allocationsTemp = [];
        const allocationsObj = {};
        for (let i = 1; i < userArray.length; i++) {
          if (i < 8) {
            portions.push(userArray[i] * SvERatio);
          } else {
            portions.push(userArray[i] * (1 - SvERatio));
          }
        }
        charities.charities.forEach(element => {
          const tempDiff = Math.abs(element.localVglobal - userArray[1]) + Math.abs(element.shortVlong - userArray[2]);
          if (allocationsTemp.filter(e => e.category === element.category).length === 0) {
            allocationsTemp.push({
              name: element.name,
              category: element.category,
              diff: tempDiff
            });
          }
          if (allocationsTemp.some(e => e.category === element.category && e.diff > tempDiff)) {
            for (let i = 0; i < allocationsTemp.length; i++) {
              if (allocationsTemp[i].category === element.category) {
                allocationsTemp[i].name = element.name;
                allocationsTemp[i].diff = tempDiff;
                break;
              }
            }
          }
          allocationsTemp.forEach(element => {
            switch (element.category) {
              case 'pollution':
                element.portion = portions[0];
                allocationsObj.pollution = element;
                break;
              case 'habitat':
                element.portion = portions[1];
                allocationsObj.habitat = element;
                break;
              case 'climateChange':
                element.portion = portions[2];
                allocationsObj.climateChange = element;
                break;
              case 'basicNeeds':
                element.portion = portions[3];
                allocationsObj.basicNeeds = element;
                break;
              case 'education':
                element.portion = portions[4];
                allocationsObj.education = element;
                break;
              case 'globalHealth':
                element.portion = portions[5];
                allocationsObj.globalHealth = element;
                break;
              default: console.log('Invalid portion operation');
            }
          });
        });
        console.log('allocationsObj: ' + JSON.stringify(allocationsObj));
        console.log('userArray[1]: ' + userArray[1]);
        // if (userArray[1] === Number) {
        console.log('user: ' + req.user._id);
        console.log('profileData: ' + profileData);
        User.findOneAndUpdate(
          { _id: req.user._id },
          { $set:
            {
              profileData: profileData,
              allocations: allocationsObj
            }
          },
          { new: true }
        )
          .then(user => {
            user.password = undefined;
            res.json({ success: true, user });
          })
          .catch(err => res.status(422).json(err));
      }
      // }
      );
  }
};
