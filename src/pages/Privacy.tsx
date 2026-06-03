import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, Shield } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';

export default function Privacy() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us when you create an account, complete your profile, ask or answer questions, submit code for review, or contact us.

This includes:
• Account information: username, email address, password (hashed)
• Profile information: bio, skills, GitHub/portfolio URLs
• Content: questions, answers, code snippets, comments
• Usage data: page views, feature interactions, session duration

We automatically collect certain technical information when you use our services, including IP address, browser type, device information, and cookies.`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:
• Provide, maintain, and improve our services
• Process transactions and send related information
• Send technical notices, updates, and security alerts
• Respond to your comments, questions, and support requests
• Monitor and analyze usage patterns and trends
• Detect, investigate, and prevent fraudulent or unauthorized transactions
• Personalize content and recommendations based on your activity

We do not sell, rent, or share your personal information with third parties for their marketing purposes.`,
    },
    {
      title: '3. AI Code Review Data',
      content: `Code submitted for AI review is processed in real-time and is NOT stored on our servers after the analysis session ends. Specifically:

• Code snippets are sent to our AI processing pipeline
• Analysis results are returned to you in the session
• No code content is permanently stored or associated with your account
• No code is shared with other users or third parties
• Enterprise customers receive additional contractual data isolation guarantees

We may store aggregate, anonymized metrics about review types and issue patterns for platform improvement, but never the actual code content.`,
    },
    {
      title: '4. Information Sharing',
      content: `We do not sell personal data. We may share information in these limited circumstances:

• With service providers who assist in our operations (hosting, email, analytics) under strict data processing agreements
• When required by law or to respond to legal process
• In connection with a merger, acquisition, or sale of company assets (with notice to users)
• To protect the rights, property, or safety of StackTruth, our users, or others
• With your consent for any other purpose

Public profile information (username, bio, questions, answers, reputation) is publicly visible by design.`,
    },
    {
      title: '5. Data Retention',
      content: `We retain personal information for as long as your account is active or as needed to provide services. You can:

• Delete your account at any time from Settings → Account
• Request data export via support
• Request full data deletion (your questions/answers will be anonymized, not deleted, to preserve community knowledge)

We retain anonymized, aggregated data indefinitely for platform analytics.`,
    },
    {
      title: '6. Security',
      content: `We implement industry-standard security measures including:

• Passwords are hashed with bcrypt (never stored in plaintext)
• All data transmitted over TLS 1.3
• API access uses token-based authentication
• Regular security audits and penetration testing
• Access controls limiting employee data access to the minimum needed

No method of internet transmission is 100% secure. We encourage you to use strong, unique passwords and enable two-factor authentication when available.`,
    },
    {
      title: '7. Cookies',
      content: `We use cookies and similar tracking technologies to:

• Keep you signed in across sessions (authentication)
• Remember your preferences (dark/light mode)
• Analyze usage patterns (analytics)

You can control cookie settings in your browser, but disabling certain cookies may affect functionality. We do not use tracking cookies for advertising.`,
    },
    {
      title: "8. Your Rights",
      content: `Depending on your location, you may have rights including:

• Access: Request a copy of the personal data we hold about you
• Correction: Update or correct your personal data
• Deletion: Request deletion of your account and personal data
• Portability: Receive your data in a structured, machine-readable format
• Objection: Object to certain processing of your data

To exercise these rights, contact us at privacy@stacktruth.dev. We respond to all requests within 30 days.`,
    },
    {
      title: '9. Contact',
      content: `For privacy-related questions or to exercise your rights:

Email: privacy@stacktruth.dev
Address: StackTruth, Inc. · 100 California Street · San Francisco, CA 94111

For urgent data breach reports: security@stacktruth.dev`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">Stack<span className="text-primary">Truth</span></span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm py-2 px-4 rounded-lg border border-border bg-background hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Last updated: January 1, 2024</p>
            </div>
          </div>
          <div className="rounded-xl border border-primary/20 bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Summary:</strong> We collect only what we need, never sell your data, don't store submitted code, and give you full control over your information. This policy explains the details.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <h2 className="text-sm font-bold text-foreground mb-3">Table of Contents</h2>
          <ol className="space-y-1.5">
            {sections.map(({ title }, i) => (
              <li key={i}>
                <a href={`#section-${i}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map(({ title, content }, i) => (
            <div key={i} id={`section-${i}`} className="scroll-mt-20">
              <h2 className="text-lg font-bold mb-3 text-foreground">{title}</h2>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</div>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-3 text-sm">
          <Link to="/terms" className="text-primary hover:underline">Terms of Service →</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Questions? Contact Us</Link>
        </div>
      </div>

      <FullFooter />
    </div>
  );
}