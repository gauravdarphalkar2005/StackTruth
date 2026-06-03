import { useState } from 'react';
import { Bot, Play, RotateCcw, AlertTriangle, Info, CheckCircle, Zap, Code2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { CodeBlock } from '@/components/features/CodeBlock';
import { generateCodeReviewScore } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { CodeIssue } from '@/types';

const LANGUAGES = ['typescript', 'javascript', 'python', 'rust', 'go', 'java', 'cpp', 'sql', 'bash'];

const SAMPLE_CODE = `async function fetchUsers(filter: string) {
  const data = await fetch('/api/users?filter=' + filter);
  const users = await data.json();
  
  let result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].active == true) {
      result.push(users[i]);
    }
  }
  
  console.log('Users fetched:', result);
  return result;
}`;

function getMockIssues(code: string, language: string): CodeIssue[] {
  const issues: CodeIssue[] = [];

  if (code.includes('console.log')) {
    issues.push({
      severity: 'warning',
      message: 'Debug statement left in code',
      suggestion: 'Remove console.log statements before production. Use a proper logging library instead.',
    });
  }
  if (code.includes("== true") || code.includes("== false")) {
    issues.push({
      severity: 'warning',
      message: 'Loose equality comparison used',
      suggestion: 'Use strict equality operator (===) instead of == to avoid type coercion bugs.',
    });
  }
  if (code.includes('for (let i') && !code.includes('forEach') && !code.includes('map')) {
    issues.push({
      severity: 'info',
      message: 'Imperative loop could use functional equivalent',
      suggestion: 'Consider using Array.filter() or Array.map() for more readable, declarative code.',
    });
  }
  if (!code.includes('try') && !code.includes('catch') && (code.includes('await') || code.includes('fetch'))) {
    issues.push({
      severity: 'error',
      message: 'Async operation without error handling',
      suggestion: 'Wrap async operations in try/catch blocks to handle network failures and rejected promises.',
    });
  }
  if (code.includes('any') && language === 'typescript') {
    issues.push({
      severity: 'warning',
      message: 'Avoid using "any" type in TypeScript',
      suggestion: 'Define a proper interface or type instead of using "any" to maintain type safety.',
    });
  }
  if (code.includes("'")) {
    issues.push({
      severity: 'info',
      message: 'String concatenation for URL parameter',
      suggestion: 'Use template literals or URLSearchParams to safely build URLs and avoid injection vulnerabilities.',
    });
  }

  if (issues.length === 0) {
    issues.push({
      severity: 'info',
      message: 'No major issues detected',
      suggestion: 'Consider adding JSDoc comments and unit tests to improve code maintainability.',
    });
  }

  return issues;
}

function getMockSuggestions(code: string): string[] {
  return [
    'Add return type annotation to make the function signature explicit and self-documenting',
    'Use URLSearchParams for safe URL parameter encoding to prevent injection attacks',
    'Add error handling with try/catch to handle network failures gracefully',
    'Replace imperative loop with Array.filter() for more idiomatic, readable code',
    'Define a User interface/type for the fetched data to improve type safety',
    'Remove debug console.log before committing to version control',
  ];
}

export default function CodeReview() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState('typescript');
  const [reviewing, setReviewing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    issues: CodeIssue[];
    suggestions: string[];
    summary: string;
  } | null>(null);

  const handleReview = () => {
    if (!code.trim()) return;
    setReviewing(true);
    setTimeout(() => {
      const score = generateCodeReviewScore(code);
      const issues = getMockIssues(code, language);
      const suggestions = getMockSuggestions(code);
      const summary = score >= 80
        ? 'Code is generally well-structured with minor improvements available.'
        : score >= 60
        ? 'Code has several issues that should be addressed before production.'
        : 'Code has critical issues that need immediate attention.';
      setResult({ score, issues, suggestions, summary });
      setReviewing(false);
    }, 1800);
  };

  const handleReset = () => {
    setCode('');
    setResult(null);
  };

  const severityConfig = {
    error: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'Error' },
    warning: { icon: AlertTriangle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/25', label: 'Warning' },
    info: { icon: Info, color: 'text-primary', bg: 'bg-primary/8', border: 'border-primary/20', label: 'Info' },
  };

  const scoreColor = result
    ? result.score >= 80 ? 'text-accent' : result.score >= 60 ? 'text-[hsl(48,96%,53%)]' : 'text-destructive'
    : 'text-foreground';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Code Review</h1>
            <p className="text-sm text-muted-foreground">Instant bug detection, quality scoring & improvement suggestions</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Input */}
          <div className="lg:col-span-3 space-y-3">
            <div className="card-panel p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <label className="text-sm font-semibold">Code to Review</label>
                </div>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="px-2 py-1.5 bg-input border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                rows={16}
                placeholder="// Paste your code here for AI review..."
                className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleReview}
                  disabled={reviewing || !code.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-60"
                >
                  {reviewing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <><Play className="w-3.5 h-3.5" /> Review Code</>
                  )}
                </button>
                <button onClick={handleReset} className="btn-secondary flex items-center gap-1.5 text-sm">
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
                <button onClick={() => setCode(SAMPLE_CODE)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Load sample
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-3">
            {result ? (
              <>
                {/* Score */}
                <div className="card-panel p-5 text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Quality Score</div>
                  <div className={`text-5xl font-bold mb-1 ${scoreColor}`}>{result.score}</div>
                  <div className="text-xs text-muted-foreground mb-3">out of 100</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        result.score >= 80 ? 'bg-accent' : result.score >= 60 ? 'bg-[hsl(48,96%,53%)]' : 'bg-destructive'
                      }`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{result.summary}</p>
                </div>

                {/* Issues */}
                <div className="card-panel p-4">
                  <h3 className="text-sm font-semibold mb-3">
                    Issues Found <span className="text-muted-foreground font-normal">({result.issues.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {result.issues.map((issue, i) => {
                      const config = severityConfig[issue.severity];
                      const Icon = config.icon;
                      return (
                        <div key={i} className={`p-3 rounded-md border ${config.bg} ${config.border}`}>
                          <div className={`flex items-center gap-1.5 text-xs font-semibold ${config.color} mb-1`}>
                            <Icon className="w-3.5 h-3.5" /> {config.label}
                          </div>
                          <p className="text-xs text-foreground font-medium">{issue.message}</p>
                          <p className="text-xs text-muted-foreground mt-1 leading-snug">{issue.suggestion}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="card-panel p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-primary" /> Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {result.suggestions.slice(0, 4).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="card-panel p-8 text-center text-muted-foreground">
                <Bot className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Ready to analyze</p>
                <p className="text-xs mt-1">Paste your code and click "Review Code" to get instant AI feedback</p>
                <div className="mt-4 space-y-2 text-left">
                  {['Bug & error detection', 'Code quality scoring', 'Best practice suggestions', 'Security issue flagging'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground/60">
                      <CheckCircle className="w-3 h-3 text-accent/50" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
