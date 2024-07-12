export default function handleErrors(err, req, res, next) {
  console.error(err);
  const { cause } = err;
  if (cause) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
