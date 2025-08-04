import { TopicPage } from "@/components/TopicPage";

export default function WorkingWithApisPage() {
  const examples = [
    {
      title: "Basic API Requests",
      description: "Making HTTP requests using the Fetch API.",
      code: `// GET request
async function getUsers() {
  const response = await fetch("https://api.example.com/users");
  if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
  return response.json();
}
getUsers().then((users) => console.log(users)).catch((err) => console.error(err));

// POST request
async function createUser(user) {
  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
}
createUser({ name: "Alice" }).then((data) => console.log(data));

// DELETE request
async function deleteUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`, {
    method: "DELETE",
  });
  return response.ok;
}
deleteUser(1).then((success) => console.log("Deleted:", success));`,
    },
    {
      title: "Handling API Responses",
      description: "Processing and validating API responses.",
      code: `// Validate response
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status} \${response.statusText}\`);
  }
  return response.json();
}
fetchData("https://api.example.com/data")
  .then((data) => console.log(data))
  .catch((err) => console.error(err.message));

// Handle different response types
async function fetchImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch image");
  const blob = await response.blob();
  const img = document.createElement("img");
  img.src = URL.createObjectURL(blob);
  document.body.appendChild(img);
}
fetchImage("https://example.com/image.jpg");

// Paginated API
async function fetchAllPages(url, page = 1, results = []) {
  const response = await fetch(\`\${url}?page=\${page}\`);
  const data = await response.json();
  results.push(...data.items);
  if (data.nextPage) {
    return fetchAllPages(url, data.nextPage, results);
  }
  return results;
}
fetchAllPages("https://api.example.com/posts").then((items) => console.log(items));`,
    },
    {
      title: "Authentication and Headers",
      description: "Adding authentication and custom headers to API requests.",
      code: `// Bearer token authentication
async function fetchWithAuth(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: \`Bearer \${token}\`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
fetchWithAuth("https://api.example.com/protected", "xyz123")
  .then((data) => console.log(data));

// API key in query
async function fetchWithApiKey(url, apiKey) {
  const urlWithKey = new URL(url);
  urlWithKey.searchParams.append("apiKey", apiKey);
  const response = await fetch(urlWithKey);
  return response.json();
}
fetchWithApiKey("https://api.example.com/data", "key123").then((data) => console.log(data));

// Custom headers
async function fetchWithHeaders(url) {
  const response = await fetch(url, {
    headers: {
      "Accept-Language": "en-US",
      "X-Custom-Header": "value",
    },
  });
  return response.json();
}
fetchWithHeaders("https://api.example.com/data").then((data) => console.log(data));`,
    },
    {
      title: "Practical Examples",
      description: "Real-world scenarios for working with APIs.",
      code: `// Display API data in DOM
async function displayUsers() {
  const users = await fetchData("https://api.example.com/users");
  const ul = document.createElement("ul");
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}
displayUsers();

// Caching API responses
async function cachedFetch(url) {
  const cached = localStorage.getItem(url);
  if (cached) return JSON.parse(cached);
  const data = await fetchData(url);
  localStorage.setItem(url, JSON.stringify(data));
  return data;
}
cachedFetch("https://api.example.com/data").then((data) => console.log(data));

// Retry failed requests
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchData(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
fetchWithRetry("https://api.example.com/data").then((data) => console.log(data));`,
    },
    {
      title: "Best Practices and Error Handling",
      description: "Optimizing API usage and robust error handling.",
      code: `// Comprehensive error handling
async function robustFetch(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status} \${response.statusText}\`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === "TimeoutError") {
      console.error("Request timed out");
    } else if (error.name === "TypeError") {
      console.error("Network error:", error.message);
    } else {
      console.error("API error:", error.message);
    }
    throw error;
  }
}
robustFetch("https://api.example.com/data").catch((err) => console.error("Handled:", err));

// Rate limiting
async function rateLimitedFetch(urls) {
  const results = [];
  for (const url of urls) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s delay
    const data = await robustFetch(url);
    results.push(data);
  }
  return results;
}
rateLimitedFetch(["https://api.example.com/data1", "https://api.example.com/data2"])
  .then((results) => console.log(results));

// Custom error types
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
  .catch((err) => console.error(\`\${err.message} (\${err.status})\`));`,
    },
  ];

  return (
    <TopicPage
      title="Working with APIs"
      description="Learn how to interact with APIs in JavaScript using the Fetch API, including making requests, handling responses, authentication, and error handling."
      examples={examples}
    />
  );
}
