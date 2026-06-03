import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap, Github, Eye, EyeOff, AlertCircle, ArrowRight,
  Check, ArrowLeft, Terminal, ShieldCheck
} from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';
import { register, loginWithGitHub, loginWithGoogle } from '@/lib/auth';
import { MOCK_USERS } from '@/lib/mockData';
import { toast } from 'sonner';

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains a number', test: (p: string) => /\d/.test(p) },
  { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
];

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) { setError('Username is required.'); return; }
    if (username.length < 3) { setError('Username must be at least 3 characters.'); return; }
    if (MOCK_USERS.some(u => u.username === username)) { setError('Username already taken. Try a different one.'); return; }
    if (MOCK_USERS.some(u => u.email === email)) { setError('Email already registered. Try signing in.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (!agreed) { setError('Please agree to the Terms of Service and Privacy Policy.'); return; }

    setLoading(true);
    setTimeout(() => {
      const user = register(username, email, password);
      toast.success(`Welcome to StackTruth, ${user.username}! 🚀`);
      navigate('/dashboard');
    }, 800);
  };

  const handleGitHub = () => {
    const user = loginWithGitHub();
    toast.success(`Joined as ${user.username} via GitHub!`);
    navigate('/dashboard');
  };

  const handleGoogle = () => {
    const user = loginWithGoogle();
    toast.success(`Joined as ${user.username} via Google!`);
    navigate('/dashboard');
  };

  const passwordStrength = PASSWORD_RULES.filter(r => r.test(password)).length;
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong'][passwordStrength];
  // Theme‑aware strength colors – they adapt automatically in dark/light mode
  const strengthColor = [
    '',
    'text-destructive',
    'text-warning',   // define `text-warning` in your theme, or use orange-500
    'text-accent'
  ][passwordStrength];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content area – grows to push footer down */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left decorative panel – now theme‑friendly */}
        <div className="hidden lg:flex flex-col w-full lg:w-[44%] bg-card/50 dark:bg-card/30 border-r border-border p-10 relative overflow-hidden">
          {/* Subtle grid pattern that works on any background */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
               style={{ backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <Link to="/" className="flex items-center gap-2 relative z-10">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-base">Stack<span className="text-primary">Truth</span></span>
          </Link>

          <div className="flex-1 flex flex-col justify-center relative z-10 py-12">
            <Terminal className="w-10 h-10 text-accent mb-5" />
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Join the best
              <br />
              <span className="text-accent">developer community</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Ask questions, review code with AI, build your reputation, and collaborate with thousands of engineers.
            </p>

            <div className="space-y-4">
              {[
                { step: '01', title: 'Create your account', desc: 'Takes less than 2 minutes' },
                { step: '02', title: 'Set up your profile', desc: 'Add your skills and tech stack' },
                { step: '03', title: 'Start contributing', desc: 'Ask questions, answer, review code' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-primary/60 mt-0.5 w-6 shrink-0">{step}</span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy card – now using standard card styling */}
          <div className="relative z-10 rounded-lg border border-border bg-background/50 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold">Privacy First</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Your code and data are never sold. AI reviews are session-only and not stored.</p>
          </div>
        </div>

        {/* Right side: Registration form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8 lg:hidden">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to home
            </Link>

            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-1">Create your account</h1>
              <p className="text-sm text-muted-foreground">Join 8,400+ developers on StackTruth</p>
            </div>

            {/* OAuth Providers */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button type="button" onClick={handleGitHub}
                className="flex items-center justify-center gap-2 border border-border bg-background hover:bg-secondary/50 py-3 rounded-lg transition-all text-sm font-semibold">
                <Github className="w-4 h-4" />
                GitHub
              </button>
              <button type="button" onClick={handleGoogle}
                className="flex items-center justify-center gap-2 border border-border bg-background hover:bg-secondary/50 py-3 rounded-lg transition-all text-sm font-semibold">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google
              </button>
            </div>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-background text-xs text-muted-foreground">or register with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2.5 p-3.5 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text" value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  required placeholder="your_handle" autoComplete="username"
                  className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {username && (
                  <p className="text-xs text-muted-foreground mt-1">stacktruth.dev/profile/<span className="text-primary font-mono">{username}</span></p>
                )}
              </div>

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
                  {password && <span className={`text-xs font-semibold ${strengthColor}`}>{strengthLabel}</span>}
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} required placeholder="Min. 8 characters"
                    className="w-full px-3.5 py-2.5 pr-10 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                          i <= passwordStrength 
                            ? passwordStrength === 3 
                              ? 'bg-accent' 
                              : passwordStrength === 2 
                                ? 'bg-warning' 
                                : 'bg-destructive'
                            : 'bg-secondary'
                        }`} />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 gap-0.5">
                      {PASSWORD_RULES.map(rule => (
                        <div key={rule.label} className={`flex items-center gap-1.5 text-xs ${rule.test(password) ? 'text-accent' : 'text-muted-foreground/50'}`}>
                          <Check className="w-3 h-3" /> {rule.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-border accent-primary cursor-pointer" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <button type="submit" disabled={loading}
                className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-primary/20">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Creating account...</>
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer – now properly outside the main flex row */}
      <FullFooter />
    </div>
  );
}