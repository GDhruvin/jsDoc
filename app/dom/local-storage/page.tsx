import { TopicPage } from "@/components/TopicPage";

export default function LocalStoragePage() {
  const examples = [
    {
      title: "Basic Local Storage",
      description: "Storing and retrieving data with localStorage.",
      code: `// Set item
localStorage.setItem("username", "Alice");
console.log(localStorage.getItem("username")); // "Alice"

// Store objects (serialize)
const user = { name: "Bob", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// Retrieve objects (deserialize)
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser); // { name: "Bob", age: 30 }

// Remove item
localStorage.removeItem("username");
console.log(localStorage.getItem("username")); // null

// Clear all storage
localStorage.clear();
console.log(localStorage.getItem("user")); // null`,
    },
    {
      title: "Managing Storage Limits",
      description: "Handling storage quotas and checking availability.",
      code: `// Check storage availability
function isStorageAvailable() {
  try {
    const test = "test";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.error("Storage unavailable:", e);
    return false;
  }
}
console.log(isStorageAvailable()); // true (if available)

// Handle storage quota
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      console.error("Storage quota exceeded");
      localStorage.clear(); // Clear to free space
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}
safeSetItem("data", { large: new Array(1000).fill("x") });

// Get storage usage (approximate)
function getStorageUsage() {
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += ((localStorage[key].length + key.length) * 2);
    }
  }
  return \`\${total / 1024} KB\`;
}
console.log(getStorageUsage());`,
    },
    {
      title: "Local Storage with Events",
      description: "Using storage events to sync data across tabs.",
      code: `// Listen for storage changes
window.addEventListener("storage", (event) => {
  console.log("Key:", event.key); // Key changed
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);
  console.log("URL:", event.url);
});

// Example: Update in one tab
localStorage.setItem("theme", "dark");
// In another tab, storage event fires with:
// Key: "theme", Old value: null, New value: "dark"

// Sync settings across tabs
function syncSettings() {
  const settings = JSON.parse(localStorage.getItem("settings") || "{}");
  window.addEventListener("storage", (event) => {
    if (event.key === "settings") {
      console.log("Settings updated:", JSON.parse(event.newValue));
    }
  });
  return settings;
}
console.log(syncSettings());`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of localStorage.",
      code: `// Persist form data
function persistForm() {
  const input = document.createElement("input");
  input.type = "text";
  input.value = localStorage.getItem("formData") || "";
  input.addEventListener("input", (event) => {
    localStorage.setItem("formData", event.target.value);
  });
  document.body.appendChild(input);
}
persistForm();

// Theme toggler
function toggleTheme() {
  const current = localStorage.getItem("theme") || "light";
  const newTheme = current === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  document.body.className = newTheme;
  return newTheme;
}
console.log(toggleTheme()); // "dark"

// Cache API responses
async function cacheFetch(url) {
  const cached = localStorage.getItem(url);
  if (cached) return JSON.parse(cached);
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(url, JSON.stringify(data));
  return data;
}
cacheFetch("https://api.example.com/data").then((data) => console.log(data));`,
    },
    {
      title: "Best Practices and Security",
      description: "Optimizing and securing localStorage usage.",
      code: `// Validate data before parsing
function safeGetItem(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Invalid JSON:", e);
    return null;
  }
}
console.log(safeGetItem("user")); // { name: "Bob", age: 30 } or null

// Avoid storing sensitive data
function storeUser(user) {
  const { password, ...safeUser } = user; // Exclude sensitive data
  localStorage.setItem("user", JSON.stringify(safeUser));
}
storeUser({ name: "Alice", password: "secret" }); // Stores only { name: "Alice" }

// Clear on logout
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  console.log("Logged out, storage cleared");
}
logout();

// Use sessionStorage for temporary data
sessionStorage.setItem("temp", "Temporary data");
console.log(sessionStorage.getItem("temp")); // "Temporary data"
sessionStorage.clear();`,
    },
  ];

  return (
    <TopicPage
      title="Local Storage"
      description="Learn how to use localStorage in JavaScript to persist data in the browser, including storing, retrieving, handling quotas, and syncing across tabs."
      examples={examples}
    />
  );
}
