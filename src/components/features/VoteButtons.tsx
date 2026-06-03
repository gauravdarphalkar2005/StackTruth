import { useState } from 'react';
import { ChevronUp, ChevronDown, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteButtonsProps {
  votes: number;
  userVote?: 1 | -1 | 0;
  onVote?: (direction: 1 | -1) => void;
  orientation?: 'vertical' | 'horizontal';
  showBookmark?: boolean;
}

export function VoteButtons({ votes, userVote = 0, onVote, orientation = 'vertical', showBookmark = false }: VoteButtonsProps) {
  const [currentVote, setCurrentVote] = useState<number>(userVote);
  const [currentVotes, setCurrentVotes] = useState(votes);

  const handleVote = (direction: 1 | -1) => {
    if (currentVote === direction) {
      setCurrentVote(0);
      setCurrentVotes(v => v - direction);
    } else {
      const prev = currentVote;
      setCurrentVote(direction);
      setCurrentVotes(v => v + direction - prev);
    }
    onVote?.(direction);
  };

  return (
    <div className={cn('flex items-center gap-1', orientation === 'vertical' ? 'flex-col' : 'flex-row')}>
      <button
        onClick={() => handleVote(1)}
        className={cn(
          'p-1.5 rounded transition-colors border',
          currentVote === 1
            ? 'bg-[hsl(217,91%,15%)] border-[hsl(217,91%,40%)] text-primary'
            : 'border-border bg-secondary hover:border-primary hover:text-primary text-muted-foreground'
        )}
        title="Upvote"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      <span className={cn(
        'font-bold text-sm min-w-[2ch] text-center',
        currentVotes > 0 ? 'text-primary' : currentVotes < 0 ? 'text-destructive' : 'text-muted-foreground'
      )}>
        {currentVotes}
      </span>

      <button
        onClick={() => handleVote(-1)}
        className={cn(
          'p-1.5 rounded transition-colors border',
          currentVote === -1
            ? 'bg-[hsl(0,72%,15%)] border-[hsl(0,72%,40%)] text-destructive'
            : 'border-border bg-secondary hover:border-destructive hover:text-destructive text-muted-foreground'
        )}
        title="Downvote"
      >
        <ChevronDown className="w-4 h-4" />
      </button>

      {showBookmark && (
        <button className="mt-1 p-1.5 rounded border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
          <Bookmark className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
