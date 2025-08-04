import { TopicPage } from "@/components/TopicPage";

export default function DestructuringPage() {
  const examples = [
    {
      title: "Array Destructuring",
      description: "Extracting values from arrays using destructuring.",
      code: `// Basic array destructuring
const [first, second] = [1, 2, 3];
console.log(first, second); // 1, 2

// Skip elements
const [a, , c] = [1, 2, 3];
console.log(a, c); // 1, 3

// Default values
const [x = 10, y = 20] = [1];
console.log(x, y); // 1, 20

// Rest elements
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail); // 1, [2, 3, 4]

// Swapping variables
let m = 5, n = 10;
[m, n] = [n, m];
console.log(m, n); // 10, 5`,
    },
    {
      title: "Object Destructuring",
      description: "Extracting properties from objects using destructuring.",
      code: `// Basic object destructuring
const { name, age } = { name: "Alice", age: 30 };
console.log(name, age); // "Alice", 30

// Rename variables
const { name: userName, age: userAge } = { name: "Bob", age: 25 };
console.log(userName, userAge); // "Bob", 25

// Default values
const { role = "user" } = { name: "Charlie" };
console.log(role); // "user"

// Nested destructuring
const user = { info: { name: "Dave", age: 28 } };
const { info: { name, age } } = user;
console.log(name, age); // "Dave", 28

// Rest properties
const { id, ...rest } = { id: 1, name: "Eve", age: 22 };
console.log(id, rest); // 1, { name: "Eve", age: 22 }`,
    },
    {
      title: "Destructuring in Function Parameters",
      description: "Using destructuring directly in function parameters.",
      code: `// Array destructuring in parameters
function printFirstTwo([first, second]) {
  console.log(first, second);
}
printFirstTwo([1, 2, 3]); // 1, 2

// Object destructuring in parameters
function greet({ name, age = 18 }) {
  console.log(\`Hello, \${name}, age \${age}\`);
}
greet({ name: "Alice" }); // "Hello, Alice, age 18"

// Default object
function processUser({ name = "Guest", ...rest } = {}) {
  console.log(name, rest);
}
processUser({ name: "Bob", age: 30 }); // "Bob", { age: 30 }
processUser(); // "Guest", {}

// Nested destructuring in parameters
function getUserInfo({ info: { name, age } }) {
  console.log(name, age);
}
getUserInfo({ info: { name: "Charlie", age: 25 } }); // "Charlie", 25`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of destructuring.",
      code: `// API response destructuring
async function fetchUser(id) {
  const response = await fetch(\`https://api.example.com/users/\${id}\`);
  const { name, email, address: { city } } = await response.json();
  console.log(name, email, city);
}
fetchUser(1);

// Loop destructuring
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 }
];
for (const { name, age } of users) {
  console.log(\`\${name} is \${age} years old\`);
}
// Logs: "Alice is 30 years old"
//       "Bob is 25 years old"

// Destructuring in DOM manipulation
function updateUserCard({ name, age }) {
  const card = document.createElement("div");
  card.textContent = \`\${name}, \${age}\`;
  document.body.appendChild(card);
}
updateUserCard({ name: "Charlie", age: 28 });

// Swap array elements
function swapElements(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
  return arr;
}
console.log(swapElements([1, 2, 3], 0, 1)); // [2, 1, 3]`,
    },
    {
      title: "Best Practices and Pitfalls",
      description: "Optimizing destructuring usage and avoiding common issues.",
      code: `// Avoid over-destructuring
function badDestructuring({ user: { info: { details: { name, age } } } }) {
  console.log(name, age);
}
// Better: Simplify
function goodDestructuring({ name, age }) {
  console.log(name, age);
}
goodDestructuring({ name: "Alice", age: 30 });

// Handle missing data
function safeDestructuring({ name = "Guest", age = 18 } = {}) {
  console.log(name, age);
}
safeDestructuring(); // "Guest", 18

// Use descriptive names
const { firstName: fname, lastName: lname } = { firstName: "Bob", lastName: "Smith" };
console.log(fname, lname); // "Bob", "Smith"

// Destructuring with rest in loops
const data = [{ id: 1, name: "Eve" }, { id: 2, name: "Frank" }];
data.forEach(({ id, ...rest }) => {
  console.log(\`ID: \${id}, Rest: \${JSON.stringify(rest)}\`);
});`,
    },
  ];

  return (
    <TopicPage
      title="Destructuring"
      description="Learn about ES6 destructuring, which allows extracting values from arrays and objects into variables in a concise and readable way."
      examples={examples}
    />
  );
}
