//require files
const transaction = require('../models/transaction');
const member = require('../models/member');
const account = require('../models/account');
const user = require('../models/user');

//export code
module.exports = {
  //get request for account details
  getAccDetails: async (req, res) => {
    let showTransaction;
    let showMember;
    let showAccountName;

    try {
      //find transaction by accountid
      showTransaction = await transaction
        .find({ accountid: req.params.id })
        .sort({ date: 'descending' })
        .exec();
    } catch (err) {
      return res.status(400).json({
        error: 'Erorr en transaction',
      });
    }
    try {
      showMember = await member.find({ accountid: req.params.id }).exec();
    } catch (err) {
      return res.status(400).json({
        error: 'Erorr en member',
      });
    }
    try {
      showAccountName = await account.findOne({ _id: req.params.id }).exec();
    } catch (err) {
      return res.status(400).json({
        error: 'Erorr en accountname',
      });
    }
    //find userid
    var userdetails = await user
      .findOne({ _id: showAccountName.ownership })
      .exec();

    //logic for balance in frontside

    let DebitAmount = 0;
    let CreditAmount = 0;
    let TotalAmount = 0;

    for (i = 0; i < showTransaction.length; i++) {
      var obj = showTransaction[i];
      if (obj['preferedtype'].localeCompare('Debit') == 0) {
        DebitAmount = Number(obj['addamount']) + DebitAmount;
      } else {
        CreditAmount = Number(obj['addamount']) + CreditAmount;
      }
      TotalAmount = CreditAmount - DebitAmount;
    }

    let record = {
      debit: DebitAmount,
      credit: CreditAmount,
      balance: TotalAmount,
      id: req.params.id,
    };

    //render the view with five obj
    res.render('acc-details', {
      showTransaction,
      showMember,
      showAccountName,
      record,
      userdetails,
    });
  },
};
