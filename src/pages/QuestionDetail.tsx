import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Eye, Clock, Share2, Flag, CheckCircle2, MessageSquare } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_QUESTIONS, MOCK_ANSWERS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { VoteButtons } from '@/components/features/VoteButtons';
import { UserAvatar } from '@/components/features/UserAvatar';
import { CodeBlock } from '@/components/features/CodeBlock';
import { formatDate, formatNumber } from '@/lib/utils';
import { toast } from 'sonner';
import type { Answer } from '@/types';

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const question = MOCK_QUESTIONS.find(q => q.id === id);
  const [answers, setAnswers] = useState<Answer[]>(MOCK_ANSWERS.filter(a => a.questionId === id));
  const [newAnswer, setNewAnswer] = useState('');
  const [newCode, setNewCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!question) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-20">
          <h2 className="text-xl font-bold mb-2">Question not found</h2>
          <Link to="/questions" className="text-primary hover:underline">Browse questions</Link>
        </div>
      </Layout>
    );
  }

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    if (!newAnswer.trim()) { toast.error('Answer body is required'); return; }

    setSubmitting(true);
    setTimeout(() => {
      const answer: Answer = {
        id: `a_${Date.now()}`,
        questionId: question.id,
        body: newAnswer,
        code: newCode || undefined,
        language: question.language,
        authorId: user.id,
        author: user,
        votes: 0,
        isAccepted: false,
        createdAt: new Date().toISOString(),
      };
      setAnswers(prev => [...prev, answer]);
      setNewAnswer('');
      setNewCode('');
      setSubmitting(false);
      toast.success('Answer posted successfully!');
    }, 600);
  };

  const handleAccept = (answerId: string) => {
    if (!user || user.id !== question.authorId) {
      toast.error('Only the question author can accept answers');
      return;
    }
    setAnswers(prev => prev.map(a => ({ ...a, isAccepted: a.id === answerId })));
    toast.success('Answer accepted! +15 reputation awarded');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Link to="/questions" className="hover:text-primary">Questions</Link>
          <span>/</span>
          <span className="truncate max-w-xs">{question.title}</span>
        </div>

        {/* Question */}
        <div className="card-panel p-5">
          <div className="flex gap-4">
            <VoteButtons votes={question.votes} userVote={question.userVote} showBookmark orientation="vertical" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h1 className="text-xl font-bold leading-snug">{question.title}</h1>
                {question.isAnswered && (
                  <span className="shrink-0 flex items-center gap-1 text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Answered
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(question.createdAt)}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(question.views)} views</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {answers.length} answers</span>
              </div>

              {/* Body */}
              <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap mb-4">{question.body}</div>

              {/* Code */}
              {question.code && (
                <CodeBlock code={question.code} language={question.language} showLineNumbers />
              )}

              {/* Tags + Author */}
              <div className="flex items-center justify-between flex-wrap gap-3 mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-1.5">
                  {question.tags.map(tag => (
                    <Link key={tag} to={`/questions?tag=${tag}`} className="tag-chip">{tag}</Link>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground card-panel px-3 py-2">
                  <span>asked {formatDate(question.createdAt)}</span>
                  <UserAvatar user={question.author} size="sm" showReputation linkProfile />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        {answers.length > 0 && (
          <div>
            <h2 className="text-base font-semibold mb-3">{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h2>
            <div className="space-y-3">
              {answers.sort((a, b) => (b.isAccepted ? 1 : 0) - (a.isAccepted ? 1 : 0)).map(answer => (
                <div key={answer.id} className={`card-panel p-5 ${answer.isAccepted ? 'border-accent/25 bg-accent/5' : ''}`}>
                  {answer.isAccepted && (
                    <div className="flex items-center gap-1.5 text-accent text-xs font-semibold mb-3">
                      <CheckCircle2 className="w-4 h-4" /> Accepted Answer
                    </div>
                  )}
                  <div className="flex gap-4">
                    <VoteButtons votes={answer.votes} userVote={answer.userVote} orientation="vertical" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-relaxed whitespace-pre-wrap mb-3">{answer.body}</div>
                      {answer.code && <CodeBlock code={answer.code} language={answer.language} showLineNumbers />}

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {user?.id === question.authorId && !question.isAnswered && (
                            <button
                              onClick={() => handleAccept(answer.id)}
                              className="flex items-center gap-1 text-accent hover:underline"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Accept Answer
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span>answered {formatDate(answer.createdAt)}</span>
                          <UserAvatar user={answer.author} size="sm" showReputation linkProfile />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Post Answer */}
        <div className="card-panel p-5">
          <h2 className="text-base font-semibold mb-4">Your Answer</h2>
          {user ? (
            <form onSubmit={handleSubmitAnswer} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Explanation</label>
                <textarea
                  value={newAnswer}
                  onChange={e => setNewAnswer(e.target.value)}
                  rows={6}
                  placeholder="Write a clear, detailed answer. Explain your reasoning..."
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Code Snippet (optional)</label>
                <textarea
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  rows={4}
                  placeholder="// Paste your code here..."
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-md text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                {submitting ? 'Posting...' : 'Post Answer'}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <p className="mb-3">Sign in to post an answer</p>
              <Link to="/login" className="btn-primary text-sm">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
