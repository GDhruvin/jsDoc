import { TopicPage } from "@/components/TopicPage";

export default function PerformanceTipsPage() {
  const examples = [
    {
      title: "Optimizing Loops",
      description: "Improving loop performance by reducing overhead.",
      code: `// Inefficient loop
function slowLoop(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // Length checked each iteration
  }
}

// Optimized loop
function fastLoop(arr) {
  const len = arr.length; // Cache length
  for (let i = 0; i < len; i++) {
    console.log(arr[i]);
  }
}
fastLoop([1, 2, 3]);

// Avoid unnecessary iterations
function findFirst(arr, value) {
  return arr.find((item) => item === value); // Stops on first match
}
console.log(findFirst([1, 2, 3, 4], 3)); // 3

// Use forEach for readability
[1, 2, 3].forEach((item) => console.log(item));`,
    },
    {
      title: "DOM Performance",
      description: "Minimizing DOM operations for better performance.",
      code: `// Inefficient DOM updates
function slowUpdate(items) {
  const ul = document.querySelector("ul");
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li); // Causes reflow each time
  });
}

// Optimized with DocumentFragment
function fastUpdate(items) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });
  document.querySelector("ul").appendChild(fragment); // Single reflow
}
fastUpdate(["Apple", "Banana"]);

// Batch style updates
function batchStyles(element) {
  element.style.cssText = "color: blue; font-size: 16px;"; // Single style update
}
const div = document.createElement("div");
batchStyles(div);

// Use requestAnimationFrame
function animate() {
  requestAnimationFrame(() => {
    document.querySelector(".box").style.transform = "translateX(100px)";
  });
}
animate();`,
    },
    {
      title: "Memory Management",
      description: "Reducing memory usage and preventing leaks.",
      code: `// Avoid memory leaks with event listeners
function setupListener() {
  const button = document.createElement("button");
  button.addEventListener("click", () => console.log("Clicked"));
  document.body.appendChild(button);
  return () => button.removeEventListener("click", () => console.log("Clicked"));
}
const cleanup = setupListener();
// cleanup(); // Prevents memory leak

// Use WeakMap for temporary data
const cache = new WeakMap();
function cacheData(obj, data) {
  cache.set(obj, data);
  return cache.get(obj);
}
const key = {};
console.log(cacheData(key, "data")); // "data"
// key = null; // Allows garbage collection

// Avoid large object copies
const largeObj = { data: new Array(1000000).fill(0) };
const shallowCopy = { ...largeObj }; // Memory heavy
// Better: Reference or minimal copy
const refCopy = largeObj;`,
    },
    {
      title: "Practical Examples",
      description: "Real-world performance optimization scenarios.",
      code: `// Throttle expensive operations
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
const expensiveOperation = throttle(() => {
  console.log("Expensive task");
}, 1000);
// window.addEventListener("scroll", expensiveOperation);

// Debounce user input
function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
const handleInput = debounce((value) => {
  console.log(\`Input: \${value}\`);
}, 500);
document.createElement("input").addEventListener("input", (e) => handleInput(e.target.value));

// Optimize API calls
async function fetchOptimized(url) {
  const cached = localStorage.getItem(url);
  if (cached) return JSON.parse(cached);
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(url, JSON.stringify(data));
  return data;
}
fetchOptimized("https://api.example.com/data").then((data) => console.log(data));`,
    },
    {
      title: "Best Practices and Tools",
      description:
        "Using tools and techniques to monitor and improve performance.",
      code: `// Measure performance
function measureExecution(fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(\`Execution time: \${end - start}ms\`);
}
measureExecution(() => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) sum += i;
});

// Use performance.mark
performance.mark("start-task");
setTimeout(() => {
  performance.mark("end-task");
  performance.measure("task-duration", "start-task", "end-task");
  const measure = performance.getEntriesByName("task-duration")[0];
  console.log(\`Task took \${measure.duration}ms\`);
}, 1000);

// Avoid synchronous blocking
function nonBlocking() {
  setTimeout(() => {
    console.log("Non-blocking task");
  }, 0);
}
nonBlocking();

// Use Web Workers for heavy tasks
// worker.js
self.onmessage = (e) => {
  const result = e.data.reduce((sum, num) => sum + num, 0);
  self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');
worker.postMessage([1, 2, 3, 4, 5]);
worker.onmessage = (e) => console.log(\`Sum: \${e.data}\`); // "Sum: 15"`,
    },
  ];

  return (
    <TopicPage
      title="Performance Tips"
      description="Learn techniques to optimize JavaScript performance, including efficient loops, DOM operations, memory management, and throttling/debouncing."
      examples={examples}
    />
  );
}
