const { permission } = require('../controllers/contoller');
const account = require('../models/account');
const transaction = require('../models/transaction');

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (req.session._id) {
    next();
  } else {
    res.redirect('/login');
  }
};

//middleware function to check for legitimate user
var userChecker = async (req, res, next) => {
  //find account by id
  let record = await account.findOne({ _id: req.params.id });
  let uid = false;
  record.userid.forEach((element) => {
    if (req.session._id == element._id) {
      uid = true;
    }
  });
  if (uid == true) {
    next();
  } else {
    res.render('permission');
  }
};

//middleware function to check for legitimate transaction Operation
var transcChecker = async (req, res, next) => {
  //find transaction based on id
  let record1 = await transaction.findOne({ _id: req.params.id });
  //find account based on id
  let record2 = await account.findOne({ _id: record1.accountid });
  let uid = false;
  record2.userid.forEach((element2) => {
    //if both match then process further
    if (req.session._id == element2) {
      uid = true;
    }
  });
  if (uid == true) {
    next();
  } else {
    res.render('permission');
  }
};

module.exports = { sessionChecker, userChecker, transcChecker };
