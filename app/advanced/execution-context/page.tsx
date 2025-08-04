import { TopicPage } from "@/components/TopicPage";

export default function ExecutionContextPage() {
  const examples = [
    {
      title: "Global Execution Context",
      description: "The default context created when JavaScript code runs.",
      code: `// Global execution context
console.log(this === window); // true (in browser)
var globalVar = "I'm global";
console.log(window.globalVar); // "I'm global"

// Global context includes global object and 'this'
function globalFunc() {
  console.log(this === window); // true (non-strict mode)
}
globalFunc();

// Strict mode changes 'this'
"use strict";
function strictFunc() {
  console.log(this); // undefined
}
strictFunc();

// Variable environment
var x = 1;
let y = 2;
const z = 3;
console.log(window.x); // 1
console.log(window.y); // undefined (let/const not on global object)`,
    },
    {
      title: "Function Execution Context",
      description: "Each function call creates a new execution context.",
      code: `function outer() {
  var outerVar = "Outer";
  
  function inner() {
    var innerVar = "Inner";
    console.log(outerVar); // "Outer" (access to outer scope)
    console.log(innerVar); // "Inner"
  }
  
  inner();
  // console.log(innerVar); // Error: innerVar is not defined
}
outer();

// Execution context components
function example() {
  // 1. Variable Environment: var, let, const, function declarations
  var a = 10;
  // 2. Lexical Environment: Outer scope references
  console.log(outerVar); // undefined (hoisted in global context)
  // 3. This Binding: Depends on call context
  console.log(this); // window (non-strict mode)
}
var outerVar = "Global";
example();

// Call stack
function first() {
  console.log("First");
  second();
}
function second() {
  console.log("Second");
}
first();
// Logs: First, Second (stack: global -> first -> second)`,
    },
    {
      title: "This Binding",
      description: "How 'this' is determined in different execution contexts.",
      code: `// Object method
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};
obj.greet(); // "Alice" (this = obj)

// Explicit binding
function greet() {
  console.log(this.name);
}
const person = { name: "Bob" };
greet.call(person); // "Bob" (this = person)

// Constructor context
function Person(name) {
  this.name = name;
}
const alice = new Person("Alice");
console.log(alice.name); // "Alice" (this = new object)

// Arrow function context
const arrowObj = {
  name: "Charlie",
  greet: () => console.log(this.name)
};
arrowObj.greet(); // undefined (this = global/window, not arrowObj)`,
    },
    {
      title: "Practical Examples",
      description: "Real-world scenarios involving execution contexts.",
      code: `// Context in event handlers
const button = {
  text: "Click me",
  handleClick() {
    console.log(this.text); // "Click me" (this = button)
  }
};
// document.getElementById("btn").addEventListener("click", button.handleClick);

// Fix context with bind
const unbound = button.handleClick;
// unbound(); // undefined (this = window)
const bound = button.handleClick.bind(button);
bound(); // "Click me"

// Closure and execution context
function createCounter() {
  let count = 0;
  return function() {
    return count++; // Accesses outer context's count
  };
}
const counter = createCounter();
console.log(counter()); // 0
console.log(counter()); // 1

// Module context
// module.js
export function moduleFunc() {
  console.log(this); // undefined (modules use strict mode)
}
// main.js
// import { moduleFunc } from './module.js';
// moduleFunc(); // undefined`,
    },
    {
      title: "Debugging Execution Contexts",
      description: "Understanding and debugging context-related issues.",
      code: `// Debugging 'this'
function debugThis() {
  console.log(this);
  console.trace(); // Shows call stack
}
debugThis(); // window, stack trace

// Context loss
const obj = {
  name: "Diana",
  greet() {
    console.log(this.name);
  }
};
const unboundGreet = obj.greet;
// unboundGreet(); // undefined (this = window)

// Fix with arrow function
const fixedObj = {
  name: "Eve",
  greet: () => console.log(this.name)
};
fixedObj.greet(); // undefined (this = global)

// Best practice: Explicit context
function explicitGreet(context) {
  console.log(context.name);
}
explicitGreet({ name: "Frank" }); // "Frank"

// Error handling in contexts
function safeCall() {
  try {
    console.log(this.data); // May be undefined
  } catch (e) {
    console.log("Error:", e.message);
  }
}
safeCall(); // "Error: Cannot read property 'data' of undefined"`,
    },
  ];

  return (
    <TopicPage
      title="Execution Context"
      description="Learn about JavaScript execution contexts, including global and function contexts, the call stack, 'this' binding, and how they manage variable scope and execution."
      examples={examples}
    />
  );
}
