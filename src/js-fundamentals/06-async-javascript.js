// asynchronous JavaScript
//	* js is single-threaded, one thing after another
//	* to perform intensive operations that can potentially block the main thread we use async

// NOTE: Promise:
//	* a value that will eventually become available, either complition (resolve) or failure (reject), the intial state is "pending"
//	* promises are used to schedule tasks without blocking the main thread
//	* code wrapped in a Promise runs asynchronously (outside the main thread)
//	* can only be settled once
//	* a promise returns resolve()/reject(), to "cosume" it (extract the values) we use .then()/.catch()/await
const pendingPromise = new Promise((resolve, reject) =>
	true ? resolve('success') : reject('failed'),
);
const pendingPromise2 = new Promise((resolve, reject) =>
	true ? resolve('success') : reject('failed'),
);
const pendingPromise3 = new Promise((resolve, reject) =>
	false ? resolve('success') : reject('failed'),
);

// settle 1 promise
pendingPromise
	.then((result) => console.log('Promise settled, result:', result))
	.catch((e) => console.error(e));

// settle "ALL" promises
// COMMENT: if one promise gets rejected, ALL will be rejected
//	* resolve ALL => 'ALL Promises settled, result: [ 'success', 'success', 'success' ]'
//	* reject 1 => 'Error: failed'
Promise.all([pendingPromise, pendingPromise2, pendingPromise3])
	.then((result) => console.log('ALL Promises settled, result:', result))
	.catch((e) => console.error('Error: ', e));

// settle "SOME" promises
// COMMENT: with async/await
//	* lets us write code as if it was "synchronous"
//	* "async" wrapps a function into a promise
//	* "await" pauses the function until the async operation is finished/settled, then resumes
(async () => {
	const allResults = [];

	try {
		// => success
		const result1 = await pendingPromise;
		allResults.push(result1);
		console.log('result :>> ', result1);

		// => success
		const result2 = await pendingPromise2;
		allResults.push(result2);
		console.log('result2 :>> ', result2);

		// fail => catch() => throw error
		const result3 = await pendingPromise3;
		allResults.push(result3);
		console.log('result3 :>> ', result3);
	} catch (e) {
		console.error(e); // => result3 = failed
	}

	console.log('async/await, allResult:', allResults); // => result1 + result2 = [success, success]
})();

// NOTE: mocking async behavior, set a delay for a promise
function randomTimer(timer) {
	if (!timer) timer = Math.floor(Math.random() * 3000 + 1000);

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(`Promise resolved after ${timer}s =>`), timer);
	});
}

// keyword "function"
async function asyncCall() {
	randomTimer()
		.then((result) => {
			console.log(result, 'asyncCall() done');
		})
		.catch((error) => console.error(error))
		.finally(() => console.log('=> asyncCall() finished')); // COMMENT: finally() runs last, once the promise is settled, regardless of its outcome.
}
asyncCall();

// anonymous function, (self invoke)
(async () => {
	try {
		const result = await randomTimer(1000);
		console.log(result, 'anonymous() done');
	} catch (error) {
		console.error(error);
	}
})();

// NOTE: fetch external, api data
(async () => {
	try {
		const response = await fetch('https://api.spacexdata.com/v4/launches');
		const responseJson = await response.json();
		const { name, date_utc: date } = responseJson[0];
		console.log(name, date.slice(0, 10)); // => FalconSat, 2006-03-24
	} catch (error) {
		console.error(error);
	}
})();
