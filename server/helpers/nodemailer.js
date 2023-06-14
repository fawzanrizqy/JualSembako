const nodemailer = require("nodemailer");
const { User, Log } = require("../models/index");

async function Mail(email) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cubestrike77@gmail.com",
      pass: "jnugcrvbyaelnujz",
    },
  });

  // send mail with defined transport object
  let detail = {
    from: '"JualSembako" <fawzan@stie-mce.ac.id>', // sender address
    to: `fawzan.rizqy29@gmail.com`, // list of receivers
    subject: "Asking for an access", // Subject line
    html: `hey this is my email: ${email}  , can you give me access to this app?<br> <b>regards, ${email}</b>`, // html body
  };

  mailTransporter.sendMail(detail, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email has been sent");
    }
  });
}

module.exports = Mail;
