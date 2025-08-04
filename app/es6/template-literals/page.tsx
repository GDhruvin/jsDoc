import { TopicPage } from "@/components/TopicPage";

export default function TemplateLiteralsPage() {
  const examples = [
    {
      title: "Basic Template Literals",
      description:
        "Using backticks for string interpolation and multiline strings.",
      code: `// String interpolation
const name = "Alice";
const greeting = \`Hello, \${name}!\`;
console.log(greeting); // "Hello, Alice!"

// Multiline strings
const message = \`This is line 1
This is line 2
This is line 3\`;
console.log(message);
// This is line 1
// This is line 2
// This is line 3

// Expressions in template literals
const a = 5, b = 10;
const sum = \`Sum: \${a + b}\`;
console.log(sum); // "Sum: 15"

// Nested template literals
const isActive = true;
const status = \`User is \${isActive ? "active" : "inactive"}\`;
console.log(status); // "User is active"`,
    },
    {
      title: "Tagged Templates",
      description: "Using functions to process template literals.",
      code: `// Basic tagged template
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return \`\${result}\${str}<strong>\${values[i] || ""}</strong>\`;
  }, "");
}

const name = "Bob";
const age = 30;
const html = highlight\`User: \${name}, Age: \${age}\`;
console.log(html); // "User: <strong>Bob</strong>, Age: <strong>30</strong>"

// Sanitizing input
function sanitize(strings, ...values) {
  const safeValues = values.map((v) => String(v).replace(/[<>]/g, ""));
  return strings.reduce((result, str, i) => \`\${result}\${str}\${safeValues[i] || ""}\`, "");
}

const userInput = "<script>alert('XSS')</script>";
const safeHtml = sanitize\`Input: \${userInput}\`;
console.log(safeHtml); // "Input: scriptalert('XSS')/script"

// Custom formatting
function currency(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? \`\${values[i].toFixed(2)}\` : "";
    return \`\${result}\${str}\${value}\`;
  }, "");
}

const price = 19.99;
console.log(currency\`Total: \${price} USD\`); // "Total: 19.99 USD"`,
    },
    {
      title: "Template Literals in Practice",
      description:
        "Using template literals for HTML, URLs, and dynamic content.",
      code: `// Dynamic HTML
function createCard(user) {
  return \`
    <div class="card">
      <h2>\${user.name}</h2>
      <p>Age: \${user.age}</p>
    </div>
  \`;
}

const user = { name: "Charlie", age: 25 };
document.body.innerHTML = createCard(user);

// Dynamic URLs
function buildUrl(base, params) {
  const query = Object.entries(params)
    .map(([key, value]) => \`\${key}=\${encodeURIComponent(value)}\`)
    .join("&");
  return \`\${base}?\${query}\`;
}

const url = buildUrl("https://api.example.com/users", { id: 1, name: "Alice" });
console.log(url); // "https://api.example.com/users?id=1&name=Alice"

// Logging with template literals
function logUser(user) {
  console.log(\`User Details:
  Name: \${user.name}
  Email: \${user.email}
  Active: \${user.active ? "Yes" : "No"}\`);
}

logUser({ name: "Dave", email: "dave@example.com", active: true });`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of template literals.",
      code: `// Dynamic list rendering
function renderList(items) {
  return \`
    <ul>
      \${items.map((item) => \`<li>\${item}</li>\`).join("")}
    </ul>
  \`;
}

document.body.innerHTML = renderList(["Apple", "Banana", "Orange"]);

// API error message
function formatError(error) {
  return \`Error: \${error.message} (Code: \${error.code})\`;
}

const error = { message: "Not Found", code: 404 };
console.log(formatError(error)); // "Error: Not Found (Code: 404)"

// Dynamic CSS
function styleElement(selector, styles) {
  const css = \`
    \${selector} {
      \${Object.entries(styles)
        .map(([prop, value]) => \`\${prop}: \${value};\`)
        .join("\n")
      }
    }
  \`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

styleElement(".box", { backgroundColor: "blue", color: "white" });`,
    },
    {
      title: "Best Practices and Limitations",
      description: "Optimizing template literals and avoiding common pitfalls.",
      code: `// Avoid excessive nesting

function betterNesting(user) {
  const status = user.active ? (user.status ? "Online" : "Offline") : "Inactive";
  return \`User: \${status}\`;
}

console.log(betterNesting({ active: true, status: true })); // "User: Online"

// Sanitize user input
function safeTemplate(strings, ...values) {
  const safeValues = values.map((v) => String(v).replace(/[<>]/g, ""));
  return strings.reduce((result, str, i) => \`\${result}\${str}\${safeValues[i] || ""}\`, "");
}

const unsafe = "<script>alert('XSS')</script>";
document.body.innerHTML = safeTemplate\`Content: \${unsafe}\`; // Safe output

// Use for readability
const user = { name: "Eve", age: 28 };
const oldStyle = "Name: " + user.name + ", Age: " + user.age;
const newStyle = \`Name: \${user.name}, Age: \${user.age}\`;
console.log(newStyle); // "Name: Eve, Age: 28"`,
    },
  ];

  return (
    <TopicPage
      title="Template Literals"
      description="Explore ES6 template literals, which provide string interpolation, multiline strings, and tagged templates for dynamic and readable string creation."
      examples={examples}
    />
  );
}
