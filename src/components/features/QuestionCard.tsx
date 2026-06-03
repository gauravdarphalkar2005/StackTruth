import { Link } from 'react-router-dom';
import { MessageSquare, Eye, ChevronUp, CheckCircle2 } from 'lucide-react';
import type { Question } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  compact?: boolean;
}

export function QuestionCard({ question, compact = false }: QuestionCardProps) {
  return (
    <div className="card-panel p-4 hover:border-[hsl(217,91%,30%)] transition-colors group">
      <div className="flex gap-4">
        {/* Stats Column */}
        <div className="shrink-0 flex flex-col items-end gap-1.5 text-xs text-muted-foreground w-16">
          <div className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded ${question.votes > 0 ? 'bg-[hsl(217,91%,8%)] text-[hsl(217,91%,70%)]' : 'bg-secondary'}`}>
            <ChevronUp className="w-3 h-3" />
            <span className="font-semibold text-sm">{question.votes}</span>
          </div>
          <div className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded ${question.isAnswered ? 'bg-[hsl(142,71%,8%)] text-[hsl(142,71%,55%)] border border-[hsl(142,71%,20%)]' : 'bg-secondary'}`}>
            <MessageSquare className="w-3 h-3" />
            <span className="font-semibold text-sm">{question.answersCount}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1.5">
            {question.isAnswered && (
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            )}
            <Link
              to={`/questions/${question.id}`}
              className="text-base font-semibold text-foreground hover:text-primary transition-colors group-hover:text-primary leading-tight"
            >
              {question.title}
            </Link>
          </div>

          {!compact && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
              {question.body.split('\n')[0]}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {question.tags.map(tag => (
              <Link key={tag} to={`/questions?tag=${tag}`} className="tag-chip">
                {tag}
              </Link>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <img
                src={question.author.avatar}
                alt={question.author.username}
                className="w-5 h-5 rounded-full border border-border"
              />
              <Link to={`/profile/${question.author.username}`} className="hover:text-primary transition-colors font-medium">
                {question.author.username}
              </Link>
              <span className="reputation-badge">{question.author.reputation}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(question.views)}</span>
              <span>{formatDate(question.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
