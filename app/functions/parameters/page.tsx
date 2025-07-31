import { TopicPage } from '@/components/TopicPage';

export default function ParametersPage() {
  const examples = [
    {
      title: "Basic Parameters and Arguments",
      description: "Understanding the difference between parameters and arguments.",
      code: `// Parameters are variables in function definition
// Arguments are actual values passed when calling function

function greet(name, age) { // name and age are parameters
  return \`Hello \${name}, you are \${age} years old\`;
}

// "Alice" and 25 are arguments
console.log(greet("Alice", 25)); // "Hello Alice, you are 25 years old"

// More arguments than parameters
console.log(greet("Bob", 30, "extra")); // "Hello Bob, you are 30 years old"
// Extra argument is ignored

// Fewer arguments than parameters
console.log(greet("Charlie")); // "Hello Charlie, you are undefined years old"

// Checking for undefined parameters
function safeGreet(name, age) {
  if (name === undefined) {
    return "Name is required";
  }
  if (age === undefined) {
    return \`Hello \${name}, age not provided\`;
  }
  return \`Hello \${name}, you are \${age} years old\`;
}

console.log(safeGreet()); // "Name is required"
console.log(safeGreet("David")); // "Hello David, age not provided"`
    },
    {
      title: "Default Parameters",
      description: "Setting default values for function parameters.",
      code: `// ES6 default parameters
function createUser(name = "Guest", role = "user", active = true) {
  return { name, role, active };
}

console.log(createUser()); 
// { name: "Guest", role: "user", active: true }

console.log(createUser("Alice")); 
// { name: "Alice", role: "user", active: true }

console.log(createUser("Bob", "admin")); 
// { name: "Bob", role: "admin", active: true }

// Default parameters with expressions
function greetWithTime(name, timeOfDay = new Date().getHours() < 12 ? "morning" : "afternoon") {
  return \`Good \${timeOfDay}, \${name}!\`;
}

// Default parameters can reference other parameters
function createRectangle(width = 1, height = width) {
  return { width, height, area: width * height };
}

console.log(createRectangle()); // { width: 1, height: 1, area: 1 }
console.log(createRectangle(5)); // { width: 5, height: 5, area: 25 }
console.log(createRectangle(4, 3)); // { width: 4, height: 3, area: 12 }

// Default parameters with functions
function log(message, level = "info", timestamp = () => new Date().toISOString()) {
  console.log(\`[\${timestamp()}] \${level.toUpperCase()}: \${message}\`);
}

log("Application started");
log("Error occurred", "error");

// Skipping parameters with undefined
function processOrder(id, priority = "normal", rush = false) {
  return \`Order \${id}: \${priority} priority\${rush ? " (RUSH)" : ""}\`;
}

console.log(processOrder(123, undefined, true)); 
// "Order 123: normal priority (RUSH)"`
    },
    {
      title: "Rest Parameters",
      description: "Collecting multiple arguments into an array.",
      code: `// Rest parameters with ...
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum()); // 0

// Rest parameters with other parameters
function createMessage(type, ...parts) {
  return \`[\${type.toUpperCase()}] \${parts.join(" ")}\`;
}

console.log(createMessage("info", "User", "logged", "in"));
// "[INFO] User logged in"

// Rest parameters in arrow functions
const multiply = (...nums) => nums.reduce((product, num) => product * num, 1);
console.log(multiply(2, 3, 4)); // 24

// Practical example: flexible function arguments
function createTeam(teamName, captain, ...members) {
  return {
    name: teamName,
    captain: captain,
    members: members,
    totalSize: members.length + 1 // +1 for captain
  };
}

const team = createTeam("Developers", "Alice", "Bob", "Charlie", "Diana");
console.log(team);
// {
//   name: "Developers",
//   captain: "Alice", 
//   members: ["Bob", "Charlie", "Diana"],
//   totalSize: 4
// }

// Rest parameters vs arguments object
function oldWay() {
  // arguments is array-like but not a real array
  const args = Array.from(arguments);
  return args.reduce((sum, num) => sum + num, 0);
}

function newWay(...args) {
  // args is a real array
  return args.reduce((sum, num) => sum + num, 0);
}

console.log(oldWay(1, 2, 3)); // 6
console.log(newWay(1, 2, 3)); // 6`
    },
    {
      title: "Destructuring Parameters",
      description: "Extracting values from objects and arrays in parameters.",
      code: `// Object destructuring in parameters
function createProfile({ name, age, email, city = "Unknown" }) {
  return \`\${name} (\${age}) from \${city} - Contact: \${email}\`;
}

const user = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  city: "New York"
};

console.log(createProfile(user));
// "Alice (30) from New York - Contact: alice@example.com"

// With default values
console.log(createProfile({ name: "Bob", age: 25, email: "bob@example.com" }));
// "Bob (25) from Unknown - Contact: bob@example.com"

// Array destructuring in parameters
function processCoordinates([x, y, z = 0]) {
  return \`Point at (\${x}, \${y}, \${z})\`;
}

console.log(processCoordinates([10, 20])); // "Point at (10, 20, 0)"
console.log(processCoordinates([5, 15, 25])); // "Point at (5, 15, 25)"

// Nested destructuring
function processUser({ 
  name, 
  contact: { email, phone }, 
  preferences: { theme = "light", notifications = true } = {} 
}) {
  return {
    name,
    email,
    phone,
    theme,
    notifications
  };
}

const userData = {
  name: "Charlie",
  contact: {
    email: "charlie@example.com",
    phone: "123-456-7890"
  },
  preferences: {
    theme: "dark"
  }
};

console.log(processUser(userData));
// { name: "Charlie", email: "charlie@example.com", phone: "123-456-7890", theme: "dark", notifications: true }

// Rest with destructuring
function analyzeScores({ name, ...scores }) {
  const subjects = Object.keys(scores);
  const average = Object.values(scores).reduce((sum, score) => sum + score, 0) / subjects.length;
  
  return {
    student: name,
    subjects,
    average: Math.round(average)
  };
}

const studentData = {
  name: "Diana",
  math: 95,
  english: 87,
  science: 92,
  history: 89
};

console.log(analyzeScores(studentData));
// { student: "Diana", subjects: ["math", "english", "science", "history"], average: 91 }`
    },
    {
      title: "Advanced Parameter Patterns",
      description: "Complex parameter handling and validation.",
      code: `// Parameter validation
function createAccount(username, email, options = {}) {
  // Validate required parameters
  if (!username || typeof username !== 'string') {
    throw new Error('Username is required and must be a string');
  }
  
  if (!email || !email.includes('@')) {
    throw new Error('Valid email is required');
  }
  
  // Destructure options with defaults
  const {
    role = 'user',
    active = true,
    notifications = true,
    theme = 'light'
  } = options;
  
  return {
    username,
    email,
    role,
    active,
    notifications,
    theme,
    createdAt: new Date()
  };
}

// Usage
try {
  const account = createAccount("alice", "alice@example.com", {
    role: "admin",
    theme: "dark"
  });
  console.log(account);
} catch (error) {
  console.error(error.message);
}

// Function overloading simulation
function processData(...args) {
  if (args.length === 1 && typeof args[0] === 'string') {
    // Single string argument
    return \`Processing text: \${args[0]}\`;
  } else if (args.length === 1 && Array.isArray(args[0])) {
    // Single array argument
    return \`Processing array of \${args[0].length} items\`;
  } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
    // String and options object
    const [text, options] = args;
    return \`Processing "\${text}" with options: \${JSON.stringify(options)}\`;
  } else {
    return 'Unknown parameter combination';
  }
}

console.log(processData("hello")); // "Processing text: hello"
console.log(processData([1, 2, 3])); // "Processing array of 3 items"
console.log(processData("test", { format: "json" })); // "Processing "test" with options: {"format":"json"}"

// Currying with parameters
function createApiCall(baseUrl) {
  return function(endpoint) {
    return function(options = {}) {
      const url = \`\${baseUrl}\${endpoint}\`;
      return \`Making request to \${url} with options: \${JSON.stringify(options)}\`;
    };
  };
}

const apiCall = createApiCall("https://api.example.com");
const getUsersCall = apiCall("/users");
console.log(getUsersCall({ limit: 10 }));
// "Making request to https://api.example.com/users with options: {"limit":10}"`
    }
  ];

  return (
    <TopicPage
      title="Parameters"
      description="Master function parameters in JavaScript: basic parameters, default values, rest parameters, destructuring, and advanced parameter patterns for flexible and robust functions."
      examples={examples}
    />
  );
}