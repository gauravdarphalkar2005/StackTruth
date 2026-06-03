import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Check, ArrowRight, Star, Users, Shield, Bot } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';
import { ThemeToggle } from '@/components/features/ThemeToggle';

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const PLANS = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    desc: 'Perfect for getting started with StackTruth.',
    features: [
      'Unlimited Q&A browsing',
      '10 questions per month',
      '5 AI code reviews per month',
      'Community reputation system',
      'Basic developer profile',
      'Tag-based notifications',
    ],
    notIncluded: ['Priority expert answers', 'Advanced analytics', 'API access', 'Team workspace'],
    cta: 'Get Started Free',
    href: '/register',
    highlight: false,
    color: 'text-muted-foreground',
  },
  {
    name: 'Pro',
    price: { monthly: 12, yearly: 9 },
    desc: 'For serious developers who need unlimited access.',
    features: [
      'Unlimited questions & answers',
      'Unlimited AI code reviews',
      'Priority expert response queue',
      'Advanced contribution analytics',
      'Badge & certification system',
      'API access (100k req/month)',
      'Early access to new features',
      'Premium profile badge',
    ],
    notIncluded: ['Team workspace', 'SSO integration'],
    cta: 'Start 14-Day Free Trial',
    href: '/register',
    highlight: true,
    color: 'text-primary',
  },
  {
    name: 'Team',
    price: { monthly: 49, yearly: 39 },
    desc: 'For engineering teams who build together.',
    features: [
      'Everything in Pro (per seat)',
      'Private team workspace',
      'Shared code snippet library',
      'Team analytics dashboard',
      'SSO & admin controls',
      'Custom onboarding',
      'Dedicated account manager',
      'SLA + priority support',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    href: '/contact',
    highlight: false,
    color: 'text-[hsl(280,80%,65%)]',
  },
];

const FAQS = [
  { q: 'Is the free plan really free forever?', a: 'Yes. The Free plan has no expiration. You get core Q&A, 5 AI reviews/month, and community access at no cost, no credit card required.' },
  { q: 'What happens when I hit the 5 AI review limit?', a: "You'll see a prompt to upgrade to Pro. Your existing reviews and their results remain accessible. You won't lose any data." },
  { q: 'Can I switch between plans anytime?', a: 'Yes. You can upgrade, downgrade, or cancel at any time. Pro subscribers get a 14-day free trial, and we offer a 30-day money-back guarantee.' },
  { q: 'How does Team pricing work?', a: 'Team pricing is $49/month for up to 10 seats (billed at $39/mo annually). Additional seats can be added. Enterprise pricing available for 50+ seats.' },
  { q: 'Do you offer discounts for students or open source?', a: 'Yes! Students with a valid .edu email get 50% off Pro. Open-source maintainers with public repos get Pro free. Contact us to apply.' },
];

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-4 block">Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Start free. No credit card required. Upgrade when you need more power.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-secondary rounded-lg mb-4">
            <button onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
              Monthly
            </button>
            <button onClick={() => setBilling('yearly')}
              className={`px-5 py-2 rounded text-sm font-medium flex items-center gap-2 transition-all ${billing === 'yearly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
              Yearly
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded">Save 25%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div key={plan.name}
                className={`card-panel p-7 flex flex-col relative ${plan.highlight ? 'border-primary/60 shadow-2xl shadow-primary/10 scale-[1.02]' : ''}`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold text-xl ${plan.color}`}>{plan.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-black">${plan.price[billing]}</span>
                    {plan.price[billing] > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                  </div>
                  {plan.price[billing] === 0 && <p className="text-sm text-muted-foreground mt-0.5">Always free</p>}
                  {billing === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-xs text-accent mt-1">Billed ${plan.price.yearly * 12}/year</p>
                  )}
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/85">{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.slice(0, 2).map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm opacity-40">
                      <span className="w-4 h-4 shrink-0 mt-0.5 text-center text-muted-foreground">—</span>
                      <span className="text-muted-foreground line-through">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.href}
                  className={`w-full text-center py-3 rounded-md text-sm font-semibold transition-all ${plan.highlight ? 'btn-primary shadow-lg shadow-primary/20' : 'btn-secondary'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust signals */}
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { icon: Shield, title: '14-day free trial', desc: 'No commitment on Pro or Team' },
              { icon: Star, title: 'Money-back guarantee', desc: '30 days, no questions asked' },
              { icon: Users, title: 'Cancel anytime', desc: 'No lock-in contracts' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 text-sm card-panel p-4">
                <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQs</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="card-panel overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors text-sm font-medium">
                  {q}
                  <span className="text-primary ml-4 shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3 leading-relaxed">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Start with Free, upgrade anytime</h2>
          <p className="text-muted-foreground mb-6">No credit card required. Full access to core features forever.</p>
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 py-3 px-8 shadow-lg shadow-primary/20">
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FullFooter />
    </div>
  );
}
