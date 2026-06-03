import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FullFooter } from '@/components/layout/FullFooter';
import {
  Zap, MessageSquare, Bot, Trophy, Users, ArrowRight, Star,
  GitBranch, Shield, BarChart3, Cpu, Lock, Globe, Activity,
  CheckCircle2, Code2, Terminal, Layers, Sparkles, ArrowUpRight
} from 'lucide-react';
import { ThemeToggle } from '@/components/features/ThemeToggle';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const FEATURES_DETAILED = [
  {
    category: 'Core Platform',
    color: 'text-primary',
    bgColor: 'bg-primary/8',
    borderColor: 'border-primary/20',
    items: [
      {
        icon: MessageSquare,
        title: 'Technical Q&A System',
        desc: 'Ask and answer engineering questions with full markdown support, syntax-highlighted code blocks, and peer validation. Vote on answers, accept best solutions, and build a curated knowledge base.',
        highlights: ['Markdown editor', 'Syntax highlighting', 'Code snippets', 'Upvote/downvote', 'Accept answers'],
      },
      {
        icon: Code2,
        title: 'Multi-Language Code Support',
        desc: 'Share code snippets in 30+ programming languages with automatic syntax highlighting. Copy to clipboard, see line numbers, and get language-specific formatting.',
        highlights: ['30+ languages', 'Line numbers', 'Copy button', 'Language detection', 'Theme-aware'],
      },
    ],
  },
  {
    category: 'AI Intelligence',
    color: 'text-accent',
    bgColor: 'bg-accent/8',
    borderColor: 'border-accent/20',
    items: [
      {
        icon: Bot,
        title: 'AI Code Review Engine',
        desc: 'Paste any code snippet and get instant AI-powered analysis. Detect bugs, security issues, performance bottlenecks, and code smell. Receive a 0–100 quality score with actionable improvement suggestions.',
        highlights: ['Bug detection', 'Security scan', 'Quality score', 'Fix suggestions', 'Multi-language'],
      },
      {
        icon: Sparkles,
        title: 'Smart Search & Discovery',
        desc: 'Find relevant questions, experts, and knowledge instantly with semantic search. Filter by language, tags, reputation, and answer quality.',
        highlights: ['Semantic search', 'Tag filtering', 'Expert discovery', 'Related questions', 'Quick filter'],
      },
    ],
  },
  {
    category: 'Community & Reputation',
    color: 'text-[hsl(48,96%,53%)]',
    bgColor: 'bg-yellow-500/8',
    borderColor: 'border-yellow-500/20',
    items: [
      {
        icon: Trophy,
        title: 'Transparent Reputation System',
        desc: 'A fully transparent reputation engine where every point is earned through genuine contribution. Earn for upvotes, accepted answers, and peer recognition. Lose nothing for quality questions.',
        highlights: ['+10 per upvote', '+15 accepted', 'Leaderboard rank', 'Expert badges', 'Level progression'],
      },
      {
        icon: Shield,
        title: 'Verified Expert Program',
        desc: "Top contributors with consistent quality answers can earn Verified Expert status. Expert badges appear prominently on answers, building community trust.",
        highlights: ['Peer verification', 'Expert badge', 'Trusted answers', 'Mentor program', 'Domain specialization'],
      },
    ],
  },
  {
    category: 'Developer Tools',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/8',
    borderColor: 'border-purple-400/20',
    items: [
      {
        icon: Users,
        title: 'Developer Profiles',
        desc: 'Showcase your expertise with a rich developer profile including tech stack, GitHub links, portfolio URL, contribution history, and reputation stats.',
        highlights: ['Skills tags', 'GitHub integration', 'Portfolio link', 'Activity history', 'Reputation display'],
      },
      {
        icon: BarChart3,
        title: 'Analytics Dashboard',
        desc: 'Track your learning journey with detailed contribution analytics — questions asked, answers given, reputation growth over time, and skill progression.',
        highlights: ['Contribution graph', 'Reputation trends', 'Skill tracking', 'Community impact', 'Personal insights'],
      },
    ],
  },
];

