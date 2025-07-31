import { Search, BookOpen, Code, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          JavaScript Documentation
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your complete reference guide for JavaScript. From basics to advanced concepts, 
          with real examples and copy-ready code snippets.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300">Comprehensive Topics</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <Code className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">Copy-Ready Examples</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300">Quick Reference</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
          <h3 className="text-xl font-semibold mb-3 text-blue-400">🟢 Basics</h3>
          <p className="text-gray-300 mb-4">Variables, data types, operators, conditionals, and loops</p>
          <a href="/basics" className="text-blue-400 hover:text-blue-300 font-medium">Explore Basics →</a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">🔷 Functions</h3>
          <p className="text-gray-300 mb-4">Function declarations, expressions, arrow functions, and advanced patterns</p>
          <a href="/functions" className="text-purple-400 hover:text-purple-300 font-medium">Explore Functions →</a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-colors">
          <h3 className="text-xl font-semibold mb-3 text-green-400">🔶 Arrays</h3>
          <p className="text-gray-300 mb-4">Array methods, manipulation, iteration, and functional programming</p>
          <a href="/arrays" className="text-green-400 hover:text-green-300 font-medium">Explore Arrays →</a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-colors">
          <h3 className="text-xl font-semibold mb-3 text-yellow-400">🔷 Strings</h3>
          <p className="text-gray-300 mb-4">String methods, manipulation, template literals, and pattern matching</p>
          <a href="/strings" className="text-yellow-400 hover:text-yellow-300 font-medium">Explore Strings →</a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-indigo-500 transition-colors">
          <h3 className="text-xl font-semibold mb-3 text-indigo-400">🔸 Objects</h3>
          <p className="text-gray-300 mb-4">Object creation, methods, destructuring, and advanced patterns</p>
          <a href="/objects" className="text-indigo-400 hover:text-indigo-300 font-medium">Explore Objects →</a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-red-500 transition-colors">
          <h3 className="text-xl font-semibold mb-3 text-red-400">🔁 Async JS</h3>
          <p className="text-gray-300 mb-4">Promises, async/await, callbacks, and error handling</p>
          <a href="/async" className="text-red-400 hover:text-red-300 font-medium">Explore Async →</a>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-100">Getting Started</h2>
        <div className="space-y-4 text-gray-300">
          <p>👈 Use the sidebar to navigate through different JavaScript topics</p>
          <p>🔍 Use the search bar to quickly find specific concepts</p>
          <p>📋 Click the copy button on any code block to copy it to your clipboard</p>
          <p>⚡ Each topic includes syntax, real examples, and explanations</p>
        </div>
      </div>
    </div>
  );
}