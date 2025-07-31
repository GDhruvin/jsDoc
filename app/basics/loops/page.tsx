import { TopicPage } from '@/components/TopicPage';

export default function LoopsPage() {
  const examples = [
    {
      title: "For Loop",
      description: "Execute code a specific number of times.",
      code: `// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log("Iteration:", i);
}
// Output: 0, 1, 2, 3, 4

// Loop through array with index
const fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(\`\${i}: \${fruits[i]}\`);
}

// Reverse loop
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}

// Step by 2
for (let i = 0; i < 10; i += 2) {
  console.log("Even number:", i);
}

// Nested loops
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(\`\${i} x \${j} = \${i * j}\`);
  }
}

// Break and continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // Skip 3
  if (i === 7) break;    // Stop at 7
  console.log(i);
}
// Output: 0, 1, 2, 4, 5, 6`
    },
    {
      title: "While Loop",
      description: "Execute code while a condition is true.",
      code: `// Basic while loop
let count = 0;
while (count < 5) {
  console.log("Count:", count);
  count++;
}

// While loop with array
const numbers = [1, 2, 3, 4, 5];
let index = 0;
while (index < numbers.length) {
  console.log(numbers[index]);
  index++;
}

// While loop for user input simulation
let userInput = "";
let attempts = 0;
const maxAttempts = 3;

while (userInput !== "quit" && attempts < maxAttempts) {
  // Simulate getting user input
  userInput = attempts === 2 ? "quit" : "continue";
  console.log(\`Attempt \${attempts + 1}: \${userInput}\`);
  attempts++;
}

// While loop with complex condition
let balance = 100;
let day = 1;

while (balance > 0 && day <= 30) {
  const dailyExpense = Math.floor(Math.random() * 20) + 5;
  balance -= dailyExpense;
  console.log(\`Day \${day}: Spent $\${dailyExpense}, Balance: $\${balance}\`);
  day++;
}

// Infinite loop prevention
let safety = 0;
while (true) {
  safety++;
  if (safety > 1000) {
    console.log("Safety break activated");
    break;
  }
  // Your code here
}`
    },
    {
      title: "Do-While Loop",
      description: "Execute code at least once, then continue while condition is true.",
      code: `// Basic do-while loop
let i = 0;
do {
  console.log("Value:", i);
  i++;
} while (i < 3);
// Output: 0, 1, 2

// Do-while vs while difference
let x = 10;

// This won't execute at all
while (x < 5) {
  console.log("While:", x);
}

// This executes once
do {
  console.log("Do-while:", x);
} while (x < 5);
// Output: "Do-while: 10"

// Menu system example
let choice;
do {
  // Simulate showing menu and getting choice
  console.log("1. View Profile");
  console.log("2. Settings");
  console.log("3. Exit");
  
  // Simulate user choice
  choice = Math.floor(Math.random() * 4) + 1;
  
  switch (choice) {
    case 1:
      console.log("Viewing profile...");
      break;
    case 2:
      console.log("Opening settings...");
      break;
    case 3:
      console.log("Goodbye!");
      break;
    default:
      console.log("Invalid choice, try again");
  }
} while (choice !== 3);

// Password validation example
let password;
let isValid;

do {
  // Simulate password input
  password = "weak"; // This would come from user input
  isValid = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  
  if (!isValid) {
    console.log("Password must be at least 8 characters with uppercase and number");
  }
} while (!isValid);`
    },
    {
      title: "For...in Loop",
      description: "Iterate over object properties or array indices.",
      code: `// For...in with objects
const person = {
  name: "Alice",
  age: 30,
  city: "New York",
  occupation: "Developer"
};

for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}
// Output: name: Alice, age: 30, city: New York, occupation: Developer

// For...in with arrays (gets indices)
const colors = ["red", "green", "blue"];
for (const index in colors) {
  console.log(\`Index \${index}: \${colors[index]}\`);
}
// Output: Index 0: red, Index 1: green, Index 2: blue

// Checking own properties
const child = Object.create(person);
child.grade = "A";

for (const key in child) {
  if (child.hasOwnProperty(key)) {
    console.log(\`Own property - \${key}: \${child[key]}\`);
  } else {
    console.log(\`Inherited property - \${key}: \${child[key]}\`);
  }
}

// Practical example: Object transformation
const scores = { math: 95, english: 87, science: 92 };
const grades = {};

for (const subject in scores) {
  const score = scores[subject];
  grades[subject] = score >= 90 ? "A" : score >= 80 ? "B" : "C";
}

console.log(grades); // { math: "A", english: "B", science: "A" }

// Filtering object properties
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret123",
  role: "admin"
};

const publicInfo = {};
for (const key in user) {
  if (key !== "password") {
    publicInfo[key] = user[key];
  }
}

console.log(publicInfo); // { id: 1, name: "John", email: "john@example.com", role: "admin" }`
    },
    {
      title: "For...of Loop",
      description: "Iterate over iterable objects like arrays, strings, and more.",
      code: `// For...of with arrays
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
  console.log(fruit);
}
// Output: apple, banana, orange

// For...of with strings
const message = "Hello";
for (const char of message) {
  console.log(char);
}
// Output: H, e, l, l, o

// For...of with array destructuring
const coordinates = [[0, 0], [1, 2], [3, 4]];
for (const [x, y] of coordinates) {
  console.log(\`Point: (\${x}, \${y})\`);
}

// For...of with objects (using Object.entries)
const settings = { theme: "dark", language: "en", notifications: true };
for (const [key, value] of Object.entries(settings)) {
  console.log(\`\${key}: \${value}\`);
}

// For...of with Set
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
for (const number of uniqueNumbers) {
  console.log(number);
}
// Output: 1, 2, 3

// For...of with Map
const userRoles = new Map([
  ["alice", "admin"],
  ["bob", "user"],
  ["charlie", "moderator"]
]);

for (const [username, role] of userRoles) {
  console.log(\`\${username}: \${role}\`);
}

// Getting index with entries()
const items = ["first", "second", "third"];
for (const [index, item] of items.entries()) {
  console.log(\`\${index}: \${item}\`);
}

// For...of with NodeList (DOM elements)
// const buttons = document.querySelectorAll('button');
// for (const button of buttons) {
//   button.addEventListener('click', () => console.log('Clicked!'));
// }`
    },
    {
      title: "Loop Control and Best Practices",
      description: "Break, continue, and choosing the right loop for your needs.",
      code: `// Break statement - exit loop completely
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let firstEven;

for (const num of numbers) {
  if (num % 2 === 0) {
    firstEven = num;
    break; // Exit loop when first even number is found
  }
}
console.log("First even number:", firstEven); // 2

// Continue statement - skip current iteration
const scores = [85, 92, 78, 96, 88, 73];
const passingScores = [];

for (const score of scores) {
  if (score < 80) {
    continue; // Skip scores below 80
  }
  passingScores.push(score);
}
console.log("Passing scores:", passingScores); // [85, 92, 96, 88]

// Labeled breaks for nested loops
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Break out of both loops
    }
    console.log(\`i: \${i}, j: \${j}\`);
  }
}

// Performance considerations
const largeArray = new Array(1000000).fill(0).map((_, i) => i);

// ❌ Inefficient: accessing length property each iteration
console.time("inefficient");
for (let i = 0; i < largeArray.length; i++) {
  // Process item
}
console.timeEnd("inefficient");

// ✅ Efficient: cache length
console.time("efficient");
const length = largeArray.length;
for (let i = 0; i < length; i++) {
  // Process item
}
console.timeEnd("efficient");

// Choosing the right loop
// Use for...of for values
const names = ["Alice", "Bob", "Charlie"];
for (const name of names) {
  console.log(\`Hello, \${name}!\`);
}

// Use for...in for object properties
const config = { host: "localhost", port: 3000, ssl: false };
for (const key in config) {
  console.log(\`\${key}: \${config[key]}\`);
}

// Use traditional for when you need index control
for (let i = 0; i < names.length; i += 2) {
  console.log(\`Every other name: \${names[i]}\`);
}`
    }
  ];

  return (
    <TopicPage
      title="Loops"
      description="Loops allow you to execute code repeatedly. Learn different types of loops: for, while, do-while, for...in, and for...of, along with loop control statements like break and continue."
      examples={examples}
    />
  );
}