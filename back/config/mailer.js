const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "houseofdev2023@gmail.com",
    pass: "bxmfdylpohzlwvjb",
  },
});

transporter.verify().then(() => {
  console.log("ready for send mails");
});

module.exports = transporter;



