'use server';

import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

type User = { id: string; email: string; password: string };

const users = new Map<string, User>([
  ['demo@example.com', { id: 'u1', email: 'demo@example.com', password: 'demo' }],
]);

const sessions = new Map<string, string>(); // sessionId -> userId

const SESSION_COOKIE = 'app_session';

export async function loginUser(email: string, password: string) {
  const user = users.get(email);
  if (!user || user.password !== password) {
    return { ok: false as const, error: 'Invalid credentials' };
  }
  const sessionId = randomUUID();
  sessions.set(sessionId, user.id);
  const c = await cookies();
  c.set(SESSION_COOKIE, sessionId, { httpOnly: true, sameSite: 'lax', path: '/' });
  return { ok: true as const, user: { id: user.id, email: user.email } };
}

export async function logoutUser() {
  const c = await cookies();
  const sid = c.get(SESSION_COOKIE)?.value;
  if (sid) sessions.delete(sid);
  c.delete(SESSION_COOKIE);
  return { ok: true as const };
}

export async function getSessionUser() {
  const c = await cookies();
  const sid = c.get(SESSION_COOKIE)?.value;
  if (!sid) return null;
  const userId = sessions.get(sid);
  if (!userId) return null;
  const user = [...users.values()].find(u => u.id === userId);
  return user ? { id: user.id, email: user.email } : null;
}

export async function getInitialAuthState() {
  const user = await getSessionUser();
  return {
    isAuthenticated: Boolean(user),
    currentUser: user ?? undefined,
  };
}