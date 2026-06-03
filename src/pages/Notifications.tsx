import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, CheckCheck, MessageSquare, Star, Trophy, AtSign, Check } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_NOTIFICATIONS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { formatDate } from '@/lib/utils';
import type { Notification } from '@/types';

const iconMap = {
  answer: MessageSquare,
  mention: AtSign,
  accepted: Trophy,
  vote: Star,
  badge: Trophy,
};

const colorMap = {
  answer: 'text-primary bg-primary/10',
  mention: 'text-purple-400 bg-purple-500/10',
  accepted: 'text-accent bg-accent/10',
  vote: 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10',
  badge: 'text-orange-600 dark:text-orange-400 bg-orange-500/10',
};

export default function Notifications() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const displayed = filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="text-sm font-normal bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{unreadCount}</span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Stay updated on your community activity</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-secondary text-xs flex items-center gap-1.5">
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 p-1 bg-secondary rounded-lg w-fit">
          {[
            { key: 'all', label: `All (${notifications.length})` },
            { key: 'unread', label: `Unread (${unreadCount})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {displayed.length === 0 ? (
          <div className="card-panel p-12 text-center text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p>No {filter === 'unread' ? 'unread ' : ''}notifications</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map(notification => {
              const Icon = iconMap[notification.type];
              const colors = colorMap[notification.type];
              return (
                <div
                  key={notification.id}
                  className={`card-panel p-4 flex items-start gap-3 hover:border-primary/30 transition-colors ${
                    !notification.isRead ? 'border-l-2 border-l-primary' : ''
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colors}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{notification.message}</p>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={() => markRead(notification.id)}
                          className="shrink-0 p-1 rounded hover:bg-secondary transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {notification.fromUser && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <img src={notification.fromUser.avatar} alt={notification.fromUser.username} className="w-4 h-4 rounded-full border border-border" />
                          <span>{notification.fromUser.username}</span>
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</span>
                      <Link to={notification.link} className="text-xs text-primary hover:underline ml-auto">
                        View →
                      </Link>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
