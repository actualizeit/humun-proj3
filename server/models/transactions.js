const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number },
    payPal: { type: String }
});

const Transactions = mongoose.model('Transactions', transactionsSchema);

module.exports = Transactions;