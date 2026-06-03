import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Zap, Shield, Bot, Trophy, MessageSquare, Code2, Users,
  TrendingUp, Star, CheckCircle, Github, Play, ChevronDown, Menu, X,
  Terminal, Cpu, GitBranch, Lock, BarChart3, Sparkles, Quote, Plus, Minus,
  Twitter, Linkedin, Globe, Mail, ArrowUpRight, Check, Layers, Activity,
  Bell
} from 'lucide-react';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_NOTIFICATIONS } from '@/lib/mockData';
import heroImg from '@/assets/hero.jpg';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const STATS = [
  { label: 'Active Developers', value: '8,420+', delta: '+12% this month' },
  { label: 'Questions Answered', value: '87.3k', delta: '94% answer rate' },
  { label: 'Code Reviews', value: '12.4k', delta: 'AI-powered' },
  { label: 'Expert Mentors', value: '340+', delta: 'Verified experts' },
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Technical Q&A Engine',
    desc: 'Ask real engineering questions with syntax-highlighted code, peer validation, and expert-ranked answers.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    badge: 'Core',
  },
  {
    icon: Bot,
    title: 'AI Code Review',
    desc: 'Paste code for instant AI analysis — bug detection, security flags, quality scores, and optimization tips.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    badge: 'AI',
  },
  {
    icon: Trophy,
    title: 'Reputation System',
    desc: 'Earn points for upvotes, accepted answers, and peer validation. Rise through a transparent leaderboard.',
    color: 'text-[hsl(48,96%,53%)]',
    bg: 'bg-yellow-500/10',
    badge: 'Gamified',
  },
  {
    icon: Shield,
    title: 'Verified Experts',
    desc: 'Top contributors earn Expert badges after peer review, making trusted answers stand out.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    badge: 'Trust',
  },
  {
    icon: GitBranch,
    title: 'Code Snippets',
    desc: 'Share runnable code blocks with highlighting across 30+ languages. Copy, fork, and build on together.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    badge: 'Dev',
  },
  {
    icon: Users,
    title: 'Developer Community',
    desc: 'Follow experts in your stack, get notified on answers, and build your professional developer identity.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    badge: 'Social',
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Ask Your Question',
    desc: 'Write a detailed technical question with code snippets, error messages, and what you\'ve already tried. Our markdown editor makes it easy.',
    icon: MessageSquare,
    color: 'text-primary',
  },
  {
    step: '02',
    title: 'Get Expert Answers',
    desc: 'Community experts and AI both respond with validated solutions. Upvote the best answers and accept the one that solves your problem.',
    icon: CheckCircle,
    color: 'text-accent',
  },
  {
    step: '03',
    title: 'Review Your Code',
    desc: 'Paste any code snippet for instant AI analysis — quality score, bug detection, security review, and concrete improvement suggestions.',
    icon: Bot,
    color: 'text-purple-400',
  },
  {
    step: '04',
    title: 'Build Reputation',
    desc: 'Your contributions earn reputation points. Rise through the leaderboard, earn Expert status, and become a trusted voice in your domain.',
    icon: Trophy,
    color: 'text-[hsl(48,96%,53%)]',
  },
];

const BENEFITS = [
  { icon: Cpu, title: 'AI-Powered Analysis', desc: 'GPT-based code review with real technical insight, not generic suggestions.' },
  { icon: Lock, title: 'Verified Answers', desc: 'Community-validated answers ranked by reputation, not just time posted.' },
  { icon: Activity, title: 'Real-time Updates', desc: 'Live notifications for answers, mentions, and reputation changes.' },
  { icon: BarChart3, title: 'Progress Tracking', desc: 'Detailed analytics on your contributions, skills, and learning growth.' },
  { icon: Layers, title: 'Multi-language', desc: 'Full support for 30+ programming languages with syntax highlighting.' },
  { icon: Sparkles, title: 'Zero Noise', desc: 'Curated, high-quality content. No spam, no low-effort posts.' },
];

