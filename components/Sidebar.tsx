'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarSection {
  title: string;
  emoji: string;
  slug: string;
  items: { title: string; slug: string }[];
}

const sidebarData: SidebarSection[] = [
  {
    title: 'Basics',
    emoji: '🟢',
    slug: 'basics',
    items: [
      { title: 'Variables', slug: 'variables' },
      { title: 'Data Types', slug: 'data-types' },
      { title: 'Operators', slug: 'operators' },
      { title: 'Conditionals', slug: 'conditionals' },
      { title: 'Loops', slug: 'loops' },
    ]
  },
  {
    title: 'Functions',
    emoji: '🔷',
    slug: 'functions',
    items: [
      { title: 'Function Declaration', slug: 'function-declaration' },
      { title: 'Arrow Functions', slug: 'arrow-functions' },
      { title: 'Parameters', slug: 'parameters' },
      { title: 'Call, Apply, Bind', slug: 'call-apply-bind' },
    ]
  },
  {
    title: 'Arrays',
    emoji: '🔶',
    slug: 'arrays',
    items: [
      { title: 'Array Basics', slug: 'array-basics' },
      { title: 'Array Methods', slug: 'array-methods' },
      { title: 'Iteration Methods', slug: 'iteration-methods' },
      { title: 'Advanced Arrays', slug: 'advanced-arrays' },
    ]
  },
  {
    title: 'Strings',
    emoji: '🔷',
    slug: 'strings',
    items: [
      { title: 'String Basics', slug: 'string-basics' },
      { title: 'String Methods', slug: 'string-methods' },
      { title: 'Template Literals', slug: 'template-literals' },
    ]
  },
  {
    title: 'Objects',
    emoji: '🔸',
    slug: 'objects',
    items: [
      { title: 'Object Basics', slug: 'object-basics' },
      { title: 'Object Methods', slug: 'object-methods' },
      { title: 'Destructuring', slug: 'destructuring' },
    ]
  },
  {
    title: 'Scope & Closure',
    emoji: '🔒',
    slug: 'scope',
    items: [
      { title: 'Scope Types', slug: 'scope-types' },
      { title: 'Closures', slug: 'closures' },
    ]
  },
  {
    title: 'Advanced Concepts',
    emoji: '⚙️',
    slug: 'advanced',
    items: [
      { title: 'Hoisting', slug: 'hoisting' },
      { title: 'Event Loop', slug: 'event-loop' },
      { title: 'Execution Context', slug: 'execution-context' },
      { title: 'Debounce & Throttle', slug: 'debounce-throttle' },
      { title: 'Memoization', slug: 'memoization' },
      { title: 'Currying', slug: 'currying' },
      { title: 'Recursion', slug: 'recursion' },
    ]
  },
  {
    title: 'Async JavaScript',
    emoji: '🔁',
    slug: 'async',
    items: [
      { title: 'Callbacks', slug: 'callbacks' },
      { title: 'Promises', slug: 'promises' },
      { title: 'Async/Await', slug: 'async-await' },
      { title: 'Error Handling', slug: 'error-handling' },
    ]
  },
  {
    title: 'Browser & DOM',
    emoji: '🌐',
    slug: 'dom',
    items: [
      { title: 'DOM Manipulation', slug: 'dom-manipulation' },
      { title: 'Event Handling', slug: 'event-handling' },
      { title: 'Local Storage', slug: 'local-storage' },
      { title: 'Fetch API', slug: 'fetch-api' },
    ]
  },
  {
    title: 'ES6+ Features',
    emoji: '🔑',
    slug: 'es6',
    items: [
      { title: 'Template Literals', slug: 'template-literals' },
      { title: 'Destructuring', slug: 'destructuring' },
      { title: 'Spread & Rest', slug: 'spread-rest' },
      { title: 'Modules', slug: 'modules' },
      { title: 'Set & Map', slug: 'set-map' },
    ]
  },
  {
    title: 'Bonus Topics',
    emoji: '🧪',
    slug: 'bonus',
    items: [
      { title: 'Testing Basics', slug: 'testing' },
      { title: 'Working with APIs', slug: 'apis' },
      { title: 'Regex Basics', slug: 'regex' },
      { title: 'Performance Tips', slug: 'performance' },
    ]
  }
];

export function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['basics']);
  const pathname = usePathname();

  const toggleSection = (slug: string) => {
    setExpandedSections(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  return (
    <aside className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Documentation</h2>
        
        <nav className="space-y-2">
          {sidebarData.map((section) => (
            <div key={section.slug}>
              <button
                onClick={() => toggleSection(section.slug)}
                className="flex items-center justify-between w-full text-left py-2 px-3 text-gray-300 hover:text-gray-100 hover:bg-gray-700 rounded-md transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{section.emoji}</span>
                  <span className="font-medium">{section.title}</span>
                </span>
                {expandedSections.includes(section.slug) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {expandedSections.includes(section.slug) && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.items.map((item) => {
                    const href = `/${section.slug}/${item.slug}`;
                    const isActive = pathname === href;
                    
                    return (
                      <Link
                        key={item.slug}
                        href={href}
                        className={`block py-2 px-3 text-sm rounded-md transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-gray-100 hover:bg-gray-700'
                        }`}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}