import { TopicPage } from "@/components/TopicPage";

export default function DebounceThrottlePage() {
  const examples = [
    {
      title: "Understanding Debouncing",
      description:
        "Debouncing ensures a function is called only after a delay since the last invocation.",
      code: `function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Example: Search input
const logSearch = debounce((query) => {
  console.log(\`Searching for: \${query}\`);
}, 500);

// Simulate typing
logSearch("te"); // Ignored
logSearch("tes"); // Ignored
setTimeout(() => logSearch("test"), 600); // Logs: "Searching for: test"

// Practical: Input handler
const input = document.createElement("input");
const debouncedSearch = debounce((e) => {
  console.log(\`Search query: \${e.target.value}\`);
}, 300);
// input.addEventListener("input", debouncedSearch);

// With leading execution
function debounceLeading(func, delay) {
  let timeoutId;
  return function(...args) {
    if (!timeoutId) {
      func.apply(this, args);
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delay);
  };
}

const leadingSearch = debounceLeading((query) => {
  console.log(\`Leading search: \${query}\`);
}, 500);
leadingSearch("test"); // Logs immediately`,
    },
    {
      title: "Understanding Throttling",
      description: "Throttling limits function calls to a fixed rate.",
      code: `function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Example: Window resize
const logResize = throttle(() => {
  console.log(\`Window resized: \${window.innerWidth}\`);
}, 1000);
// window.addEventListener("resize", logResize);

// Throttle with trailing call
function throttleTrailing(func, limit) {
  let inThrottle;
  let lastArgs;
  return function(...args) {
    lastArgs = args;
    if (!inThrottle) {
      func.apply(this, lastArgs);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    }
  };
}

const throttledLog = throttleTrailing(() => {
  console.log("Throttled action");
}, 1000);
throttledLog(); // Logs immediately
throttledLog(); // Ignored
setTimeout(throttledLog, 1100); // Logs after 1s`,
    },
    {
      title: "Debounce vs Throttle",
      description: "Comparing when to use debouncing vs throttling.",
      code: `// Debounce: Good for search inputs
const debouncedLog = debounce((value) => {
  console.log(\`Debounced: \${value}\`);
}, 500);
// debouncedLog("a"); // Ignored
// debouncedLog("ab"); // Ignored
// setTimeout(() => debouncedLog("abc"), 600); // Logs: "Debounced: abc"

// Throttle: Good for scroll/resize events
const throttledLog = throttle(() => {
  console.log("Throttled event");
}, 1000);
// throttledLog(); // Logs immediately
// throttledLog(); // Ignored
// setTimeout(throttledLog, 500); // Ignored
// setTimeout(throttledLog, 1100); // Logs after 1s

// Use case: API call debouncing
const debouncedApiCall = debounce(async (query) => {
  const response = await fetch(\`https://api.example.com/search?q=\${query}\`);
  console.log(await response.json());
}, 300);

// Use case: Scroll position throttling
const throttledScroll = throttle(() => {
  console.log(\`Scroll position: \${window.scrollY}\`);
}, 200);
// window.addEventListener("scroll", throttledScroll);`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of debounce and throttle.",
      code: `// Autocomplete search
const autocomplete = debounce(async (query) => {
  const response = await fetch(\`https://api.example.com/autocomplete?q=\${query}\`);
  console.log(await response.json());
}, 400);
// document.getElementById("search").addEventListener("input", (e) => autocomplete(e.target.value));

// Resize handler for responsive design
const updateLayout = throttle(() => {
  const width = window.innerWidth;
  console.log(\`Layout updated for width: \${width}\`);
}, 200);
// window.addEventListener("resize", updateLayout);

// Mouse move tracking
const trackMouse = throttle((e) => {
  console.log(\`Mouse at: \${e.clientX}, \${e.clientY}\`);
}, 100);
// document.addEventListener("mousemove", trackMouse);

// Combining debounce and throttle
const hybridHandler = debounce((data) => {
  const throttledProcess = throttle(() => {
    console.log(\`Processing: \${data}\`);
  }, 200);
  throttledProcess();
}, 500);
hybridHandler("test"); // Processes after 500ms, throttled to 200ms intervals`,
    },
    {
      title: "Best Practices and Optimization",
      description: "Tips for implementing debounce and throttle effectively.",
      code: `// Cancelable debounce
function debounceCancelable(func, delay) {
  let timeoutId;
  const wrapper = function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
  wrapper.cancel = () => clearTimeout(timeoutId);
  return wrapper;
}

const cancelableSearch = debounceCancelable((query) => {
  console.log(\`Searching: \${query}\`);
}, 500);
cancelableSearch("test");
// cancelableSearch.cancel(); // Cancels pending call

// Immediate throttle
function throttleImmediate(func, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      func.apply(this, args);
      lastCall = now;
    }
  };
}

const immediateLog = throttleImmediate(() => {
  console.log("Immediate throttled");
}, 1000);
immediateLog(); // Logs immediately
immediateLog(); // Ignored
setTimeout(immediateLog, 1100); // Logs after 1s

// Avoid memory leaks
function setupDebounced() {
  const debounced = debounce(() => console.log("Action"), 500);
  document.addEventListener("input", debounced);
  // Cleanup: document.removeEventListener("input", debounced);
}`,
    },
  ];

  return (
    <TopicPage
      title="Debounce & Throttle"
      description="Learn about debouncing and throttling in JavaScript to optimize event handling by controlling the frequency of function calls in scenarios like search inputs and scrolling."
      examples={examples}
    />
  );
}