const TESTIMONIALS = [
  {
    quote: "StackTruth helped me debug a complex async Rust issue in 20 minutes that I'd been stuck on for 3 days. The AI review spotted the lifetime issue instantly.",
    name: 'Marcus Chen',
    role: 'Senior Backend Engineer @ Stripe',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=marcus2&backgroundColor=dbeafe',
    rating: 5,
  },
  {
    quote: "The code review feature is incredible. It catches security issues I would have missed and explains why they're problems — not just flags them.",
    name: 'Priya Sharma',
    role: 'Full-Stack Developer @ Linear',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=priya&backgroundColor=fce7f3',
    rating: 5,
  },
  {
    quote: "I've tried Stack Overflow and Dev.to, but StackTruth's reputation system actually incentivizes giving good answers. My mentoring reach grew 3x here.",
    name: 'James Okafor',
    role: 'Principal Engineer & Mentor',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=james&backgroundColor=dcfce7',
    rating: 5,
  },
];

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'Perfect for getting started',
    features: ['Unlimited Q&A browsing', '10 questions/month', '5 AI code reviews/month', 'Community access', 'Basic reputation system'],
    cta: 'Get Started Free',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    price: { monthly: 12, yearly: 9 },
    desc: 'For serious developers',
    features: ['Unlimited questions', 'Unlimited AI code reviews', 'Priority expert answers', 'Advanced analytics', 'Badge & certification system', 'API access (100k req/mo)'],
    cta: 'Start Pro Trial',
    href: '/register',
    highlight: true,
  },
  {
    name: 'Team',
    price: { monthly: 49, yearly: 39 },
    desc: 'For engineering teams',
    features: ['Everything in Pro', 'Private team workspace', 'Shared code snippets', 'Team analytics dashboard', 'SSO & admin controls', 'Priority support'],
    cta: 'Start Team Trial',
    href: '/register',
    highlight: false,
  },
];

const FAQS = [
  {
    q: 'How is StackTruth different from Stack Overflow?',
    a: "StackTruth combines a modern Q&A system with AI-powered code review, transparent reputation mechanics, and a community-first design. We focus on code quality validation and developer growth, not just raw answer volume.",
  },
  {
    q: 'How does the AI code review work?',
    a: 'You paste code into the review panel and our AI analyzes it for bugs, security vulnerabilities, code style issues, and optimization opportunities. You get a quality score (0–100), categorized issues, and concrete fix suggestions.',
  },
  {
    q: 'Is my code stored or shared when I use AI review?',
    a: "Code submitted for review is only used for the analysis session and is not stored or shared with other users. Your private code stays private. Enterprise plans get additional data isolation guarantees.",
  },
  {
    q: 'How does the reputation system work?',
    a: 'You earn reputation by getting upvotes on your questions (+5) and answers (+10), having your answer accepted (+15), and through peer recognition. Reputation is transparent and tied directly to contribution quality.',
  },
  {
    q: 'Can I use StackTruth for my team?',
    a: 'Yes — the Team plan includes private workspaces, shared code snippets, team-level analytics, SSO integration, and admin controls for managing team members and content.',
  },
  {
    q: 'What languages are supported for code review?',
    a: 'TypeScript, JavaScript, Python, Rust, Go, Java, C++, SQL, Dockerfile, Bash, CSS, HTML, and 20+ more. New language support is added based on community requests.',
  },
];

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Changelog', href: '/blog' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/about' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'FAQ', href: '/faq' },
  ],
  Developers: [
    { label: 'Questions', href: '/questions' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'AI Code Review', href: '/code-review' },
  ],
};

function AnimatedCounter({ target, duration = 1500 }: { target: string; duration?: number }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
        const suffix = target.replace(/[0-9.]/g, '');
        const steps = 40;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const val = (numeric * step) / steps;
          setDisplayed(`${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}${suffix}`);
          if (step >= steps) clearInterval(interval);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{displayed || target}</span>;
}

