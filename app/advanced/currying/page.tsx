import { TopicPage } from "@/components/TopicPage";

export default function CurryingPage() {
  const examples = [
    {
      title: "Basic Currying",
      description: "Transforming a function to take arguments one at a time.",
      code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

// Simple curried function
const add = curry((a, b, c) => a + b + c);
console.log(add(1, 2, 3)); // 6
console.log(add(1)(2, 3)); // 6
console.log(add(1)(2)(3)); // 6

// Partial application
const add5 = add(5);
console.log(add5(2, 3)); // 10
console.log(add5(2)(3)); // 10`,
    },
    {
      title: "Currying with Multiple Arguments",
      description: "Handling functions with variable arguments.",
      code: `// Curried string formatter
const formatString = curry((template, ...values) => {
  return template.replace(/{}/g, () => values.shift());
});

const greet = formatString("Hello, {} from {}!");
console.log(greet("Alice", "New York")); // "Hello, Alice from New York!"
console.log(greet("Alice")("New York")); // "Hello, Alice from New York!"

// Curried API call
const apiCall = curry((baseUrl, endpoint, params) => {
  return fetch(\`\${baseUrl}\${endpoint}?params=\${JSON.stringify(params)}\`);
});

const api = apiCall("https://api.example.com");
const usersApi = api("/users");
usersApi({ limit: 10 }); // Fetch call with params`,
    },
    {
      title: "Currying with Function Composition",
      description: "Combining currying with function composition.",
      code: `// Compose function
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

// Curried functions
const add = curry((a, b) => a + b);
const multiply = curry((a, b) => a * b);

const addThenMultiply = compose(multiply(2), add(5));
console.log(addThenMultiply(3)); // (3 + 5) * 2 = 16

// Practical: Data transformation
const formatUser = curry((prefix, user) => \`\${prefix}: \${user.name}\`);
const uppercase = (str) => str.toUpperCase();
const processUser = compose(uppercase, formatUser("User"));
console.log(processUser({ name: "Alice" })); // "USER: ALICE"`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of currying.",
      code: `// Logger with currying
const log = curry((level, timestamp, message) => {
  console.log(\`[\${timestamp}] [\${level}]: \${message}\`);
});

const infoLog = log("INFO")(new Date().toISOString());
infoLog("App started"); // "[timestamp] [INFO]: App started"
infoLog("User logged in"); // "[timestamp] [INFO]: User logged in"

// Event handler factory
const handleEvent = curry((type, callback, event) => {
  console.log(\`Handling \${type}: \${event.target.value}\`);
  callback(event);
});

const inputHandler = handleEvent("input", (e) => console.log(e.target.value));
// document.getElementById("input").addEventListener("input", inputHandler);

// Curried configuration
const configure = curry((env, settings, app) => {
  return { ...app, env, settings };
});

const devConfig = configure("development")({ debug: true });
console.log(devConfig({ name: "MyApp" }));
// { name: "MyApp", env: "development", settings: { debug: true } }`,
    },
    {
      title: "Best Practices and Limitations",
      description: "Using currying effectively and avoiding pitfalls.",
      code: `// Avoid over-currying for readability
const overCurried = curry((a, b, c, d, e) => a + b + c + d + e);
console.log(overCurried(1)(2)(3)(4)(5)); // 15
// Better: const simpleAdd = (a, b, c, d, e) => a + b + c + d + e;

// Handle variable arguments
function curryFlexible(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

const sumAll = curryFlexible((...nums) => nums.reduce((sum, n) => sum + n, 0));
console.log(sumAll(1)(2)(3)); // 6
console.log(sumAll(1, 2, 3)); // 6

// Debugging curried functions
const debugLog = curry((level, message) => {
  console.log(\`[\${level}]: \${message}\`);
  console.trace();
});
const errorLog = debugLog("ERROR");
errorLog("Something went wrong"); // Logs with stack trace`,
    },
  ];

  return (
    <TopicPage
      title="Currying"
      description="Explore currying in JavaScript, a functional programming technique to transform functions into a sequence of single-argument functions for flexible and reusable code."
      examples={examples}
    />
  );
}
