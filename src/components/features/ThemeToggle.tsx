import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-14 h-7 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        theme === 'dark'
          ? 'bg-secondary border-border'
          : 'bg-[hsl(48,96%,85%)] border-[hsl(48,96%,60%)]',
        className
      )}
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Moon className={cn('w-3.5 h-3.5 transition-opacity duration-200', theme === 'dark' ? 'opacity-100 text-primary' : 'opacity-30 text-muted-foreground')} />
        <Sun className={cn('w-3.5 h-3.5 transition-opacity duration-200', theme === 'light' ? 'opacity-100 text-[hsl(38,90%,45%)]' : 'opacity-30 text-muted-foreground')} />
      </span>

      {/* Thumb */}
      <span
        className={cn(
          'absolute top-0.5 w-6 h-6 rounded-full shadow-sm transition-all duration-300',
          theme === 'dark'
            ? 'left-0.5 bg-[hsl(217,91%,60%)]'
            : 'left-[calc(100%-1.625rem)] bg-[hsl(38,90%,55%)]'
        )}
      />
    </button>
  );
}
