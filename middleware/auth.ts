import { defineEventHandler, getCookie, createError } from 'h3';

function isValid(token: string): boolean {
  // Verificare token (ex: JWT decode + validare)
  try {
    // jwt.verify(token, SECRET) ...
    return true;
  } catch {
    return false;
  }
}

export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token');
  if (!token || !isValid(token)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
});
