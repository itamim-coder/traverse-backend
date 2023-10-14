import { z } from 'zod';

const signin = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required'
      })
      .refine(
        (email) => {
          // Regular expression to match a valid email address
          const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com)$/i;
          return emailRegex.test(email);
        },
        {
          message: 'Invalid email format'
        }
      ),
    password: z.string({
      required_error: 'password is required'
    })
  })
});
const refreshToken = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh Token is required',
      }),
    }),
  });

export const authValidation = {
  signin,
  refreshToken
};
