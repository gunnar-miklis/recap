import nodemailer from 'nodemailer';
import { MailError } from '../mw/handleErrors.js';

export default async function mailer(email) {
  try {
    let mailConfig = {};

    if (process.env.NODE_ENV === 'production') {
      // sending real emails from A to B
      const emailAddress = process.env.EMAIL_ADDRESS;
      const password = process.env.EMAIL_PASSWORD;
      if (!emailAddress || !password) throw new MailError('No email found in ENV');

      email.from = `${emailAddress}`;
      mailConfig = {
        host: 'smtp.web.de',
        port: 587,
        secure: false,
        auth: {
          user: emailAddress,
          pass: password,
        },
      };
    } else {
      // sending emails in a test environment (those emails actually never arrive)
      const account = await nodemailer.createTestAccount();
      if (!account) throw new MailError('No test account created');

      email.from = `${account.user}`;
      mailConfig = {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      };
    }

    // add some attachments, maybe invoice.pdf, your_ticket.pdf or something like that
    email.attachments = [
      {
        filename: 'example-attachment.jpg',
        path: 'https://res.cloudinary.com/dyrcsywk9/image/upload/v1722435997/sample.jpg',
      },
    ];

    // sent mail
    const transporter = nodemailer.createTransport(mailConfig);
    const info = await transporter.sendMail(email);

    // quick access test emails via URL
    const testMessageUrl = nodemailer.getTestMessageUrl(info);
    if (testMessageUrl) console.log('Preview URL: ' + testMessageUrl);

    // send response
    let result = {};
    if (!!info.accepted.length) result.accepted = true;
    if (!!info.rejected.length) result.rejected = true;
    if (info.messageId) result.msgId = info.messageId;
    return result;
  } catch (error) {
    throw new MailError(error.message);
  }
}
