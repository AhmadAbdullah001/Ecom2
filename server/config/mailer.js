const nodemailer = require('nodemailer')

// Configure transporter using environment variables
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmadhashmi1304@gmail.com', // your Gmail address
    pass: 'eohs zoxb roui ncfq'           // your Gmail password or app-specific password
  }
});

module.exports = transporter
