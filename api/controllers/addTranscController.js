//require files
const mongoose = require('mongoose');
const transaction = require('../models/transaction');
const { check, validationResult } = require('express-validator');

//transaction validation
const transc_validation = () => [
  check('date', 'Enter date!').trim().notEmpty(),
  check('preferedtype', 'Enter preferedtype').trim().notEmpty(),
  check('description', 'Enter description').trim().notEmpty(),
  check('addamount', 'Enter addamount').trim().notEmpty(),
];

//export code
module.exports = {
  //get request for add transaction
  getAddTransc: (req, res) => {
    let transcAdd = {
      id: req.params.id,
    };
    var message = {
      flag: false,
      type: '',
      intro: '',
      message: '',
    };
    //render the view with two obj
    res.render('add-transc', { transcAdd, message });
  },

  //post request for add transaction
  postAddTransc: async function (req, res) {
    const err = validationResult(req);
    if (err.isEmpty()) {
      let acc = mongoose.Types.ObjectId(req.body.tranractionAccoutId);
      //create transaction
      try {
        await transaction.create({
          _id: mongoose.Types.ObjectId(),
          date: req.body.date,
          preferedtype: req.body.preferedtype,
          description: req.body.description,
          addamount: req.body.addamount,
          accountid: acc,
        });
        res.redirect('/acc-details/' + req.body.tranractionAccoutId);
      } catch (error) {
        console.log(error);
      }
    } else {
      let transcAdd = {
        id: req.params.id,
      };
      //null values not allowed message
      var message = {
        flag: true,
        type: 'warning',
        intro: 'Value Error',
        message: 'Null values are not allowed !!',
      };
      //render the view with three obj
      res.render('add-transc', { transcAdd, message });
    }
  },

  //get request for update transaction
  getUpdateTransc: async function (req, res) {
    let result1 = await transaction.findById(req.params.id).exec();
    res.render('update-transc', { result1 });
  },

  //post request for update transaction
  postUpdateTransc: async (req, res) => {
    const transcid = req.params.id;
    let updtransc = await transaction.findById(req.params.id).exec();
    transaction
      .updateOne(
        {
          _id: transcid,
        },
        {
          //update transaction fields
          $set: {
            date: req.body.date,
            preferedtype: req.body.preferedtype,
            description: req.body.description,
            addamount: req.body.addamount,
          },
        }
      )
      .then(() => {
        res.redirect('/acc-details/' + updtransc.accountid);
      });
  },

  //get request for delete transaction
  getDeleteTransc: async function (req, res) {
    const transactionid = req.params.id;
    let result1 = await transaction.findById(req.params.id).exec();
    //delete transaction by id
    transaction
      .deleteOne({ _id: transactionid })
      .then((result) => {
        res.redirect('/acc-details/' + result1.accountid);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  validation: [transc_validation()],
};
