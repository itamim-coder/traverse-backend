
import nodemailer from 'nodemailer';

import config from '../config';
import { PrismaClient } from '@prisma/client';
import { Options } from 'nodemailer/lib/mailer';

const prisma = new PrismaClient();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.pass
  }
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log(success);
  }
});

const sendEmail = async (mailOptions: Options) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export const sendEmailHelper = {
  sendEmail
};
