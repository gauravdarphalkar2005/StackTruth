import type { User } from '@/types';
import { MOCK_USERS } from './mockData';

const AUTH_KEY = 'stacktruth_auth';

export function getCurrentUser(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function login(email: string, _password: string): User | null {
  // Mock: find user by email, any password works
  const user = MOCK_USERS.find(u => u.email === email);
  if (!user) return null;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function loginWithGitHub(): User {
  // Mock GitHub OAuth — returns first expert user
  const user = MOCK_USERS[0];
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function loginWithGoogle(): User {
  // Mock Google OAuth — returns second expert user (sarah_codes)
  const user = MOCK_USERS[1];
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function register(username: string, email: string, _password: string): User {
  const newUser: User = {
    id: `u_${Date.now()}`,
    username,
    email,
    avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${username}&backgroundColor=dbeafe`,
    bio: '',
    skills: [],
    githubUrl: '',
    portfolioUrl: '',
    reputation: 1,
    role: 'user',
    joinedAt: new Date().toISOString().split('T')[0],
    questionsCount: 0,
    answersCount: 0,
    acceptedAnswers: 0,
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
  return newUser;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function updateProfile(updates: Partial<User>): User | null {
  const current = getCurrentUser();
  if (!current) return null;
  const updated = { ...current, ...updates };
  localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  return updated;
}
