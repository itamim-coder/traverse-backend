import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    average_rating: z.number().min(0.1, { message: 'Average rating must be greater than 0' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    photos: z.array(z.string()),
    cheapest_price: z.string().min(1, { message: 'Cheapest price is required' }),

    featured: z.boolean().default(false)
  })
});

export const hotelValidation = {
  create
};
