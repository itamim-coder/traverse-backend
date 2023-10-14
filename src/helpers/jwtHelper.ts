import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/apiError';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
// const verifyToken = (token: string) => {
//   try {
//     const isVerified = verify(token, config.jwt.secret);
//     return isVerified as any;
//   } catch (error) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
//   }
// };

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

const decodeToken = (token: string): JwtPayload => {
  return jwt.decode(token) as JwtPayload
}


export const JwtHelper = {
  // verifyToken,
  createToken,
  decodeToken
};
