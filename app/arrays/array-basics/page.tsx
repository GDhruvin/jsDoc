import { TopicPage } from '@/components/TopicPage';

export default function ArrayBasicsPage() {
  const examples = [
    {
      title: "Creating Arrays",
      description: "Different ways to create and initialize arrays in JavaScript.",
      code: `// Array literal (most common)
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null];

// Empty array
const empty = [];

// Array constructor
const arr1 = new Array(); // Empty array
const arr2 = new Array(5); // Array with 5 empty slots
const arr3 = new Array(1, 2, 3); // [1, 2, 3]

console.log(arr2); // [empty × 5]
console.log(arr2.length); // 5

// Array.of() - creates array from arguments
const arr4 = Array.of(5); // [5] (not empty array with 5 slots)
const arr5 = Array.of(1, 2, 3); // [1, 2, 3]

// Array.from() - creates array from iterable or array-like
const str = "hello";
const charArray = Array.from(str); // ["h", "e", "l", "l", "o"]

const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const realArray = Array.from(arrayLike); // ["a", "b", "c"]

// Array.from() with mapping function
const doubled = Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]

// Creating arrays with specific patterns
const zeros = new Array(5).fill(0); // [0, 0, 0, 0, 0]
const sequence = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]`
    },
    {
      title: "Accessing Array Elements",
      description: "How to access and modify array elements using indices.",
      code: `const colors = ["red", "green", "blue", "yellow"];

// Accessing elements by index (0-based)
console.log(colors[0]); // "red"
console.log(colors[1]); // "green"
console.log(colors[3]); // "yellow"

// Accessing non-existent index
console.log(colors[10]); // undefined

// Negative indices don't work like in Python
console.log(colors[-1]); // undefined

// Getting last element
console.log(colors[colors.length - 1]); // "yellow"

// Using at() method (ES2022) - supports negative indices
console.log(colors.at(0)); // "red"
console.log(colors.at(-1)); // "yellow" (last element)
console.log(colors.at(-2)); // "blue" (second to last)

// Modifying elements
colors[1] = "lime";
console.log(colors); // ["red", "lime", "blue", "yellow"]

// Adding elements beyond current length
colors[5] = "purple";
console.log(colors); // ["red", "lime", "blue", "yellow", empty, "purple"]
console.log(colors.length); // 6

// Checking if index exists
if (2 in colors) {
  console.log("Index 2 exists:", colors[2]);
}

// Safe access with optional chaining
const maybeArray = null;
console.log(maybeArray?.[0]); // undefined (no error)`
    },
    {
      title: "Array Properties and Length",
      description: "Understanding array length and how it behaves.",
      code: `const numbers = [1, 2, 3, 4, 5];

// Length property
console.log(numbers.length); // 5

// Length is writable
numbers.length = 3;
console.log(numbers); // [1, 2, 3] (elements 3 and 4 are removed)

// Extending length creates empty slots
numbers.length = 6;
console.log(numbers); // [1, 2, 3, empty × 3]

// Empty slots vs undefined
const sparse = [1, , , 4]; // Array with holes
console.log(sparse.length); // 4
console.log(sparse[1]); // undefined
console.log(1 in sparse); // false (hole exists)

const withUndefined = [1, undefined, undefined, 4];
console.log(withUndefined[1]); // undefined
console.log(1 in withUndefined); // true (element exists)

// Clearing an array
let data = [1, 2, 3, 4, 5];

// Method 1: Set length to 0
data.length = 0;
console.log(data); // []

// Method 2: Assign new empty array
data = [];

// Method 3: Use splice
data = [1, 2, 3, 4, 5];
data.splice(0);
console.log(data); // []

// Dense vs sparse arrays
const dense = [1, 2, 3, 4, 5];
const sparse2 = [1, , , , 5];

console.log(dense.length); // 5
console.log(sparse2.length); // 5

// Iterating shows the difference
dense.forEach((item, index) => console.log(index, item));
// 0 1, 1 2, 2 3, 3 4, 4 5

sparse2.forEach((item, index) => console.log(index, item));
// 0 1, 4 5 (skips empty slots)`
    },
    {
      title: "Array Type Checking",
      description: "How to check if a value is an array.",
      code: `// Array.isArray() - most reliable method
console.log(Array.isArray([])); // true
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("hello")); // false
console.log(Array.isArray({ 0: "a", length: 1 })); // false

// typeof is not reliable for arrays
console.log(typeof []); // "object" (not helpful)
console.log(typeof [1, 2, 3]); // "object"

// instanceof can be unreliable across frames
console.log([] instanceof Array); // true
console.log([1, 2, 3] instanceof Array); // true

// Object.prototype.toString method
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call([1, 2, 3])); // "[object Array]"

// Practical function to check array
function isArray(value) {
  return Array.isArray(value);
}

// Usage in functions
function processData(data) {
  if (!isArray(data)) {
    throw new Error("Expected an array");
  }
  
  return data.map(item => item * 2);
}

try {
  console.log(processData([1, 2, 3])); // [2, 4, 6]
  console.log(processData("not an array")); // Error
} catch (error) {
  console.error(error.message);
}

// Checking for array-like objects
function isArrayLike(value) {
  return value != null && 
         typeof value === 'object' && 
         typeof value.length === 'number' && 
         value.length >= 0 && 
         value.length === Math.floor(value.length);
}

console.log(isArrayLike([])); // true
console.log(isArrayLike("hello")); // true (strings are array-like)
console.log(isArrayLike({ 0: "a", 1: "b", length: 2 })); // true
console.log(isArrayLike({ name: "John" })); // false`
    },
    {
      title: "Basic Array Operations",
      description: "Common operations for working with arrays.",
      code: `const fruits = ["apple", "banana"];

// Adding elements
fruits.push("orange"); // Add to end
console.log(fruits); // ["apple", "banana", "orange"]

fruits.unshift("grape"); // Add to beginning
console.log(fruits); // ["grape", "apple", "banana", "orange"]

// Removing elements
const lastFruit = fruits.pop(); // Remove from end
console.log(lastFruit); // "orange"
console.log(fruits); // ["grape", "apple", "banana"]

const firstFruit = fruits.shift(); // Remove from beginning
console.log(firstFruit); // "grape"
console.log(fruits); // ["apple", "banana"]

// Finding elements
const numbers = [1, 2, 3, 4, 5, 3];

console.log(numbers.indexOf(3)); // 2 (first occurrence)
console.log(numbers.lastIndexOf(3)); // 5 (last occurrence)
console.log(numbers.indexOf(10)); // -1 (not found)

console.log(numbers.includes(4)); // true
console.log(numbers.includes(10)); // false

// Copying arrays
const original = [1, 2, 3];

// Shallow copy methods
const copy1 = [...original]; // Spread operator
const copy2 = Array.from(original); // Array.from()
const copy3 = original.slice(); // slice() with no arguments

console.log(copy1); // [1, 2, 3]
console.log(copy1 === original); // false (different arrays)

// Joining arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const combined = [...arr1, ...arr2, ...arr3]; // [1, 2, 3, 4, 5, 6]
const concatenated = arr1.concat(arr2, arr3); // [1, 2, 3, 4, 5, 6]

// Converting to string
const items = ["apple", "banana", "orange"];
console.log(items.toString()); // "apple,banana,orange"
console.log(items.join()); // "apple,banana,orange"
console.log(items.join(" - ")); // "apple - banana - orange"
console.log(items.join("")); // "applebananaorange"`
    }
  ];

  return (
    <TopicPage
      title="Array Basics"
      description="Learn the fundamentals of JavaScript arrays: creation, accessing elements, properties, type checking, and basic operations. Arrays are ordered collections that can hold any type of data."
      examples={examples}
    />
  );
}