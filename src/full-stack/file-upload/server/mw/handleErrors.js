export class ClientInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ClientInputError';
  }
}
export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'JwtError';
  }
}
export class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}
export class CloudinaryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CloudinaryError';
  }
}

export default function handleErrors(err, req, res, next) {
  // NOTE: log errors
  console.error('ERROR NAME :>> ', err.name);
  console.error('ERROR MESSAGE :>> ', err.message);
  console.error('ERROR PATH :>> ', req.path);
  console.error('ERROR METHOD :>> ', req.method);

  // NOTE: handle specific errors
  if (err.name === 'ClientInputError') {
    if (err.message === 'Route does not exist') {
      res.status(404).json({ error: 'This route does not exist.' });
    } else if (err.message === 'Provide username/password') {
      res.status(400).json({ error: 'Provide a username and a password.' });
    } else if (err.message === 'PW requirements') {
      res.status(400).json({ error: 'Password requirements: num, upper/lower case, +6 chars.' });
    } else if (err.message === 'Username already exist') {
      res.status(400).json({ error: 'This username already exist.' });
    } else if (err.message === 'Credentials') {
      res.status(400).json({ error: 'Wrong credentials.' });
    } else {
      res.status(400).json({ error: 'Unable to process the request.' });
    }
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `Authorization failed. ${err.message}` });
  } else if (err.name === 'DatabaseError') {
    if (err.message === 'no user created') {
      res.status(500).json({ error: 'Failed to create a new user.' });
    } else if (err.message === 'Connection error') {
      res.status(503).json({ error: 'Service unavailable. Database connection issues.' });
    } else {
      res.status(500).json({ error: 'Unexpected Database Error.' });
    }
  } else if (err.name === 'CloudinaryError') {
    if (err.message === 'no file') {
      res.status(400).json({ error: 'Upload Error: No file received.' });
    } else if (err.message === 'got file but not uploaded') {
      res.status(500).json({ error: 'Upload Error: File received but not uploaded.' });
    } else if (err.message === 'userId/avatarUrl missing') {
      res.status(400).json({ error: 'Upload Error: userId or avatar url missing.' });
    } else if (err.message === 'not deleted') {
      res.status(400).json({ error: 'Delete Error: File not deleted.' });
    } else {
      res.status(500).json({ error: 'Unexpected File Error.' });
    }
  } else {
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}
