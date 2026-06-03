import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Plus, LogOut, User, Shield, Menu, X, Zap, Settings, ChevronDown } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { MOCK_NOTIFICATIONS } from '@/lib/mockData';
import { ThemeToggle } from '@/components/features/ThemeToggle';

const NAV_LINKS = [
  { label: 'Questions', href: '/questions' },
  { label: 'AI Review', href: '/code-review' },
  { label: 'Leaderboard', href: '/leaderboard' },
];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  // Read user fresh on every render so switching accounts updates the header
  const [user, setUser] = useState(getCurrentUser());
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Refresh user from localStorage on location change (handles bypass login)
  useEffect(() => {
    setUser(getCurrentUser());
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/questions?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`sticky top-0 z-50 h-14 border-b border-border transition-all duration-200 ${scrolled ? 'bg-card/98 backdrop-blur-md shadow-sm' : 'bg-card'}`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-base tracking-tight hidden sm:block">
            Stack<span className="text-primary">Truth</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        {user && (
          <nav className="hidden lg:flex items-center gap-0.5 ml-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} to={href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${location.pathname.startsWith(href) ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md ml-auto lg:ml-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search questions, tags..."
              className="w-full pl-8 pr-3 py-1.5 bg-secondary border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-foreground"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {user ? (
            <>
              {user.role !== 'admin' && (
                <button onClick={() => navigate('/ask')}
                  className="hidden sm:flex items-center gap-1.5 btn-primary text-xs py-1.5 px-3">
                  <Plus className="w-3.5 h-3.5" /> Ask
                </button>
              )}

              <ThemeToggle />

              {/* Notifications */}
              <button onClick={() => navigate('/notifications')}
                className="relative p-2 rounded-md hover:bg-secondary transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User menu */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 p-1 rounded-md hover:bg-secondary transition-colors">
                  <img src={user.avatar} alt={user.username} className="w-7 h-7 rounded-full border border-border bg-secondary" />
                  <span className="hidden sm:block text-xs font-medium text-muted-foreground max-w-[80px] truncate">{user.username}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-54 card-panel shadow-xl shadow-black/20 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50 min-w-[200px]">
                  <div className="px-3 py-2.5 border-b border-border mb-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold">{user.username}</p>
                      {user.role !== 'user' && (
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${user.role === 'admin' ? 'bg-destructive text-white' : 'bg-primary text-primary-foreground'}`}>
                          {user.role}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link to={`/profile/${user.username}`} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Zap className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors text-destructive">
                      <Shield className="w-4 h-4" /> Admin Panel
                    </Link>
                  )}
                  <div className="border-t border-border mt-1 pt-1">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors text-destructive">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/login" className="btn-secondary text-xs py-1.5 px-3 hidden sm:block">Sign In</Link>
              <Link to="/register" className="btn-primary text-xs py-1.5 px-3">Join Free</Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border bg-card/98 backdrop-blur-md px-4 py-3 space-y-2 shadow-lg">
          {user ? (
            <>
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border border-border" />
                <div>
                  <p className="text-sm font-semibold">{user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.role} · {user.reputation} rep</p>
                </div>
              </div>
              {user.role !== 'admin' && (
                <Link to="/ask" className="btn-primary w-full text-center text-sm py-2.5 block" onClick={() => setMenuOpen(false)}>+ Ask Question</Link>
              )}
              {[...NAV_LINKS, { label: 'Dashboard', href: '/dashboard' }, { label: 'Notifications', href: '/notifications' }, { label: 'Profile', href: `/profile/${user.username}` }, { label: 'Settings', href: '/settings' }].map(({ label, href }) => (
                <Link key={href} to={href} className="nav-item w-full block" onClick={() => setMenuOpen(false)}>{label}</Link>
              ))}
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-item w-full text-destructive block" onClick={() => setMenuOpen(false)}>
                  <Shield className="w-4 h-4 inline mr-1.5" />Admin Panel
                </Link>
              )}
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="nav-item w-full text-destructive text-left w-full">
                <LogOut className="w-4 h-4 inline mr-1.5" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary w-full text-center text-sm py-2.5 block" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="btn-primary w-full text-center text-sm py-2.5 block" onClick={() => setMenuOpen(false)}>Join Free</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
