import { TopicPage } from '@/components/TopicPage';

export default function DataTypesPage() {
  const examples = [
    {
      title: "Primitive Data Types",
      description: "JavaScript has 7 primitive data types that are immutable.",
      code: `// String
const name = "JavaScript";
const greeting = 'Hello World';
const template = \`Welcome to \${name}\`;

// Number
const integer = 42;
const decimal = 3.14159;
const negative = -100;
const infinity = Infinity;
const notANumber = NaN;

// Boolean
const isActive = true;
const isComplete = false;

// Undefined
let uninitialized;
console.log(uninitialized); // undefined

// Null
const emptyValue = null;

// Symbol (ES6+)
const uniqueId = Symbol('id');
const anotherId = Symbol('id');
console.log(uniqueId === anotherId); // false

// BigInt (ES2020+)
const bigNumber = 1234567890123456789012345678901234567890n;
const anotherBig = BigInt("9007199254740991");`
    },
    {
      title: "Type Checking",
      description: "Different ways to check data types in JavaScript.",
      code: `// Using typeof operator
console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (known quirk!)
console.log(typeof Symbol('id')); // "symbol"
console.log(typeof 123n); // "bigint"

// More reliable type checking
function getType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

console.log(getType(null)); // "null"
console.log(getType([])); // "array"
console.log(getType({})); // "object"`
    },
    {
      title: "Type Coercion Examples",
      description: "How JavaScript automatically converts between types.",
      code: `// String coercion
console.log("5" + 3); // "53" (number to string)
console.log("5" - 3); // 2 (string to number)
console.log("5" * "2"); // 10 (both to numbers)

// Boolean coercion
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

console.log(Boolean(1)); // true
console.log(Boolean("hello")); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true

// Equality vs Strict Equality
console.log(5 == "5"); // true (with coercion)
console.log(5 === "5"); // false (no coercion)
console.log(null == undefined); // true
console.log(null === undefined); // false`
    },
    {
      title: "Working with Different Types",
      description: "Practical examples of working with each data type.",
      code: `// String operations
const text = "JavaScript";
console.log(text.length); // 10
console.log(text.toUpperCase()); // "JAVASCRIPT"
console.log(text.charAt(0)); // "J"

// Number operations
const num = 3.14159;
console.log(num.toFixed(2)); // "3.14"
console.log(Math.round(num)); // 3
console.log(Number.isInteger(42)); // true

// Boolean in conditions
const isLoggedIn = true;
if (isLoggedIn) {
  console.log("Welcome back!");
}

// Handling undefined and null
function greet(name) {
  if (name === undefined || name === null) {
    return "Hello, Guest!";
  }
  return \`Hello, \${name}!\`;
}

// Symbol as object keys
const userSymbol = Symbol('user');
const userData = {
  [userSymbol]: { id: 1, name: "Alice" },
  regularProp: "visible"
};

console.log(Object.keys(userData)); // ["regularProp"] - symbols are hidden`
    }
  ];

  return (
    <TopicPage
      title="Data Types"
      description="JavaScript has several built-in data types: string, number, boolean, undefined, null, symbol, and bigint. Understanding these types is fundamental to writing effective JavaScript code."
      examples={examples}
    />
  );
}