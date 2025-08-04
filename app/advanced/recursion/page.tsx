import { TopicPage } from "@/components/TopicPage";

export default function RecursionPage() {
  const examples = [
    {
      title: "Basic Recursion",
      description: "Functions that call themselves to solve problems.",
      code: `// Factorial
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive case
}
console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)

// Fibonacci
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(6)); // 8 (0, 1, 1, 2, 3, 5, 8)

// Sum array
function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}
console.log(sumArray([1, 2, 3, 4])); // 10`,
    },
    {
      title: "Recursion with Memoization",
      description: "Optimizing recursive functions with memoization.",
      code: `// Memoized Fibonacci
function fibMemo() {
  const cache = new Map();
  function fib(n) {
    if (cache.has(n)) return cache.get(n);
    if (n <= 1) return n;
    const result = fib(n - 1) + fib(n - 2);
    cache.set(n, result);
    return result;
  }
  return fib;
}
const fastFib = fibMemo();
console.log(fastFib(50)); // 12586269025 (faster)

// Generic memoizer
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const memoFactorial = memoize(factorial);
console.log(memoFactorial(5)); // 120
console.log(memoFactorial(5)); // 120 (cached)`,
    },
    {
      title: "Recursive Data Structures",
      description: "Using recursion to traverse nested structures.",
      code: `// Tree traversal
const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] }
  ]
};

function sumTree(node) {
  if (!node) return 0;
  const childSum = node.children.reduce((sum, child) => sum + sumTree(child), 0);
  return node.value + childSum;
}
console.log(sumTree(tree)); // 10 (1 + 2 + 3 + 4)

// Flatten nested array
function flatten(arr) {
  return arr.reduce((flat, item) => 
    flat.concat(Array.isArray(item) ? flatten(item) : item), []);
}
console.log(flatten([1, [2, [3, 4], 5]])); // [1, 2, 3, 4, 5]`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of recursion.",
      code: `// Directory traversal
const fileSystem = {
  name: "root",
  type: "dir",
  contents: [
    { name: "file1.txt", type: "file" },
    { name: "docs", type: "dir", contents: [{ name: "file2.txt", type: "file" }] }
  ]
};

function listFiles(fs) {
  if (fs.type === "file") return [fs.name];
  return fs.contents.reduce((files, item) => files.concat(listFiles(item)), []);
}
console.log(listFiles(fileSystem)); // ["file1.txt", "file2.txt"]

// Recursive search
function findKey(obj, target) {
  for (const key in obj) {
    if (key === target) return obj[key];
    if (typeof obj[key] === "object") {
      const result = findKey(obj[key], target);
      if (result !== undefined) return result;
    }
  }
}
const data = { a: 1, b: { c: 2, d: { e: 3 } } };
console.log(findKey(data, "e")); // 3

// Recursive DOM traversal
function getAllTags(element) {
  const tags = [element.tagName];
  for (const child of element.children) {
    tags.push(...getAllTags(child));
  }
  return tags;
}
// const tags = getAllTags(document.body);`,
    },
    {
      title: "Best Practices and Avoiding Stack Overflow",
      description: "Optimizing recursion and handling large inputs.",
      code: `// Avoid deep recursion
function badFactorial(n) {
  if (n <= 1) return 1;
  return n * badFactorial(n - 1);
}
// badFactorial(10000); // May cause stack overflow

// Tail recursion (not optimized in JS)
function tailFactorial(n, acc = 1) {
  if (n <= 1) return acc;
  return tailFactorial(n - 1, n * acc);
}
console.log(tailFactorial(5)); // 120

// Iterative alternative
function iterativeFactorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
console.log(iterativeFactorial(5)); // 120

// Limit recursion depth
function safeFlatten(arr, depth = 0) {
  if (depth > 1000) throw new Error("Max recursion depth exceeded");
  return arr.reduce((flat, item) => 
    flat.concat(Array.isArray(item) ? safeFlatten(item, depth + 1) : item), []);
}
console.log(safeFlatten([1, [2, [3, 4], 5]])); // [1, 2, 3, 4, 5]`,
    },
  ];

  return (
    <TopicPage
      title="Recursion"
      description="Explore recursion in JavaScript, where functions call themselves to solve problems, with techniques like memoization and strategies to avoid stack overflow."
      examples={examples}
    />
  );
}
