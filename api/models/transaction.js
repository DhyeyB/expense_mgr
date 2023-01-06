const mongoose = require('mongoose');

//Schema for add transaction
const AddTransactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, required: true },
  preferedtype: { type: String, required: true },
  description: { type: String, required: true },
  addamount: { type: String, required: true },
  // refrence to account
  accountid: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },
});

module.exports = mongoose.model('transaction', AddTransactionSchema);
