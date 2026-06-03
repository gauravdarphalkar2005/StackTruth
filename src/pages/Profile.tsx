import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // added useNavigate
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, ExternalLink, Edit3, Calendar, CheckCircle2,
  TrendingUp, MessageSquare, Award, Settings, ArrowUpRight, Star,
  Users, Trophy, Zap, Shield, Sparkles, MessageCircle, Heart, Share2, Plus, Check
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import { getCurrentUser, updateProfile } from '@/lib/auth';
import { MOCK_USERS, MOCK_QUESTIONS, MOCK_ANSWERS } from '@/lib/mockData';
import { Layout } from '@/components/layout/Layout';
import { QuestionCard } from '@/components/features/QuestionCard';
import { formatDate, formatNumber, getReputationLevel } from '@/lib/utils';
import { toast } from 'sonner';
import type { User } from '@/types';

const ALL_SKILLS = [
  'TypeScript', 'JavaScript', 'React', 'Vue', 'Node.js', 'Python', 'Rust',
  'Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'GraphQL', 'AWS',
  'Next.js', 'FastAPI', 'Java', 'C++'
];

const getFullName = (username: string) => {
  switch (username) {
    case 'alex_dev': return 'Alex Sterling';
    case 'sarah_codes': return 'Sarah Jenkins';
    case 'dev_marcus': return 'Marcus Thorne';
    case 'kiran_ml': return 'Kiran Patel';
    case 'admin_root': return 'System Administrator';
    default: return username.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
};

const getDeveloperHighlights = (user: User) => {
  const reputation = user.reputation;
  let expertise = 'Junior Developer';
  let rank = 'Top 50%';
  let score = 65;

  if (reputation > 8000) {
    expertise = 'Principal Architect';
    rank = 'Top 0.1% Globally';
    score = 99;
  } else if (reputation > 5000) {
    expertise = 'Lead Backend Engineer';
    rank = 'Top 0.5% Globally';
    score = 95;
  } else if (reputation > 3000) {
    expertise = 'Senior Frontend Engineer';
    rank = 'Top 2.0% Globally';
    score = 88;
  } else {
    expertise = 'Full-Stack Developer';
    rank = 'Top 10.0% Globally';
    score = 78;
  }

  return { expertise, rank, score };
};

const getSkillStyle = (skill: string) => {
  const normalized = skill.toLowerCase();
  switch (normalized) {
    case 'typescript':
      return { bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', dot: 'bg-blue-500', icon: 'TS' };
    case 'javascript':
      return { bg: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100', dot: 'bg-amber-500', icon: 'JS' };
    case 'react':
      return { bg: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100', dot: 'bg-sky-400', icon: 'RE' };
    case 'node.js':
    case 'nodejs':
      return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100', dot: 'bg-emerald-500', icon: 'NO' };
    case 'python':
      return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100', dot: 'bg-indigo-500', icon: 'PY' };
    case 'rust':
      return { bg: 'bg-orange-50 text-orange-850 border-orange-200 hover:bg-orange-100', dot: 'bg-orange-600', icon: 'RS' };
    case 'go':
      return { bg: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100', dot: 'bg-cyan-500', icon: 'GO' };
    case 'docker':
      return { bg: 'bg-blue-50/80 text-blue-800 border-blue-250 hover:bg-blue-100', dot: 'bg-blue-600', icon: 'DK' };
    case 'kubernetes':
      return { bg: 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100', dot: 'bg-indigo-600', icon: 'K8' };
    case 'postgresql':
      return { bg: 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100', dot: 'bg-blue-800', icon: 'PG' };
    case 'redis':
      return { bg: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100', dot: 'bg-red-600', icon: 'RD' };
    case 'graphql':
      return { bg: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100', dot: 'bg-pink-500', icon: 'QL' };
    case 'aws':
      return { bg: 'bg-amber-50 text-amber-800 border-amber-250 hover:bg-amber-100', dot: 'bg-amber-500', icon: 'WS' };
    default:
      return { bg: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100', dot: 'bg-slate-400', icon: skill.substring(0, 2).toUpperCase() };
  }
};

const getAchievements = (user: User) => {
  return [
    {
      id: 'a1',
      title: 'Veracity Shield',
      description: 'Account linked with GitHub with 100% authenticity score.',
      type: 'Gold Verified',
      icon: Shield,
      colorClass: 'text-amber-600 bg-amber-50 border-amber-200/70',
      glow: 'shadow-amber-100/50 hover:shadow-amber-200/60',
      progress: 100,
      milestone: 'Verified'
    },
    {
      id: 'a2',
      title: 'Answer Machine',
      description: 'Recognized for providing high-quality, verified solutions.',
      type: 'Silver Contributor',
      icon: Trophy,
      colorClass: 'text-slate-650 bg-slate-50 border-slate-250',
      glow: 'shadow-slate-100/50 hover:shadow-slate-200/60',
      progress: Math.min(Math.round((user.acceptedAnswers / 50) * 100), 100),
      milestone: `${user.acceptedAnswers} / 50 Accepted`
    },
    {
      id: 'a3',
      title: 'Civic Lighthouse',
      description: 'Regular voter curating high quality developer content.',
      type: 'Bronze Member',
      icon: Zap,
      colorClass: 'text-orange-600 bg-orange-50 border-orange-200/70',
      glow: 'shadow-orange-100/50 hover:shadow-orange-200/60',
      progress: 75,
      milestone: '75 / 100 Votes'
    }
  ];
};

const getTimelineEvents = (user: User) => {
  const events = [
    {
      id: 't1',
      date: 'Jan 2024',
      title: 'Moderator Recognized',
      description: 'Awarded community mod status for exemplary and helpful answers.',
      icon: Award,
      iconColor: 'text-purple-650 bg-purple-50 border-purple-100',
    },
    {
      id: 't2',
      date: 'Nov 2023',
      title: 'Milestone: 20+ Accepted Answers',
      description: 'Consistently resolving community pain points with verified code.',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: 't3',
      date: 'Jun 2023',
      title: 'Earned Expert Role Badge',
      description: 'Surpassed 3,000 reputation score to secure Verified Expert status.',
      icon: Trophy,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      id: 't4',
      date: formatDate(user.joinedAt),
      title: 'Joined StackTruth Platform',
      description: 'Created verified developer credentials and linked GitHub repositories.',
      icon: Calendar,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-100',
    }
  ];

  if (user.role === 'admin') {
    return [
      {
        id: 't_admin',
        date: formatDate(user.joinedAt),
        title: 'Platform Administrator Credentials Setup',
        description: 'Verified administrative security keys and system settings configurations.',
        icon: Shield,
        iconColor: 'text-rose-600 bg-rose-50 border-rose-100',
      },
      ...events.slice(2)
    ];
  }

  return events;
};

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate(); // ← added for message navigation
  const currentUser = getCurrentUser();

  const [profileUser, setProfileUser] = useState<User | undefined>(() => {
    const curr = getCurrentUser();
    return username === curr?.username
      ? curr
      : MOCK_USERS.find(u => u.username === username);
  });

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [activeTab, setActiveTab] = useState<'questions' | 'answers' | 'timeline'>('questions');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const curr = getCurrentUser();
    const user = username === curr?.username
      ? curr
      : MOCK_USERS.find(u => u.username === username);
    setProfileUser(user);
  }, [username]);

  // Enforce pure light mode style lifecycle (if you still want it)
  useEffect(() => {
    const root = document.documentElement;
    const hadLight = root.classList.contains('light');
    root.classList.add('light');

    const body = document.body;
    const originalBodyBg = body.style.backgroundColor;
    body.style.backgroundColor = '#F8FAFC';

    return () => {
      if (!hadLight) {
        root.classList.remove('light');
      }
      body.style.backgroundColor = originalBodyBg;
    };
  }, []);

  if (!profileUser) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-100/50 p-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">User not found</h2>
          <p className="text-slate-500 text-sm mb-6">The profile <code className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded">@{username}</code> doesn't exist.</p>
          <Link to="/questions" className="btn-primary py-2 px-5 text-sm bg-blue-600 text-white rounded-lg shadow-md shadow-blue-500/10 hover:bg-blue-700">Browse Questions</Link>
        </div>
      </Layout>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;
  const repLevel = getReputationLevel(profileUser.reputation);
  const userQuestions = MOCK_QUESTIONS.filter(q => q.authorId === profileUser.id);
  const userAnswers = MOCK_ANSWERS.filter(a => a.authorId === profileUser.id);
  const developerHighlights = getDeveloperHighlights(profileUser);
  const achievementsList = getAchievements(profileUser);
  const timelineEvents = getTimelineEvents(profileUser);

  const chartData = [
    { month: 'Jan', reputation: Math.round(profileUser.reputation * 0.75) },
    { month: 'Feb', reputation: Math.round(profileUser.reputation * 0.81) },
    { month: 'Mar', reputation: Math.round(profileUser.reputation * 0.86) },
    { month: 'Apr', reputation: Math.round(profileUser.reputation * 0.90) },
    { month: 'May', reputation: Math.round(profileUser.reputation * 0.95) },
    { month: 'Jun', reputation: profileUser.reputation },
  ];

  const handleSave = () => {
    const updated = updateProfile(editData);
    if (updated) {
      toast.success('Profile updated successfully!');
      setProfileUser(updated);
      setEditing(false);
    }
  };

  const handleFollow = () => {
    setIsFollowing(prev => !prev);
    toast.success(isFollowing ? `Unfollowed @${profileUser.username}` : `Following @${profileUser.username}!`);
  };

  // ✅ FIXED: Message button now navigates to the chat page
  const handleMessage = () => {
    navigate(`/messages/${profileUser.username}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Profile link copied to clipboard!');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        
        {/* PROFILE HEADER (unchanged) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[24px] border border-slate-200/60 bg-white shadow-xl shadow-slate-100/50"
        >
          <div className="relative h-36 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-100/60 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.3]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '20px 20px' }} />
            <div className="absolute top-[-50px] left-[15%] w-48 h-48 rounded-full bg-blue-200/20 blur-3xl animate-pulse" />
            <div className="absolute top-[-30px] right-[25%] w-40 h-40 rounded-full bg-indigo-200/20 blur-2xl" />
          </div>

          <div className="px-6 pb-6 -mt-12 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
              
              {/* Avatar + Status Indicator */}
              <div className="flex items-end gap-4">
                <div className="relative group">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="relative cursor-pointer"
                  >
                    <img 
                      src={profileUser.avatar} 
                      alt={profileUser.username}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-slate-50 shadow-md object-cover" 
                    />
                    <div className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">{getFullName(profileUser.username)}</h1>
                    <span className={`text-[10px] tracking-wider uppercase font-black px-2 py-0.5 rounded-full border border-rose-200/70 bg-rose-50 text-rose-600`}>
                      {profileUser.role}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-400">@{profileUser.username}</p>
                </div>
              </div>

              {/* Quick Actions Buttons */}
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
                {isOwnProfile ? (
                  editing ? null : (
                    <>
                      <button 
                        onClick={() => { 
                          setEditing(true); 
                          setEditData({ 
                            bio: profileUser.bio, 
                            skills: profileUser.skills, 
                            githubUrl: profileUser.githubUrl, 
                            portfolioUrl: profileUser.portfolioUrl 
                          }); 
                        }}
                        className="flex-1 sm:flex-initial btn-secondary text-xs flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold shadow-sm transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                      </button>
                      <Link 
                        to="/settings" 
                        className="flex-1 sm:flex-initial btn-secondary text-xs flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold shadow-sm transition-all"
                      >
                        <Settings className="w-3.5 h-3.5" /> Settings
                      </Link>
                      <button 
                        onClick={handleShare}
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 shadow-sm transition-all"
                        title="Share Profile"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </>
                  )
                ) : (
                  <>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFollow}
                      className={`flex-1 sm:flex-initial text-xs font-semibold py-2 px-5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                        isFollowing 
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" /> {isFollowing ? 'Following' : 'Follow'}
                    </motion.button>
                    <button 
                      onClick={handleMessage} // ✅ now navigates, not just toast
                      className="flex-1 sm:flex-initial btn-secondary text-xs flex items-center justify-center gap-1.5 py-2 px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Message
                    </button>
                    {profileUser.githubUrl && (
                      <a 
                        href={profileUser.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border border-slate-200 bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Profile Bio / Edit Form – unchanged */}
            <AnimatePresence mode="wait">
              {editing ? (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 pt-4 border-t border-slate-100"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Bio Description</label>
                    <textarea 
                      value={editData.bio || ''} 
                      onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))} 
                      rows={3}
                      placeholder="Tell the community about yourself, your architectures, and systems..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-inner" 
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">GitHub Profile URL</label>
                      <input 
                        value={editData.githubUrl || ''} 
                        onChange={e => setEditData(d => ({ ...d, githubUrl: e.target.value }))}
                        placeholder="https://github.com/username" 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Portfolio Website URL</label>
                      <input 
                        value={editData.portfolioUrl || ''} 
                        onChange={e => setEditData(d => ({ ...d, portfolioUrl: e.target.value }))}
                        placeholder="https://portfolio.io" 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Select Skills (Toggle to select)</label>
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl max-h-40 overflow-y-auto">
                      {ALL_SKILLS.map(skill => {
                        const isSelected = (editData.skills || []).includes(skill);
                        return (
                          <button 
                            type="button" 
                            key={skill}
                            onClick={() => {
                              const skills = editData.skills || [];
                              setEditData(d => ({ 
                                ...d, 
                                skills: isSelected ? skills.filter(s => s !== skill) : [...skills, skill] 
                              }));
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                              isSelected 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                : 'bg-white text-slate-650 border-slate-200 hover:border-slate-350'
                            }`}
                          >
                            {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button onClick={handleSave} className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-500/10 transition-all">Save Changes</button>
                    <button onClick={() => setEditing(false)} className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-all border border-slate-200">Cancel</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 pt-4 border-t border-slate-150/60"
                >
                  {profileUser.bio ? (
                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{profileUser.bio}</p>
                  ) : (
                    <p className="text-sm text-slate-400 italic">No bio has been added to this profile yet.</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium flex-wrap">
                    <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100/70 border border-slate-150/30 px-2.5 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5" /> Joined {formatDate(profileUser.joinedAt)}
                    </span>
                    {profileUser.githubUrl && (
                      <a href={profileUser.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors">
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </a>
                    )}
                    {profileUser.portfolioUrl && (
                      <a href={profileUser.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Website
                      </a>
                    )}
                    <span className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {repLevel.label}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* STATISTICS SECTION – unchanged */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {[
            { label: 'Reputation', value: formatNumber(profileUser.reputation), icon: Star, color: 'text-amber-600', gradient: 'from-amber-50 to-orange-50/50 border-amber-200/80 shadow-amber-100/20' },
            { label: 'Questions', value: String(profileUser.questionsCount), icon: MessageSquare, color: 'text-blue-600', gradient: 'from-blue-50 to-indigo-50/50 border-blue-200/80 shadow-blue-100/20' },
            { label: 'Answers Written', value: String(profileUser.answersCount), icon: MessageCircle, color: 'text-emerald-600', gradient: 'from-emerald-50 to-teal-50/50 border-emerald-200/80 shadow-emerald-100/20' },
            { label: 'Accepted Answers', value: String(profileUser.acceptedAnswers), icon: CheckCircle2, color: 'text-purple-600', gradient: 'from-purple-50 to-fuchsia-50/50 border-purple-200/80 shadow-purple-100/20' },
            { label: 'Followers', value: String(profileUser.reputation > 5000 ? 142 : 48), icon: Users, color: 'text-rose-600', gradient: 'from-rose-50 to-pink-50/50 border-rose-200/80 shadow-rose-100/20' },
          ].map(({ label, value, icon: Icon, color, gradient }, idx) => (
            <motion.div 
              key={label}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`p-4 rounded-[20px] bg-gradient-to-br ${gradient} border shadow-md flex flex-col justify-between h-28 cursor-pointer`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
                <div className={`p-1.5 bg-white/90 rounded-lg shadow-sm ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-800 mt-2 tracking-tight">{value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* TWO COLUMN MAIN DASHBOARD – unchanged aside from message fix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT SIDEBAR – unchanged */}
          <div className="space-y-6 lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] border border-slate-200/60 shadow-lg shadow-slate-100/50 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles className="w-4 h-4 text-blue-600" /> Developer Highlights
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider">Expertise Level</span>
                  <span className="font-bold text-slate-700 bg-slate-150 px-2 py-0.5 rounded-lg text-[11px]">{developerHighlights.expertise}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider">Community Rank</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg text-[11px]">{developerHighlights.rank}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400 uppercase tracking-wider">Contribution Score</span>
                    <span className="text-blue-600">{developerHighlights.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${developerHighlights.score}%` }} transition={{ duration: 1, ease: 'easeOut' }} className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] border border-slate-200/60 shadow-lg shadow-slate-100/50 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Star className="w-4 h-4 text-blue-650" /> Tech Stack & Tools
              </h3>
              {profileUser.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileUser.skills.map(skill => {
                    const style = getSkillStyle(skill);
                    return (
                      <motion.div key={skill} whileHover={{ scale: 1.03, y: -1 }} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm transition-all cursor-pointer ${style.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                        <span>{skill}</span>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No technologies added to stack.</p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] border border-slate-200/60 shadow-lg shadow-slate-100/50 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Trophy className="w-4 h-4 text-amber-500 animate-bounce" /> Verified Achievements
              </h3>
              <div className="space-y-4">
                {achievementsList.map(item => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.id} className={`p-3 rounded-xl border bg-white shadow-sm transition-all duration-200 ${item.glow} flex gap-3`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${item.colorClass}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-black text-slate-700">{item.title}</h4>
                          <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-50 border px-1.5 py-0.5 rounded">{item.type}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{item.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                            <span>Milestone Progress</span>
                            <span className="text-slate-700 font-bold">{item.milestone}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden shadow-inner">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} transition={{ duration: 1 }} className="bg-blue-600 h-full rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT MAIN DETAILS – unchanged except message already fixed above */}
          <div className="space-y-6 lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] border border-slate-200/60 shadow-lg shadow-slate-100/50 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" /> Reputation Growth History
                </h3>
                <span className="text-xs font-semibold text-slate-400">Past 6 Months</span>
              </div>
              <div className="h-[200px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="reputationColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val} />
                    <Tooltip content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-200 shadow-md rounded-xl p-2.5 text-xs">
                            <p className="font-semibold text-slate-400 mb-0.5">{payload[0].payload.month} Score</p>
                            <p className="font-black text-blue-600 text-sm">+{formatNumber(Number(payload[0].value))}</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Area type="monotone" dataKey="reputation" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#reputationColor)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="bg-white rounded-[20px] border border-slate-200/60 shadow-lg shadow-slate-100/50 overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50/50 px-2 pt-1.5 gap-1">
                {[
                  { key: 'questions', label: `Questions (${userQuestions.length})`, icon: MessageSquare },
                  { key: 'answers', label: `Answers (${userAnswers.length})`, icon: CheckCircle2 },
                  { key: 'timeline', label: 'Timeline', icon: Calendar },
                ].map(({ key, label, icon: TabIcon }) => (
                  <button key={key} onClick={() => setActiveTab(key as any)} className={`px-4 py-3 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 border-b-2 -mb-[1px] ${activeTab === key ? 'border-blue-600 text-blue-600 bg-white shadow-sm' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              <div className="p-5">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.15 }}>
                    {activeTab === 'questions' && (
                      userQuestions.length > 0 ? (
                        <div className="space-y-3">
                          {userQuestions.map(q => <QuestionCard key={q.id} question={q} compact />)}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <MessageSquare className="w-8 h-8 text-slate-350 mx-auto mb-2" />
                          <p className="text-xs font-medium text-slate-400">No questions asked yet.</p>
                          {isOwnProfile && <Link to="/ask" className="btn-primary inline-block mt-3 text-xs bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">Ask First Question</Link>}
                        </div>
                      )
                    )}

                    {activeTab === 'answers' && (
                      userAnswers.length > 0 ? (
                        <div className="space-y-4">
                          {userAnswers.map(a => (
                            <div key={a.id} className={`p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:border-slate-300 ${a.isAccepted ? 'border-emerald-250 bg-emerald-50/20' : 'border-slate-150 bg-slate-50/20'}`}>
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex gap-2">
                                  {a.isAccepted && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                                  <div>
                                    <p className="text-xs text-slate-650 leading-relaxed font-medium line-clamp-3">{a.body}</p>
                                    {a.isAccepted && <span className="text-[10px] text-emerald-600 font-bold mt-1.5 inline-flex items-center gap-1">✓ Solution Verified</span>}
                                  </div>
                                </div>
                                <Link to={`/questions/${a.questionId}`} className="text-xs text-blue-600 hover:text-blue-700 font-bold shrink-0 flex items-center gap-0.5 hover:underline whitespace-nowrap bg-blue-50/60 px-2 py-1 rounded-lg">
                                  +{a.votes} <ArrowUpRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <CheckCircle2 className="w-8 h-8 text-slate-350 mx-auto mb-2" />
                          <p className="text-xs font-medium text-slate-400">No answers posted yet.</p>
                          {isOwnProfile && <Link to="/questions" className="btn-primary inline-block mt-3 text-xs bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">Browse Questions</Link>}
                        </div>
                      )
                    )}

                    {activeTab === 'timeline' && (
                      <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 py-2 ml-3">
                        {timelineEvents.map(event => {
                          const TimelineIcon = event.icon;
                          return (
                            <div key={event.id} className="relative group">
                              <div className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center border shadow-sm ${event.iconColor}`}>
                                <TimelineIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{event.date}</span>
                                </div>
                                <h4 className="text-xs font-black text-slate-700 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                                <p className="text-xs text-slate-450 leading-relaxed max-w-xl">{event.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}