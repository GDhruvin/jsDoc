import { TopicPage } from "@/components/TopicPage";

export default function SetMapPage() {
  const examples = [
    {
      title: "Using Set",
      description: "Working with Set to store unique values.",
      code: `// Create a Set
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(1); // Duplicate ignored
console.log(mySet); // Set { 1, 2 }

// Initialize with array
const uniqueNumbers = new Set([1, 2, 2, 3]);
console.log(uniqueNumbers); // Set { 1, 2, 3 }

// Check for value
console.log(uniqueNumbers.has(2)); // true
console.log(uniqueNumbers.has(4)); // false

// Remove value
uniqueNumbers.delete(2);
console.log(uniqueNumbers); // Set { 1, 3 }

// Size and clear
console.log(uniqueNumbers.size); // 2
uniqueNumbers.clear();
console.log(uniqueNumbers.size); // 0`,
    },
    {
      title: "Using Map",
      description:
        "Working with Map to store key-value pairs with any key type.",
      code: `// Create a Map
const myMap = new Map();
myMap.set("name", "Alice");
myMap.set(1, "one");
console.log(myMap); // Map { "name" => "Alice", 1 => "one" }

// Initialize with array
const data = new Map([
  ["key1", "value1"],
  ["key2", "value2"]
]);
console.log(data); // Map { "key1" => "value1", "key2" => "value2" }

// Get and set
console.log(data.get("key1")); // "value1"
data.set("key3", "value3");
console.log(data.has("key3")); // true

// Delete and clear
data.delete("key2");
console.log(data); // Map { "key1" => "value1", "key3" => "value3" }
console.log(data.size); // 2
data.clear();
console.log(data.size); // 0`,
    },
    {
      title: "Set and Map Iteration",
      description: "Iterating over Set and Map using various methods.",
      code: `// Set iteration
const numbers = new Set([1, 2, 3]);
for (const num of numbers) {
  console.log(num); // 1, 2, 3
}

numbers.forEach((num) => console.log(num)); // 1, 2, 3
console.log([...numbers]); // [1, 2, 3]

// Map iteration
const users = new Map([
  ["id1", { name: "Alice" }],
  ["id2", { name: "Bob" }]
]);

for (const [id, user] of users) {
  console.log(\`\${id}: \${user.name}\`);
} // "id1: Alice", "id2: Bob"

users.forEach((user, id) => console.log(\`\${id}: \${user.name}\`));
console.log([...users]); // [["id1", { name: "Alice" }], ["id2", { name: "Bob" }]]`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of Set and Map.",
      code: `// Unique values with Set
function getUniqueValues(arr) {
  return [...new Set(arr)];
}
console.log(getUniqueValues([1, 2, 2, 3, 3, 4])); // [1, 2, 3, 4]

// Deduplicate DOM elements
function uniqueClasses(selector) {
  const elements = document.querySelectorAll(selector);
  const classes = new Set();
  elements.forEach((el) => el.classList.forEach((cls) => classes.add(cls)));
  return [...classes];
}
console.log(uniqueClasses(".item")); // ["class1", "class2"]

// Map for user data
const userCache = new Map();
function cacheUser(id, data) {
  userCache.set(id, data);
  return userCache.get(id);
}
console.log(cacheUser(1, { name: "Alice" })); // { name: "Alice" }
console.log(userCache.get(1)); // { name: "Alice" }

// Track unique visitors
const visitors = new Set();
function trackVisitor(id) {
  visitors.add(id);
  console.log(\`Total visitors: \${visitors.size}\`);
}
trackVisitor("user1"); // "Total visitors: 1"
trackVisitor("user1"); // "Total visitors: 1"
trackVisitor("user2"); // "Total visitors: 2"`,
    },
    {
      title: "Best Practices and Performance",
      description: "Optimizing Set and Map usage and avoiding pitfalls.",
      code: `// Use Set for uniqueness
const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)]; // More efficient than array.filter
console.log(unique); // [1, 2, 3]

// Use Map for key flexibility
const obj = { key: "value" };
const map = new Map([[obj, "object key"]]);
console.log(map.get(obj)); // "object key"
// console.log(map.get({ key: "value" })); // undefined (different object reference)

// Avoid redundant Sets/Maps
function efficientSet(arr) {
  const set = new Set(arr);
  return set.size > 0 ? [...set] : [];
}
console.log(efficientSet([1, 1, 2])); // [1, 2]

// WeakMap for memory management
const weakCache = new WeakMap();
function cacheObject(obj, data) {
  weakCache.set(obj, data);
  return weakCache.get(obj);
}
const keyObj = {};
console.log(cacheObject(keyObj, "data")); // "data"
// keyObj = null; // Allows garbage collection`,
    },
  ];

  return (
    <TopicPage
      title="Set & Map"
      description="Explore ES6 Set and Map data structures for managing unique values and key-value pairs with flexible keys and efficient operations."
      examples={examples}
    />
  );
}
