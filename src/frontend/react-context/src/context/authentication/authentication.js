// mock verification
export default function verify(username, password) {
  let isVerfied = false;

  if (username === 'test' && password === '123') {
    isVerfied = true;
  } else {
    isVerfied = false;
  }

  return isVerfied;
}
