//require files
const member = require('../models/member');
const mongoose = require('mongoose');
const user = require('../models/user');
const account = require('../models/account');

//export code
module.exports = {
  //get request for add member
  getAddMember: (req, res) => {
    let memberAdd = {
      id: req.params.id,
    };
    var message = {
      flag: false,
      type: '',
      intro: '',
      message: '',
    };
    //render the view with three obj
    res.render('add-member', { memberAdd, message });
  },

  //post request for add member
  postAddMember: async (req, res) => {
    //find user by email
    let finduser = await user.findOne({ emailaddress: req.body.emailaddress });
    if (finduser) {
      //find members releted to that mail
      let findMember = await member.findOne({ userid: finduser._id });
      if (findMember) {
        let findMember1 = await member.findOne({
          userid: finduser._id,
          accountid: { $in: req.params.id },
        });
        if (findMember1) {
          let memberAdd = {
            id: req.params.id,
          };
          //member exist validation
          var message = {
            flag: true,
            type: 'warning',
            intro: 'Value Error',
            message: 'Member Exist',
          };
          //render the view with three obj
          res.render('add-member', { memberAdd, message });
        }
        //update member and push it in to accountid
        else {
          await member.updateOne(
            { userid: finduser._id },
            { $push: { accountid: req.params.id } }
          );
          await account.updateOne(
            {
              _id: req.params.id,
            },
            {
              $push: { userid: finduser._id },
            }
          );
          res.redirect('/acc-details/' + req.params.id);
        }
      }
      //else member create
      else {
        await member.create({
          _id: mongoose.Types.ObjectId(),
          name: finduser.firstname,
          accountid: req.params.id,
          userid: finduser._id,
        });
        await account.updateOne(
          {
            _id: req.params.id,
          },
          {
            $push: { userid: finduser._id },
          }
        );
        res.redirect('/acc-details/' + req.params.id);
      }
    } else {
      let memberAdd = {
        id: req.params.id,
      };
      //user not exist validation
      var message = {
        flag: true,
        type: 'warning',
        intro: 'Value Error',
        message: 'User does not exist',
      };
      //render the view with three obj
      res.render('add-member', { memberAdd, message });
    }
  },

  //get request for delete member
  getDeleteMember: async (req, res) => {
    const accId = req.params.acc_id;
    const memberid = req.params.id;
    //find member by memberid
    let findMember = await member.findById(memberid);

    await member.updateOne(
      { _id: memberid },
      { $pull: { accountid: { $eq: accId } } }
    );

    await account.updateOne(
      { _id: accId },
      { $pull: { userid: { $eq: findMember.userid } } }
    );

    res.redirect('/acc-details/' + accId);
  },
};
