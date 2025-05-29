import { defineEventHandler } from 'h3';
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  await authMiddleware(event); // verifică tokenul

  // Dacă e valid, returnează date
  return { message: 'Date protejate accesate cu succes!' };
});
