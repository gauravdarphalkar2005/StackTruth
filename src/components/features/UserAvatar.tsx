import { Link } from 'react-router-dom';
import { Star, Shield } from 'lucide-react';
import type { User } from '@/types';
import { getReputationLevel, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showReputation?: boolean;
  showRole?: boolean;
  linkProfile?: boolean;
}

const sizeClasses = {
  sm: 'w-7 h-7',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
};

export function UserAvatar({ user, size = 'md', showReputation = false, showRole = false, linkProfile = true }: UserAvatarProps) {
  const repLevel = getReputationLevel(user.reputation);

  const imgEl = (
    <div className="relative inline-block">
      <img
        src={user.avatar}
        alt={user.username}
        className={cn(sizeClasses[size], 'rounded-full border border-border bg-secondary')}
      />
      {showRole && user.role !== 'user' && (
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          {user.role === 'admin' ? (
            <Shield className="w-2.5 h-2.5 text-primary-foreground" />
          ) : (
            <Star className="w-2.5 h-2.5 text-primary-foreground" />
          )}
        </span>
      )}
    </div>
  );

  return (
    <div className="inline-flex items-center gap-2">
      {linkProfile ? (
        <Link to={`/profile/${user.username}`}>{imgEl}</Link>
      ) : imgEl}

      {showReputation && (
        <div className="flex flex-col">
          <Link to={`/profile/${user.username}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            {user.username}
          </Link>
          <span className={cn('text-xs font-medium', repLevel.color)}>
            {formatNumber(user.reputation)} · {repLevel.label}
          </span>
        </div>
      )}
    </div>
  );
}
