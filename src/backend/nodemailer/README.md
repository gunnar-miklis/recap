# NODEMAILER

> Sent emails from the backend via NodeMailer.

## Procedure

1. **Receive** data (email address of the recipient, subject and message).
2. Create a new email layout with a custom class (**email-templates**).
3. Call the mailer module (**nodemailer**) to send the email.

### Email Templates (OOP)

- To provide provide a concise way and ensure resuability for creating a proper layout.
- Defines the basic configuration for nodemailer (`from`, `to`, `subject`, `text`, `html`).
- Different html layouts (`Layouted Email`) can be easily created on top of the basic configuration (`Default Email`).
- This ensures, that the basic nodemailer functionality will work in every case, even if the appearance or data of the e-mail is different.

## nodemailer

- `config/options`-object: set `host: smtp.provider.com`, `port: 587`, `auth: {user, pass}` (real email credentials of the **sender**).
- (Optional: inlcude attachments.)
- `.createTransport(configs)` that `.sendMail( email message )`.
- Return the results of the transport (accapted/rejected, messageId, etc.).

### nodemailer provides a test environment

- Instead providing real email credentials and configs, `.createTestAccount()` can be used to mock email credentials (fake email adress and password) and set default configs (`smtp.host`, `smtp.port`), for testing purposes.
- Those emails actually never arrive. They will only be available temporary inside the test environment provided by **[https://ethereal.email](https://ethereal.email)**.

## Endpoints

#### Base URL: `/api/v1`

| method | uri            | request                                       |
| ------ | -------------- | --------------------------------------------- |
| POST   | /sent/default  | email address **recipient**, subject, message |
| POST   | /sent/layouted | email address **recipient**, subject, message |
