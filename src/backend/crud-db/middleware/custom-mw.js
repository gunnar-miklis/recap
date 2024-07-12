export default function addTimestampToLog(req, res, next) {
  const date = new Date(Date.now());
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hourCycle: 'h24',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'shortOffset',
  };
  console.log(date.toLocaleString('en-DE', options));
  next();
}
