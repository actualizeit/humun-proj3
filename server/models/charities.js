const mongoose = require('mongoose');

const CharitiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Array, required: true },
  shortVlong: { type: Number, required: true },
  localVglobal: { type: Number, required: true },
  SvLPortion: { type: Number },
  LvGPortion: { type: Number }
});

const Charities = mongoose.model('Charities', CharitiesSchema);

module.exports = Charities;
