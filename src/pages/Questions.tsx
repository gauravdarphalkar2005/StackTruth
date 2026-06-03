import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Filter, TrendingUp, Clock, CheckCircle2, Search, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_QUESTIONS, MOCK_TAGS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { QuestionCard } from '@/components/features/QuestionCard';
import type { Question } from '@/types';

type SortOption = 'newest' | 'votes' | 'unanswered' | 'views';

export default function Questions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const user = getCurrentUser();
  const [sort, setSort] = useState<SortOption>('newest');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const tag = searchParams.get('tag');
    const q = searchParams.get('q');
    if (tag) setSelectedTag(tag);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  let questions = [...MOCK_QUESTIONS];

  if (searchQuery) {
    questions = questions.filter(q =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.includes(searchQuery.toLowerCase()))
    );
  }

  if (selectedTag) {
    questions = questions.filter(q => q.tags.includes(selectedTag));
  }

  if (sort === 'votes') questions.sort((a, b) => b.votes - a.votes);
  else if (sort === 'unanswered') questions = questions.filter(q => !q.isAnswered);
  else if (sort === 'views') questions.sort((a, b) => b.views - a.views);
  else questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const sortBtns: { key: SortOption; label: string; icon: any }[] = [
    { key: 'newest', label: 'Newest', icon: Clock },
    { key: 'votes', label: 'Most Voted', icon: TrendingUp },
    { key: 'unanswered', label: 'Unanswered', icon: CheckCircle2 },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Questions</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {questions.length} questions {selectedTag && `tagged [${selectedTag}]`}
            </p>
          </div>
          {user && (
            <Link to="/ask" className="btn-primary flex items-center gap-1.5 text-sm">
              <Plus className="w-4 h-4" /> Ask Question
            </Link>
          )}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter questions..."
              className="w-full pl-9 pr-8 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {sortBtns.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`px-3 py-2 text-xs font-medium rounded-md border transition-all ${
                  sort === key
                    ? 'bg-primary/10 border-primary/40 text-primary'
                    : 'border-border bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tag Filter */}
        {selectedTag && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Filtering by:
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium border border-border">
              {selectedTag}
              <button onClick={() => setSelectedTag('')} className="ml-0.5 hover:text-foreground transition-colors">
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        {/* Tag Quick Filters */}
        <div className="flex flex-wrap gap-1.5">
          {MOCK_TAGS.slice(0, 8).map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(selectedTag === tag.name ? '' : tag.name)}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-all ${
                selectedTag === tag.name
                  ? 'bg-primary/20 border-primary/40 text-primary'
                  : 'bg-secondary/50 border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No questions found matching your filters.</p>
            {user && (
              <Link to="/ask" className="btn-primary inline-block mt-4 text-sm">
                Be the first to ask
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {questions.map(q => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}