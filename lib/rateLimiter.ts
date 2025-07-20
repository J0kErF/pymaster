type IPRecord = {
  count: number;
  lastAttempt: number;
  timeout?: NodeJS.Timeout;
};

const rateLimitStore = new Map<string, IPRecord>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function isRateLimited(ip: string): boolean {
  const record = rateLimitStore.get(ip);

  if (!record) return false;

  // still in window
  if (record.count >= MAX_ATTEMPTS) {
    return true;
  }

  return false;
}

export function incrementRateLimit(ip: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing) {
    const timeout = setTimeout(() => rateLimitStore.delete(ip), WINDOW_MS);
    rateLimitStore.set(ip, { count: 1, lastAttempt: now, timeout });
  } else {
    rateLimitStore.set(ip, {
      ...existing,
      count: existing.count + 1,
      lastAttempt: now,
    });
  }
}
