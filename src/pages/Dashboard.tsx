import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MessageSquare, TrendingUp, Bot, Plus, CheckCircle2,
  Bell, ArrowUpRight, Zap, Award, Activity, Users,
  Code2, BookOpen, Target, Flame, Star, GitBranch
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_QUESTIONS, MOCK_USERS, MOCK_NOTIFICATIONS, MOCK_TAGS, MOCK_ANSWERS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { QuestionCard } from '@/components/features/QuestionCard';
import { formatNumber, getReputationLevel } from '@/lib/utils';

// Static data (unchanged)
const ACTIVITY_DATA = [
  { day: 'M', h: 40 }, { day: 'T', h: 65 }, { day: 'W', h: 55 },
  { day: 'T', h: 80 }, { day: 'F', h: 95 }, { day: 'S', h: 35 }, { day: 'S', h: 50 },
];

const USER_ACTIVITY: Record<string, number[]> = {
  u1: [40, 65, 55, 80, 95, 35, 50],
  u2: [90, 75, 85, 95, 70, 40, 60],
  u3: [30, 50, 45, 60, 55, 70, 40],
  u4: [60, 80, 70, 90, 85, 50, 65],
  u5: [100, 100, 100, 100, 100, 80, 90],
};

const CODE_REVIEW_HISTORY: Record<string, { lang: string; score: number; time: string }[]> = {
  u1: [{ lang: 'TypeScript', score: 87, time: '2h ago' }, { lang: 'Docker', score: 72, time: '1d ago' }],
  u2: [{ lang: 'Rust', score: 94, time: '3h ago' }, { lang: 'Go', score: 88, time: '2d ago' }],
  u3: [{ lang: 'React/TSX', score: 79, time: '5h ago' }, { lang: 'CSS', score: 91, time: '3d ago' }],
  u4: [{ lang: 'Python', score: 83, time: '1h ago' }, { lang: 'PyTorch', score: 76, time: '12h ago' }],
  u5: [{ lang: 'Bash', score: 95, time: '6h ago' }, { lang: 'SQL', score: 89, time: '1d ago' }],
};

