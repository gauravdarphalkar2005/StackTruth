import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

export function getReputationLevel(rep: number): { label: string; color: string } {
  if (rep >= 10000) return { label: 'Legendary', color: 'text-yellow-400' };
  if (rep >= 5000) return { label: 'Expert', color: 'text-purple-400' };
  if (rep >= 1000) return { label: 'Veteran', color: 'text-blue-400' };
  if (rep >= 100) return { label: 'Member', color: 'text-green-400' };
  return { label: 'Newcomer', color: 'text-gray-400' };
}

export function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    typescript: '#3178C6',
    javascript: '#F7DF1E',
    python: '#3776AB',
    rust: '#CE422B',
    go: '#00ADD8',
    java: '#ED8B00',
    cpp: '#F34B7D',
    sql: '#4479A1',
    dockerfile: '#2496ED',
    bash: '#4EAA25',
    html: '#E34F26',
    css: '#1572B6',
  };
  return colors[lang.toLowerCase()] || '#6B7280';
}

export function generateCodeReviewScore(code: string): number {
  // Mock scoring based on code characteristics
  let score = 85;
  if (code.includes('any')) score -= 10;
  if (code.includes('TODO') || code.includes('FIXME')) score -= 5;
  if (code.includes('console.log')) score -= 3;
  if (code.includes('try') && code.includes('catch')) score += 5;
  if (code.includes('interface') || code.includes('type ')) score += 5;
  if (code.length < 50) score -= 15;
  return Math.min(100, Math.max(20, score));
}
