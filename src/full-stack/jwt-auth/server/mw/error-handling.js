// Database (connection) error
// JWT: no token found, invalid token, invalid signature
// Route does not exist
// Internal Error (unexpected Error)

export default function handleErrors(err, req, res, next) {
  console.log('NAME :>> ', err.name);
  console.log('MESSAGE :>> ', err.message);
  console.log('ERROR :>> ', err);

  if (err.message.includes('ECONNREFUSED')) {
    res.status(500).json({ error: 'Unable to connect to the Database.' });
  } else if (err.name.includes('Mongoose')) {
    res.status(500).json({ error: 'Database Error' });
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'JWT: ' + err.inner.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
