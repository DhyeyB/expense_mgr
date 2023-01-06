//require files
const express = require('express');
const route = express.Router();

const controller = require("../controllers/contoller");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const addTranscController = require("../controllers/addTranscController");
const addAccountController = require("../controllers/addAccountController");
const addMemberController = require("../controllers/addMemberController");
const accDetailsContolller = require("../controllers/accDetailsContolller");
const {sessionChecker, userChecker, transcChecker} = require('../middleware/middleware');
const { check } = require("express-validator");


//get route for start page
route.get('/', controller.home);

//get & post routes for signup page
route.get('/signup', signupController.getsignup);
route.post('/signup', signupController.validation, signupController.postsignup);

//get & post routes for login page
route.get('/login', loginController.getlogin);
route.post('/home', loginController.postlogin);

//get route for gesture page
route.get('/gesture', controller.gesture);

//get route for permission page
route.get('/permissionRejected', controller.permission);

//get & post routes for home page
route.get('/home', sessionChecker,addAccountController.gethome);
route.post('/addaccount', sessionChecker, addAccountController.validation, addAccountController.postAddAccount);
route.get('/update-account/:id', sessionChecker, userChecker, addAccountController.getUpdateAccount);
route.post('/update-account/:id', sessionChecker, userChecker, addAccountController.postUpdateAccount);
route.get('/delete/:id', sessionChecker, userChecker, addAccountController.getDelete);

//get route for logout
route.get('/logout', controller.logout);

//get route for acc-details page
route.get('/acc-details/:id', sessionChecker, userChecker, accDetailsContolller.getAccDetails);

//get & post routes transaction
route.get('/addtransc/:id', sessionChecker, userChecker, addTranscController.getAddTransc);
route.post('/addtransc/:id', sessionChecker, userChecker, addTranscController.validation, addTranscController.postAddTransc);
route.get('/update-transc/:id', sessionChecker, transcChecker, addTranscController.getUpdateTransc);
route.post('/update-transc/:id', sessionChecker, transcChecker, addTranscController.postUpdateTransc);
route.get('/transaction/delete/:id', sessionChecker, transcChecker, addTranscController.getDeleteTransc);

//get & post routes member
route.get('/add-member/:id', sessionChecker, userChecker, addMemberController.getAddMember);
route.post('/add-member/:id', sessionChecker, userChecker, addMemberController.postAddMember);
route.get('/add-member/delete/:acc_id/:id', addMemberController.getDeleteMember);

//route export
module.exports = route;