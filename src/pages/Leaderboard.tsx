import { Trophy, Medal, Star, TrendingUp, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_USERS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { formatNumber, getReputationLevel } from '@/lib/utils';
import type { User } from '@/types';

const sortedUsers = [...MOCK_USERS]
  .filter(u => u.role !== 'admin')
  .sort((a, b) => b.reputation - a.reputation);

// Rank-specific styles that work in both themes
const rankConfig = [
  { 
    rank: 1, 
    icon: Crown, 
    color: 'text-yellow-500', 
    bg: 'bg-yellow-500/10', 
    border: 'border-yellow-500/30',
    label: '1st'
  },
  { 
    rank: 2, 
    icon: Medal, 
    color: 'text-gray-400', 
    bg: 'bg-gray-400/10', 
    border: 'border-gray-400/30',
    label: '2nd'
  },
  { 
    rank: 3, 
    icon: Medal, 
    color: 'text-orange-500', 
    bg: 'bg-orange-500/10', 
    border: 'border-orange-500/30',
    label: '3rd'
  },
];

export default function Leaderboard() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Top contributors by reputation score
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-3">
          {sortedUsers.slice(0, 3).map((user, idx) => {
            const config = rankConfig[idx];
            const Icon = config.icon;
            const repLevel = getReputationLevel(user.reputation);
            return (
              <div
                key={user.id}
                className={`rounded-xl border ${config.border} ${config.bg} bg-card p-4 text-center transition-transform ${
                  idx === 0 ? 'scale-105 shadow-lg' : ''
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${config.bg} ${config.border} border mb-2`}
                >
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <Link to={`/profile/${user.username}`}>
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-14 h-14 rounded-full border-2 border-border mx-auto mb-2"
                  />
                </Link>
                <Link
                  to={`/profile/${user.username}`}
                  className="font-semibold text-sm text-foreground hover:text-primary transition-colors block"
                >
                  {user.username}
                </Link>
                <div className={`text-xs font-bold mt-1 ${config.color}`}>
                  {formatNumber(user.reputation)}
                </div>
                <div className="text-[10px] text-muted-foreground">{repLevel.label}</div>
                <div className="mt-2 flex justify-center gap-2 text-[10px] text-muted-foreground">
                  <span>{user.answersCount} answers</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 p-4 border-b border-border">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm text-foreground">Full Rankings</h2>
          </div>
          <div className="divide-y divide-border">
            {sortedUsers.map((user, idx) => {
              const repLevel = getReputationLevel(user.reputation);
              // Rank color based on position
              let rankColor = 'text-muted-foreground';
              if (idx === 0) rankColor = 'text-yellow-500';
              else if (idx === 1) rankColor = 'text-gray-400';
              else if (idx === 2) rankColor = 'text-orange-500';

              return (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 hover:bg-secondary/40 transition-colors"
                >
                  <span
                    className={`w-8 text-center font-bold text-sm shrink-0 ${rankColor}`}
                  >
                    #{idx + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-9 h-9 rounded-full border border-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${user.username}`}
                      className="font-semibold text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {user.username}
                    </Link>
                    <div className="flex gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{user.questionsCount} questions</span>
                      <span>·</span>
                      <span>{user.answersCount} answers</span>
                      <span>·</span>
                      <span>{user.acceptedAnswers} accepted</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground">
                      {formatNumber(user.reputation)}
                    </div>
                    <div className={`text-[10px] mt-1 ${repLevel.color}`}>
                      {repLevel.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reputation Guide */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <Star className="w-4 h-4 text-primary" /> How Reputation Works
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {[
              { action: 'Answer upvoted', points: '+10' },
              { action: 'Answer accepted', points: '+15' },
              { action: 'Question upvoted', points: '+5' },
              { action: 'Question downvoted', points: '-2' },
              { action: 'Answer downvoted', points: '-2' },
              { action: 'Accept an answer', points: '+2' },
            ].map(({ action, points }) => (
              <div
                key={action}
                className="flex items-center justify-between p-2 bg-secondary/50 rounded"
              >
                <span className="text-muted-foreground">{action}</span>
                <span
                  className={`font-semibold ${
                    points.startsWith('+') ? 'text-accent' : 'text-destructive'
                  }`}
                >
                  {points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}