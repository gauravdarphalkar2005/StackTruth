import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowLeft, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { FullFooter } from '@/components/layout/FullFooter';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address.'); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success('Password reset email sent!');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Stack<span className="text-primary">Truth</span></span>
        </Link>

        <div className="card-panel p-7">
          {!sent ? (
            <>
              <div className="w-12 h-12 bg-[hsl(217,91%,8%)] rounded-xl flex items-center justify-center mb-5">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-xl font-bold mb-1.5">Reset your password</h1>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Enter the email address associated with your account. We'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2.5 p-3 bg-[hsl(0,72%,6%)] border border-[hsl(0,72%,22%)] rounded-lg text-sm text-destructive">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Email address</label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 bg-input border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <>Send Reset Link <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-[hsl(142,71%,8%)] rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-lg font-bold mb-2">Check your inbox</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                We sent a password reset link to <strong className="text-foreground">{email}</strong>. Check your spam folder if you don't see it.
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary w-full py-2.5 text-sm mb-3">
                Try a different email
              </button>
              <button onClick={() => navigate('/login')} className="text-sm text-primary hover:underline">
                Back to sign in
              </button>
            </div>
          )}

          {!sent && (
            <div className="mt-5 text-center">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
      <FullFooter />
    </div>
  );
}
