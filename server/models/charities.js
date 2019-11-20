const mongoose = require('mongoose');

const CharitiesSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Charities = mongoose.model('Charities', CharitiesSchema);

module.exports = Charities;
