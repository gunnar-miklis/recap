export default function handleErrors(err, req, res, _next) {
  // console log errors
  console.log('ERROR NAME :>> ', err.name);
  console.log('ERROR MESSAGE :>> ', err.message);
  console.log('ERROR PATH :>> ', req.path);
  console.log('ERROR METHOD :>> ', req.method);

  // handle specific errors
  if (err.message === 'Route does not exist') {
    res.status(404).json({ error: 'This route does not exist.' });
  } else if (err.message === 'Provide username and password') {
    res.status(400).json({ error: 'Provide a username and a password.' });
  } else if (err.message === 'PW does not match requirements') {
    res.status(400).json({ error: 'Password requirements: num, upper/lower case, +6 chars.' });
  } else if (err.message === 'Username already exist') {
    res.status(400).json({ error: 'This username already exist.' });
  } else if (err.message === 'Database failed to create new user') {
    res.status(500).json({ error: 'Database failed to create a new user.' });
  } else if (err.message === 'Wrong credentials') {
    res.status(400).json({ error: 'Wrong credentials.' });
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.message });
  } else if (err.message === 'Database connection error') {
    res.status(503).json({ error: 'Service unavailable. Database connection error.' });
  } else if (err.message === 'Cloudinary: no file') {
    res.status(400).json({ error: 'Upload Error: No file received.' });
  } else if (err.message === 'Cloudinary: not uploaded') {
    res.status(500).json({ error: 'Upload Error: File received but not uploaded.' });
  } else if (err.message === 'userId or avatarUrl missing') {
    res.status(400).json({ error: 'Upload Error: userId or avatar url missing.' });
  } else {
    res.status(500).json({ error: 'Internal Server Error.' });
  }
}
