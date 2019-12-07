/* eslint-disable handle-callback-err */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { Charities, Transactions, User } = require('../models');

const pwResetSecret = 'passwordresetsecret';

// Defining methods for the foodController
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
    User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body })
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
