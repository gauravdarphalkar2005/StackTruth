import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquare, Bot, Trophy, Bell, Settings,
  Tag, TrendingUp, Shield, BookOpen, Users, HelpCircle, Code2,
  Star, Crown
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_TAGS, MOCK_NOTIFICATIONS } from '@/lib/mockData';
import { formatNumber, getReputationLevel } from '@/lib/utils';
import { cn } from '@/lib/utils';

const mainNav = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MessageSquare, label: 'Questions', href: '/questions' },
  { icon: Bot, label: 'AI Code Review', href: '/code-review' },
  { icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
  { icon: Bell, label: 'Notifications', href: '/notifications', badge: true },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const exploreLinks = [
  { icon: BookOpen, label: 'Blog', href: '/blog' },
  { icon: HelpCircle, label: 'FAQ', href: '/faq' },
  { icon: Users, label: 'About', href: '/about' },
];

export function Sidebar() {
  const location = useLocation();
  const user = getCurrentUser();
  const topTags = MOCK_TAGS.slice(0, 8);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;
  const repLevel = user ? getReputationLevel(user.reputation) : null;

  return (
    <aside className="w-52 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border hidden lg:flex flex-col">

      {/* User mini-card */}
      {user && (
        <div className="p-3 border-b border-border">
          <Link to={`/profile/${user.username}`}
            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors group">
            <div className="relative shrink-0">
              <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border border-border" />
              {user.role !== 'user' && (
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center border border-card ${user.role === 'admin' ? 'bg-destructive' : 'bg-primary'}`}>
                  {user.role === 'admin' ? <Shield className="w-2 h-2 text-white" /> : <Star className="w-2 h-2 text-white" />}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate group-hover:text-primary transition-colors">{user.username}</p>
              <p className={`text-[10px] font-semibold ${repLevel?.color}`}>{repLevel?.label} · {formatNumber(user.reputation)}</p>
            </div>
          </Link>
        </div>
      )}

      <div className="p-3 space-y-0.5 flex-1">
        {mainNav.map(({ icon: Icon, label, href, badge }) => (
          <Link key={href} to={href}
            className={cn('nav-item relative', location.pathname === href && 'active')}>
            <Icon className="w-4 h-4 shrink-0" />
            {label}
            {badge && unreadCount > 0 && (
              <span className="ml-auto text-[9px] font-bold bg-primary text-primary-foreground w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                {unreadCount}
              </span>
            )}
          </Link>
        ))}

        {user?.role === 'admin' && (
          <Link to="/admin" className={cn('nav-item text-destructive hover:bg-destructive/10', location.pathname === '/admin' && 'active bg-destructive/10')}>
            <Shield className="w-4 h-4 shrink-0" />
            Admin Panel
          </Link>
        )}
      </div>

      <div className="px-3 pt-2 pb-2 border-t border-border">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">Explore</div>
        <div className="space-y-0.5">
          {exploreLinks.map(({ icon: Icon, label, href }) => (
            <Link key={href} to={href}
              className={cn('nav-item text-xs', location.pathname === href && 'active')}>
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-3 pt-2 pb-2 border-t border-border">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2">
          <Tag className="w-3 h-3" /> Popular Tags
        </div>
        <div className="space-y-0.5">
          {topTags.map(tag => (
            <Link key={tag.id} to={`/questions?tag=${tag.name}`}
              className="flex items-center justify-between px-2 py-1 rounded text-xs hover:bg-secondary transition-colors group">
              <span className="tag-chip text-[10px] py-0 px-1.5">{tag.name}</span>
              <span className="text-muted-foreground text-[10px] group-hover:text-foreground transition-colors">{tag.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-3 py-2 border-t border-border">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2">
          <TrendingUp className="w-3 h-3" /> Trending
        </div>
        <div className="space-y-0.5">
          {['Bun 2.0 performance', 'React 19 Server Actions', 'Rust 2024 edition', 'TypeScript 5.5'].map(item => (
            <Link key={item} to="/questions"
              className="block px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors leading-snug rounded hover:bg-secondary">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
