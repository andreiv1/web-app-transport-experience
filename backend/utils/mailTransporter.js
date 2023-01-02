var nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: "smtp-relay.sendinblue.com",
    auth: {
        user: 'andrei.mike91@gmail.com',
        pass: 'nXZzm0vaydJpMIqr',
    },
    secure: false,
});

module.exports = mailTransporter;