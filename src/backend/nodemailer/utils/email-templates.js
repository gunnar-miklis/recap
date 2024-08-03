export class DefaultEmail {
  constructor(emailAddress, subject, message) {
    this.from = 'Nodemailer: Sender <sender@email.com>';
    this.to = `Nodemailer: Recipient <${emailAddress}>`;
    this.subject = `Nodemailer: ${subject}`;
    this.text = message;
    this.html = this.formatText();
  }
  formatText() {
    return `
      <header>
        <h1>Nodemailer Test </h1>
      </header>
      <main>
        <h2>Message </h2>
        <p>${this.text}</p>
      </main>
      <footer>
        <p>Best regards </p>
		<p>Awesome Dev Dude</p>
      </footer>
    `
      .replace(/[\t\n]/g, '')
      .replace(/\s{2,}/g, '');
  }
}

export class LayoutedEmail extends DefaultEmail {
  constructor(emailAddress, subject, message) {
    super(emailAddress, subject, message);
  }
  formatText() {
    return `
    <html lang="en">
      <head>
        <meta http–equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
	  <div style="
          background-color: #212121;
          color: #f9f9f9;
          font-family: 'Courier New', Courier, monospace;
          display: flex;
          flex-direction: column;
          gap: 1rem;
		  padding: 1rem;
        ">
        <header style="border: 1px solid #fefefe; padding: 1rem">
          <h1>Nodemailer Test</h1>
        </header>
        <main style="border: 1px solid #fefefe; padding: 1rem">
          <h2>Message</h2>
          <p>${this.text}</p>
        </main>
        <footer style="border: 1px solid #fefefe; padding: 1rem">
          <p>Best regards</p>
          <p><strong>Awesome DevPerson</strong></p>
        </footer>
		</div>
      </body>
    </html>
    `
      .replace(/[\t\n]/g, '')
      .replace(/\s{2,}/g, '');
  }
}
