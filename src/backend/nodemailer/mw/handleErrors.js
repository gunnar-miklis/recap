export class ClientError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ClientError';
  }
}
export class MailError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MailError';
  }
}

export default function handleErrors(err, req, res, next) {
  // NOTE: log errors
  console.error('ERROR NAME :>> ', err.name);
  console.error('ERROR MESSAGE :>> ', err.message);
  console.error('ERROR PATH :>> ', req.path);
  console.error('ERROR METHOD :>> ', req.method);

  // NOTE: handle specific errors
  if (err.name === 'ClientError') {
    if (err.message === 'Route does not exist') {
      res.status(404).json({ error: 'This route does not exist.' });
    } else {
      res.status(400).json({ error: `ClientError: ${err.message}` });
    }
  } else if (err.name === 'MailError') {
    res.status(401).json({ error: `MailError: ${err.message}` });
  } else {
    res.status(500).json({ error: `Internal Server Error: ${err.message}` });
  }
}
