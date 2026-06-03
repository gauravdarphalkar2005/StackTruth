import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateProfile, logout } from '@/lib/auth';
import { Layout } from '@/components/layout/Layout';
import {
  User, Bell, Shield, Palette, Code2, Save, Eye, EyeOff,
  Trash2, LogOut, Check, AlertCircle, Sun, Moon, Monitor
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { User as UserType } from '@/types';

const TABS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'security', label: 'Security', icon: Shield },
];

export default function Settings() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    bio: user?.bio || '',
    githubUrl: user?.githubUrl || '',
    portfolioUrl: user?.portfolioUrl || '',
    skills: user?.skills || [],
  });

  const [notifications, setNotifications] = useState({
    newAnswers: true,
    mentions: true,
    votes: false,
    badges: true,
    newsletter: true,
    weeklyDigest: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrent: false,
    showNew: false,
    twoFactor: false,
  });

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const ALL_SKILLS = ['TypeScript', 'JavaScript', 'React', 'Vue', 'Node.js', 'Python', 'Rust', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'GraphQL', 'AWS', 'Next.js', 'FastAPI', 'Java', 'C++', 'PHP', 'Swift'];

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      updateProfile(profile);
      setSaving(false);
      setSaved(true);
      toast.success('Profile settings saved!');
      setTimeout(() => setSaved(false), 2000);
    }, 700);
  };

  const handleSaveNotifications = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Notification preferences saved!');
    }, 500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!security.currentPassword) { toast.error('Enter your current password'); return; }
    if (security.newPassword.length < 8) { toast.error('New password must be at least 8 characters'); return; }
    if (security.newPassword !== security.confirmPassword) { toast.error('Passwords do not match'); return; }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSecurity(s => ({ ...s, currentPassword: '', newPassword: '', confirmPassword: '' }));
      toast.success('Password changed successfully!');
    }, 800);
  };

  const handleDeleteAccount = () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone. Your questions and answers will be anonymized.')) return;
    logout();
    navigate('/');
    toast.success('Account deleted. Sorry to see you go.');
  };

  const toggleSkill = (skill: string) => {
    setProfile(p => ({
      ...p,
      skills: p.skills.includes(skill) ? p.skills.filter(s => s !== skill) : [...p.skills, skill],
    }));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your account, notifications, and preferences.</p>
        </div>

        <div className="flex gap-5 flex-col sm:flex-row">
          {/* Sidebar Tabs */}
          <div className="sm:w-44 shrink-0">
            <nav className="space-y-1">
              {TABS.map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={cn('nav-item w-full text-left', activeTab === key && 'active')}>
                  <Icon className="w-4 h-4" />{label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <div className="card-panel p-5">
                  <h2 className="font-semibold mb-4">Public Profile</h2>
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-border">
                    <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full border-2 border-border" />
                    <div>
                      <p className="font-bold">{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Avatar generated from username (auto-updated)</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3}
                        placeholder="Tell the community about yourself, your experience, and what you're working on..."
                        className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                      <p className="text-xs text-muted-foreground mt-1">{profile.bio.length}/300 characters</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                        <input value={profile.githubUrl} onChange={e => setProfile(p => ({ ...p, githubUrl: e.target.value }))}
                          placeholder="https://github.com/username"
                          className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Portfolio URL</label>
                        <input value={profile.portfolioUrl} onChange={e => setProfile(p => ({ ...p, portfolioUrl: e.target.value }))}
                          placeholder="https://yoursite.dev"
                          className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Skills & Tech Stack</label>
                      <div className="flex flex-wrap gap-2">
                        {ALL_SKILLS.map(skill => (
                          <button type="button" key={skill} onClick={() => toggleSkill(skill)}
                            className={cn('tag-chip transition-all text-xs', profile.skills.includes(skill) ? 'bg-[hsl(217,91%,12%)] border-primary text-primary' : '')}>
                            {profile.skills.includes(skill) && <Check className="w-2.5 h-2.5 mr-1" />}
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button onClick={handleSaveProfile} disabled={saving}
                    className="btn-primary flex items-center gap-2 mt-5 disabled:opacity-60">
                    {saving ? <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="card-panel p-5">
                <h2 className="font-semibold mb-5">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'newAnswers', label: 'New answers on your questions', desc: 'Get notified when someone answers a question you asked' },
                    { key: 'mentions', label: 'Mentions & replies', desc: 'Get notified when someone mentions @you' },
                    { key: 'votes', label: 'Votes on your content', desc: 'Get notified for every upvote or downvote' },
                    { key: 'badges', label: 'Badge & reputation milestones', desc: 'Get notified when you earn badges or reach reputation levels' },
                    { key: 'newsletter', label: 'Weekly engineering insights', desc: 'Our curated newsletter with top questions and articles' },
                    { key: 'weeklyDigest', label: 'Activity digest', desc: 'Weekly summary of your community activity' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                        className={cn('relative w-10 h-5.5 rounded-full border transition-all shrink-0 mt-0.5',
                          (notifications as any)[key] ? 'bg-primary border-primary' : 'bg-secondary border-border')}>
                        <span className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all',
                          (notifications as any)[key] ? 'left-[calc(100%-1.125rem)]' : 'left-0.5')} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveNotifications} className="btn-primary flex items-center gap-2 mt-5">
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <div className="card-panel p-5">
                  <h2 className="font-semibold mb-4">Theme</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'Easy on the eyes' },
                      { id: 'light', label: 'Light Mode', icon: Sun, desc: 'High contrast clarity' },
                    ].map(({ id, label, icon: Icon, desc }) => (
                      <button key={id} onClick={() => { if (theme !== id) toggleTheme(); }}
                        className={cn('card-panel p-4 text-left transition-all hover:border-primary/40', theme === id ? 'border-primary bg-primary/5' : '')}>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={cn('w-4 h-4', theme === id ? 'text-primary' : 'text-muted-foreground')} />
                          <span className="text-sm font-semibold">{label}</span>
                          {theme === id && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card-panel p-5">
                  <h2 className="font-semibold mb-4">Code Block Style</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'monospace', label: 'JetBrains Mono', desc: 'Ligatures, high readability (default)' },
                      { id: 'fira', label: 'Fira Code', desc: 'Clean, popular developer font' },
                    ].map(({ id, label, desc }) => (
                      <div key={id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium font-mono">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="card-panel p-5">
                  <h2 className="font-semibold mb-4">Change Password</h2>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    {[
                      { key: 'currentPassword', label: 'Current password', showKey: 'showCurrent', value: security.currentPassword },
                      { key: 'newPassword', label: 'New password', showKey: 'showNew', value: security.newPassword },
                      { key: 'confirmPassword', label: 'Confirm new password', showKey: 'showNew', value: security.confirmPassword },
                    ].map(({ key, label, value }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-2">{label}</label>
                        <div className="relative">
                          <input type="password" value={value}
                            onChange={e => setSecurity(s => ({ ...s, [key]: e.target.value }))}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                        </div>
                      </div>
                    ))}
                    <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                      <Shield className="w-4 h-4" /> Update Password
                    </button>
                  </form>
                </div>

                <div className="card-panel p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">Two-Factor Authentication</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account.</p>
                    </div>
                    <button onClick={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))}
                      className={cn('relative w-10 h-5 rounded-full border transition-all shrink-0',
                        security.twoFactor ? 'bg-primary border-primary' : 'bg-secondary border-border')}>
                      <span className={cn('absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all',
                        security.twoFactor ? 'left-[calc(100%-1.125rem)]' : 'left-0.5')} />
                    </button>
                  </div>
                  {security.twoFactor && (
                    <p className="text-xs text-accent mt-2 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Two-factor authentication is enabled (demo mode).
                    </p>
                  )}
                </div>

                <div className="card-panel p-5 border-destructive/30">
                  <h2 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Danger Zone
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium">Sign out of all sessions</p>
                        <p className="text-xs text-muted-foreground">Force sign-out from all devices</p>
                      </div>
                      <button onClick={() => { logout(); navigate('/'); }}
                        className="flex items-center gap-1.5 btn-secondary text-xs py-1.5 px-3">
                        <LogOut className="w-3.5 h-3.5" /> Sign Out All
                      </button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-t border-border">
                      <div>
                        <p className="text-sm font-medium text-destructive">Delete account</p>
                        <p className="text-xs text-muted-foreground">Permanently remove your account and anonymize your content</p>
                      </div>
                      <button onClick={handleDeleteAccount}
                        className="flex items-center gap-1.5 text-xs py-1.5 px-3 rounded-md border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
