const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
); 
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendEmail = async (receiver, subject, message) => {
  console.log(receiver, subject, message);
  const accessToken = await oAuth2Client.getAccessToken(); 
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    logger: true,
    debug: true,
    auth: {
      type: "OAuth2",
      user: "pallavi@ncompass.inc",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "pallavi <pallavi@ncompass.inc>",
    to: receiver,
    subject: subject,
    text: message,
  };
  const result = await transport.sendMail(mailOptions);
  if (!result) {
    throw new Error("Email sending failed");
  }
  
};

module.exports = { sendEmail };

