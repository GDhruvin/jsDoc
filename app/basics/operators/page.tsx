import { TopicPage } from '@/components/TopicPage';

export default function OperatorsPage() {
  const examples = [
    {
      title: "Arithmetic Operators",
      description: "Basic mathematical operations in JavaScript.",
      code: `// Addition
const sum = 5 + 3; // 8
const stringConcat = "Hello" + " World"; // "Hello World"

// Subtraction
const difference = 10 - 4; // 6

// Multiplication
const product = 6 * 7; // 42

// Division
const quotient = 15 / 3; // 5
const decimal = 10 / 3; // 3.3333333333333335

// Modulus (remainder)
const remainder = 17 % 5; // 2
const isEven = 8 % 2 === 0; // true

// Exponentiation (ES2016)
const power = 2 ** 3; // 8
const square = 5 ** 2; // 25

// Increment and Decrement
let counter = 5;
counter++; // Post-increment: counter becomes 6
++counter; // Pre-increment: counter becomes 7
counter--; // Post-decrement: counter becomes 6
--counter; // Pre-decrement: counter becomes 5`
    },
    {
      title: "Assignment Operators",
      description: "Operators that assign values to variables.",
      code: `let x = 10;

// Basic assignment
x = 20;

// Addition assignment
x += 5; // x = x + 5; // 25

// Subtraction assignment
x -= 3; // x = x - 3; // 22

// Multiplication assignment
x *= 2; // x = x * 2; // 44

// Division assignment
x /= 4; // x = x / 4; // 11

// Modulus assignment
x %= 3; // x = x % 3; // 2

// Exponentiation assignment
x **= 3; // x = x ** 3; // 8

// Practical example
let score = 0;
score += 10; // Player gets 10 points
score *= 2;  // Double points bonus
console.log(score); // 20`
    },
    {
      title: "Comparison Operators",
      description: "Operators that compare values and return boolean results.",
      code: `// Equality (with type coercion)
console.log(5 == "5"); // true
console.log(true == 1); // true
console.log(null == undefined); // true

// Strict equality (no type coercion)
console.log(5 === "5"); // false
console.log(true === 1); // false
console.log(null === undefined); // false

// Inequality
console.log(5 != "3"); // true
console.log(5 !== "5"); // true (different types)

// Greater than / Less than
console.log(10 > 5); // true
console.log(3 < 8); // true
console.log(7 >= 7); // true
console.log(4 <= 9); // true

// Comparing strings (lexicographical order)
console.log("apple" < "banana"); // true
console.log("Apple" < "apple"); // true (uppercase comes first)

// Practical examples
const age = 18;
const isAdult = age >= 18; // true

const password = "secret123";
const isValidLength = password.length >= 8; // true`
    },
    {
      title: "Logical Operators",
      description: "Operators that work with boolean values and logical expressions.",
      code: `// AND operator (&&)
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false

// OR operator (||)
console.log(true || false); // true
console.log(false || false); // false
console.log(true || true); // true

// NOT operator (!)
console.log(!true); // false
console.log(!false); // true
console.log(!!true); // true (double negation)

// Short-circuit evaluation
const user = { name: "Alice", age: 25 };

// AND short-circuit: if first is false, second isn't evaluated
user.isActive && console.log("User is active"); // Only logs if isActive is true

// OR short-circuit: if first is true, second isn't evaluated
const displayName = user.name || "Guest"; // "Alice"
const defaultAge = user.age || 18; // 25

// Practical examples
const isLoggedIn = true;
const hasPermission = false;

if (isLoggedIn && hasPermission) {
  console.log("Access granted");
} else {
  console.log("Access denied");
}

// Nullish coalescing operator (??) - ES2020
const username = null;
const defaultUsername = username ?? "Anonymous"; // "Anonymous"

// Different from ||
const count = 0;
const defaultCount1 = count || 10; // 10 (0 is falsy)
const defaultCount2 = count ?? 10; // 0 (0 is not null/undefined)`
    },
    {
      title: "Ternary Operator",
      description: "Conditional operator for inline if-else statements.",
      code: `// Basic ternary syntax: condition ? valueIfTrue : valueIfFalse
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Multiple conditions
const score = 85;
const grade = score >= 90 ? "A" : 
              score >= 80 ? "B" : 
              score >= 70 ? "C" : 
              score >= 60 ? "D" : "F";
console.log(grade); // "B"

// With function calls
const isWeekend = (day) => day === "Saturday" || day === "Sunday";
const today = "Saturday";
const activity = isWeekend(today) ? "relax" : "work";

// Nested ternary (use sparingly)
const weather = "sunny";
const temperature = 25;
const outfit = weather === "sunny" 
  ? (temperature > 20 ? "t-shirt" : "light jacket")
  : "raincoat";

// In JSX (React example)
const UserGreeting = ({ user }) => (
  <div>
    {user ? \`Welcome, \${user.name}!\` : "Please log in"}
  </div>
);

// Practical examples
const items = [1, 2, 3];
const message = items.length > 0 ? \`\${items.length} items\` : "No items";

const user = { premium: true };
const maxDownloads = user.premium ? 100 : 5;`
    }
  ];

  return (
    <TopicPage
      title="Operators"
      description="JavaScript operators perform operations on variables and values. Learn arithmetic, assignment, comparison, logical operators, and the ternary operator for conditional expressions."
      examples={examples}
    />
  );
}