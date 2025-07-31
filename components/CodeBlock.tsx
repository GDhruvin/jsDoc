'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <span className="text-sm text-gray-300 font-medium">{title}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-md transition-colors group"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
          )}
        </button>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-100 font-mono leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}