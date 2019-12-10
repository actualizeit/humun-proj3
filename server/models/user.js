const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pwResetToken: { type: String },
  emailToken: { type: String },
  emailSetUp: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  zipCode: { type: Number },
  profileData: {
    impactLoc: { type: Number, default: 3 },
    shortVlongTerm: { type: Number, default: 3 },
    socialVenvironmental: { type: Number, default: 3 },
    pollution: { type: Number, default: 33 },
    habitat: { type: Number, default: 33 },
    climateChange: { type: Number, default: 34 },
    basicNeeds: { type: Number, default: 33 },
    education: { type: Number, default: 33 },
    globalHealth: { type: Number, default: 34 }
  },
  allocations: {
    userSelected: {},
    pollution: {},
    habitat: {},
    climateChange: {},
    basicNeeds: {},
    education: {},
    globalHealth: {}
  },
  userSelectedInfo: {
    charityName: {},
    charityLink: {},
    ein: {},
    charityTagLine: {},
    charityCity: {},
    charityState: {},
    portion: { type: Number, default: 0 }
  },
  causesSetUp: { type: Boolean, default: false },
  impactsSetUp: { type: Boolean, default: false },
  transaction: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transactions'
    }
  ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
