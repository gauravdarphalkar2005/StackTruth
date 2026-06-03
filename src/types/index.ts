export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  skills: string[];
  githubUrl: string;
  portfolioUrl: string;
  reputation: number;
  role: 'user' | 'expert' | 'admin';
  joinedAt: string;
  questionsCount: number;
  answersCount: number;
  acceptedAnswers: number;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

export interface Question {
  id: string;
  title: string;
  body: string;
  code?: string;
  language?: string;
  authorId: string;
  author: User;
  tags: string[];
  votes: number;
  userVote?: 1 | -1 | 0;
  answersCount: number;
  views: number;
  isAnswered: boolean;
  acceptedAnswerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  body: string;
  code?: string;
  language?: string;
  authorId: string;
  author: User;
  votes: number;
  userVote?: 1 | -1 | 0;
  isAccepted: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  body: string;
  authorId: string;
  author: User;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'answer' | 'mention' | 'accepted' | 'vote' | 'badge';
  title: string;
  message: string;
  isRead: boolean;
  link: string;
  createdAt: string;
  fromUser?: User;
}

export interface CodeReview {
  id: string;
  code: string;
  language: string;
  score: number;
  issues: CodeIssue[];
  suggestions: string[];
  summary: string;
  createdAt: string;
}

export interface CodeIssue {
  line?: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

export interface AdminMetrics {
  totalUsers: number;
  totalQuestions: number;
  totalAnswers: number;
  activeToday: number;
  newUsersThisWeek: number;
  questionsThisWeek: number;
  topTags: { name: string; count: number }[];
  activityData: { day: string; questions: number; answers: number }[];
}
