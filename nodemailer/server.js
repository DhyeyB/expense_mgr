const nodemailer = require('nodemailer');

function sendmail(req) {
  //step 1
  var transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '80b722dbe9f3f4',
      pass: '15f14f15db1a9b',
    },
  });

  //step 2
  let mailOptions = {
    from: 'abhishekc@zignuts.com',
    to: req.body.emailaddress,
    // cc: 'abhishek2026@gmail.com',
    // bcc: 'abhishek0712@gmail.com',
    subject: 'Testing Purpose',
    text: 'Thank You For SignUp! Welcome to Expense Manager.',
  };

  //step 3
  transport.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error Occurs: ', err);
    } else {
      console.log('Email sent!!');
    }
  });
}

module.exports = sendmail;
