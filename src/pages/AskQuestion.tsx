import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HelpCircle, Tag, Code, X, AlertCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_TAGS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { toast } from 'sonner';

const LANGUAGES = ['typescript', 'javascript', 'python', 'rust', 'go', 'java', 'cpp', 'sql', 'dockerfile', 'bash', 'css', 'html'];

export default function AskQuestion() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('typescript');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const addTag = (tag: string) => {
    const clean = tag.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (clean && tags.length < 5 && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 20) { toast.error('Title must be at least 20 characters'); return; }
    if (body.trim().length < 50) { toast.error('Body must be at least 50 characters'); return; }
    if (tags.length === 0) { toast.error('Add at least one tag'); return; }

    setSubmitting(true);
    setTimeout(() => {
      toast.success('Question posted successfully!');
      navigate('/questions/q1');
    }, 800);
  };

  const titleScore = Math.min(100, (title.length / 150) * 100);
  const bodyScore = Math.min(100, (body.length / 500) * 100);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Ask a Question</h1>
          <p className="text-sm text-muted-foreground mt-1">Share your technical challenge with the community</p>
        </div>

        {/* Tips */}
        <div className="card-panel p-4 border-primary/25 bg-primary/5">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="text-primary">Writing a good question:</strong>
              <ul className="mt-1 text-muted-foreground space-y-0.5 list-disc list-inside text-xs">
                <li>Summarize the problem clearly in the title</li>
                <li>Include a minimal reproducible example</li>
                <li>Describe what you've already tried</li>
                <li>Add relevant tags to help experts find your question</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="card-panel p-4">
            <label className="block text-sm font-semibold mb-2">
              Title <span className="text-destructive">*</span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">Be specific and imagine you're asking a question to another developer</p>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="e.g. How to properly handle TypeScript generics with async functions?"
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
              <span>{title.length}/150 characters</span>
              {title.length >= 20 && <span className="text-accent">✓ Good title length</span>}
            </div>
          </div>

          {/* Body */}
          <div className="card-panel p-4">
            <label className="block text-sm font-semibold mb-2">
              Problem Description <span className="text-destructive">*</span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">Include all relevant details. What have you tried? What's the expected vs actual behavior?</p>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              required
              rows={8}
              placeholder="Describe your problem in detail. Include error messages, what you've tried, and what you expect to happen..."
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <div className="text-xs text-muted-foreground mt-1">{body.length} characters</div>
          </div>

          {/* Code */}
          <div className="card-panel p-4">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-semibold">Code Snippet (optional)</label>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="px-2 py-1.5 bg-input border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <span className="text-xs text-muted-foreground">Select language for syntax highlighting</span>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={8}
              placeholder="// Paste your code here (minimal reproducible example)"
              className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Tags */}
          <div className="card-panel p-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-semibold">
                Tags <span className="text-destructive">*</span>
              </label>
              <span className="text-xs text-muted-foreground">(up to 5)</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map(tag => (
                <span key={tag} className="tag-chip flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter (e.g. typescript, react)"
              disabled={tags.length >= 5}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {MOCK_TAGS.slice(0, 10).filter(t => !tags.includes(t.name)).map(tag => (
                <button
                  type="button"
                  key={tag.id}
                  onClick={() => addTag(tag.name)}
                  className="tag-chip opacity-60 hover:opacity-100 transition-opacity"
                >
                  + {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60 py-2.5 px-6">
              {submitting ? 'Posting Question...' : 'Post Your Question'}
            </button>
            <Link to="/questions" className="btn-secondary py-2.5 px-6">Cancel</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
