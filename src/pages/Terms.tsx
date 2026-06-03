import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, FileText } from 'lucide-react';
import { FullFooter } from '@/components/layout/FullFooter';

export default function Terms() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By creating an account or using StackTruth (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.

These Terms apply to all users of the Service, including visitors, registered users, Expert contributors, and administrators. StackTruth reserves the right to update these Terms at any time with 30 days notice via email or platform notification.`,
    },
    {
      title: '2. Account Registration',
      content: `To use certain features of the Service, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain the security of your password and accept responsibility for all activities under your account
• Not use another person's account without permission
• Notify us immediately of any unauthorized use of your account
• Not create accounts for the purpose of spamming or violating these Terms

You must be at least 16 years of age to create an account. Accounts registered for organizations must be created by an authorized representative.`,
    },
    {
      title: '3. User Content',
      content: `You retain ownership of content you create (questions, answers, code snippets, comments). By posting content, you grant StackTruth a worldwide, non-exclusive, royalty-free license to use, display, and distribute that content in connection with operating the Service.

You are solely responsible for content you post. You agree not to post:
• Content you don't have rights to share
• Copyrighted code without attribution or fair use justification
• Personal information of others without consent
• Spam, promotional content, or misleading information
• Harmful or offensive content

StackTruth may remove any content that violates these Terms without notice.`,
    },
    {
      title: '4. Acceptable Use',
      content: `You agree to use the Service only for lawful purposes. Prohibited activities include:

• Attempting to gain unauthorized access to the platform or user accounts
• Scraping or harvesting user data without explicit permission
• Using automated tools to submit content, vote, or manipulate reputation
• Impersonating other users or misrepresenting your identity or expertise
• Harassing, threatening, or intimidating other community members
• Posting malicious code designed to harm systems or users
• Circumventing platform rate limits or usage restrictions

Violations may result in account suspension or permanent ban without refund.`,
    },
    {
      title: '5. AI Code Review',
      content: `By submitting code for AI review, you represent that:

• You have the right to submit the code (it's your original work, open-source, or code you have permission to share)
• You understand code analysis results are for informational purposes and may contain errors
• You will not submit code containing real credentials, API keys, passwords, or sensitive personal data of others

StackTruth is not responsible for actions taken based on AI review results. AI analysis is a tool to assist — not replace — professional code review.`,
    },
    {
      title: '6. Reputation & Badges',
      content: `The reputation system reflects community recognition of contribution quality. Reputation points have no monetary value and cannot be transferred, sold, or redeemed.

StackTruth reserves the right to adjust the reputation system at any time, including recalculating scores based on policy violations. Expert and Verified badges may be revoked if contribution quality deteriorates or violations are discovered.`,
    },
    {
      title: '7. Subscription & Payments',
      content: `Pro and Team subscriptions are billed monthly or annually. By subscribing, you authorize StackTruth to charge your payment method on a recurring basis.

Cancellations take effect at the end of the current billing period. We offer a 14-day free trial for Pro and Team plans (credit card required), and a 30-day money-back guarantee on paid plans.

Refunds are not provided for partial months. Price changes will be communicated with 30 days notice and take effect at the next billing cycle.`,
    },
    {
      title: '8. Disclaimer of Warranties',
      content: `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. STACKTRUTH DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not warrant that the Service will be uninterrupted, error-free, or completely secure. We are not responsible for the accuracy of AI-generated code reviews or community-provided answers.`,
    },
    {
      title: '9. Limitation of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, STACKTRUTH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, BUSINESS INTERRUPTION, OR LOSS OF PROFITS.

OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE PAST 12 MONTHS OR (B) $100.`,
    },
    {
      title: '10. Governing Law',
      content: `These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in San Francisco, California, except for claims seeking injunctive relief.

If any provision of these Terms is found unenforceable, the remaining provisions remain in full force. Our failure to enforce any right does not constitute a waiver of that right.`,
    },
    {
      title: '11. Contact',
      content: `For questions about these Terms:

Email: legal@stacktruth.dev
Address: StackTruth, Inc. · 100 California Street · San Francisco, CA 94111`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
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
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Effective: January 1, 2024 · Version 2.1</p>
            </div>
          </div>
          {/* Summary banner – now theme‑aware */}
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Please read these terms carefully.</strong> They govern your use of StackTruth. By creating an account, you agree to these terms.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <h2 className="text-sm font-bold text-foreground mb-3">Table of Contents</h2>
          <ol className="space-y-1.5">
            {sections.map(({ title }, i) => (
              <li key={i}>
                <a href={`#term-${i}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map(({ title, content }, i) => (
            <div key={i} id={`term-${i}`} className="scroll-mt-20">
              <h2 className="text-lg font-bold mb-3 text-foreground">{title}</h2>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-3 text-sm">
          <Link to="/privacy" className="text-primary hover:underline">← Privacy Policy</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Questions? Contact Us</Link>
        </div>
      </div>

      <FullFooter />
    </div>
  );
}