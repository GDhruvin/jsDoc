import { TopicPage } from "@/components/TopicPage";

export default function ErrorHandlingPage() {
  const examples = [
    {
      title: "Error Handling with Callbacks",
      description: "Managing errors in callback-based asynchronous code.",
      code: `// Error-first callback
function fetchData(url, callback) {
  setTimeout(() => {
    if (!url) return callback(new Error("Invalid URL"));
    callback(null, { data: url });
  }, 500);
}

fetchData("/data", (err, data) => {
  if (err) console.error(err.message);
  else console.log(data); // { data: "/data" }
});

fetchData(null, (err, data) => {
  if (err) console.error(err.message); // "Invalid URL"
  else console.log(data);
});

// Nested callbacks with error handling
function fetchUser(id, callback) {
  setTimeout(() => callback(null, { id, name: "Alice" }), 500);
}

function fetchPosts(userId, callback) {
  if (!userId) return callback(new Error("Invalid user ID"));
  setTimeout(() => callback(null, ["Post 1", "Post 2"]), 500);
}

fetchUser(1, (err, user) => {
  if (err) return console.error(err);
  fetchPosts(user.id, (err, posts) => {
    if (err) return console.error(err);
    console.log({ user, posts });
  });
});`,
    },
    {
      title: "Error Handling with Promises",
      description: "Using .catch() and try/catch for promise errors.",
      code: `// Basic promise error handling
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!url) reject(new Error("Invalid URL"));
      else resolve({ data: url });
    }, 500);
  });
}

fetchData("/data")
  .then((data) => console.log(data)) // { data: "/data" }
  .catch((error) => console.error(error.message));

fetchData(null)
  .catch((error) => console.error(error.message)); // "Invalid URL"

// Chained promise error handling
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) reject(new Error("Invalid ID"));
      resolve({ id, name: "Alice" });
    }, 500);
  });
}

fetchUser(1)
  .then((user) => fetchData(\`/posts/\${user.id}\`))
  .then((posts) => console.log(posts))
  .catch((error) => console.error("Error:", error.message));

// Central error handling
Promise.all([fetchUser(1), fetchData("/data")])
  .then(([user, data]) => console.log({ user, data }))
  .catch((error) => console.error("One failed:", error.message));`,
    },
    {
      title: "Error Handling with Async/Await",
      description: "Using try/catch blocks with async/await.",
      code: `// Basic try/catch
async function fetchData(url) {
  if (!url) throw new Error("Invalid URL");
  return new Promise((resolve) => setTimeout(() => resolve({ data: url }), 500));
}

async function getData() {
  try {
    const data = await fetchData("/data");
    console.log(data); // { data: "/data" }
  } catch (error) {
    console.error(error.message);
  }
}
getData();

// Nested async calls
async function getUserPosts(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchData(\`/posts/\${user.id}\`);
    return { user, posts };
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Rethrow for outer handling
  }
}

getUserPosts(1)
  .then((result) => console.log(result))
  .catch((error) => console.error("Outer error:", error.message));

// Multiple try/catch
async function processMultiple() {
  try {
    const [data1, data2] = await Promise.all([
      fetchData("/data1"),
      fetchData("/data2")
    ]);
    console.log({ data1, data2 });
  } catch (error) {
    console.error("Failed:", error.message);
  }
}
processMultiple();`,
    },
    {
      title: "Practical Examples",
      description: "Real-world error handling scenarios.",
      code: `// API fetch with comprehensive error handling
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}

safeFetch("https://api.example.com/data")
  .catch((error) => console.error("Handled:", error.message));

// Retry mechanism
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await safeFetch(url);
    } catch (error) {
      if (i === retries - 1) throw new Error(\`Failed after \${retries} attempts: \${error.message}\`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

fetchWithRetry("https://api.example.com/data")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Graceful degradation
async function loadResources() {
  const results = { data: null, fallback: null };
  try {
    results.data = await safeFetch("https://api.example.com/data");
  } catch (error) {
    console.error("Primary failed:", error.message);
    results.fallback = await safeFetch("https://backup.example.com/data");
  }
  return results;
}

loadResources().then((results) => console.log(results));`,
    },
    {
      title: "Best Practices and Advanced Error Handling",
      description: "Advanced techniques for robust error handling.",
      code: `// Custom error types
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function fetchWithCustomError(url) {
  const response = await fetch(url);
  if (!response.ok) throw new ApiError("API request failed", response.status);
  return response.json();
}

fetchWithCustomError("https://api.example.com/data")
  .catch((error) => {
    if (error instanceof ApiError) {
      console.error(\`API Error (\${error.status}): \${error.message}\`);
    } else {
      console.error("Other error:", error.message);
    }
  });

// Centralized error handler
function handleAsyncError(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Centralized handler:", error.message);
      throw error;
    }
  };
}

const safeGetData = handleAsyncError(fetchWithCustomError);
safeGetData("https://api.example.com/data");

// Error logging service
async function logError(error, context) {
  await fetch("https://logs.example.com", {
    method: "POST",
    body: JSON.stringify({ error: error.message, context })
  });
}

async function criticalOperation() {
  try {
    await safeFetch("https://api.example.com/critical");
  } catch (error) {
    await logError(error, "Critical operation failed");
    throw error;
  }
}

criticalOperation().catch((error) => console.error("Handled:", error.message));`,
    },
  ];

  return (
    <TopicPage
      title="Error Handling"
      description="Master error handling in asynchronous JavaScript, covering techniques for callbacks, promises, and async/await, including try/catch and custom error types."
      examples={examples}
    />
  );
}
