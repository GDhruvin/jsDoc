import { TopicPage } from '@/components/TopicPage';

export default function ClosuresPage() {
  const examples = [
    {
      title: "Basic Closures",
      description: "How functions retain access to their outer scope variables.",
      code: `// Basic closure
function outer() {
  const outerVar = "I'm from outer scope";
  
  function inner() {
    console.log(outerVar); // Accesses outerVar from outer scope
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // "I'm from outer scope"

// Closure with counter
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (independent counter)

// Closure retains multiple variables
function createGreeter(greeting) {
  const prefix = greeting.toUpperCase();
  
  return function(name) {
    return \`\${prefix}, \${name}!\`;
  };
}

const sayHello = createGreeter("hello");
console.log(sayHello("Alice")); // "HELLO, Alice!"
console.log(sayHello("Bob")); // "HELLO, Bob!"`
    },
    {
      title: "Closures and State",
      description: "Using closures to maintain private state.",
      code: `// Private state with closure
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120
// console.log(account.balance); // undefined (balance is private)

// Multiple accounts
const account2 = createBankAccount(200);
console.log(account2.deposit(100)); // 300
console.log(account.getBalance()); // 120 (independent state)`
    },
    {
      title: "Closures in Loops",
      description: "Solving common loop issues with closures.",
      code: `// Problem with var in loops
function createButtons() {
  for (var i = 0; i < 3; i++) {
    document.createElement("button").addEventListener("click", () => {
      console.log(i); // Always logs 3 (shared i)
    });
  }
}

// Solution with closure
function createButtonsFixed() {
  for (var i = 0; i < 3; i++) {
    (function(index) {
      document.createElement("button").addEventListener("click", () => {
        console.log(index); // Logs 0, 1, 2
      });
    })(i);
  }
}

// Modern solution with let
function createButtonsModern() {
  for (let i = 0; i < 3; i++) {
    document.createElement("button").addEventListener("click", () => {
      console.log(i); // Logs 0, 1, 2 (block scope)
    });
  }
}

// Practical example: Delayed execution
function createDelayedLoggers() {
  const loggers = [];
  for (let i = 0; i < 3; i++) {
    loggers.push(() => console.log(\`Logger \${i}\`));
  }
  return loggers;
}

const loggers = createDelayedLoggers();
loggers[0](); // "Logger 0"
loggers[1](); // "Logger 1"
loggers[2](); // "Logger 2"`
    },
    {
      title: "Closures with Callbacks",
      description: "Using closures in asynchronous operations and callbacks.",
      code: `// Closure in setTimeout
function createTimer(name) {
  let seconds = 0;
  
  return function() {
    seconds++;
    console.log(\`\${name}: \${seconds} seconds\`);
  };
}

const timer1 = createTimer("Timer 1");
const timer2 = createTimer("Timer 2");
setInterval(timer1, 1000); // "Timer 1: 1 seconds", "Timer 1: 2 seconds", ...
setInterval(timer2, 1000); // "Timer 2: 1 seconds", "Timer 2: 2 seconds", ...

// Closure in event handlers
function createButtonHandler(id) {
  const count = 0;
  
  return function() {
    console.log(\`Button \${id} clicked \${count + 1} times\`);
  };
}

const button1 = createButtonHandler(1);
// document.getElementById("btn1").addEventListener("click", button1);

// Async closure with fetch
function createApiCaller(baseUrl) {
  const cache = new Map();
  
  return async function(endpoint) {
    if (cache.has(endpoint)) {
      return cache.get(endpoint);
    }
    const response = await fetch(\`\${baseUrl}\${endpoint}\`);
    const data = await response.json();
    cache.set(endpoint, data);
    return data;
  };
}

const apiCaller = createApiCaller("https://api.example.com");
// apiCaller("/users").then(data => console.log(data));`
    },
    {
      title: "Practical Examples and Best Practices",
      description: "Real-world applications and tips for using closures effectively.",
      code: `// Memoization with closure
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((a, b) => {
  console.log("Calculating...");
  return a + b;
});

console.log(expensiveCalc(2, 3)); // "Calculating...", 5
console.log(expensiveCalc(2, 3)); // 5 (cached)

// Private methods with closure
const counterModule = (function() {
  let count = 0;
  
  function privateIncrement() {
    count++;
  }
  
  return {
    increment() {
      privateIncrement();
      return count;
    },
    getCount() {
      return count;
    }
  };
})();

console.log(counterModule.increment()); // 1
console.log(counterModule.getCount()); // 1
// console.log(counterModule.count); // undefined

// Avoiding memory leaks
function createHeavyClosure() {
  const largeArray = new Array(1000000).fill(0); // Large memory usage
  
  return function() {
    return largeArray.length;
  };
}

const heavyFunc = createHeavyClosure();
// Keep reference to heavyFunc, preventing garbage collection
// Better: let heavyFunc = null when done

// Best practice: Clear closure references
function createTempClosure() {
  const tempData = "Temporary data";
  return () => console.log(tempData);
}

let tempFunc = createTempClosure();
tempFunc(); // "Temporary data"
tempFunc = null; // Allow garbage collection`
    }
  ];

  return (
    <TopicPage
      title="Closures"
      description="Explore JavaScript closures, which allow functions to retain access to their outer scope variables, enabling private state, memoization, and flexible callback patterns."
      examples={examples}
    />
  );
}