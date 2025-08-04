import { TopicPage } from "@/components/TopicPage";

export default function MemoizationPage() {
  const examples = [
    {
      title: "Basic Memoization",
      description: "Caching function results to avoid redundant computations.",
      code: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Example: Expensive calculation
const expensiveAdd = memoize((a, b) => {
  console.log("Calculating...");
  return a + b;
});

console.log(expensiveAdd(2, 3)); // "Calculating...", 5
console.log(expensiveAdd(2, 3)); // 5 (cached)
console.log(expensiveAdd(3, 4)); // "Calculating...", 7`,
    },
    {
      title: "Memoizing Recursive Functions",
      description: "Using memoization to optimize recursive algorithms.",
      code: `// Fibonacci without memoization
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(10)); // 55 (slow for large n)

// Memoized Fibonacci
const memoFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
});
console.log(memoFib(10)); // 55 (faster)

// Custom memoization for recursion
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
console.log(fastFib(50)); // 12586269025 (much faster)`,
    },
    {
      title: "Memoization with Complex Inputs",
      description: "Handling objects and arrays as function arguments.",
      code: `function memoizeComplex(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args, (k, v) => 
      v instanceof Array ? v.sort((a, b) => a - b) : v
    );
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const sortAndSum = memoizeComplex((arr) => {
  console.log("Sorting and summing...");
  return arr.sort((a, b) => a - b).reduce((sum, num) => sum + num, 0);
});

console.log(sortAndSum([3, 1, 2])); // "Sorting and summing...", 6
console.log(sortAndSum([1, 2, 3])); // 6 (cached, same sorted array)
console.log(sortAndSum([4, 5, 6])); // "Sorting and summing...", 15`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of memoization.",
      code: `// API call memoization
const memoizedFetch = memoize(async (url) => {
  console.log(\`Fetching: \${url}\`);
  const response = await fetch(url);
  return await response.json();
});

// memoizedFetch("https://api.example.com/data").then(data => console.log(data));
// memoizedFetch("https://api.example.com/data"); // Cached result

// Expensive computation
const computeLayout = memoize((width, height) => {
  console.log("Computing layout...");
  return { area: width * height, perimeter: 2 * (width + height) };
});

console.log(computeLayout(10, 20)); // "Computing layout...", { area: 200, perimeter: 60 }
console.log(computeLayout(10, 20)); // { area: 200, perimeter: 60 }

// Memoizing DOM calculations
const getElementSize = memoize((id) => {
  const el = document.getElementById(id);
  return { width: el.offsetWidth, height: el.offsetHeight };
});
// console.log(getElementSize("myDiv")); // Cached after first call`,
    },
    {
      title: "Best Practices and Limitations",
      description: "Optimizing memoization and avoiding common pitfalls.",
      code: `// Cache size management
function memoizeWithLimit(fn, maxSize) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    if (cache.size >= maxSize) {
      cache.clear(); // Clear cache when full
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const limitedAdd = memoizeWithLimit((a, b) => a + b, 2);
console.log(limitedAdd(1, 2)); // 3
console.log(limitedAdd(3, 4)); // 7
console.log(limitedAdd(5, 6)); // 11 (may clear cache)

// Avoid memoizing side-effect functions
function badMemoize() {
  return memoize((x) => {
    console.log("Side effect");
    return x * 2;
  });
}
const badFunc = badMemoize();
badFunc(5); // Logs and returns 10
badFunc(5); // Returns 10, no log (side effect skipped)

// Best practice: Pure functions
const pureAdd = memoize((a, b) => a + b);
console.log(pureAdd(2, 3)); // 5
console.log(pureAdd(2, 3)); // 5 (consistent)`,
    },
  ];

  return (
    <TopicPage
      title="Memoization"
      description="Learn about memoization in JavaScript, a technique to cache function results for improved performance, especially in recursive or expensive computations."
      examples={examples}
    />
  );
}
