import { TopicPage } from "@/components/TopicPage";

export default function EventLoopPage() {
  const examples = [
    {
      title: "Understanding the Event Loop",
      description:
        "How JavaScript handles asynchronous operations with the event loop.",
      code: `// Synchronous code
console.log("Start");
console.log("Middle");
console.log("End");
// Logs: Start, Middle, End

// Asynchronous with setTimeout
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
console.log("End");
// Logs: Start, End, Timeout

// Event loop components
// 1. Call Stack: Executes synchronous code
// 2. Task Queue: Holds tasks (e.g., setTimeout callbacks)
// 3. Microtask Queue: Holds promises (higher priority)
// 4. Event Loop: Moves tasks to stack when empty

// Promise vs setTimeout
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
// Logs: Start, End, Promise, Timeout (microtasks before tasks)`,
    },
    {
      title: "Task Queue and Microtask Queue",
      description: "Differences between task and microtask queues.",
      code: `// Multiple timeouts
console.log("Start");
setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 0);
console.log("End");
// Logs: Start, End, Timeout 1, Timeout 2

// Multiple promises
Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));
console.log("Sync");
// Logs: Sync, Promise 1, Promise 2

// Mixing tasks and microtasks
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));
console.log("End");
// Logs: Start, End, Promise 1, Promise 2, Timeout`,
    },
    {
      title: "Async/Await and the Event Loop",
      description: "How async/await integrates with the event loop.",
      code: `async function asyncExample() {
  console.log("Start async");
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log("After await");
}
console.log("Before");
asyncExample();
console.log("After");
// Logs: Before, Start async, After, After await

// Multiple awaits
async function multipleAwaits() {
  console.log("Start");
  await Promise.resolve().then(() => console.log("Microtask"));
  console.log("After first await");
  await new Promise(resolve => setTimeout(resolve, 0));
  console.log("After second await");
}
multipleAwaits();
// Logs: Start, Microtask, After first await, After second await`,
    },
    {
      title: "Practical Examples",
      description: "Real-world scenarios involving the event loop.",
      code: `// Event handler with event loop
function setupButton() {
  document.getElementById("btn").addEventListener("click", () => {
    console.log("Button clicked");
    Promise.resolve().then(() => console.log("Microtask after click"));
    setTimeout(() => console.log("Task after click"), 0);
  });
}
// setupButton(); // Click logs: Button clicked, Microtask after click, Task after click

// API call with async
async function fetchData() {
  console.log("Fetching...");
  const response = await fetch("https://api.example.com/data");
  console.log("Data received");
  setTimeout(() => console.log("Process data"), 0);
}
console.log("Start");
fetchData();
console.log("End");
// Logs: Start, Fetching..., End, Data received, Process data

// Heavy computation and event loop
function heavyCalc() {
  console.log("Starting heavy calc");
  let sum = 0;
  for (let i = 0; i < 1e7; i++) sum += i;
  console.log("Heavy calc done");
}
setTimeout(() => console.log("Timeout"), 0);
heavyCalc();
// Logs: Starting heavy calc, Heavy calc done, Timeout`,
    },
    {
      title: "Best Practices and Pitfalls",
      description: "Avoiding common issues with the event loop.",
      code: `// Avoid blocking the event loop
function badPractice() {
  console.log("Start");
  while (Date.now() < Date.now() + 1000) {} // Blocks event loop
  console.log("End");
  setTimeout(() => console.log("Timeout"), 0);
}
badPractice(); // Timeout delayed significantly

// Use setTimeout for non-blocking
function nonBlocking() {
  console.log("Start");
  setTimeout(() => {
    let sum = 0;
    for (let i = 0; i < 1e7; i++) sum += i;
    console.log("Heavy calc done");
  }, 0);
  console.log("End");
}
nonBlocking(); // Logs: Start, End, Heavy calc done

// Microtask starvation
Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve();
  })
  .then(() => console.log("Promise 2"));
setTimeout(() => console.log("Timeout"), 0);
// Logs: Promise 1, Promise 2, Timeout (microtasks run first)

// Best practice: Yield to event loop
async function yieldExample() {
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 0));
    console.log(\`Iteration \${i}\`);
  }
}
yieldExample(); // Allows other tasks to run between iterations`,
    },
  ];

  return (
    <TopicPage
      title="Event Loop"
      description="Explore the JavaScript event loop, which manages asynchronous operations by processing the call stack, task queue, and microtask queue, enabling non-blocking code execution."
      examples={examples}
    />
  );
}
