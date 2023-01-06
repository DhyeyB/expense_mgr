//require files
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoURI =
  'mongodb+srv://expense:manager@expense-mgr.iqf8f.mongodb.net/expense-mgr?retryWrites=true&w=majority';
const route = require('./api/routes/route');

//set up template engine
app.set('view engine', 'ejs');

//connect to database
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log('MongoDB Connected');
  });

//initialize static file
app.use(express.static('./assets'));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(bodyParser.urlencoded({ extended: true }));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: Date.now() + 30 * 86400 * 1000,
    },
  })
);

//initialize route
app.use('/', route);

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
  next();
});

//listening in server by port number
app.listen(7777, () => {
  console.log('Server started');
});
