import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, Clock, Tag, ArrowRight, Search, TrendingUp, User } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';
import { ThemeToggle } from '@/components/features/ThemeToggle';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const CATEGORIES = ['All', 'TypeScript', 'React', 'AI/ML', 'DevOps', 'Rust', 'Career'];

const POSTS = [
  {
    slug: 'typescript-5-new-features',
    title: 'TypeScript 5.5: The Features That Changed How We Write Types',
    excerpt: "TypeScript 5.5 shipped inferred type predicates, iterator methods, and a slew of performance improvements. Here's what matters for production code and how to migrate.",
    author: 'sarah_codes',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah&backgroundColor=dbeafe',
    date: 'Jan 15, 2024',
    readTime: '8 min read',
    category: 'TypeScript',
    featured: true,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&auto=format&q=80',
  },
  {
    slug: 'ai-code-review-workflow',
    title: 'How AI Code Review Caught 3 Critical Bugs Before Production',
    excerpt: 'A real-world case study of using AI-assisted code review in a fintech product pipeline. What the AI caught, what it missed, and how we tuned our workflow.',
    author: 'alex_dev',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=alex&backgroundColor=dcfce7',
    date: 'Jan 12, 2024',
    readTime: '6 min read',
    category: 'AI/ML',
    featured: false,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=300&fit=crop&auto=format&q=80',
  },
  {
    slug: 'rust-async-patterns',
    title: 'Rust Async Patterns: Beyond the Basics',
    excerpt: "After months of production async Rust, here's what the tutorials don't tell you. Real patterns for error handling, cancellation, and structured concurrency.",
    author: 'sarah_codes',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=sarah2&backgroundColor=dbeafe',
    date: 'Jan 8, 2024',
    readTime: '12 min read',
    category: 'Rust',
    featured: false,
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=300&fit=crop&auto=format&q=80',
  },
  {
    slug: 'building-reputation-developer',
    title: 'How to Build a Developer Reputation That Opens Doors',
    excerpt: 'From 0 to 5,000 reputation in 6 months — the specific strategies, answer frameworks, and community engagement patterns that worked for our top contributors.',
    author: 'dev_marcus',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=marcus&backgroundColor=fef9c3',
    date: 'Jan 5, 2024',
    readTime: '5 min read',
    category: 'Career',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=300&fit=crop&auto=format&q=80',
  },
  {
    slug: 'react-19-server-actions',
    title: 'React 19 Server Actions: The Full Mental Model',
    excerpt: "Server Actions aren't just about removing boilerplate. They fundamentally change how you think about data mutations, optimistic updates, and form handling.",
    author: 'dev_marcus',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=marcus2&backgroundColor=fef9c3',
    date: 'Jan 3, 2024',
    readTime: '10 min read',
    category: 'React',
    featured: false,
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&h=300&fit=crop&auto=format&q=80',
  },
  {
    slug: 'docker-compose-prod',
    title: 'Docker Compose in Production: What Nobody Tells You',
    excerpt: 'Practical lessons from running Docker Compose in production for 18 months — health checks, rolling updates, secrets management, and when to graduate to Kubernetes.',
    author: 'kiran_ml',
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=kiran&backgroundColor=fce7f3',
    date: 'Dec 28, 2023',
    readTime: '9 min read',
    category: 'DevOps',
    featured: false,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=300&fit=crop&auto=format&q=80',
  },
];

const NEWSLETTER_TOPICS = ['Weekly curated questions', 'AI/ML in developer tools', 'Language release notes', 'Career & reputation tips'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = POSTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = POSTS.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar - unchanged */}
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

      {/* Hero + Search + Categories */}
      <section className="py-16 px-4 sm:px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-6 flex-col sm:flex-row sm:items-center mb-8">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">Engineering Blog</span>
              <h1 className="text-3xl sm:text-4xl font-bold">Insights from the community</h1>
              <p className="text-muted-foreground mt-2 text-sm">Deep dives, tutorials, and perspectives from StackTruth's expert community.</p>
            </div>
            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Featured post (if any) – whole card is clickable */}
          {activeCategory === 'All' && !search && featured && (
            <div className="mb-10">
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Featured Article
              </div>
              <Link
                to={`/blog/${featured.slug}`}
                className="card-panel overflow-hidden hover:border-primary/30 transition-all group block cursor-pointer"
              >
                <div className="grid md:grid-cols-2">
                  <img src={featured.image} alt={featured.title} className="w-full h-52 md:h-full object-cover" />
                  <div className="p-7 flex flex-col justify-between">
                    <div>
                      <span className="tag-chip text-[10px] mb-3 inline-block">{featured.category}</span>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <img src={featured.avatar} alt="" className="w-6 h-6 rounded-full border border-border" />
                        <span>{featured.author}</span>
                        <span>·</span>
                        <span>{featured.readTime}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Regular posts grid - each card is a clickable Link */}
          {rest.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(post => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="card-panel overflow-hidden hover:border-primary/30 transition-all group flex flex-col cursor-pointer"
                >
                  <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="tag-chip text-[10px]">{post.category}</span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />{post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <img src={post.avatar} alt="" className="w-5 h-5 rounded-full border border-border" />
                        <span>{post.author}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p>No articles found{search ? ` for "${search}"` : ''}.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter section - unchanged */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Stay in the loop</h2>
          <p className="text-muted-foreground text-sm mb-2">Weekly engineering insights delivered to your inbox.</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {NEWSLETTER_TOPICS.map(t => (
              <span key={t} className="text-xs tag-chip">{t}</span>
            ))}
          </div>
          {!subscribed ? (
            <form onSubmit={e => { e.preventDefault(); if (email) { setSubscribed(true); }}} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="flex-1 px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button type="submit" className="btn-primary px-4 shrink-0">Subscribe</button>
            </form>
          ) : (
            <div className="text-accent font-semibold text-sm">✓ Subscribed! Welcome aboard.</div>
          )}
          <p className="text-xs text-muted-foreground/60 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <FullFooter />
    </div>
  );
}
