import { TopicPage } from '@/components/TopicPage';

export default function ConditionalsPage() {
  const examples = [
    {
      title: "If Statement",
      description: "Execute code based on a condition.",
      code: `// Basic if statement
const age = 18;

if (age >= 18) {
  console.log("You are an adult");
}

// If-else statement
const temperature = 25;

if (temperature > 30) {
  console.log("It's hot outside");
} else {
  console.log("It's not too hot");
}

// If-else if-else chain
const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// Multiple conditions
const user = { age: 25, isActive: true, hasPermission: true };

if (user.age >= 18 && user.isActive && user.hasPermission) {
  console.log("Access granted");
} else {
  console.log("Access denied");
}`
    },
    {
      title: "Switch Statement",
      description: "Execute different code blocks based on different values.",
      code: `// Basic switch statement
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the work week");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Midweek");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Invalid day");
}

// Switch with expressions
const getSeasonMessage = (month) => {
  switch (month) {
    case 12:
    case 1:
    case 2:
      return "Winter season";
    case 3:
    case 4:
    case 5:
      return "Spring season";
    case 6:
    case 7:
    case 8:
      return "Summer season";
    case 9:
    case 10:
    case 11:
      return "Fall season";
    default:
      return "Invalid month";
  }
};

console.log(getSeasonMessage(7)); // "Summer season"

// Switch without break (fall-through)
const processGrade = (grade) => {
  let message = "Grade " + grade + ": ";
  
  switch (grade) {
    case "A":
      message += "Excellent! ";
    case "B":
      message += "Good job! ";
    case "C":
      message += "Keep working! ";
      break;
    case "D":
    case "F":
      message += "Need improvement";
      break;
    default:
      message = "Invalid grade";
  }
  
  return message;
};`
    },
    {
      title: "Truthy and Falsy Values",
      description: "Understanding which values are considered true or false in conditions.",
      code: `// Falsy values in JavaScript
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(0n)); // false (BigInt zero)
console.log(Boolean("")); // false (empty string)
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// Everything else is truthy
console.log(Boolean(true)); // true
console.log(Boolean(1)); // true
console.log(Boolean(-1)); // true
console.log(Boolean("hello")); // true
console.log(Boolean("0")); // true (string with content)
console.log(Boolean([])); // true (empty array)
console.log(Boolean({})); // true (empty object)

// Practical examples
const username = "";
if (username) {
  console.log(\`Welcome, \${username}!\`);
} else {
  console.log("Please enter a username");
}

const items = [];
if (items.length) {
  console.log(\`You have \${items.length} items\`);
} else {
  console.log("Your cart is empty");
}

// Using logical operators for default values
const config = {
  theme: null,
  language: "en"
};

const theme = config.theme || "light"; // "light"
const language = config.language || "en"; // "en"`
    },
    {
      title: "Conditional (Ternary) Operator",
      description: "Shorthand for simple if-else statements.",
      code: `// Basic ternary operator
const age = 20;
const message = age >= 18 ? "Can vote" : "Cannot vote";
console.log(message); // "Can vote"

// Ternary in variable assignment
const user = { premium: true };
const downloadLimit = user.premium ? 1000 : 10;

// Ternary in function returns
const getDiscount = (isMember) => isMember ? 0.1 : 0;

// Nested ternary (use carefully)
const weather = "sunny";
const temperature = 25;
const recommendation = weather === "sunny" 
  ? (temperature > 25 ? "Go to the beach" : "Perfect for a walk")
  : "Stay inside";

// Multiple ternary operators
const score = 85;
const grade = score >= 90 ? "A" : 
              score >= 80 ? "B" : 
              score >= 70 ? "C" : "F";

// Ternary with function calls
const numbers = [1, 2, 3, 4, 5];
const result = numbers.length > 0 
  ? numbers.reduce((sum, num) => sum + num, 0) 
  : 0;

// In object properties
const createUser = (name, isAdmin) => ({
  name,
  role: isAdmin ? "admin" : "user",
  permissions: isAdmin ? ["read", "write", "delete"] : ["read"]
});`
    },
    {
      title: "Short-Circuit Evaluation",
      description: "Using logical operators for conditional execution.",
      code: `// Logical AND (&&) for conditional execution
const user = { name: "Alice", isActive: true };

// Only execute if user exists and is active
user && user.isActive && console.log("User is active");

// Conditional property access
const displayName = user && user.profile && user.profile.displayName;

// Logical OR (||) for default values
const username = user.name || "Guest";
const theme = user.preferences?.theme || "light";

// Nullish coalescing (??) for null/undefined only
const count = 0;
const displayCount1 = count || "No items"; // "No items" (0 is falsy)
const displayCount2 = count ?? "No items"; // 0 (0 is not null/undefined)

// Practical examples
const showWelcomeMessage = (user) => {
  // Short-circuit: only show if user exists
  user && console.log(\`Welcome, \${user.name}!\`);
};

const getCartTotal = (cart) => {
  // Return 0 if cart is empty or doesn't exist
  return cart && cart.items && cart.items.length > 0
    ? cart.items.reduce((total, item) => total + item.price, 0)
    : 0;
};

// Function execution with short-circuit
const isDebugMode = true;
isDebugMode && console.log("Debug: Function executed");

// Conditional method calls
const api = {
  log: (message) => console.log("API:", message)
};

const debugMode = true;
debugMode && api.log && api.log("Debug information");`
    }
  ];

  return (
    <TopicPage
      title="Conditionals"
      description="Control the flow of your program with conditional statements. Learn if-else statements, switch cases, ternary operators, and short-circuit evaluation for making decisions in your code."
      examples={examples}
    />
  );
}