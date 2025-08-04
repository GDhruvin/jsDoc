import { TopicPage } from "@/components/TopicPage";

export default function DestructuringPage() {
  const examples = [
    {
      title: "Basic Object Destructuring",
      description: "Extracting properties from objects into variables.",
      code: `const user = { name: "Alice", age: 25, city: "New York" };

// Basic destructuring
const { name, age } = user;
console.log(name); // "Alice"
console.log(age); // 25

// Renaming variables
const { name: userName, city: location } = user;
console.log(userName); // "Alice"
console.log(location); // "New York"

// Default values
const { role = "user", active = true } = user;
console.log(role); // "user"
console.log(active); // true

// Destructuring in function parameters
function greet({ name, city }) {
  return \`Hello, \${name} from \${city}!\`;
}
console.log(greet(user)); // "Hello, Alice from New York!"

// Rest properties
const { name: firstName, ...rest } = user;
console.log(firstName); // "Alice"
console.log(rest); // { age: 25, city: "New York" }`,
    },
    {
      title: "Nested Destructuring",
      description: "Extracting properties from nested objects.",
      code: `const person = {
  name: "Bob",
  contact: {
    email: "bob@example.com",
    phone: "123-456-7890"
  },
  preferences: {
    theme: "dark"
  }
};

// Nested destructuring
const { name, contact: { email }, preferences: { theme } } = person;
console.log(name); // "Bob"
console.log(email); // "bob@example.com"
console.log(theme); // "dark"

// Default values for nested objects
const { contact: { phone, address = "Unknown" } } = person;
console.log(phone); // "123-456-7890"
console.log(address); // "Unknown"

// Renaming nested properties
const { contact: { email: userEmail, phone: userPhone } } = person;
console.log(userEmail); // "bob@example.com"
console.log(userPhone); // "123-456-7890"

// Rest with nested destructuring
const { name: personName, ...otherDetails } = person;
console.log(otherDetails);
// { contact: { email: "bob@example.com", phone: "123-456-7890" }, preferences: { theme: "dark" } }`,
    },
    {
      title: "Destructuring with Default Objects",
      description: "Handling missing objects in destructuring.",
      code: `// Default object to avoid errors
function processSettings({ settings = { theme: "light", notifications: true } } = {}) {
  return \`Theme: \${settings.theme}, Notifications: \${settings.notifications}\`;
}

console.log(processSettings()); // "Theme: light, Notifications: true"
console.log(processSettings({ settings: { theme: "dark" } }));
// "Theme: dark, Notifications: true"

// Destructuring with undefined/null
const obj = {};
const { name = "Guest", age = 0 } = obj;
console.log(name); // "Guest"
console.log(age); // 0

// Avoid destructuring null/undefined
try {
  const { prop } = null;
} catch (e) {
  console.log(e.message); // "Cannot destructure property 'prop' of 'null'"
}

// Practical example: Config merging
function mergeConfig({ base = {}, overrides = {} } = {}) {
  return { ...base, ...overrides };
}
console.log(mergeConfig()); // {}
console.log(mergeConfig({ base: { theme: "light" }, overrides: { theme: "dark" } }));
// { theme: "dark" }`,
    },
    {
      title: "Destructuring in Loops and Arrays",
      description: "Using destructuring with arrays and loops.",
      code: `// Array of objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

// Destructuring in for...of loop
for (const { name, age } of users) {
  console.log(\`\${name} is \${age} years old\`);
}
// "Alice is 25 years old"
// "Bob is 30 years old"
// "Charlie is 35 years old"

// Destructuring with map
const names = users.map(({ name }) => name);
console.log(names); // ["Alice", "Bob", "Charlie"]

// Combining with array destructuring
const [{ name: firstUser }, ...restUsers] = users;
console.log(firstUser); // "Alice"
console.log(restUsers); // [{ name: "Bob", age: 30 }, { name: "Charlie", age: 35 }]

// Nested array and object destructuring
const data = { points: [{ x: 1, y: 2 }, { x: 3, y: 4 }] };
const { points: [{ x: x1, y: y1 }, { x: x2, y: y2 }] } = data;
console.log(x1, y1, x2, y2); // 1 2 3 4`,
    },
    {
      title: "Practical Examples and Best Practices",
      description: "Real-world applications and tips for object destructuring.",
      code: `// API response handling
function processApiResponse({ data: { user, status }, error = null }) {
  if (error) return \`Error: \${error}\`;
  return \`\${user.name} - Status: \${status}\`;
}

const response = {
  data: { user: { name: "Diana" }, status: "success" }
};
console.log(processApiResponse(response)); // "Diana - Status: success"

// Component props destructuring
function UserProfile({ user: { name, email }, settings: { theme } = { theme: "light" } }) {
  return \`<div class="\${theme}">
    <h1>\${name}</h1>
    <p>\${email}</p>
  </div>\`;
}

console.log(UserProfile({
  user: { name: "Eve", email: "eve@example.com" },
  settings: { theme: "dark" }
}));
// <div class="dark">
//   <h1>Eve</h1>
//   <p>eve@example.com</p>
// </div>

// Swapping variables with destructuring
let a = "x", b = "y";
({ a, b } = { a: b, b: a });
console.log(a, b); // "y" "x"

// Avoid over-destructuring for readability
// Bad practice
const { user: { info: { personal: { name: userName } } } } = data;

// Better: Break into steps
const { user } = data;
const { name: userName } = user.info.personal;
console.log(userName);

// Destructuring with computed property names
const prop = "age";
const { [prop]: userAge } = { age: 40 };
console.log(userAge); // 40`,
    },
  ];

  return (
    <TopicPage
      title="Destructuring"
      description="Master object destructuring in JavaScript to extract properties into variables, handle nested objects, set defaults, and use in functions, loops, and real-world scenarios."
      examples={examples}
    />
  );
}
