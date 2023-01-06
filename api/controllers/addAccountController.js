//require files
const mongoose = require('mongoose');
const account = require('../models/account');
const user = require('../models/user');
const { check, validationResult } = require('express-validator');

//account validtion
const account_validation = () => [
  check('accountname', 'Enter accountname!').trim().notEmpty(),
];

//export code
module.exports = {
  //get request for home request
  gethome: async (req, res) => {
    //find accounts with logged in user details
    const result = await account.find({ userid: req.session._id });
    // account.find({ $or:[ {'userid':req.session._id}, {'members':req.session._id} ]}).exec();
    // .populate({path :'members', select: 'name'}).exec();
    //const result = await member.find({ userid:req.session._id}).populate({path :'members', select: 'name'}).exec();
    // const result = await account.aggregate([{ $lookup:({ from: 'member', localField: 'userid', foreignField: 'members', as: 'details'}) }]);

    //find userDetails based on session id
    userDetails = await user.findOne({ _id: req.session._id }).exec();
    var message = {
      flag: false,
      type: '',
      intro: '',
      message: '',
    };

    //render the view with three obj
    res.render('home', { result, userDetails, message });
  },

  //post request for add account
  postAddAccount: async (req, res) => {
    const err = validationResult(req);
    if (err.isEmpty()) {
      //create account
      account
        .create({
          _id: mongoose.Types.ObjectId(),
          accountname: req.body.accountname,
          ownership: req.session._id,
          userid: req.session._id,
        })
        .then((result) => {
          res.redirect('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //find accounts based on session id
      const result = await account.find({ userid: req.session._id });
      //find users based on session id
      const userDetails = await user.findOne({ _id: req.session._id }).exec();
      //null value validation
      var message = {
        flag: true,
        type: 'warning',
        intro: 'Value Error',
        message: 'Null values are not allowed !!',
      };
      //render the view with three obj
      res.render('home', { result, userDetails, message });
    }
  },

  //get request for update account
  getUpdateAccount: (req, res) => {
    const accountid = req.params.id;
    account
      .findOne({
        _id: accountid,
      })
      .exec()
      .then((result) => {
        //render the view with result obj
        res.render('update-account', { result });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  //post request for update account
  postUpdateAccount: (req, res) => {
    const accountid = req.params.id;
    account
      .updateOne(
        {
          _id: accountid,
        },
        {
          $set: { accountname: req.body.accountname },
        }
      )
      .then(() => {
        res.redirect('/home');
      });
  },

  //get request for delete account
  getDelete: (req, res) => {
    const accountid = req.params.id;
    //delete account based on accountid
    account
      .deleteOne({ _id: accountid })
      .then((result) => {
        res.redirect('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  },
  validation: [account_validation()],
};
