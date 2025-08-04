import { TopicPage } from "@/components/TopicPage";

export default function AsyncAwaitPage() {
  const examples = [
    {
      title: "Basic Async/Await",
      description: "Using async/await for cleaner asynchronous code.",
      code: `// Basic async function
async function fetchData() {
  return "Data received";
}

fetchData().then((result) => console.log(result)); // "Data received"

// Using await
async function getUser() {
  const response = await new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Alice" }), 500);
  });
  return response;
}

getUser().then((user) => console.log(user)); // { id: 1, name: "Alice" }

// Async function with rejection
async function failing() {
  throw new Error("Failed");
}

failing().catch((error) => console.error(error.message)); // "Failed"`,
    },
    {
      title: "Sequential and Parallel Await",
      description: "Using await for sequential and parallel operations.",
      code: `// Sequential await
async function fetchSequential(id) {
  const user = await new Promise((resolve) => 
    setTimeout(() => resolve({ id, name: "Alice" }), 500));
  const posts = await new Promise((resolve) => 
    setTimeout(() => resolve(["Post 1", "Post 2"]), 500));
  return { user, posts };
}

fetchSequential(1).then((result) => console.log(result));
// { user: { id: 1, name: "Alice" }, posts: ["Post 1", "Post 2"] }

// Parallel await with Promise.all
async function fetchParallel(id) {
  const [user, posts] = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve({ id, name: "Bob" }), 500)),
    new Promise((resolve) => setTimeout(() => resolve(["Post A", "Post B"]), 500))
  ]);
  return { user, posts };
}

fetchParallel(1).then((result) => console.log(result));
// { user: { id: 1, name: "Bob" }, posts: ["Post A", "Post B"] }`,
    },
    {
      title: "Async/Await with Loops",
      description: "Using async/await in loops for asynchronous tasks.",
      code: `// Sequential loop
async function processItems(items) {
  const results = [];
  for (const item of items) {
    const result = await new Promise((resolve) => 
      setTimeout(() => resolve(\`Processed: \${item}\`), 500));
    results.push(result);
  }
  return results;
}

processItems([1, 2, 3]).then((results) => console.log(results));
// ["Processed: 1", "Processed: 2", "Processed: 3"]

// Parallel loop
async function processItemsParallel(items) {
  const promises = items.map((item) => 
    new Promise((resolve) => setTimeout(() => resolve(\`Processed: \${item}\`), 500)));
  return Promise.all(promises);
}

processItemsParallel([1, 2, 3]).then((results) => console.log(results));
// ["Processed: 1", "Processed: 2", "Processed: 3"]`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of async/await.",
      code: `// Fetch API with async/await
async function fetchUserData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  return await response.json();
}

fetchUserData("https://api.example.com/users")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Sequential API calls
async function getUserPosts(id) {
  const user = await fetchUserData(\`https://api.example.com/users/\${id}\`);
  const posts = await fetchUserData(\`https://api.example.com/posts?userId=\${id}\`);
  return { user, posts };
}

getUserPosts(1).then((result) => console.log(result));

// Timeout with async/await
async function fetchWithTimeout(url, ms) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Timed out")), ms));
  return Promise.race([fetchUserData(url), timeout]);
}

fetchWithTimeout("https://api.example.com/data", 1000)
  .catch((error) => console.error(error.message));

// Retry mechanism
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchUserData(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

fetchWithRetry("https://api.example.com/data")
  .then((data) => console.log(data));`,
    },
    {
      title: "Best Practices and Pitfalls",
      description: "Using async/await effectively and avoiding common issues.",
      code: `// Avoid mixing promises and await
async function badPractice() {
  const data = fetchUserData("https://api.example.com/data")
    .then((res) => res); // Unnecessary promise chain
  return data;
}

// Better: Use await
async function goodPractice() {
  const data = await fetchUserData("https://api.example.com/data");
  return data;
}

// Handle errors with try/catch
async function safeFetch() {
  try {
    const data = await fetchUserData("https://api.example.com/data");
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
safeFetch();

// Avoid async in loops for performance
async function slowLoop(items) {
  for (const item of items) {
    await processItems([item]); // Sequential, slow
  }
}

// Better: Parallel processing
async function fastLoop(items) {
  await Promise.all(items.map((item) => processItems([item])));
}

// Ensure cleanup
async function setupAsyncListener() {
  const listener = async () => {
    const data = await fetchUserData("https://api.example.com/data");
    console.log(data);
  };
  document.addEventListener("click", listener);
  // Cleanup: document.removeEventListener("click", listener);
}`,
    },
  ];

  return (
    <TopicPage
      title="Async/Await"
      description="Master async/await in JavaScript, a syntactic sugar over promises that makes asynchronous code more readable and easier to manage."
      examples={examples}
    />
  );
}
