const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const nodemailer = require('nodemailer');

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
    User.findOneAndUpdate({ _id: req.user._id }, { $set: req.body })
      .then(user => {
        user.password = undefined;
        res.json({ success: true, user });
      })
      .catch(err => res.status(422).json(err));
  },
  resetPW: function (req, res) {
    const token = jwt.sign({ email: 'jeffswanner93@gmail.com' }, pwResetSecret, {
      expiresIn: 3600
    });
    User.findOneAndUpdate({ email: 'jeffswanner93@gmail.com' }, { $set: { pwResetToken: token } }, { new: true })
      .then(user => {
        console.log(user);
        // async..await is not allowed in global scope, must use a wrapper
        async function main () {
          // create reusable transporter object using the default SMTP transport
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'humun.reset@gmail.com', // generated ethereal user
              pass: 'nubkyp-cagmu3-moxmEq' // generated ethereal password
            }
          });

          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: 'humun.reset@gmail.com', // sender address
            to: 'jeffswanner93@gmail.com', // list of receivers
            subject: 'Humun Password Reset', // Subject line
            html: `<b>Reset Password: http://localhost:3001/api/user/${user.pwResetToken}</b>` // html body
          });

          console.log(info);
        }

        main().catch(console.error);
      })
      .catch(err => res.status(422).json(err));
  }
};
