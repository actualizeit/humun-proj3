/* eslint-disable handle-callback-err */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const charities = require('./../controllers/charities');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { Charities, Transactions, User } = require('../models');
const pwResetSecret = 'passwordresetsecret';

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
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              initialSetup: user.initialSetup
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
    const profileData = req.user.profileData;
    console.log('==================');
    console.log('input', profileData);
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
    for (let i = 4; i < userArray.length; i++) {
      if (i < 7) {
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
  },
  resetPW: function (req, res) {
    const errors = [];
    const decoded = jwt.decode(req.body.token);
    if (!decoded) {
      errors.push({ token: 'Password reset token has expired or is invalid.' });
      return res.json({ success: false, errors });
    }
    User.findOne({ email: decoded.email })
      .then(user => {
        const { password, password2, token } = req.body;
        if (!user || (token !== user.pwResetToken)) {
          errors.push({ token: 'Password reset token has expired or is invalid. <a href="/reset">Send Reset Email</a>' });
          return res.json({ success: false, errors });
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
          return res.json({ success: false, errors });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              User.findOneAndUpdate({ email: decoded.email }, { password: hash })
                .then(user => {
                  res.json({ success: true });
                });
            });
          });
        }
      });
  },
  getPwResetToken: function (req, res) {
    const production = 'https://humun.herokuapp.com/reset/';
    const development = 'http://localhost:3000/reset/';
    const url = (process.env.NODE_ENV ? production : development);
    const token = jwt.sign(req.body, pwResetSecret, {
      expiresIn: 3600
    });
    User.findOneAndUpdate(req.body, { $set: { pwResetToken: token } }, { new: true })
      .then(user => {
        // async..await is not allowed in global scope, must use a wrapper
        async function main () {
          // create reusable transporter object using the default SMTP transport
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.humunEmail, // generated ethereal user
              pass: process.env.humunPassword // generated ethereal password
            }
          });

          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: 'humun.reset@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Humun Password Reset', // Subject line
            html: `<b>Click the below link to reset your password</b><p>Link: ${url}${user.pwResetToken}</p>` // html body
          });
        }
        if (user) {
          main().catch(console.error).then(res.json({ success: true }));
        } else {
          const errors = [];
          errors.push({ email: 'Email not found' });
          return res.json({ success: false, errors });
        }
      })
      .catch(err => res.status(422).json(err));
  }
};
