import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, MessageSquare, Github, Twitter, Linkedin, MapPin, Clock, CheckCircle2, AlertCircle, ArrowRight, Send, ExternalLink } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { toast } from 'sonner';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const CONTACT_OPTIONS = [
  { 
    icon: Mail, 
    title: 'General Inquiries', 
    desc: 'Questions about the platform', 
    contact: 'contact@onspace.ai',
    type: 'email',
    href: 'mailto:contact@onspace.ai'
  },
  { 
    icon: MessageSquare, 
    title: 'Support', 
    desc: 'Technical help & bug reports', 
    contact: 'support@stacktruth.dev',
    type: 'email',
    href: 'mailto:support@stacktruth.dev'
  },
  { 
    icon: Github, 
    title: 'GitHub', 
    desc: 'Open issues & contributions', 
    contact: 'github.com/stacktruth',
    type: 'link',
    href: 'https://github.com/stacktruth'
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', category: 'general' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Message sent! We\'ll respond within 24 hours.');
    }, 1400);
  };

  const update = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => { const ne = { ...e }; delete ne[field]; return ne; });
  };

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
      <section className="py-16 sm:py-20 px-4 sm:px-6 text-center border-b border-border">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 block">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">We'd love to hear from you</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Have a question, found a bug, or want to partner with us? Reach out and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Options – NOW FULLY CLICKABLE */}
      <section className="py-10 px-4 sm:px-6 border-b border-border">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
          {CONTACT_OPTIONS.map(({ icon: Icon, title, desc, contact, type, href }) => (
            <a
              key={title}
              href={href}
              target={type === 'link' ? '_blank' : undefined}
              rel={type === 'link' ? 'noopener noreferrer' : undefined}
              className="card-panel p-5 text-center hover:border-primary/30 transition-all group cursor-pointer block no-underline"
            >
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1 text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{desc}</p>
              <p className="text-xs text-primary font-mono inline-flex items-center gap-1 group-hover:underline">
                {contact}
                {type === 'link' && <ExternalLink className="w-3 h-3" />}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Main Form + Info (unchanged) */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-6">Send us a message</h2>
            {sent ? (
              <div className="card-panel p-10 text-center">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">Message sent!</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Thanks for reaching out, <strong className="text-foreground">{form.name}</strong>. We'll reply to <strong className="text-foreground">{form.email}</strong> within 24 hours.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '', category: 'general' }); }}
                  className="btn-secondary text-sm py-2 px-5">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full name <span className="text-destructive">*</span></label>
                    <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name"
                      className={`w-full px-3.5 py-2.5 bg-input border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.name ? 'border-destructive' : 'border-border'}`} />
                    {errors.name && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email <span className="text-destructive">*</span></label>
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com"
                      className={`w-full px-3.5 py-2.5 bg-input border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.email ? 'border-destructive' : 'border-border'}`} />
                    {errors.email && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select value={form.category} onChange={e => update('category', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                    {['general', 'support', 'billing', 'partnership', 'feedback', 'bug-report'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject <span className="text-destructive">*</span></label>
                  <input type="text" value={form.subject} onChange={e => update('subject', e.target.value)} placeholder="Brief description of your inquiry"
                    className={`w-full px-3.5 py-2.5 bg-input border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${errors.subject ? 'border-destructive' : 'border-border'}`} />
                  {errors.subject && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message <span className="text-destructive">*</span></label>
                  <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className={`w-full px-3.5 py-2.5 bg-input border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none ${errors.message ? 'border-destructive' : 'border-border'}`} />
                  {errors.message && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                  <p className="text-xs text-muted-foreground mt-1">{form.message.length} characters</p>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary flex items-center gap-2 py-2.5 px-6 disabled:opacity-60 shadow-lg shadow-primary/20">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar info (unchanged but theme‑aware) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4 text-foreground">Response times</h3>
              <div className="space-y-3">
                {[
                  { type: 'General inquiries', time: '24 hours', color: 'text-accent' },
                  { type: 'Support tickets', time: '4–8 hours', color: 'text-primary' },
                  { type: 'Billing issues', time: '2–4 hours', color: 'text-yellow-500' },
                  { type: 'Critical bugs', time: '< 1 hour', color: 'text-destructive' },
                ].map(({ type, time, color }) => (
                  <div key={type} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{type}</span>
                    <span className={`font-semibold text-xs ${color}`}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4 text-primary" /> Office hours
              </h3>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <p>Mon–Fri: 9:00 AM – 6:00 PM UTC</p>
                <p>Weekends: Best-effort coverage</p>
                <p className="text-xs mt-2 text-muted-foreground/60">Community support is 24/7 via the platform.</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3 text-foreground">Quick links</h3>
              <div className="space-y-2">
                {[
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Feature Request (Q&A)', href: '/questions' },
                ].map(({ label, href }) => (
                  <Link key={label} to={href} className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-1">
                    {label} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3 text-foreground">Follow us</h3>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: 'https://github.com/stacktruth' },
                  { icon: Twitter, href: 'https://twitter.com/stacktruth' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/stacktruth' },
                ].map(({ icon: Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" 
                    className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FullFooter />
    </div>
  );
}