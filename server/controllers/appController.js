const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const { Charities, Transactions, User } = require("../models");

// Defining methods for the foodController
module.exports = {
    register: function (req, res) {
        const { firstName, lastName, email, password, password2 } = req.body;
        let errors = [];
      
        if(!firstName) {
            errors.push({ firstName: 'Please enter your first name.' });
        }
        if(!lastName) {
            errors.push({ lastName: 'Please enter your last name.' });
        }
        if(!email) {
            errors.push({ email: 'Please enter a valid email.' });
        }
        if(!password) {
            errors.push({ password: 'Password cannot be empty.' });
        }
        if (password != password2) {
          errors.push({ password2: 'Passwords do not match' });
        }
        if (password.length < 6) {
          errors.push({ password: 'Password must be at least 6 characters' });
        }
        if (errors.length > 0) {
          res.send( {
            success: false,
            errors
          });
        } else {
          User.findOne({ email: email }).then(user => {
            if (user) {
              errors.push({ email: 'Email already exists' });
              res.send( {
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
    login: function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({
          email: email
        }).then(user => {
          if (!user) {
            return res.json({success: false, msg: 'user not found'});
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
              })
            } else {
              return res.json({success: false, msg: 'Wrong Password'})
            }
          });
        });
    },
    findUserData: function(req, res) {
        User.findById(req.user._id)
        .then(user => {
            user.password = undefined;
            res.json({ success: true, user })
        })
        .catch(err => res.status(422).json(err));
    },
    saveUserData: function(req, res) {
        User.findOneAndUpdate({ _id: req.user._id },{$set:req.body})
        .then(user => {
            user.password = undefined;
            res.json({ success: true, user })
        })
        .catch(err => res.status(422).json(err));
    }
};