const COMPARISON = [
  { feature: 'Technical Q&A', stacktruth: true, stackoverflow: true, devto: false },
  { feature: 'AI Code Review', stacktruth: true, stackoverflow: false, devto: false },
  { feature: 'Quality Scoring', stacktruth: true, stackoverflow: false, devto: false },
  { feature: 'Transparent Reputation', stacktruth: true, stackoverflow: true, devto: false },
  { feature: 'Expert Verification', stacktruth: true, stackoverflow: false, devto: false },
  { feature: 'Dark Mode First', stacktruth: true, stackoverflow: false, devto: true },
  { feature: 'Modern Developer UX', stacktruth: true, stackoverflow: false, devto: true },
  { feature: 'Real-time Notifications', stacktruth: true, stackoverflow: true, devto: true },
];

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Stack<span className="text-primary">Truth</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} to={href} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50">{label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="btn-secondary text-sm py-2 px-3 hidden sm:block">Sign In</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-3">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 block">Platform Features</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            Everything you need to
            <br />
            <span className="text-primary">grow as an engineer</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            StackTruth combines a modern Q&A platform, AI-powered code review, transparent reputation mechanics, and a thriving developer community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="btn-primary py-3 px-7 flex items-center gap-2 shadow-lg shadow-primary/20">
              Start Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/questions" className="btn-secondary py-3 px-7">Browse Questions</Link>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {FEATURES_DETAILED.map(({ category, color, bgColor, borderColor, items }) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-7">
                <div className={`h-px flex-1 ${bgColor} border-t ${borderColor}`} />
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${borderColor} ${bgColor} ${color}`}>{category}</span>
                <div className={`h-px flex-1 ${bgColor} border-t ${borderColor}`} />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {items.map(({ icon: Icon, title, desc, highlights }) => (
                  <div key={title} className={`card-panel p-6 border ${borderColor} hover:shadow-lg transition-all`}>
                    <div className={`w-11 h-11 ${bgColor} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map(h => (
                        <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">{h}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 bg-secondary/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">How we compare</h2>
            <p className="text-muted-foreground">StackTruth vs the alternatives</p>
          </div>
          <div className="card-panel overflow-hidden">
            <div className="grid grid-cols-4 p-4 border-b border-border bg-secondary/40">
              <span className="text-sm font-semibold col-span-1">Feature</span>
              <span className="text-sm font-bold text-primary text-center">StackTruth</span>
              <span className="text-sm font-semibold text-muted-foreground text-center">Stack Overflow</span>
              <span className="text-sm font-semibold text-muted-foreground text-center">Dev.to</span>
            </div>
            {COMPARISON.map(({ feature, stacktruth, stackoverflow, devto }) => (
              <div key={feature} className="grid grid-cols-4 px-4 py-3 border-b border-border/50 hover:bg-secondary/20 transition-colors last:border-0">
                <span className="text-sm text-muted-foreground col-span-1">{feature}</span>
                <div className="flex justify-center">
                  {stacktruth ? <CheckCircle2 className="w-4 h-4 text-accent" /> : <span className="text-muted-foreground/30 text-lg">—</span>}
                </div>
                <div className="flex justify-center">
                  {stackoverflow ? <CheckCircle2 className="w-4 h-4 text-muted-foreground/50" /> : <span className="text-muted-foreground/30 text-lg">—</span>}
                </div>
                <div className="flex justify-center">
                  {devto ? <CheckCircle2 className="w-4 h-4 text-muted-foreground/50" /> : <span className="text-muted-foreground/30 text-lg">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to try it all?</h2>
          <p className="text-muted-foreground mb-7">Get access to all features free. No credit card required.</p>
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 py-3 px-8 shadow-lg shadow-primary/20">
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </section>

      <FullFooter />
    </div>
  );
}
