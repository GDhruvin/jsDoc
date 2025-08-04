import { TopicPage } from "@/components/TopicPage";

export default function SpreadRestPage() {
  const examples = [
    {
      title: "Spread Operator for Arrays",
      description: "Using the spread operator to expand arrays.",
      code: `// Copy array
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2); // [1, 2, 3]
arr2.push(4);
console.log(arr1); // [1, 2, 3] (original unchanged)

// Concatenate arrays
const part1 = [1, 2];
const part2 = [3, 4];
const combined = [...part1, ...part2];
console.log(combined); // [1, 2, 3, 4]

// Spread in function calls
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Add elements
const original = [1, 2];
const newArr = [...original, 3, 4];
console.log(newArr); // [1, 2, 3, 4]`,
    },
    {
      title: "Spread Operator for Objects",
      description: "Using the spread operator to copy or merge objects.",
      code: `// Copy object
const obj1 = { name: "Alice", age: 30 };
const obj2 = { ...obj1 };
console.log(obj2); // { name: "Alice", age: 30 }
obj2.age = 31;
console.log(obj1); // { name: "Alice", age: 30 } (original unchanged)

// Merge objects
const defaults = { theme: "light", font: "Arial" };
const userPrefs = { theme: "dark" };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: "dark", font: "Arial" }

// Add properties
const user = { name: "Bob" };
const updatedUser = { ...user, age: 25 };
console.log(updatedUser); // { name: "Bob", age: 25 }

// Spread with computed properties
const key = "color";
const style = { ...defaults, [key]: "blue" };
console.log(style); // { theme: "light", font: "Arial", color: "blue" }`,
    },
    {
      title: "Rest Parameters",
      description: "Using rest parameters to collect function arguments.",
      code: `// Basic rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Rest with other parameters
function greet(greeting, ...names) {
  return names.map((name) => \`\${greeting}, \${name}!\`);
}
console.log(greet("Hello", "Alice", "Bob")); // ["Hello, Alice!", "Hello, Bob!"]

// Rest in destructuring
const [first, ...rest] = [1, 2, 3, 4];
console.log(first, rest); // 1, [2, 3, 4]

const { name, ...otherProps } = { name: "Charlie", age: 28, city: "NY" };
console.log(name, otherProps); // "Charlie", { age: 28, city: "NY" }`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of spread and rest operators.",
      code: `// Clone and update array
function updateItems(items, newItem) {
  return [...items, newItem];
}
const items = ["Apple", "Banana"];
console.log(updateItems(items, "Orange")); // ["Apple", "Banana", "Orange"]
console.log(items); // ["Apple", "Banana"]

// Merge API responses
async function combineData() {
  const user = await fetch("https://api.example.com/user/1").then((res) => res.json());
  const posts = await fetch("https://api.example.com/posts").then((res) => res.json());
  return { ...user, posts };
}
combineData().then((data) => console.log(data));

// Function with dynamic arguments
function logItems(prefix, ...items) {
  console.log(\`\${prefix}: \${items.join(", ")}\`);
}
logItems("Items", "Apple", "Banana", "Orange"); // "Items: Apple, Banana, Orange"

// Spread in DOM manipulation
function createList(...items) {
  const ul = document.createElement("ul");
  ul.innerHTML = items.map((item) => \`<li>\${item}</li>\`).join("");
  document.body.appendChild(ul);
}
createList("Item 1", "Item 2", "Item 3");`,
    },
    {
      title: "Best Practices and Pitfalls",
      description:
        "Optimizing spread and rest usage and avoiding common issues.",
      code: `// Avoid deep copying issues
const nested = { user: { name: "Alice" } };
const shallowCopy = { ...nested };
shallowCopy.user.name = "Bob";
console.log(nested.user.name); // "Bob" (shallow copy)

// Deep copy solution
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
const deepCopied = deepCopy(nested);
deepCopied.user.name = "Charlie";
console.log(nested.user.name); // "Alice"

// Avoid large spread operations
const largeArray = new Array(1000000).fill(0);
const copy = [...largeArray]; // Performance heavy
// Better: Use slice for simple copies
const betterCopy = largeArray.slice();

// Clear rest parameter usage
function processUser(id, ...options) {
  console.log(\`ID: \${id}, Options: \${JSON.stringify(options)}\`);
}
processUser(1, "option1", "option2"); // "ID: 1, Options: [\"option1\",\"option2\"]" `,
    },
  ];

  return (
    <TopicPage
      title="Spread & Rest"
      description="Explore the ES6 spread and rest operators for expanding arrays and objects or collecting function arguments in a flexible and concise way."
      examples={examples}
    />
  );
}
