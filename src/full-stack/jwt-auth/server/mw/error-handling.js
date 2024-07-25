export default function handleErrors(err, req, res, next) {
  // log errors
  console.log('NAME :>> ', err.name);
  console.log('MESSAGE :>> ', err.message);
  console.error('REQ.METHOD', req.method);
  console.error('REQ.PATH', req.path);
  //   console.log('ERROR :>> ', err);

  // send error message to the client
  if (err.message === 'Route does not exist') {
    res.status(400).json({ error: 'This route does not exist' });
  } else if (err.message === 'Provide a username and a password') {
    res.status(400).json({ error: 'Provide a username and a password' });
  } else if (err.message === 'PW needs: number, uppercase, lowercase, 6 characters') {
    res.status(400).json({ error: 'PW needs: number, uppercase, lowercase, 6 characters' });
  } else if (err.message === 'Username already exist') {
    res.status(400).json({ error: 'Username already exist' });
  } else if (err.message === 'User does not exist') {
    res.status(400).json({ error: 'User does not exist' });
  } else if (err.message === 'Wrong credentials') {
    res.status(400).json({ error: 'Wrong credentials' });
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'JWT: ' + err.inner.message });
  } else if (err.message.includes('ECONNREFUSED')) {
    res.status(500).json({ error: 'Unable to connect to the Database' });
  } else if (err.name === 'MongooseError') {
    res.status(500).json({ error: 'Database Error' });
  } else if (err.name.includes('Mongoose')) {
    res.status(500).json({ error: 'Database Error' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