export default function Landing() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ── NAVBAR ─────────────────────────────── */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Stack<span className="text-primary">Truth</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} to={href} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50">
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <button 
                  onClick={() => navigate('/notifications')}
                  className="relative p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 shadow-sm transition-all"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <Link to={`/profile/${user.username}`} className="shrink-0">
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    className="w-8 h-8 rounded-full border border-slate-200 hover:border-primary hover:scale-105 transition-all shadow-sm object-cover" 
                  />
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4 shadow-lg shadow-primary/20">Get Started Free</Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md hover:bg-secondary">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card/98 backdrop-blur-md border-b border-border px-4 pb-4 space-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} to={href} onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm rounded-md hover:bg-secondary transition-colors">{label}</Link>
            ))}
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              {user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/dashboard" className="btn-primary text-sm text-center py-2.5" onClick={() => setMobileMenuOpen(false)}>Go to Dashboard</Link>
                  <Link to="/notifications" className="btn-secondary text-sm text-center py-2 flex items-center justify-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <Bell className="w-4 h-4" /> Notifications
                    {unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link to={`/profile/${user.username}`} className="flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg bg-secondary/50 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    <img src={user.avatar} alt={user.username} className="w-6 h-6 rounded-full border object-cover" />
                    <span>@{user.username}</span>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary text-sm text-center py-2.5" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  <Link to="/register" className="btn-primary text-sm text-center py-2.5" onClick={() => setMobileMenuOpen(false)}>Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── SECTION 1: HERO ────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(hsl(217,91%,60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217,91%,60%) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Developer Knowledge Platform · Trusted by 8,400+ Engineers
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Where Developers
              <br />
              <span className="relative">
                <span className="text-primary">Validate Truth</span>
              </span>
              <br />
              in Code
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Ask technical questions, get peer-validated solutions, and receive instant AI code reviews.
              Built for engineers who care about code quality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <button onClick={() => navigate('/register')}
                className="btn-primary text-base py-3.5 px-7 flex items-center gap-2 shadow-xl shadow-primary/25 w-full sm:w-auto justify-center">
                Start Contributing Free <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/questions')}
                className="btn-secondary text-base py-3.5 px-7 flex items-center gap-2 w-full sm:w-auto justify-center">
                <Play className="w-4 h-4" /> Browse Questions
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {STATS.map(({ label, value, delta }) => (
                <div key={label} className="card-panel p-4 sm:p-5 text-center hover:border-primary/40 transition-colors backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-0.5">
                    <AnimatedCounter target={value} />
                  </div>
                  <div className="text-xs font-medium text-foreground/80 mb-1">{label}</div>
                  <div className="text-[11px] text-muted-foreground">{delta}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: FEATURES ────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Platform Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything developers need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              A complete platform for technical learning, code validation, and developer growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg, badge }) => (
              <div key={title}
                className="card-panel p-5 sm:p-6 group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-secondary text-muted-foreground`}>{badge}</span>
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/features" className="btn-secondary inline-flex items-center gap-2 text-sm py-2.5 px-5">
              View All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PRODUCT WORKFLOW ────────── */}
      <section className="py-24 px-4 sm:px-6 bg-secondary/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(217,91%,60%) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-3 block">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">From question to solution</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">A seamless workflow from asking to answering, reviewing, and growing.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {WORKFLOW_STEPS.map(({ step, title, desc, icon: Icon, color }, idx) => (
              <div key={step} className="card-panel p-6 flex gap-4 group hover:border-primary/30 transition-all">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center font-mono font-bold text-xs text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {step}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <h3 className="font-semibold text-base">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/register" className="btn-primary inline-flex items-center gap-2 py-3 px-7 shadow-lg shadow-primary/20">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: BENEFITS ────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3 block">Why StackTruth</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">Built for how engineers actually work</h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                We built StackTruth to solve the gaps in existing dev platforms — better quality control, real AI assistance, and a reputation system that rewards genuine expertise.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {BENEFITS.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 p-3.5 rounded-lg border border-border/60 hover:border-border transition-colors">
                    <div className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5">{title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Mock Dashboard Preview */}
            <div className="relative">
              <div className="card-panel p-5 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono font-semibold text-muted-foreground">AI Code Analysis</span>
                  <span className="ml-auto text-xs text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded">Live</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Code Quality', value: 87, color: 'bg-accent' },
                    { label: 'Security Score', value: 94, color: 'bg-primary' },
                    { label: 'Performance', value: 78, color: 'bg-[hsl(48,96%,53%)]' },
                    { label: 'Maintainability', value: 91, color: 'bg-purple-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-bold text-foreground">{value}/100</span>
                      </div>
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border space-y-2">
                  {[
                    { sev: 'warning', msg: 'Missing error handling on async fetch' },
                    { sev: 'info', msg: 'Consider using URLSearchParams for query building' },
                    { sev: 'info', msg: 'Add return type annotation for clarity' },
                  ].map(({ sev, msg }, i) => (
                    <div key={i} className={`flex items-start gap-2 text-xs p-2 rounded ${sev === 'warning' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' : 'bg-secondary text-muted-foreground'}`}>
                      <span className="font-mono">{sev === 'warning' ? '⚠' : 'ℹ'}</span>
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: DASHBOARD PREVIEW ───────── */}
      <section className="py-24 px-4 sm:px-6 bg-secondary/40 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Dashboard</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Your developer command center</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Track your contributions, reputation growth, and community impact from one unified dashboard.</p>
          </div>

          {/* Mock Dashboard UI */}
          <div className="rounded-xl border border-border overflow-hidden shadow-2xl shadow-black/40 max-w-4xl mx-auto">
            {/* Browser chrome */}
            <div className="bg-muted border-b border-border px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[hsl(0,72%,51%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(48,96%,53%)]" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <div className="flex-1 bg-background border border-border rounded px-3 py-1 text-xs text-muted-foreground font-mono">
                app.stacktruth.dev/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-card p-5 grid grid-cols-3 gap-4">
              {/* Sidebar preview */}
              <div className="col-span-1 hidden sm:block space-y-1 border-r border-border pr-4">
                {['Dashboard', 'Questions', 'AI Review', 'Leaderboard', 'Notifications'].map((item, i) => (
                  <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                    <div className="w-3 h-3 rounded bg-current opacity-50" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content preview */}
              <div className="col-span-3 sm:col-span-2 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Reputation', value: '4,820', color: 'text-[hsl(48,96%,53%)]' },
                    { label: 'Answers', value: '187', color: 'text-accent' },
                    { label: 'Questions', value: '34', color: 'text-primary' },
                    { label: 'Accepted', value: '89', color: 'text-purple-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-secondary/60 rounded-lg p-2.5">
                      <div className={`text-lg font-bold ${color}`}>{value}</div>
                      <div className="text-[10px] text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {['How to handle TypeScript generics in...', 'React useEffect infinite loop patterns', 'PostgreSQL query optimization tips'].map((q) => (
                    <div key={q} className="flex items-center gap-2 bg-secondary/40 rounded px-2.5 py-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground truncate">{q}</span>
                      <span className="ml-auto text-primary shrink-0">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/register" className="btn-primary inline-flex items-center gap-2 py-3 px-6 shadow-lg shadow-primary/20">
              Get Your Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: TESTIMONIALS ────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-3 block">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Trusted by engineers worldwide</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">What developers say after using StackTruth to solve real problems.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, name, role, avatar, rating }) => (
              <div key={name} className="card-panel p-6 flex flex-col gap-4 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                <Quote className="w-7 h-7 text-primary/30" />
                <p className="text-sm text-foreground/85 leading-relaxed flex-1">"{quote}"</p>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[hsl(48,96%,53%)] text-[hsl(48,96%,53%)]" />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <img src={avatar} alt={name} className="w-9 h-9 rounded-full border border-border" />
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: PRICING ─────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-secondary/40" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">Start free. Upgrade when you need more. No hidden fees.</p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1 bg-secondary rounded-lg">
              <button onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${billingPeriod === 'monthly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
                Monthly
              </button>
              <button onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-all flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
                Yearly
                <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">Save 25%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div key={plan.name}
                className={`card-panel p-6 flex flex-col relative ${plan.highlight ? 'border-primary/60 shadow-xl shadow-primary/10' : ''}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.price[billingPeriod]}
                    </span>
                    {plan.price[billingPeriod] > 0 && (
                      <span className="text-sm text-muted-foreground">/mo</span>
                    )}
                  </div>
                  {plan.price[billingPeriod] === 0 && (
                    <span className="text-sm text-muted-foreground">Forever free</span>
                  )}
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.href}
                  className={`w-full text-center py-2.5 rounded-md text-sm font-semibold transition-all ${plan.highlight ? 'btn-primary shadow-lg shadow-primary/20' : 'btn-secondary'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            All plans include 14-day money-back guarantee. No credit card required for free plan.
          </p>
        </div>
      </section>

      {/* ── SECTION 8: FAQ ─────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[hsl(48,96%,53%)] uppercase tracking-widest mb-3 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Frequently asked questions</h2>
            <p className="text-muted-foreground">Everything you need to know about StackTruth.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map(({ q, a }, idx) => (
              <div key={idx} className="card-panel overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-medium text-sm pr-4">{q}</span>
                  {openFaq === idx
                    ? <Minus className="w-4 h-4 text-primary shrink-0" />
                    : <Plus className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-3">Still have questions?</p>
            <Link to="/contact" className="btn-secondary inline-flex items-center gap-2 text-sm py-2.5 px-5">
              <Mail className="w-4 h-4" /> Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: CTA BANNER ──────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-primary/25 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(hsl(217,91%,60%) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="relative p-10 sm:p-16 text-center">
              <div className="w-14 h-14 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Ready to elevate
                <br />
                your engineering?
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto mb-8">
                Join 8,400+ developers who use StackTruth to ask better questions, write better code, and build better careers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/register"
                  className="btn-primary text-base py-3.5 px-8 shadow-2xl shadow-primary/30 flex items-center gap-2 w-full sm:w-auto justify-center">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login"
                  className="btn-secondary text-base py-3.5 px-8 flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Github className="w-4 h-4" /> Continue with GitHub
                </Link>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-6">Free forever · No credit card needed · Set up in 2 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: FOOTER ─────────────────── */}
      <footer className="border-t border-border py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-base">Stack<span className="text-primary">Truth</span></span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 max-w-[180px]">
                Developer knowledge platform. Built for engineers, by engineers.
              </p>
              <div className="flex items-center gap-2">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-secondary rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} StackTruth. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
