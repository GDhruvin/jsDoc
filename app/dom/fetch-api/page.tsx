import { TopicPage } from "@/components/TopicPage";

export default function FetchApiPage() {
  const examples = [
    {
      title: "Basic Fetch Requests",
      description: "Making HTTP requests with the Fetch API.",
      code: `// GET request
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// POST request
fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Alice", age: 30 }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Async/await with fetch
async function getData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}
getData();`,
    },
    {
      title: "Handling Responses",
      description: "Processing different types of responses with fetch.",
      code: `// Check response status
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(\`HTTP error: \${response.status}\`);
  return response.json();
}
fetchData("https://api.example.com/data")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Handle different content types
async function fetchText() {
  const response = await fetch("https://api.example.com/text");
  const text = await response.text();
  console.log(text);
}
fetchText();

// Fetch blob (e.g., image)
async function fetchImage() {
  const response = await fetch("https://example.com/image.jpg");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const img = document.createElement("img");
  img.src = url;
  document.body.appendChild(img);
}
fetchImage();`,
    },
    {
      title: "Advanced Fetch Options",
      description: "Using headers, query parameters, and other fetch options.",
      code: `// Custom headers
async function authenticatedFetch(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: \`Bearer \${token}\`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
authenticatedFetch("https://api.example.com/protected", "xyz123")
  .then((data) => console.log(data));

// Query parameters
async function searchUsers(query) {
  const url = new URL("https://api.example.com/users");
  url.searchParams.append("q", query);
  url.searchParams.append("limit", "10");
  const response = await fetch(url);
  return response.json();
}
searchUsers("Alice").then((data) => console.log(data));

// Abort fetch
async function abortableFetch(url) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000); // Abort after 5s
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Fetch aborted");
    } else {
      console.error("Error:", error);
    }
  }
}
abortableFetch("https://api.example.com/data");`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of the Fetch API.",
      code: `// Fetch and display users
async function displayUsers() {
  const data = await fetchData("https://api.example.com/users");
  const ul = document.createElement("ul");
  data.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}
displayUsers();

// Paginated API
async function fetchPage(page) {
  const response = await fetch(\`https://api.example.com/data?page=\${page}\`);
  const data = await response.json();
  console.log(data);
  if (data.nextPage) {
    await fetchPage(data.nextPage); // Recursive fetch for pagination
  }
}
fetchPage(1);

// Cache with localStorage
async function cachedFetch(url) {
  const cached = localStorage.getItem(url);
  if (cached) return JSON.parse(cached);
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(url, JSON.stringify(data));
  return data;
}
cachedFetch("https://api.example.com/data").then((data) => console.log(data));`,
    },
    {
      title: "Best Practices and Error Handling",
      description: "Optimizing fetch usage and handling errors robustly.",
      code: `// Comprehensive error handling
async function robustFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status} \${response.statusText}\`);
    }
    return await response.json();
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error:", error.message);
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error;
  }
}
robustFetch("https://api.example.com/data")
  .catch((error) => console.error("Handled:", error));

// Retry mechanism
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await robustFetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
fetchWithRetry("https://api.example.com/data")
  .then((data) => console.log(data));

// Timeout with fetch
async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Fetch timed out");
    }
    throw error;
  }
}
fetchWithTimeout("https://api.example.com/data", 2000);`,
    },
  ];

  return (
    <TopicPage
      title="Fetch API"
      description="Learn how to use the Fetch API in JavaScript to make HTTP requests, handle responses, and implement advanced features like aborting and caching."
      examples={examples}
    />
  );
}
