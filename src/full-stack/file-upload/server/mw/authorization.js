import { expressjwt as jwt } from 'express-jwt';

function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const authToken = req.headers.authorization.split(' ')[1];
    return authToken;
  } else {
    return null;
  }
}

export const authorization = jwt({
  secret: process.env.JWT_TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeader,
});
