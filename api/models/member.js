const mongoose = require('mongoose');

//Schema for add transaction
const AddMemberSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  //refrence to user
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  //refrence to account
  accountid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'account' }],
});

module.exports = mongoose.model('member', AddMemberSchema);
