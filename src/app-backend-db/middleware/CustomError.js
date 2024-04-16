export default class CustomError extends Error {
	constructor(message, statusCode, details) {
		super(message);
		this.statusCode = statusCode;
		this.details = details || null;
	}
	printError() {
		return `${this.message}${this.details ? ', ' + this.details : ''}`;
	}
}
