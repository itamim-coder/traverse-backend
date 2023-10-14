/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import { JwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';

const prisma = new PrismaClient();
const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload;

  let isUserExist: any;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error('User does not exist');
  }

  if (user) {
    isUserExist = user;
  }

  if (isUserExist && isUserExist.password !== password) {
    throw new Error('Password is incorrect');
  }
  const payloadData = {
    name: isUserExist!.name,
    email: isUserExist!.email,
    role: isUserExist!.role,
    contactNo: isUserExist!.contactNo
  };

  //   create token
  const accessToken = JwtHelper.createToken(
    payloadData,

    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const decodedToken = JwtHelper.decodeToken(token);
  console.log(decodedToken)
  const { email, role, contactNo, name } = decodedToken;
  if (!email || !role || contactNo || !name) {
    throw new Error('Invalid token');
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error('User does not exist');
  }
  const payloadData = {
    name: name,
    email: email,
    role: role,
    contactNo: contactNo
  };
  const newAccessToken = JwtHelper.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken
  };
};
export const authServices = { loginUser, refreshToken };
