import { PrismaClient } from '@prisma/client';
import { otpHelper } from '../../../helpers/otpHelper';
import config from '../../../config';
import { sendEmailHelper } from '../../../helpers/sendEmail';

const prisma = new PrismaClient();

const sendOtp = async (data: any): Promise<any> => {
  console.log(data);
  const { email } = data;
  const duration = 1;
  if (!(email)) {
    throw Error('Provide values for email, subject, message');
  }
  await prisma.userOtp.deleteMany({
    where: {
      email
    }
  });

  const generateOtp = await otpHelper.generateOtp();

  const mailOptions = {
    from: config.email,
    to: email,
    subject: 'Verify Your Email',
    html: `<p>For Verify Use this code </p> <p style="color:tomato; font-size:25px;"> ${generateOtp} </p> <p>Expire in ${duration}</p>`
  };

  await sendEmailHelper.sendEmail(mailOptions);
  const otpdata = {
    email: email,
    otp: generateOtp,
    expireAt: new Date(Date.now() + 3600000 * +duration)
  };
  const createdOtp = await prisma.userOtp.create({
    data: otpdata
  });
  return createdOtp;
};
const verifyOtp = async (data: any): Promise<any> => {
  console.log(data);
  const { email, otp } = data;
  if (!(email && otp)) {
    throw Error('Provide email and otp');
  }

  const matchOtpRecord = await prisma.userOtp.findUnique({
    where: {
      email
    }
  });

  if (!matchOtpRecord) {
    throw Error('No Otp Found');
  }

  const expireAt = matchOtpRecord?.expireAt;

  if (expireAt && expireAt.getTime() < Date.now()) {
    await prisma.userOtp.deleteMany({
      where: {
        email
      }
    });
    throw Error('Code has expired. Request a new one.');
  }

  const isOtpValid = matchOtpRecord.otp === otp;

  if (isOtpValid) {
    // Update user's verified field to true
    await prisma.user.update({
      where: {
        email
      },
      data: {
        verified: true
        // Add any other fields you want to update
      }
    })
  }
    await prisma.userOtp.deleteMany({
      where: {
        email
      }
    });

  return isOtpValid;
};

const deleteOtp = async (email: any) => {
  try {
    await prisma.userOtp.deleteMany({
      where: {
        email
      }
    });
  } catch (error) {
    throw error;
  }
};

export const OtpService = {
  sendOtp,
  verifyOtp,
  deleteOtp
};
