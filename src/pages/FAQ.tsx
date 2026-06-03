import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Plus, Minus, Search, ArrowRight, MessageSquare, HelpCircle } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';
import { ThemeToggle } from '@/components/features/ThemeToggle';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const FAQ_CATEGORIES = [
  {
    category: 'Getting Started',
    icon: '🚀',
    faqs: [
      { q: 'How do I get started on StackTruth?', a: 'Create a free account, set up your developer profile with your skills and tech stack, and start browsing or asking questions. The process takes under 2 minutes.' },
      { q: 'Is StackTruth free to use?', a: 'Yes — our core features are free forever. You get 10 questions/month, 5 AI code reviews/month, and full community access. Pro ($12/mo) removes all limits.' },
      { q: 'Can I use StackTruth without creating an account?', a: 'You can browse all public questions and answers without an account. To ask questions, post answers, or use AI code review, you need to sign up (it\'s free).' },
    ],
  },
  {
    category: 'Q&A System',
    icon: '❓',
    faqs: [
      { q: 'How do I ask a good question?', a: 'Include a clear title, describe the problem in detail (what you tried, what happened vs expected), and add a minimal code snippet. Add relevant tags so experts find your question.' },
      { q: 'How does voting work?', a: 'Community members upvote (+1) or downvote (-1) questions and answers. Votes affect both the ranking of content and the reputation of the author.' },
      { q: 'What does "accepting an answer" mean?', a: 'If you asked the question, you can mark the answer that best solved your problem as "accepted." This awards the answerer +15 reputation and helps future visitors find the best solution quickly.' },
      { q: 'Can I edit my questions and answers?', a: 'Yes. You can edit your own posts at any time. High-reputation users can also suggest edits to improve clarity — these require the original author\'s approval.' },
    ],
  },
  {
    category: 'AI Code Review',
    icon: '🤖',
    faqs: [
      { q: 'What does AI code review check for?', a: 'The AI analyzes code for bugs and logic errors, security vulnerabilities, performance issues, code style violations, missing error handling, type safety (TypeScript), and gives a 0–100 quality score.' },
      { q: 'How many languages does AI review support?', a: 'TypeScript, JavaScript, Python, Rust, Go, Java, C++, SQL, Dockerfile, Bash, CSS, HTML, and 20+ additional languages. Language support is continuously expanded.' },
      { q: 'Is my code stored or shared?', a: 'No. Code submitted for review is used only for that analysis session and immediately discarded. We never store or share your code snippets. Enterprise plans include additional contractual data isolation.' },
      { q: 'How accurate is the AI review?', a: 'For common bug patterns and security issues, accuracy is very high (95%+). For complex architectural or business-logic issues, AI provides guidance but human expert review is recommended.' },
    ],
  },
  {
    category: 'Reputation & Badges',
    icon: '🏆',
    faqs: [
      { q: 'How do I earn reputation points?', a: 'Question upvoted: +5. Answer upvoted: +10. Answer accepted: +15. Accept an answer you asked: +2. Downvoted: -2 (question or answer). Downvoting someone else: -1.' },
      { q: 'What are the reputation levels?', a: 'Newcomer (0–99), Member (100–999), Veteran (1,000–4,999), Expert (5,000–9,999), Legendary (10,000+). Higher levels unlock moderation privileges and Expert badge eligibility.' },
      { q: 'How do I become a Verified Expert?', a: 'Verified Experts are nominated by the community when they consistently provide high-quality answers in a specific domain. Requirements include 5,000+ reputation and 50+ accepted answers.' },
      { q: 'Can I lose reputation?', a: 'Yes, from downvotes (-2 each) and if the community finds your content to be spam or low quality. However, you can never go below 1 reputation.' },
    ],
  },
  {
    category: 'Account & Privacy',
    icon: '🔒',
    faqs: [
      { q: 'How do I delete my account?', a: 'Go to Settings → Account → Delete Account. Your questions and answers will be anonymized (not deleted) to preserve community knowledge. Contact support to request full deletion.' },
      { q: 'Can I change my username?', a: 'Yes, once every 30 days. Go to Profile → Edit Profile to update your username. Note: your profile URL will change, which may break existing links.' },
      { q: 'What data does StackTruth collect?', a: 'We collect your email, username, and profile information you provide. We also track usage for platform analytics. We never sell personal data. Full details in our Privacy Policy.' },
    ],
  },
];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const allFaqs = FAQ_CATEGORIES.flatMap(cat => cat.faqs.map(faq => ({ ...faq, category: cat.category })));
  const filtered = search
    ? allFaqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : null;

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
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 block">FAQ</span>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-7">Find answers to the most common questions about StackTruth.</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search all questions..."
              className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {filtered ? (
            <div>
              <p className="text-sm text-muted-foreground mb-6">{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"</p>
              <div className="space-y-3">
                {filtered.map((faq, i) => (
                  <div key={i} className="card-panel overflow-hidden">
                    <button onClick={() => setOpen(open === `s-${i}` ? null : `s-${i}`)}
                      className="w-full flex items-start justify-between p-5 text-left hover:bg-secondary/30 transition-colors gap-4">
                      <div>
                        <span className="text-[10px] text-primary font-bold uppercase mb-1 block">{faq.category}</span>
                        <span className="text-sm font-medium">{faq.q}</span>
                      </div>
                      {open === `s-${i}` ? <Minus className="w-4 h-4 text-primary shrink-0 mt-1" /> : <Plus className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />}
                    </button>
                    {open === `s-${i}` && (
                      <div className="px-5 pb-5 border-t border-border pt-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {FAQ_CATEGORIES.map(({ category, icon, faqs }) => (
                <div key={category}>
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2.5">
                    <span>{icon}</span>
                    {category}
                  </h2>
                  <div className="space-y-3">
                    {faqs.map((faq, i) => {
                      const key = `${category}-${i}`;
                      return (
                        <div key={key} className="card-panel overflow-hidden">
                          <button onClick={() => setOpen(open === key ? null : key)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors gap-4">
                            <span className="text-sm font-medium">{faq.q}</span>
                            {open === key ? <Minus className="w-4 h-4 text-primary shrink-0" /> : <Plus className="w-4 h-4 text-muted-foreground shrink-0" />}
                          </button>
                          {open === key && (
                            <div className="px-5 pb-5 border-t border-border pt-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Still have questions */}
          <div className="mt-14 card-panel p-7 text-center border-primary/20">
            <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-5">Can't find what you're looking for? Our team responds within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-primary flex items-center justify-center gap-2 py-2.5 px-6">
                <MessageSquare className="w-4 h-4" /> Contact Support
              </Link>
              <Link to="/questions" className="btn-secondary flex items-center justify-center gap-2 py-2.5 px-6">
                Browse Community Q&A <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FullFooter />
    </div>
  );
}
