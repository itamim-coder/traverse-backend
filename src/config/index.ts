/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  email: process.env.AUTH_EMAIL,
  pass: process.env.AUTH_PASS,

  jwt: {
    secret: process.env.JWT_SECRET,

    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN
  }
};
