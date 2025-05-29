
import { H3Event, createError } from 'h3';

const attemptsMap = new Map<string, { count: number; lastAttempt: number }>();
const WINDOW_MS = 60 * 1000; // 1 minut
const MAX_ATTEMPTS = 5;

export function rateLimit(event: H3Event) {
  const ip = event.node.req.socket.remoteAddress || 'unknown';

  const now = Date.now();
  const data = attemptsMap.get(ip) || { count: 0, lastAttempt: now };

  if (now - data.lastAttempt > WINDOW_MS) {
    // Reset window
    data.count = 1;
    data.lastAttempt = now;
  } else {
    data.count++;
  }

  attemptsMap.set(ip, data);

  if (data.count > MAX_ATTEMPTS) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests, please try again later.',
    });
  }
}
