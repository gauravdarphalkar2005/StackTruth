import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { getLanguageColor } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

// Simple syntax highlighter
function highlight(code: string, lang: string): string {
  if (!['typescript', 'javascript', 'python', 'rust', 'go'].includes(lang)) {
    return escapeHtml(code);
  }
  let result = escapeHtml(code);

  const keywords: Record<string, string[]> = {
    typescript: ['async', 'await', 'const', 'let', 'var', 'function', 'return', 'import', 'export', 'from', 'interface', 'type', 'class', 'extends', 'implements', 'new', 'throw', 'try', 'catch', 'if', 'else', 'for', 'while', 'of', 'in', 'true', 'false', 'null', 'undefined', 'void', 'string', 'number', 'boolean'],
    javascript: ['async', 'await', 'const', 'let', 'var', 'function', 'return', 'import', 'export', 'from', 'class', 'extends', 'new', 'throw', 'try', 'catch', 'if', 'else', 'for', 'while', 'of', 'in', 'true', 'false', 'null', 'undefined'],
    python: ['async', 'await', 'def', 'class', 'return', 'import', 'from', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'self', 'super', 'with', 'as', 'try', 'except', 'raise', 'pass'],
    rust: ['async', 'await', 'fn', 'let', 'mut', 'pub', 'use', 'struct', 'impl', 'trait', 'return', 'if', 'else', 'for', 'while', 'in', 'match', 'Some', 'None', 'Ok', 'Err', 'true', 'false', 'move', 'type', 'enum', 'mod'],
    go: ['func', 'var', 'const', 'type', 'struct', 'interface', 'return', 'import', 'package', 'if', 'else', 'for', 'range', 'switch', 'case', 'go', 'chan', 'select', 'defer', 'true', 'false', 'nil', 'make', 'new'],
  };

  const kws = keywords[lang] || [];
  kws.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    result = result.replace(regex, `<span class="syntax-keyword">$1</span>`);
  });

  // Strings
  result = result.replace(/(`[^`]*`|&quot;[^&]*?&quot;|&#x27;[^&#]*?&#x27;)/g, '<span class="syntax-string">$1</span>');
  // Comments
  result = result.replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span class="syntax-comment">$1</span>');
  // Numbers
  result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="syntax-number">$1</span>');

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function CodeBlock({ code, language = 'text', showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');
  const highlighted = highlight(code, language);
  const highlightedLines = highlighted.split('\n');
  const langColor = getLanguageColor(language);

  return (
    <div className="relative rounded-lg border border-border overflow-hidden bg-[hsl(222,47%,4%)] my-3">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(222,47%,6%)] border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: langColor }}
          />
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {highlightedLines.map((line, i) => (
              <tr key={i} className="hover:bg-[hsl(222,47%,6%)] transition-colors">
                {showLineNumbers && (
                  <td className="select-none text-right px-3 py-0 text-xs text-muted-foreground/50 font-mono border-r border-border w-10 pr-3">
                    {i + 1}
                  </td>
                )}
                <td
                  className="px-4 py-0 text-sm font-mono leading-6 whitespace-pre"
                  dangerouslySetInnerHTML={{ __html: line || ' ' }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
