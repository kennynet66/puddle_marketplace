const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

function createTransporter(config) {
  let transporter = nodemailer.createTransport(config);

  return transporter;
};

let configurations = ({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PWD
  }
});

const sendMail = async (messageOption) => {
  const transporter = await createTransporter(configurations);

  const info = await transporter.sendMail(messageOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info.response);
    }
  });
}

module.exports = { sendMail }