//require files
const bcrypt = require('bcrypt');
const User = require('../models/user');

//export code
module.exports = {
  //get request for login
  getlogin: (req, res) => {
    var message = {
      flag: false,
      type: '',
      intro: '',
      message: '',
    };
    //render the view with validation message obj
    res.render('login', { message });
  },

  //post request for login
  postlogin: (req, res) => {
    //find user with email
    User.find({ emailaddress: req.body.emailaddress })
      .then((result) => {
        //if auth fail
        if (result.length < 1) {
          message = {
            flag: true,
            type: 'warning',
            intro: 'Auth',
            message: 'Authentication Fail',
          };
          //render the view with validation message obj
          res.render('login', { message });
        }
        //compare hash password for verification
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (err, success) => {
            //if any error in password
            if (err) {
              message = {
                flag: true,
                type: 'warning',
                intro: 'Error',
                message: 'Something Wrong In Password!',
              };
              //render the view with validation message obj
              res.render('login', { message });
            }
            //if success then create session
            if (success) {
              let session = req.session;
              session._id = result[0]._id;
              session.email = result[0].emailaddress;
              return res.redirect('/home');
            }
            message = {
              flag: true,
              type: 'warning',
              intro: 'Error',
              message: 'Something Wrong In Email or Password!',
            };
            return res.render('login', { message });
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};
