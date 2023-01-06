const mongoose = require('mongoose');

//Schema for add account
const AddAccountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  accountname: { type: String, required: true },
  ownership: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  //refrence to user
  userid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('account', AddAccountSchema);
