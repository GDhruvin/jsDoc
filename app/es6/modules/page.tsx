import { TopicPage } from "@/components/TopicPage";

export default function ModulesPage() {
  const examples = [
    {
      title: "Basic ES6 Modules",
      description: "Using import and export for modular JavaScript code.",
      code: `// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// main.js
import { add, subtract } from './math.js';
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2

// Default export
// user.js
export default function getUser() {
  return { name: "Alice", age: 30 };
}

// main.js
import getUser from './user.js';
console.log(getUser()); // { name: "Alice", age: 30 }

// Named and default exports
// utils.js
export const PI = 3.14;
export default function area(radius) {
  return PI * radius ** 2;
}

// main.js
import area, { PI } from './utils.js';
console.log(area(5)); // 78.5
console.log(PI); // 3.14`,
    },
    {
      title: "Module Scope and Imports",
      description: "Understanding module scope and dynamic imports.",
      code: `// config.js
const secret = "hidden";
export const config = { apiKey: "xyz123" };
// console.log(secret); // Not exported, inaccessible

// main.js
import { config } from './config.js';
console.log(config.apiKey); // "xyz123"
// console.log(secret); // Error: secret is not defined

// Renaming imports
import { config as appConfig } from './config.js';
console.log(appConfig.apiKey); // "xyz123"

// Import all
import * as utils from './math.js';
console.log(utils.add(2, 3)); // 5

// Dynamic import
async function loadModule() {
  const { add } = await import('./math.js');
  console.log(add(10, 20)); // 30
}
loadModule();`,
    },
    {
      title: "Exporting Techniques",
      description:
        "Different ways to export variables, functions, and objects.",
      code: `// Export list
// helpers.js
const square = (x) => x * x;
const cube = (x) => x ** 3;
export { square, cube };

// main.js
import { square, cube } from './helpers.js';
console.log(square(4)); // 16
console.log(cube(3)); // 27

// Export with renaming
// data.js
const userData = { name: "Bob" };
export { userData as user };

// main.js
import { user } from './data.js';
console.log(user); // { name: "Bob" }

// Re-exporting
// index.js
export { add } from './math.js';
export * from './helpers.js';

// main.js
import { add, square } from './index.js';
console.log(add(1, 2), square(3)); // 3, 9`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of ES6 modules.",
      code: `// API client module
// api.js
const BASE_URL = "https://api.example.com";
export async function fetchUsers() {
  const response = await fetch(\`\${BASE_URL}/users\`);
  return response.json();
}
export async function fetchUser(id) {
  const response = await fetch(\`\${BASE_URL}/users/\${id}\`);
  return response.json();
}

// main.js
import { fetchUsers } from './api.js';
fetchUsers().then((users) => console.log(users));

// Component module
// component.js
export function createButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  return button;
}

// main.js
import { createButton } from './component.js';
document.body.appendChild(createButton("Click me"));

// Lazy-loaded module
// heavyModule.js
export function heavyComputation() {
  return new Array(1000000).fill(0).reduce((sum) => sum + 1, 0);
}

// main.js
async function loadHeavyModule() {
  const { heavyComputation } = await import('./heavyModule.js');
  console.log(heavyComputation()); // 1000000
}
loadHeavyModule();`,
    },
    {
      title: "Best Practices and Module Patterns",
      description: "Optimizing module usage and common patterns.",
      code: `// Single responsibility
// logger.js
export function log(message) {
  console.log(\`[LOG]: \${message}\`);
}

// Avoid global pollution
// bad.js
window.globalVar = "Avoid this";
export const bad = () => console.log(globalVar);

// Better: Pure module
// good.js
const privateVar = "Hidden";
export const good = () => console.log(privateVar);

// Barrel file
// utils/index.js
export * from './math.js';
export * from './helpers.js';

// main.js
import { add, square } from './utils';
console.log(add(2, 2), square(2)); // 4, 4

// Conditional exports
// feature.js
const featureEnabled = true;
export const feature = featureEnabled ? { enabled: true } : { enabled: false };

// main.js
import { feature } from './feature.js';
console.log(feature.enabled); // true`,
    },
  ];

  return (
    <TopicPage
      title="Modules"
      description="Learn about ES6 modules, which enable modular JavaScript code with import and export statements for better organization and encapsulation."
      examples={examples}
    />
  );
}
