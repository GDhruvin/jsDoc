import { TopicPage } from '@/components/TopicPage';

export default function StringsBasicsPage() {
  const examples = [
    {
      title: "Creating Strings",
      description: "Different ways to define strings in JavaScript.",
      code: `// Single quotes
const singleQuote = 'Hello, World!';

// Double quotes
const doubleQuote = "Hello, World!";

// Backticks (Template literals, covered in detail later)
const backtick = \`Hello, World!\`;

// All are equivalent
console.log(singleQuote); // "Hello, World!"
console.log(doubleQuote); // "Hello, World!"
console.log(backtick); // "Hello, World!"

// Using quotes inside strings
const withSingle = "It's a sunny day"; // Single quotes inside double quotes
const withDouble = 'He said, "Hello!"'; // Double quotes inside single quotes
const escaped = 'It\\'s a sunny day'; // Escaping single quotes

console.log(withSingle); // "It's a sunny day"
console.log(withDouble); // 'He said, "Hello!"'
console.log(escaped); // "It's a sunny day"

// Multi-line strings (before ES6, using concatenation)
const multiLineOld = "Line 1\\n" +
                     "Line 2\\n" +
                     "Line 3";
console.log(multiLineOld);
// Line 1
// Line 2
// Line 3`
    },
    {
      title: "String Properties and Basic Operations",
      description: "Working with string length and basic concatenation.",
      code: `// String length property
const message = "Hello, World!";
console.log(message.length); // 13

// Concatenation with +
const firstName = "Alice";
const lastName = "Smith";
const fullName = firstName + " " + lastName;
console.log(fullName); // "Alice Smith"

// Concatenation with variables
const age = 25;
const greeting = "Hello, " + firstName + "! You are " + age + " years old.";
console.log(greeting); // "Hello, Alice! You are 25 years old."

// Strings are immutable
let str = "Hello";
str[0] = "J"; // Attempt to change first character
console.log(str); // Still "Hello" (immutable)

// Creating new string based on existing
str = "J" + str.slice(1);
console.log(str); // "Jello"`
    },
    {
      title: "Escape Sequences",
      description: "Using special characters in strings with escape sequences.",
      code: `// Common escape sequences
const escapes = "First line\\nSecond line\\tTabbed\\rCarriage return\\"'Quote'";
console.log(escapes);
// First line
// Second line    TabbedCarriage return"Quote"

// Unicode escape sequences
const unicode = "\\u2764 Heart \\u00A9 Copyright";
console.log(unicode); // "❤ Heart © Copyright"

// Escaping backslashes
const path = "C:\\\\Program Files\\\\App";
console.log(path); // "C:\Program Files\App"

// Hexadecimal escape
const hex = "\\x41\\x42\\x43";
console.log(hex); // "ABC"`
    },
    {
      title: "String Comparison and Type Coercion",
      description: "Comparing strings and handling type coercion.",
      code: `// String comparison (lexicographical order)
console.log("apple" < "banana"); // true
console.log("Apple" < "apple"); // true (uppercase comes before lowercase in ASCII)
console.log("apple" === "Apple"); // false (case-sensitive)

// Case-insensitive comparison
const str1 = "Hello";
const str2 = "hello";
console.log(str1.toLowerCase() === str2.toLowerCase()); // true

// Type coercion with strings
const num = 42;
const str = "42";
console.log(num == str); // true (loose equality, type coercion)
console.log(num === str); // false (strict equality, no coercion)

// Concatenation with non-strings
console.log("Number: " + 42); // "Number: 42"
console.log("Array: " + [1, 2, 3]); // "Array: 1,2,3"
console.log("Object: " + { name: "Alice" }); // "Object: [object Object]"`
    },
    {
      title: "String Primitives vs String Objects",
      description: "Understanding the difference between string primitives and String objects.",
      code: `// String primitive
const primitive = "Hello";
console.log(typeof primitive); // "string"

// String object
const stringObj = new String("Hello");
console.log(typeof stringObj); // "object"

// Both work with string methods
console.log(primitive.toUpperCase()); // "HELLO"
console.log(stringObj.toUpperCase()); // "HELLO"

// Beware of equality comparisons
console.log(primitive === "Hello"); // true
console.log(stringObj === "Hello"); // false
console.log(stringObj.valueOf() === "Hello"); // true

// Avoid String objects in practice
const badPractice = new String("Avoid this");
console.log(badPractice.length); // 10 (works, but unnecessary)
console.log("Better to use primitive".length); // 20`
    }
  ];

  return (
    <TopicPage
      title="Strings Basics"
      description="Learn the fundamentals of strings in JavaScript, including creation, concatenation, escape sequences, comparison, and the difference between string primitives and String objects."
      examples={examples}
    />
  );
}