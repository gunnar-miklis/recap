function logErrors(err, req, res, next) {
	console.error(err);
	next(err);
}

function invalidPath(req, res, next) {
	res.status(404).json({ error: 'This route does not exist' });
}

function handleClientErrors(err, req, res, next) {
	const { statusCode } = err;

	if (statusCode) {
		res.status(statusCode).json({ error: err.printError() });
	} else {
		next(err);
	}
}

function handleErrors(err, req, res, next) {
	res.status(500).json({ error: 'Internal Server Error' });
}

export { logErrors, invalidPath, handleClientErrors, handleErrors };
