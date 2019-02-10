import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendEmailHTTPS = functions.https.onCall((data, context) => {
    let html = '<h1>The following damage was reported</h1>' 
                + '<p><b>Summary:</b> '+data.summary+'</p>'
                + '<p><b>Start Date:</b> '+data.startDate+'</p>'
                + '<p><b>Product:</b> '+data.product+'</p>'
                + '<p><b>Quantity:</b> '+data.quantity+'</p>'
                + '<p><b>Customer:</b> '+data.customer+'</p>'
                + '<p><b>Description:</b> '+data.description+'</p>'
                + '<p><b>Comments:</b> '+data.comments+'</p>'
                + '<img src='+data.image+'></img>';
    const mailOptions = {
        to: 'mareike.thurau@gmail.com',
        subject: `Damage report by `+ data.user,
        html: html
        };
    mailTransport.sendMail(mailOptions);
})
