import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/apiError';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
const verifyToken = (token: string, secret: Secret) => {
  try {
    const isVerified = verify(token, secret);
    return isVerified as any;
  } catch (error) {
    return new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }
};

const createToken = (payload: any, secret: Secret, expireTime: string): string => {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expireTime });
};

const decodeToken = (token: string): JwtPayload => {
  return jwt.decode(token) as JwtPayload;
};

export const JwtHelper = {
  verifyToken,
  createToken,
  decodeToken
};
