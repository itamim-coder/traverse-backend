import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const sendOtp = async ({ email, subject, message, duration = 1 }) => {
//   try {
   
// };

const generateOtp = async () => {
  try {
    return `${Math.floor(1000 + Math.random() * 9000)}`;
  } catch (error) {
    throw error;
  }
};

export const otpHelper = {

  generateOtp
};