const USER_ACTIONS: Record<string, { label: string; href: string; icon: any; color: string }[]> = {
  u1: [
    { label: 'Ask a Question', href: '/ask', icon: Plus, color: 'text-primary' },
    { label: 'Review Code', href: '/code-review', icon: Bot, color: 'text-accent' },
    { label: 'View Profile', href: '/profile/alex_dev', icon: Users, color: 'text-purple-500' },
  ],
  u2: [
    { label: 'Ask a Question', href: '/ask', icon: Plus, color: 'text-primary' },
    { label: 'Review Code', href: '/code-review', icon: Bot, color: 'text-accent' },
    { label: 'View Profile', href: '/profile/sarah_codes', icon: Users, color: 'text-purple-500' },
  ],
  u3: [
    { label: 'Ask a Question', href: '/ask', icon: Plus, color: 'text-primary' },
    { label: 'Review Code', href: '/code-review', icon: Bot, color: 'text-accent' },
    { label: 'View Profile', href: '/profile/dev_marcus', icon: Users, color: 'text-purple-500' },
  ],
  u4: [
    { label: 'Ask a Question', href: '/ask', icon: Plus, color: 'text-primary' },
    { label: 'Review Code', href: '/code-review', icon: Bot, color: 'text-accent' },
    { label: 'View Profile', href: '/profile/kiran_ml', icon: Users, color: 'text-purple-500' },
  ],
  u5: [
    { label: 'Admin Panel', href: '/admin', icon: Target, color: 'text-destructive' },
    { label: 'Manage Users', href: '/admin', icon: Users, color: 'text-primary' },
    { label: 'View Content', href: '/admin', icon: BookOpen, color: 'text-accent' },
  ],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [greeting, setGreeting] = useState('');
  const [feedTab, setFeedTab] = useState<'recent' | 'top' | 'unanswered'>('recent');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
  }, [user, navigate]);

  if (!user) return null;

  const userQuestions = MOCK_QUESTIONS.filter(q => q.authorId === user.id);
  const userAnswers = MOCK_ANSWERS.filter(a => a.authorId === user.id);
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.isRead);
  const repLevel = getReputationLevel(user.reputation);
  const topContributors = MOCK_USERS
    .filter(u2 => u2.role !== 'admin' && u2.id !== user.id)
    .sort((a, b) => b.reputation - a.reputation)
    .slice(0, 4);

  const activityBars = USER_ACTIVITY[user.id] || ACTIVITY_DATA.map(d => d.h);
  const reviewHistory = CODE_REVIEW_HISTORY[user.id] || [];
  const quickActions = USER_ACTIONS[user.id] || USER_ACTIONS['u1'];

  let feedQuestions = [...MOCK_QUESTIONS];
  if (feedTab === 'top') feedQuestions.sort((a, b) => b.votes - a.votes);
  else if (feedTab === 'unanswered') feedQuestions = feedQuestions.filter(q => !q.isAnswered);
  else feedQuestions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  feedQuestions = feedQuestions.slice(0, 5);

  const stats = [
    {
      label: 'Reputation',
      value: formatNumber(user.reputation),
      icon: TrendingUp,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      delta: repLevel.label,
      deltaColor: 'text-yellow-500',
    },
    {
      label: 'Questions',
      value: String(user.questionsCount),
      icon: MessageSquare,
      color: 'text-primary',
      bg: 'bg-primary/10',
      delta: `${userQuestions.length} in feed`,
      deltaColor: 'text-primary',
    },
    {
      label: 'Answers',
      value: String(user.answersCount),
      icon: CheckCircle2,
      color: 'text-accent',
      bg: 'bg-accent/10',
      delta: `${userAnswers.filter(a => a.isAccepted).length} accepted`,
      deltaColor: 'text-accent',
    },
    {
      label: 'Accepted',
      value: String(user.acceptedAnswers),
      icon: Award,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      delta: user.acceptedAnswers > 0 ? `${Math.round((user.acceptedAnswers / Math.max(user.answersCount, 1)) * 100)}% rate` : 'Start answering',
      deltaColor: 'text-purple-500',
    },
  ];

  const acceptRate = user.answersCount > 0 ? Math.round((user.acceptedAnswers / user.answersCount) * 100) : 0;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Welcome Banner */}
        <div className="relative rounded-xl border border-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-background to-background" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="relative p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={user.avatar} alt={user.username}
                    className="w-14 h-14 rounded-full border-2 border-primary/30" />
                  {user.role !== 'user' && (
                    <span className={`absolute -bottom-1 -right-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full border ${user.role === 'admin' ? 'bg-destructive text-destructive-foreground border-destructive' : 'bg-primary text-primary-foreground border-primary'}`}>
                      {user.role}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{greeting},</p>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    <span className="text-primary">{user.username}</span>
                  </h1>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border bg-secondary/60 ${repLevel.color} border-current/20`}>
                      {repLevel.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatNumber(user.reputation)} rep</span>
                    {user.skills.length > 0 && (
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        · {user.skills.slice(0, 3).join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 text-sm py-2 px-4 rounded-lg font-semibold bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 hover:bg-destructive/90 transition-colors"
                  >
                    <Target className="w-4 h-4" /> Admin Panel
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/code-review"
                      className="inline-flex items-center gap-1.5 text-sm py-2 px-4 rounded-lg font-semibold border border-border bg-background hover:bg-secondary/50 transition-colors"
                    >
                      <Bot className="w-4 h-4" /> AI Review
                    </Link>
                    <Link
                      to="/ask"
                      className="inline-flex items-center gap-1.5 text-sm py-2 px-4 rounded-lg font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Ask Question
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {user.role !== 'admin' && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Accepted answer rate</span>
                  <span className="font-semibold text-foreground">{acceptRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: `${Math.min(acceptRate, 100)}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ label, value, icon: Icon, color, bg, delta, deltaColor }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4 hover:border-primary/25 transition-colors group">
              <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className={`text-[11px] mt-1 font-semibold ${deltaColor}`}>{delta}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left Column: Question Feed */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 p-0.5 bg-secondary rounded-lg">
                {[
                  { key: 'recent', label: 'Recent' },
                  { key: 'top', label: 'Top Voted' },
                  { key: 'unanswered', label: 'Unanswered' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFeedTab(key as any)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      feedTab === key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Link to="/questions" className="text-xs text-primary hover:underline flex items-center gap-1">
                Browse all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              {feedQuestions.map(q => (
                <QuestionCard key={q.id} question={q} compact />
              ))}
            </div>

            <Link
              to="/questions"
              className="block w-full text-center text-sm py-2.5 rounded-lg border border-border bg-background hover:bg-secondary/50 transition-colors"
            >
              View All {MOCK_QUESTIONS.length} Questions <ArrowUpRight className="w-3.5 h-3.5 inline ml-1" />
            </Link>

            {/* User Contributions */}
            {(userQuestions.length > 0 || userAnswers.length > 0) && (
              <div className="rounded-xl border border-border bg-card p-4 border-primary/15">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-foreground">
                  <Star className="w-4 h-4 text-yellow-500" /> Your Contributions
                </h3>
                {userQuestions.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Your Questions ({userQuestions.length})</p>
                    <div className="space-y-1.5">
                      {userQuestions.slice(0, 2).map(q => (
                        <Link key={q.id} to={`/questions/${q.id}`} className="flex items-center gap-2 text-xs hover:text-primary transition-colors group">
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${q.isAnswered ? 'bg-accent' : 'bg-muted-foreground'}`} />
                          <span className="truncate text-muted-foreground group-hover:text-primary">{q.title}</span>
                          <span className="ml-auto shrink-0 text-muted-foreground/60">{q.votes}↑</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {userAnswers.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Your Answers ({userAnswers.length})</p>
                    <div className="space-y-1.5">
                      {userAnswers.slice(0, 2).map(a => (
                        <Link key={a.id} to={`/questions/${a.questionId}`} className="flex items-center gap-2 text-xs hover:text-primary transition-colors group">
                          <CheckCircle2 className={`w-3 h-3 shrink-0 ${a.isAccepted ? 'text-accent' : 'text-muted-foreground/50'}`} />
                          <span className="truncate text-muted-foreground group-hover:text-primary line-clamp-1">{a.body.slice(0, 60)}...</span>
                          <span className="ml-auto shrink-0 text-muted-foreground/60">{a.votes}↑</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <Link to={`/profile/${user.username}`} className="block text-xs text-primary hover:underline mt-3 text-right">
                  View full profile →
                </Link>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* Notifications */}
            {unread.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4 border-primary/20 bg-primary/5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {unread.length} New
                  </h3>
                  <Link to="/notifications" className="text-xs text-primary hover:underline">View all</Link>
                </div>
                <div className="space-y-2.5">
                  {unread.slice(0, 3).map(n => (
                    <div key={n.id} className="flex items-start gap-2 text-xs">
                      {n.fromUser ? (
                        <img src={n.fromUser.avatar} className="w-6 h-6 rounded-full border border-border shrink-0 mt-0.5" alt="" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Bell className="w-3 h-3 text-primary" />
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-foreground">{n.title}</span>
                        <p className="text-muted-foreground line-clamp-1">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-foreground">
                <Zap className="w-4 h-4 text-primary" /> Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions.map(({ label, href, icon: Icon, color }) => (
                  <Link
                    key={label}
                    to={href}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border/60 hover:border-primary/30 hover:bg-secondary/40 transition-all group text-sm"
                  >
                    <Icon className={`w-4 h-4 ${color} shrink-0`} />
                    <span className="font-medium group-hover:text-foreground text-muted-foreground transition-colors">{label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Code Review CTA */}
            {user.role !== 'admin' && (
              <div className="rounded-xl border border-border bg-card p-4 bg-gradient-to-br from-primary/5 to-background border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">AI Code Review</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Instant bug detection and quality scoring.</p>
                  </div>
                </div>
                {reviewHistory.length > 0 && (
                  <div className="space-y-1.5 mb-3">
                    {reviewHistory.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs bg-secondary/50 rounded px-2 py-1.5">
                        <Code2 className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground flex-1">{r.lang}</span>
                        <span className={`font-bold ${r.score >= 80 ? 'text-accent' : r.score >= 60 ? 'text-yellow-500' : 'text-destructive'}`}>
                          {r.score}/100
                        </span>
                        <span className="text-muted-foreground/60">{r.time}</span>
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to="/code-review"
                  className="block w-full text-center text-sm py-2 rounded-lg font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/15 hover:bg-primary/90 transition-colors"
                >
                  Review Code Now
                </Link>
              </div>
            )}

            {/* Activity Chart */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-foreground">
                <Activity className="w-4 h-4 text-primary" /> Your Activity
              </h3>
              <div className="flex items-end gap-1 h-14 mb-2">
                {activityBars.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-primary rounded-sm hover:opacity-100 transition-opacity"
                      style={{ height: `${h}%`, opacity: 0.6 + h / 500 }}
                    />
                    <span className="text-[9px] text-muted-foreground">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">Last 7 days</p>
            </div>

            {/* Top Experts */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-foreground">
                <Users className="w-4 h-4 text-primary" /> Top Experts
              </h3>
              <div className="space-y-2.5">
                {topContributors.map((u, i) => (
                  <Link
                    key={u.id}
                    to={`/profile/${u.username}`}
                    className="flex items-center gap-2.5 group hover:bg-secondary/50 rounded-md p-1 -mx-1 transition-colors"
                  >
                    <span className="text-xs font-bold text-muted-foreground w-4 text-center">#{i + 1}</span>
                    <img src={u.avatar} alt={u.username} className="w-7 h-7 rounded-full border border-border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold group-hover:text-primary transition-colors truncate text-foreground">{u.username}</p>
                      <p className="text-[11px] text-muted-foreground">{formatNumber(u.reputation)} rep</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
              <Link to="/leaderboard" className="block text-xs text-primary hover:underline mt-3 text-center">
                Full leaderboard →
              </Link>
            </div>

            {/* Hot Topics */}
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-foreground">
                <Flame className="w-4 h-4 text-orange-500" /> Hot Topics
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {MOCK_TAGS.slice(0, 8).map(tag => (
                  <Link
                    key={tag.id}
                    to={`/questions?tag=${tag.name}`}
                    className="inline-flex items-center rounded-full bg-secondary/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    {tag.name} <span className="opacity-50 ml-0.5">·{tag.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}