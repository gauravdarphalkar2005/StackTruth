import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield, Users, MessageSquare, CheckCircle2, TrendingUp, Trash2, Ban,
  BarChart3, Eye, AlertTriangle, Crown, Activity, RefreshCw, UserCheck,
  Star, Award, Lock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_USERS, MOCK_QUESTIONS, ADMIN_METRICS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { formatNumber, formatDate, getReputationLevel } from '@/lib/utils';
import { toast } from 'sonner';

export default function Admin() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'questions'>('overview');
  const [users, setUsers] = useState(MOCK_USERS.filter(u => u.role !== 'admin'));
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Admin access required');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const handleBanUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast.success(`User @${target?.username} has been banned`);
  };

  const handlePromoteUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: u.role === 'expert' ? 'user' : 'expert' } : u));
    toast.success(`@${target?.username} role updated`);
  };

  const handleDeleteQuestion = (qId: string) => {
    const target = questions.find(q => q.id === qId);
    setQuestions(prev => prev.filter(q => q.id !== qId));
    toast.success(`Question deleted: "${target?.title.slice(0, 40)}..."`);
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    toast.success('Dashboard data refreshed');
  };

  const metrics = ADMIN_METRICS;

  const metricCards = [
    {
      label: 'Total Users',
      value: formatNumber(metrics.totalUsers),
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
      delta: `+${metrics.newUsersThisWeek} this week`,
      deltaColor: 'text-primary',
    },
    {
      label: 'Total Questions',
      value: formatNumber(metrics.totalQuestions),
      icon: MessageSquare,
      color: 'text-accent',
      bg: 'bg-accent/10',
      delta: `+${metrics.questionsThisWeek} this week`,
      deltaColor: 'text-accent',
    },
    {
      label: 'Total Answers',
      value: formatNumber(metrics.totalAnswers),
      icon: CheckCircle2,
      color: 'text-[hsl(48,96%,53%)]',
      bg: 'bg-yellow-500/10',
      delta: '94.2% answer rate',
      deltaColor: 'text-[hsl(48,96%,53%)]',
    },
    {
      label: 'Active Today',
      value: formatNumber(metrics.activeToday),
      icon: Activity,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      delta: 'Unique sessions',
      deltaColor: 'text-purple-400',
    },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center border border-destructive/20">
              <Shield className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="font-mono text-destructive">{user.username}</span> · Last refresh: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <button onClick={handleRefresh}
            className="btn-secondary flex items-center gap-1.5 text-sm py-2">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>

        {/* Admin Identity Card */}
        <div className="card-panel p-4 border-destructive/20 bg-destructive/5 flex items-center gap-4">
          <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border-2 border-destructive/40" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{user.username}</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-destructive text-white">Admin</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Super User</span>
            </div>
            <p className="text-xs text-muted-foreground">{user.email} · Full platform access · {formatNumber(user.reputation)} reputation</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Active users now</div>
            <div className="text-2xl font-bold text-accent">{metrics.activeToday.toLocaleString()}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-secondary rounded-lg w-fit">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'users', label: `Users (${users.length})`, icon: Users },
            { key: 'questions', label: `Content (${questions.length})`, icon: MessageSquare },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metricCards.map(({ label, value, icon: Icon, color, bg, delta, deltaColor }) => (
                <div key={label} className="card-panel p-4 hover:border-primary/20 transition-colors">
                  <div className={`w-8 h-8 ${bg} rounded-md flex items-center justify-center mb-2`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className={`text-[11px] mt-1 font-semibold ${deltaColor}`}>{delta}</div>
                </div>
              ))}
            </div>

            {/* Activity Chart */}
            <div className="card-panel p-5">
              <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Weekly Platform Activity
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={metrics.activityData} barGap={2}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,20%,55%)', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(215,20%,55%)', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(222,47%,9%)', border: '1px solid hsl(217,33%,16%)', borderRadius: '6px', fontSize: 12 }}
                    labelStyle={{ color: 'hsl(210,40%,96%)' }}
                    itemStyle={{ color: 'hsl(210,40%,90%)' }}
                  />
                  <Bar dataKey="questions" name="Questions" fill="hsl(217,91%,60%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="answers" name="Answers" fill="hsl(142,71%,45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Top Tags */}
              <div className="card-panel p-5">
                <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Top Tags by Volume
                </h2>
                <div className="space-y-2.5">
                  {metrics.topTags.map(({ name, count }) => (
                    <div key={name} className="flex items-center gap-3">
                      <span className="tag-chip w-28 text-center text-[11px]">{name}</span>
                      <div className="flex-1 bg-secondary rounded-full h-1.5">
                        <div
                          className="h-1.5 bg-primary rounded-full"
                          style={{ width: `${(count / Math.max(...metrics.topTags.map(t => t.count))) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right font-mono">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card-panel p-5">
                <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent" /> Platform Health
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Answer Rate', value: '94.2%', bar: 94, color: 'bg-accent' },
                    { label: 'Acceptance Rate', value: '48.1%', bar: 48, color: 'bg-primary' },
                    { label: 'Daily Active Users', value: '14.7%', bar: 15, color: 'bg-[hsl(48,96%,53%)]' },
                    { label: 'Expert Coverage', value: '87.4%', bar: 87, color: 'bg-purple-400' },
                  ].map(({ label, value, bar, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-bold">{value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${bar}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === 'users' && (
          <div className="space-y-3">
            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Experts', value: users.filter(u => u.role === 'expert').length, color: 'text-primary', icon: Crown },
                { label: 'Developers', value: users.filter(u => u.role === 'user').length, color: 'text-muted-foreground', icon: Users },
                { label: 'Total Rep', value: formatNumber(users.reduce((s, u) => s + u.reputation, 0)), color: 'text-[hsl(48,96%,53%)]', icon: Star },
              ].map(({ label, value, color, icon: Icon }) => (
                <div key={label} className="card-panel p-3 flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color} shrink-0`} />
                  <div>
                    <div className={`text-lg font-bold ${color}`}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-panel overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" /> Manage Users ({users.length})
                </h2>
                <span className="text-xs text-muted-foreground">Click role badge to promote/demote</span>
              </div>
              <div className="divide-y divide-border">
                {users.map(u => {
                  const repLevel = getReputationLevel(u.reputation);
                  return (
                    <div key={u.id} className="flex items-center gap-3 p-4 hover:bg-secondary/30 transition-colors">
                      <img src={u.avatar} alt={u.username} className="w-9 h-9 rounded-full border border-border shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link to={`/profile/${u.username}`}
                            className="font-semibold text-sm hover:text-primary transition-colors">
                            {u.username}
                          </Link>
                          <button
                            onClick={() => handlePromoteUser(u.id)}
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase border transition-all cursor-pointer hover:opacity-80 ${
                              u.role === 'expert'
                                ? 'bg-primary/10 text-primary border-primary/30'
                                : 'bg-secondary text-muted-foreground border-border'
                            }`}
                            title={`Click to ${u.role === 'expert' ? 'demote' : 'promote'}`}
                          >
                            {u.role}
                          </button>
                          <span className={`text-[10px] font-semibold ${repLevel.color}`}>{repLevel.label}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {u.email} · {formatNumber(u.reputation)} rep · joined {formatDate(u.joinedAt)}
                        </div>
                        <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                          <span>{u.questionsCount} questions</span>
                          <span>{u.answersCount} answers</span>
                          <span>{u.acceptedAnswers} accepted</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link to={`/profile/${u.username}`}
                          className="p-1.5 rounded border border-border text-muted-foreground hover:text-foreground transition-colors"
                          title="View profile">
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleBanUser(u.id)}
                          className="p-1.5 rounded border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                          title="Ban user"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── QUESTIONS/CONTENT TAB ── */}
        {activeTab === 'questions' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Answered', value: questions.filter(q => q.isAnswered).length, color: 'text-accent', icon: CheckCircle2 },
                { label: 'Unanswered', value: questions.filter(q => !q.isAnswered).length, color: 'text-[hsl(48,96%,53%)]', icon: AlertTriangle },
                { label: 'Total Votes', value: questions.reduce((s, q) => s + q.votes, 0), color: 'text-primary', icon: TrendingUp },
              ].map(({ label, value, color, icon: Icon }) => (
                <div key={label} className="card-panel p-3 flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color} shrink-0`} />
                  <div>
                    <div className={`text-lg font-bold ${color}`}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-panel overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Moderate Content ({questions.length})
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[hsl(48,96%,53%)]">
                  <AlertTriangle className="w-3.5 h-3.5" /> Review for policy compliance
                </div>
              </div>
              <div className="divide-y divide-border">
                {questions.map(q => (
                  <div key={q.id} className="flex items-start gap-3 p-4 hover:bg-secondary/30 transition-colors">
                    <img src={q.author.avatar} alt={q.author.username} className="w-7 h-7 rounded-full border border-border shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <Link to={`/questions/${q.id}`} className="text-sm font-medium hover:text-primary transition-colors line-clamp-1">
                        {q.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 flex-wrap">
                        <span>by <span className="font-medium">{q.author.username}</span></span>
                        <span>·</span>
                        <span className={`font-medium ${q.isAnswered ? 'text-accent' : 'text-[hsl(48,96%,53%)]'}`}>
                          {q.isAnswered ? '✓ Answered' : '○ Unanswered'}
                        </span>
                        <span>·</span>
                        <span>{q.votes} votes</span>
                        <span>·</span>
                        <span>{q.answersCount} answers</span>
                        <span>·</span>
                        <span>{formatDate(q.createdAt)}</span>
                      </div>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {q.tags.map(t => (
                          <span key={t} className="tag-chip text-[10px] py-0 px-1.5">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link to={`/questions/${q.id}`}
                        className="p-1.5 rounded border border-border text-muted-foreground hover:text-foreground transition-colors"
                        title="View">
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 rounded border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                        title="Delete question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
