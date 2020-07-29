const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'refri.track@gmail.com',
    pass: process.env.EMAIL_PASS 
  }
});

function mailOptions (email,item){
    let mailOptions = {
        from: 'test@something.com',
        to: `${email}`,
        subject: `Your ${item} is about to expire!`,
        text: `Your ${item} will expire in two days!`
      };
      return mailOptions;
}


function sendMail(email,item){
    transporter.sendMail(mailOptions(email,item), function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = sendMail;
