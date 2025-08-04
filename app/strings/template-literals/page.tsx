import { TopicPage } from '@/components/TopicPage';

export default function TemplateLiteralsPage() {
  const examples = [
    {
      title: "Basic Template Literals",
      description: "Using backticks and ${} for string interpolation.",
      code: `// Basic interpolation
const name = "Alice";
const age = 25;
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
console.log(greeting); // "Hello, Alice! You are 25 years old."

// Expressions inside placeholders
const a = 10;
const b = 20;
console.log(\`The sum is \${a + b}\`); // "The sum is 30"

// Multi-line strings
const multiLine = \`First line
Second line
Third line\`;
console.log(multiLine);
// First line
// Second line
// Third line

// Compared to old way
const oldMultiLine = "First line\\nSecond line\\nThird line";
console.log(oldMultiLine); // Same output as above`
    },
    {
      title: "Tagged Templates",
      description: "Using functions to process template literals.",
      code: `// Basic tagged template
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    \`\${result}\${str}\${values[i] ? \`<strong>\${values[i]}</strong>\` : ""}\`, "");
}

const name = "Bob";
const role = "Developer";
const html = highlight\`Hello, my name is \${name} and I'm a \${role}.\`;
console.log(html); // "Hello, my name is <strong>Bob</strong> and I'm a <strong>Developer</strong>."

// Accessing raw strings
function logRaw(strings) {
  console.log("Cooked:", strings);
  console.log("Raw:", strings.raw);
}

logRaw\`Line 1\\nLine 2\\tTabbed\`;
/* Output:
Cooked: ["Line 1", "Line 2", "Tabbed"]
Raw: ["Line 1\\n", "Line 2\\t", "Tabbed"]
*/

// Practical example: Formatting numbers
function formatPrice(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i];
    if (typeof value === "number") {
      return \`\${result}\${str}\${value.toFixed(2)}\`;
    }
    return \`\${result}\${str}\${value || ""}\`;
  }, "");
}

const item = "Coffee";
const price = 4.5;
console.log(formatPrice\`The \${item} costs \${price} USD\`); 
// "The Coffee costs 4.50 USD"`
    },
    {
      title: "Expressions and Nesting",
      description: "Using complex expressions and nested template literals.",
      code: `// Complex expressions
const user = { name: "Charlie", age: 30 };
const isAdult = user.age >= 18;
console.log(\`User \${user.name} is \${isAdult ? "an adult" : "a minor"}.\`);
// "User Charlie is an adult."

// Nested template literals
function getGreeting(time) {
  return time < 12 ? "Good morning" : "Good afternoon";
}

const hour = 10;
const name = "Diana";
console.log(\`\${getGreeting(hour)}, \${name}!\`); // "Good morning, Diana!"

// Ternary operator in template
const score = 85;
console.log(\`Your grade is \${score >= 60 ? "Pass" : "Fail"}.\`); // "Your grade is Pass."

// Object property access
const product = { name: "Laptop", price: 999.99 };
console.log(\`Product: \${product.name}, Price: \${product.price.toFixed(2)}\`);
// "Product: Laptop, Price: 999.99"`
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of template literals.",
      code: `// Generating HTML
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

const userList = \`
  <ul>
    \${users.map(user => \`
      <li>\${user.name} (\${user.age})</li>
    \`).join("")}
  </ul>
\`;
console.log(userList);
// <ul>
//   <li>Alice (25)</li>
//   <li>Bob (30)</li>
// </ul>

// SQL query builder
function createQuery(table, conditions) {
  return \`SELECT * FROM \${table} WHERE \${conditions.join(" AND ")}\`;
}

const query = createQuery("users", ["age > 18", "active = true"]);
console.log(query); // "SELECT * FROM users WHERE age > 18 AND active = true"

// Dynamic logging
function log(level, ...messages) {
  const timestamp = new Date().toISOString();
  return \`[\${timestamp}] [\${level.toUpperCase()}]: \${messages.join(" ")}\`;
}

console.log(log("info", "User", "logged", "in"));
// "[2025-08-04T06:26:00.000Z] [INFO]: User logged in"

// Multi-language support
const translations = {
  en: { greeting: "Hello, {name}!" },
  es: { greeting: "¡Hola, {name}!" }
};

function translate(lang, key, data) {
  const template = translations[lang][key];
  return template.replace(/{(\\w+)}/g, (_, key) => data[key]);
}

console.log(translate("en", "greeting", { name: "Emma" })); // "Hello, Emma!"
console.log(translate("es", "greeting", { name: "Emma" })); // "¡Hola, Emma!"`
    },
    {
      title: "Common Pitfalls and Best Practices",
      description: "Avoiding issues and following best practices with template literals.",
      code: `// Avoid excessive nesting for readability
// Bad practice
const complex = \`Result: \${user.active ? \`User \${user.name} (\${user.age}) is \${status ? "online" : "offline"} in \${location.city}\` : "Inactive user"}\`;

// Better: Break into smaller parts
function formatUser(user, status, location) {
  if (!user.active) return "Inactive user";
  return \`User \${user.name} (\${user.age}) is \${status ? "online" : "offline"} in \${location.city}\`;
}

const user = { name: "Frank", age: 35, active: true };
console.log(formatUser(user, true, { city: "Paris" }));
// "User Frank (35) is online in Paris"

// Sanitizing user input
function safeHtml(strings, ...values) {
  const escape = (str) => 
    str.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  
  return strings.reduce((result, str, i) => 
    \`\${result}\${str}\${values[i] ? escape(values[i]) : ""}\`, "");
}

const unsafeInput = "<script>alert('hack')</script>";
console.log(safeHtml\`User input: \${unsafeInput}\`);
// "User input: &lt;script&gt;alert(&#39;hack&#39;)&lt;/script&gt;"

// Performance considerations
// Avoid template literals in loops for large datasets
const items = new Array(1000).fill("item");
let result = "";
// Better for performance
for (let i = 0; i < items.length; i++) {
  result += items[i] + " ";
}
console.log(result.trim());

// Compared to template literals (slower for large concatenations)
const slowResult = \`\${items.join(" ")}\`;
console.log(slowResult);`
    }
  ];

  return (
    <TopicPage
      title="Template Literals"
      description="Discover template literals in JavaScript (ES6+), which provide a powerful way to create strings with interpolation, multi-line support, and tagged templates for advanced string processing."
      examples={examples}
    />
  );
}