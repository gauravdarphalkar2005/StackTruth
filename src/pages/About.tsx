import { Link } from 'react-router-dom';
import { Zap, Users, Target, Globe, ArrowRight, Github, Twitter, Linkedin, CheckCircle2, Terminal, Award, Sparkles } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';
import { ThemeToggle } from '@/components/features/ThemeToggle';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const TEAM = [
  { name: 'Sarah Chen', role: 'Co-Founder & CTO', bio: 'Systems engineer. Previously at Stripe and distributed systems @ Jane Street.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah_ceo&backgroundColor=dbeafe', skills: ['Distributed Systems', 'Rust', 'Go'] },
  { name: 'Marcus Wilson', role: 'Co-Founder & CEO', bio: 'Developer community builder. Built DevForums to 200k users before StackTruth.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=marcus_cto&backgroundColor=dcfce7', skills: ['Product', 'Community', 'TypeScript'] },
  { name: 'Priya Nair', role: 'Head of AI/ML', bio: 'ML engineer from Google Brain. Leading AI code review and developer assistant features.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=priya_ml&backgroundColor=fce7f3', skills: ['LLMs', 'Python', 'PyTorch'] },
  { name: 'James Okafor', role: 'Head of Design', bio: 'Product designer. Previously designed developer tools at Vercel and Linear.', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=james_design&backgroundColor=fef9c3', skills: ['UI/UX', 'Design Systems', 'Figma'] },
];

const VALUES = [
  { icon: Terminal, title: 'Engineer-first', desc: 'Every decision is made from an engineering perspective. We build for developers, not just end users.' },
  { icon: Target, title: 'Quality over quantity', desc: 'We actively curate content quality. A smaller library of great answers beats a massive library of noise.' },
  { icon: Globe, title: 'Radical transparency', desc: 'Our reputation system, moderation decisions, and product roadmap are fully visible to the community.' },
  { icon: Sparkles, title: 'AI as a tool, not a replacement', desc: 'AI enhances human expert answers. We never let AI replace peer validation and human expertise.' },
];

const MILESTONES = [
  { year: '2022', event: 'StackTruth founded by Sarah and Marcus in San Francisco.' },
  { year: 'Q2 2022', event: 'Raised $1.2M seed from developer-focused angel investors.' },
  { year: 'Q4 2022', event: 'Beta launch with 500 developers. First AI code review shipped.' },
  { year: '2023', event: 'Grew to 3,000 developers. Reputation system v2 launched.' },
  { year: 'Q3 2023', event: 'Series A of $5M. Priya joined to lead AI/ML expansion.' },
  { year: '2024', event: 'Crossed 8,400 active developers. Launched Team workspaces.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"><Zap className="w-4 h-4 text-primary-foreground" /></div>
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
      <section className="py-20 sm:py-28 px-4 sm:px-6 text-center border-b border-border">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 block">About StackTruth</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Built by developers,
            <br />
            <span className="text-primary">for developers</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're engineers who were frustrated with existing developer Q&A platforms. So we built what we always wanted — a quality-first, AI-enhanced, reputation-transparent platform designed around how engineers actually think and work.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-3 block">Our Mission</span>
            <h2 className="text-3xl font-bold mb-5">Raising the quality bar for developer knowledge</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              The internet is full of outdated Stack Overflow answers from 2014, generic blog posts written for SEO, and AI-generated code that confidently produces bugs.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              StackTruth is built around a simple belief: <strong className="text-foreground">quality over quantity</strong>. Every answer goes through community validation, AI review, and reputation-weighted ranking. We exist to make it easier to find correct, modern, production-grade solutions to real engineering problems.
            </p>
            <div className="space-y-2">
              {['Peer-validated answers ranked by expertise', 'AI that enhances — not replaces — human knowledge', 'Transparent reputation based on contribution quality', 'Modern developer UX that doesn\'t waste your time'].map(item => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Active developers', value: '8,400+', color: 'text-primary' },
              { label: 'Questions answered', value: '87k+', color: 'text-accent' },
              { label: 'AI code reviews', value: '12k+', color: 'text-yellow-500' },
              { label: 'Verified experts', value: '340+', color: 'text-purple-400' },
            ].map(({ label, value, color }) => (
              <div key={label} className="card-panel p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className={`text-2xl font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3 block">Our Values</span>
            <h2 className="text-3xl font-bold">What we believe in</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-panel p-6">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">The Team</span>
            <h2 className="text-3xl font-bold">Meet the people building StackTruth</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {TEAM.map(({ name, role, bio, avatar, skills }) => (
              <div key={name} className="card-panel p-5 flex gap-4 hover:border-primary/30 transition-colors">
                <img src={avatar} alt={name} className="w-14 h-14 rounded-xl border border-border shrink-0" />
                <div>
                  <h3 className="font-bold">{name}</h3>
                  <p className="text-xs text-primary font-medium mb-1.5">{role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">{bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map(s => <span key={s} className="tag-chip text-[10px] px-2 py-0.5">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 bg-secondary/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-yellow-500 uppercase tracking-widest mb-3 block">Timeline</span>
            <h2 className="text-3xl font-bold">Our journey</h2>
          </div>
          <div className="relative pl-8 space-y-6">
            <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border" />
            {MILESTONES.map(({ year, event }, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[22px] w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <div className="card-panel p-4">
                  <span className="text-xs font-bold text-primary font-mono">{year}</span>
                  <p className="text-sm text-muted-foreground mt-1">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Be part of the story</h2>
          <p className="text-muted-foreground mb-6">Join 8,400+ engineers building better code together.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-primary py-3 px-7 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              Join Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary py-3 px-7">Contact Us</Link>
          </div>
        </div>
      </section>

      <FullFooter />
    </div>
  );
}