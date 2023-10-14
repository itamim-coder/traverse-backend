import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required'
    }),
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

export const userValidation = {
  create
};
