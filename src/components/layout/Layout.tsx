import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { getCurrentUser } from '@/lib/auth';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: boolean;
  fullWidth?: boolean;
}

export function Layout({ children, sidebar = true, fullWidth = false }: LayoutProps) {
  const user = getCurrentUser();
  const showSidebar = sidebar && !!user;
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 min-w-0 ${fullWidth ? '' : 'p-5 sm:p-6'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
