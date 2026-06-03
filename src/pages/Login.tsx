import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap, Github, Eye, EyeOff, AlertCircle, ArrowRight, Terminal,
  Shield, Users, Bot, ArrowLeft, Bolt, Crown, Code2, Brain, Settings, Star, Sparkles
} from 'lucide-react';
import { login, loginWithGitHub, loginWithGoogle } from '@/lib/auth';
import { MOCK_USERS } from '@/lib/mockData';
import { toast } from 'sonner';

const PERKS = [
  { icon: Bot, text: 'Unlimited AI code reviews' },
  { icon: Shield, text: 'Peer-validated expert answers' },
  { icon: Users, text: 'Join 8,400+ active developers' },
];

// Enhanced demo credentials with unique gradients and badges
const DEMO_ACCOUNTS = [
  {
    id: 'u1',
    username: 'alex_dev',
    fullName: 'Alex Sterling',
    role: 'Expert',
    tech: 'TypeScript · React',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/30',
    badge: 'bg-blue-500/20 text-blue-400',
    icon: Code2,
    iconColor: 'text-blue-400',
  },
  {
    id: 'u2',
    username: 'sarah_codes',
    fullName: 'Sarah Jenkins',
    role: 'Expert',
    tech: 'Rust · Go · Backend',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    border: 'border-emerald-500/30',
    badge: 'bg-emerald-500/20 text-emerald-400',
    icon: Zap,
    iconColor: 'text-emerald-400',
  },
  {
    id: 'u3',
    username: 'dev_marcus',
    fullName: 'Marcus Thorne',
    role: 'Developer',
    tech: 'React · Next.js',
    gradient: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500/20 text-purple-400',
    icon: Brain,
    iconColor: 'text-purple-400',
  },
  {
    id: 'u4',
    username: 'kiran_ml',
    fullName: 'Kiran Patel',
    role: 'Expert',
    tech: 'Python · PyTorch · ML',
    gradient: 'from-orange-500/10 to-red-500/10',
    border: 'border-orange-500/30',
    badge: 'bg-orange-500/20 text-orange-400',
    icon: Bot,
    iconColor: 'text-orange-400',
  },
  {
    id: 'u5',
    username: 'admin_root',
    fullName: 'System Admin',
    role: 'Admin',
    tech: 'Platform Management',
    gradient: 'from-rose-500/10 to-red-500/10',
    border: 'border-rose-500/30',
    badge: 'bg-rose-500/20 text-rose-400',
    icon: Settings,
    iconColor: 'text-rose-400',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bypassLoading, setBypassLoading] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!password.trim()) { setError('Password is required.'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = login(email, password);
      if (!user) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }
      toast.success(`Welcome back, ${user.username}!`);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }, 700);
  };

  const handleGitHub = () => {
    const user = loginWithGitHub();
    toast.success(`Signed in as ${user.username} via GitHub`);
    navigate('/dashboard');
  };

  const handleGoogle = () => {
    const user = loginWithGoogle();
    toast.success(`Signed in as ${user.username} via Google`);
    navigate('/dashboard');
  };

  const handleBypass = (userId: string) => {
    setBypassLoading(userId);
    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) return;
    setTimeout(() => {
      localStorage.setItem('stacktruth_auth', JSON.stringify(user));
      toast.success(`Signed in as ${user.username}`, {
        description: user.role === 'admin' ? 'Admin dashboard access granted' : `${user.reputation} reputation · ${user.answersCount} answers`,
      });
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left decorative panel (unchanged) */}
      <div className="hidden lg:flex flex-col w-[44%] bg-secondary border-r border-border p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(hsl(217,91%,60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217,91%,60%) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-base">Stack<span className="text-primary">Truth</span></span>
        </Link>

        <div className="flex-1 flex flex-col justify-center relative z-10 py-8">
          <Terminal className="w-10 h-10 text-primary mb-5" />
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Welcome back to
            <br />
            <span className="text-primary">StackTruth</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
            Your developer community for technical Q&A, AI code reviews, and building a verified reputation.
          </p>
          <div className="space-y-3 mb-8">
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-7 h-7 bg-secondary rounded-md flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                {text}
              </div>
            ))}
          </div>

          {/* Demo credentials panel on left sidebar (desktop) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Demo Access — Try any account</p>
            </div>
            <div className="grid gap-2.5">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.id}
                    onClick={() => handleBypass(acc.id)}
                    disabled={bypassLoading === acc.id}
                    className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 overflow-hidden ${
                      acc.border
                    } bg-gradient-to-r ${acc.gradient} hover:scale-[1.02] hover:shadow-lg disabled:opacity-60`}
                  >
                    {bypassLoading === acc.id ? (
                      <span className="w-9 h-9 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin shrink-0" />
                    ) : (
                      <>
                        <div className="relative">
                          <img
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${acc.username}&backgroundColor=dbeafe`}
                            alt={acc.username}
                            className="w-9 h-9 rounded-full border border-border shadow-sm"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                              {acc.fullName}
                            </p>
                            <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${acc.badge}`}>
                              {acc.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                            @{acc.username} · {acc.tech}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-muted-foreground/50 mt-4">© 2024 StackTruth · Built for engineers</p>
      </div>

      {/* Right panel: Login form + mobile demo cards */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 lg:hidden">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Sign in</h1>
            <p className="text-sm text-muted-foreground">Welcome back, developer</p>
          </div>

          {/* Demo credentials – visible on mobile, also on desktop for quick access */}
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Try demo accounts</p>
            </div>
            <div className="grid gap-2.5">
              {DEMO_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.id}
                    onClick={() => handleBypass(acc.id)}
                    disabled={bypassLoading === acc.id}
                    className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${acc.border} bg-gradient-to-r ${acc.gradient} disabled:opacity-60`}
                  >
                    {bypassLoading === acc.id ? (
                      <span className="w-9 h-9 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin shrink-0" />
                    ) : (
                      <>
                        <img
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${acc.username}&backgroundColor=dbeafe`}
                          alt={acc.username}
                          className="w-9 h-9 rounded-full border border-border shadow-sm"
                        />
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-foreground">{acc.fullName}</p>
                            <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${acc.badge}`}>
                              {acc.role}
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground">@{acc.username} · {acc.tech}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-background text-xs text-muted-foreground">or sign in with email</span>
            </div>
          </div>

          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button onClick={handleGitHub} className="flex items-center justify-center gap-2 btn-secondary py-2.5 text-sm font-semibold hover:border-primary/40 transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </button>
            <button onClick={handleGoogle} className="flex items-center justify-center gap-2 btn-secondary py-2.5 text-sm font-semibold hover:border-primary/40 transition-colors bg-white text-slate-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@example.com" autoComplete="email"
                className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} required placeholder="••••••••" autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 pr-10 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-primary/20 mt-1">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Signing in...</>
              ) : (
                <> Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to StackTruth?{' '}
            <Link to="/register" className="text-primary hover:underline font-semibold">Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}