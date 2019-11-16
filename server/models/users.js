const mongoose = require('mongoose');

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
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
