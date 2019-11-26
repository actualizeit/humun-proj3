const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  impactLoc: { type: Number },
  shortVlongTerm: { type: Number },
  socialVenvironmental: { type: Number },
  pollution: { type: Number },
  habitat: { type: Number },
  climateChange: { type: Number },
  basicNeeds: { type: Number },
  education: { type: Number },
  globalHealth: { type: Number },
  zipCode: { type: Number },
  charities: { type: Array },
  transaction: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transactions'
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
