import { TopicPage } from "@/components/TopicPage";

export default function CallbacksPage() {
  const examples = [
    {
      title: "Basic Callbacks",
      description: "Functions passed as arguments to be executed later.",
      code: `// Simple callback
function greet(name, callback) {
  const message = \`Hello, \${name}!\`;
  callback(message);
}

function logMessage(message) {
  console.log(message);
}

greet("Alice", logMessage); // "Hello, Alice!"

// Callback with delay
function delayedGreeting(name, callback) {
  setTimeout(() => {
    callback(\`Hello, \${name}!\`);
  }, 1000);
}

delayedGreeting("Bob", (msg) => console.log(msg)); // "Hello, Bob!" (after 1s)

// Multiple callbacks
function processData(data, success, failure) {
  if (data) {
    success(\`Processed: \${data}\`);
  } else {
    failure("No data provided");
  }
}

processData("test", console.log, console.error); // "Processed: test"
processData(null, console.log, console.error); // "No data provided"`,
    },
    {
      title: "Callbacks in Event Handlers",
      description: "Using callbacks for DOM event handling.",
      code: `// Click event callback
function setupButton() {
  const button = document.createElement("button");
  button.textContent = "Click me";
  button.addEventListener("click", (event) => {
    console.log("Button clicked!", event.target);
  });
  document.body.appendChild(button);
}
// setupButton();

// Input change callback
function setupInput() {
  const input = document.createElement("input");
  input.addEventListener("input", (event) => {
    console.log(\`Input value: \${event.target.value}\`);
  });
  document.body.appendChild(input);
}
// setupInput();

// Multiple event handlers
function setupEvents() {
  const el = document.createElement("div");
  const logEvent = (type) => (event) => console.log(\`\${type}: \${event.type}\`);
  el.addEventListener("click", logEvent("Click"));
  el.addEventListener("mouseover", logEvent("Mouseover"));
  document.body.appendChild(el);
}
// setupEvents();`,
    },
    {
      title: "Callback Hell",
      description:
        "The problem of nested callbacks and how they become unwieldy.",
      code: `// Callback hell example
function fetchUser(id, callback) {
  setTimeout(() => callback({ id, name: "Alice" }), 500);
}

function fetchPosts(userId, callback) {
  setTimeout(() => callback(["Post 1", "Post 2"]), 500);
}

function fetchComments(post, callback) {
  setTimeout(() => callback(["Comment 1", "Comment 2"]), 500);
}

fetchUser(1, (user) => {
  console.log("User:", user);
  fetchPosts(user.id, (posts) => {
    console.log("Posts:", posts);
    fetchComments(posts[0], (comments) => {
      console.log("Comments:", comments);
    });
  });
});
// Logs: User: { id: 1, name: "Alice" }
//       Posts: ["Post 1", "Post 2"]
//       Comments: ["Comment 1", "Comment 2"]

// Mitigating callback hell with named functions
function handleComments(comments) {
  console.log("Comments:", comments);
}

function handlePosts(posts) {
  console.log("Posts:", posts);
  fetchComments(posts[0], handleComments);
}

function handleUser(user) {
  console.log("User:", user);
  fetchPosts(user.id, handlePosts);
}

fetchUser(1, handleUser);`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of callbacks.",
      code: `// File reading simulation
function readFile(file, callback) {
  setTimeout(() => callback(null, \`Content of \${file}\`), 1000);
}

readFile("data.txt", (err, content) => {
  if (err) console.error(err);
  console.log(content); // "Content of data.txt"
});

// Animation with callbacks
function animate(element, callback) {
  setTimeout(() => {
    // element.style.transform = "translateX(100px)";
    callback();
  }, 500);
}

animate(document.createElement("div"), () => {
  console.log("Animation complete");
});

// Sequential API calls
function fetchData(url, callback) {
  setTimeout(() => callback(null, { data: url }), 500);
}

fetchData("/users", (err, userData) => {
  if (err) return console.error(err);
  fetchData(\`\${userData.data}/posts\`, (err, postData) => {
    if (err) return console.error(err);
    console.log("Posts:", postData);
  });
});
// Logs: Posts: { data: "/users/posts" }`,
    },
    {
      title: "Best Practices and Limitations",
      description:
        "Tips for using callbacks effectively and understanding their limits.",
      code: `// Error-first callbacks
function safeFetch(url, callback) {
  setTimeout(() => {
    if (!url) return callback(new Error("Invalid URL"));
    callback(null, { data: url });
  }, 500);
}

safeFetch("/data", (err, data) => {
  if (err) console.error(err.message);
  else console.log(data); // { data: "/data" }
});

// Avoid multiple callback executions
function singleExecution(callback) {
  let called = false;
  return (...args) => {
    if (!called) {
      called = true;
      callback(...args);
    }
  };
}

const safeCallback = singleExecution((msg) => console.log(msg));
safeCallback("Test"); // "Test"
safeCallback("Test again"); // Ignored

// Cleanup callbacks
function setupTemporaryListener() {
  const listener = () => console.log("Event");
  document.addEventListener("click", listener);
  // Cleanup: document.removeEventListener("click", listener);
}`,
    },
  ];

  return (
    <TopicPage
      title="Callbacks"
      description="Learn about callbacks in JavaScript, a fundamental asynchronous programming pattern where functions are passed as arguments to be executed later."
      examples={examples}
    />
  );
}
