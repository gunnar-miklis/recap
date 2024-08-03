import express from 'express';
import { ClientError } from '../mw/handleErrors.js';
import mailer from '../utils/nodemailer.js';
import { LayoutedEmail, DefaultEmail } from '../utils/email-templates.js';

// router instance
const router = express.Router();

router.post('/sent/default', async (req, res, next) => {
  try {
    const { emailTo, subject, message } = req.body;
    if (!emailTo || !subject || !message)
      throw new ClientError('Provide an email, subject and message');

    const defaultEmailTemplate = new DefaultEmail(emailTo, subject, message);
    const defaultEmailResults = await mailer(defaultEmailTemplate);
    res.status(200).json({ defaultEmailResults });
  } catch (error) {
    next(error);
  }
});

router.post('/sent/layouted', async (req, res, next) => {
  try {
    const { emailTo, subject, message } = req.body;
    if (!emailTo || !subject || !message)
      throw new ClientError('Provide an email, subject and message');

    const layoutedEmailTemplate = new LayoutedEmail(emailTo, subject, message);
    const layoutedEmailResults = await mailer(layoutedEmailTemplate);
    res.status(200).json({ layoutedEmailResults });
  } catch (error) {
    next(error);
  }
});

export default router;
