import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Clock, Calendar, ArrowLeft, Heart, MessageSquare, Share2, Bookmark, CheckCircle2, ChevronRight, Copy, Check } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { toast } from 'sonner';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

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
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop&auto=format&q=80',
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
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop&auto=format&q=80',
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
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=600&fit=crop&auto=format&q=80',
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
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop&auto=format&q=80',
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
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1200&h=600&fit=crop&auto=format&q=80',
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
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop&auto=format&q=80',
  },
];

const POST_CONTENTS: Record<string, string[]> = {
  'typescript-5-new-features': [
    "TypeScript 5.5 has officially launched, and it represents one of the most exciting updates for backend and frontend developers alike. The highlight of this release is undoubtedly the **inferred type predicates**.",
    "Previously, when filtering an array of nullable elements, TypeScript would fail to narrow down the output type without an explicit predicate annotation. Consider this code:",
    "```typescript\n// In TypeScript < 5.5, types is (string | undefined)[]\nconst names = ['Alex', 'Sarah', undefined, 'Marcus'];\nconst validNames = names.filter(x => x !== undefined);\n// TS still thinks validNames contains undefined!\n```",
    "With TypeScript 5.5, the compiler scans your array filters and lambda structures to automatically narrow the type. In the snippet above, `validNames` is correctly inferred as `string[]`. This drastically reduces type casting boilerplate.",
    "### Regular Expression Syntax Checking",
    "Another major win is compiler-level validation of Regex. If you write an invalid regex literal, TypeScript will throw a compilation error before you ever run the test suite, saving runtime errors.",
    "### Iterator Helper Methods",
    "Furthermore, TypeScript 5.5 adopts the latest ECMAScript Iterator Helper standard. We can now perform `.map()`, `.filter()`, and `.take()` directly on generator iterators, streamlining list computations without converting them to arrays first."
  ],
  'ai-code-review-workflow': [
    "Modern dev environments are rapidly integrating AI, and our telemetry shows AI reviews can reduce bug leak rates by up to 34%. But how do you implement it effectively?",
    "We recently conducted a trial integration within a high-throughput transaction API. The AI engine was set up to analyze code quality, security vulnerabilities, and typing issues on every pull request.",
    "### What the AI Caught",
    "1. **Stale Locks**: An asynchronous lock was created but never released in the exception flow, leading to potential connection pools locking up.",
    "2. **Timing Attack Vector**: The AI flagged a string comparison function inside the authentication route that was vulnerable to timing analysis.",
    "3. **Inefficient Loop Queries**: SQL transactions were being called inside a map block instead of utilizing batch queries.",
    "### Limitations & Tuning",
    "While it caught these logical errors, the AI originally produced false positives on custom typing structures. We solved this by providing custom markdown rules to the review model, tuning down the severity of cosmetic lint checks and elevating core thread locks."
  ],
  'rust-async-patterns': [
    "Writing async code in Rust is powerful but comes with unique lifetime constraints and pinning semantics. Over our past 18 months, several critical patterns emerged.",
    "### 1. Graceful Shutdown & Cancellation",
    "Cancellation in async Rust happens when a future is dropped. If you are halfway through writing to a socket, dropping the future leaves the handle in an undefined state. We recommend wrapping connection tasks inside standard select block logic with cancel tokens:",
    "```rust\ntokio::select! {\n    res = connection.process() => {\n        log::info!(\"Connection closed normally: {:?}\", res);\n    }\n    _ = shutdown_token.cancelled() => {\n        connection.flush_and_close().await;\n        log::info!(\"Graceful shutdown complete\");\n    }\n}\n```",
    "### 2. Stream Throttling and Batching",
    "When processing high-frequency data streams, buffering is crucial. We use `tokio_stream` and `StreamExt::ready_chunks` to batch events together, decreasing database hit rates by up to 80%."
  ],
  'building-reputation-developer': [
    "Building reputation in tech is not just about posting code; it is about building trust and visibility. Here is how our top developers achieved expert status on StackTruth.",
    "### 1. Write for Searchability",
    "When posting questions or answers, write titles that describe the specific runtime errors or stack trace details. Developers searching on Google should find your solution instantly.",
    "### 2. Leverage Code Snippets",
    "An answer with a clean, validated code snippet is 4x more likely to be accepted than plain descriptive text. Always include brief annotations explaining what each block does.",
    "### 3. Review Community PRs",
    "Reviewing community code submissions builds peer network authority and helps refine code-style patterns."
  ],
  'react-19-server-actions': [
    "React 19 introduces Server Actions as a first-class feature, changing how we sync client forms with remote database storage.",
    "### Optimistic Updates",
    "Using the `useOptimistic` hook, developers can instantly update the UI with the expected result while the API request finishes in the background:",
    "```javascript\nconst [optimisticState, addOptimistic] = useOptimistic(\n  state,\n  (state, newValue) => [...state, newValue]\n);\n```",
    "This creates an extremely snappy interface that mimics static, local computation, making transitions feel instantaneous."
  ],
  'docker-compose-prod': [
    "Docker Compose is excellent for local setups, but with the right configuration, it can run small-to-medium production SaaS applications smoothly.",
    "### 1. Rolling Updates",
    "To avoid downtime during deployments, configure rolling update limits inside your service definitions, enabling new containers to spin up and pass health checks before the old version terminates.",
    "### 2. Docker Secrets Management",
    "Never embed credentials in environment files. Use Docker's native secret mounts to securely decrypt api keys at container startup, preventing leaks."
  ]
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);

  const post = POSTS.find(p => p.slug === slug);
  const relatedPosts = POSTS.filter(p => p.slug !== slug).slice(0, 2);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"><Zap className="w-4 h-4 text-primary-foreground" /></div>
              <span className="font-bold">Stack<span className="text-primary">Truth</span></span>
            </Link>
            <Link to="/blog" className="text-sm text-primary flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h2>
            <p className="text-slate-500 text-sm mb-6">The article you are looking for has been moved or doesn't exist.</p>
            <Link to="/blog" className="btn-primary py-2 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm">Browse Articles</Link>
          </div>
        </div>
        <FullFooter />
      </div>
    );
  }

  const contentParagraphs = POST_CONTENTS[post.slug] || [
    "No content has been added to this blog post yet. Check back soon for detailed insights.",
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success('Article link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(l => l - 1);
      setHasLiked(false);
    } else {
      setLikes(l => l + 1);
      setHasLiked(true);
      toast.success('Thanks for liking the article!');
    }
  };

  const handleBookmark = () => {
    setHasBookmarked(!hasBookmarked);
    toast.success(hasBookmarked ? 'Article removed from bookmarks' : 'Article bookmarked!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Hero Header */}
      <section className="py-12 px-4 sm:px-6 border-b border-border bg-slate-50/30">
        <div className="max-w-3xl mx-auto space-y-5">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to blog list
          </Link>

          <div className="space-y-4">
            <span className="px-2.5 py-1 text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-150/40 rounded-full inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-slate-100 gap-4">
            {/* Author info with Link to profile */}
            <Link to={`/profile/${post.author}`} className="flex items-center gap-3 group">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full border border-slate-200/80 group-hover:border-primary transition-colors" />
              <div>
                <p className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">@{post.author}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
              </div>
            </Link>

            {/* Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button 
                onClick={handleLike}
                className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  hasLiked 
                    ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm' 
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likes}</span>
              </button>
              <button 
                onClick={handleBookmark}
                className={`p-2 rounded-xl border transition-all ${
                  hasBookmarked 
                    ? 'bg-blue-50 text-blue-650 border-blue-200 shadow-sm' 
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
                title="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${hasBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
              </button>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 transition-all"
                title="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Article Text Content */}
          <div className="lg:col-span-2 space-y-6">
            <img src={post.image} alt="" className="w-full h-64 sm:h-[380px] object-cover rounded-[20px] border border-slate-200/50 shadow-sm mb-6" />
            
            <div className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6">
              {contentParagraphs.map((para, index) => {
                // If the paragraph is a code block
                if (para.startsWith('```')) {
                  const lines = para.split('\n');
                  const codeLines = lines.slice(1, -1).join('\n');
                  const lang = lines[0].replace('```', '') || 'typescript';
                  return (
                    <div key={index} className="my-6">
                      <div className="flex justify-between items-center bg-slate-800 text-slate-400 px-4 py-2 rounded-t-lg text-xs font-mono select-none">
                        <span>{lang}</span>
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> syntax verified</span>
                      </div>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-lg overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed shadow-md">
                        <code>{codeLines}</code>
                      </pre>
                    </div>
                  );
                }

                // If paragraph is a subheader
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl sm:text-2xl font-black text-slate-800 mt-8 mb-4">
                      {para.replace('### ', '')}
                    </h3>
                  );
                }

                // Render as paragraph text, parsing bold markdown **
                const parts = para.split('**');
                return (
                  <p key={index} className="leading-relaxed text-slate-600 font-medium">
                    {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-slate-800">{part}</strong> : part)}
                  </p>
                );
              })}
            </div>

            {/* Author Profile card at bottom */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-[20px] p-6 mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-inner">
              <img src={post.avatar} alt={post.author} className="w-16 h-16 rounded-full border bg-white shrink-0 shadow-sm" />
              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <h4 className="font-bold text-slate-800">Written by @{post.author}</h4>
                <p className="text-xs text-slate-500 font-medium leading-normal max-w-md">
                  Verify developer statistics and view direct solutions provided by this expert on the StackTruth community network.
                </p>
                <div className="pt-2">
                  <Link to={`/profile/${post.author}`} className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                    View Developer Profile <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Newsletter Subscribe */}
            <div className="bg-white border border-slate-200/60 rounded-[20px] p-5 shadow-lg shadow-slate-100/50 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Engineering newsletter</h3>
              <p className="text-xs text-slate-500 leading-normal">Curated programming advice and release summaries directly to your inbox.</p>
              <input type="email" placeholder="you@example.com" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner" />
              <button onClick={() => toast.success('Subscribed to newsletter!')} className="w-full btn-primary text-xs py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700">Subscribe</button>
            </div>

            {/* Related Posts */}
            <div className="bg-white border border-slate-200/60 rounded-[20px] p-5 shadow-lg shadow-slate-100/50 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map(related => (
                  <Link key={related.slug} to={`/blog/${related.slug}`} className="block group space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block border border-blue-100">
                      {related.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors leading-snug">
                      {related.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">{related.readTime}</p>
                  </Link>
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
