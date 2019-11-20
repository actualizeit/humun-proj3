const mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    impact: { type: Number },
    shortVlongTerm: { type: Number },
    pollution: { type: Number },
    habitat: { type: Number },
    climateChange: { type: Number },
    basicNeeds: { type: Number },
    education: { type: Number },
    globalHealth: { type: Number },
    zipCode: { type: Number },
    transaction: [
        {
          type: Schema.Types.ObjectId,
          ref: "Transactions"
        }
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
