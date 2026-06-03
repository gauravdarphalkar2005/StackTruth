import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Zap, Home, ArrowLeft, Search, MessageSquare } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(hsl(217,91%,60%) 1px, transparent 1px), linear-gradient(90deg, hsl(217,91%,60%) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div className="relative z-10 max-w-md">
        <div className="w-20 h-20 bg-[hsl(217,91%,7%)] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
          <Zap className="w-10 h-10 text-primary" />
        </div>

        <div className="font-mono text-7xl font-black text-primary mb-2 tracking-tight">404</div>
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-2">
          The route{' '}
          <code className="font-mono text-primary bg-secondary px-2 py-0.5 rounded text-xs">{location.pathname}</code>
          {' '}doesn't exist.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          You might have followed a broken link or typed the URL incorrectly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center gap-2 py-2.5 px-6">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/questions" className="btn-secondary inline-flex items-center gap-2 py-2.5 px-6">
            <MessageSquare className="w-4 h-4" /> Browse Questions
          </Link>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          Looking for something? Try the{' '}
          <Link to="/questions" className="text-primary hover:underline">Questions feed</Link>
          {' '}or{' '}
          <Link to="/faq" className="text-primary hover:underline">FAQ page</Link>.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
