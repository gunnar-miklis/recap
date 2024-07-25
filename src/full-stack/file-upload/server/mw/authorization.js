import { expressjwt as jwt } from 'express-jwt';

function getTokenFromHeader(req) {
  if (req.header.authorization && req.header.authorization.split(' ')[0] === 'Bearer') {
    const authToken = req.header.authorization.split(' ')[1];
	return authToken;
  } else {
    return null;
  }
}

export const authorization = jwt({
  secret: process.env.JWT_TOKEN_SECRET,
  algorithm: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeader,
});
