import { TopicPage } from "@/components/TopicPage";

export default function HoistingPage() {
  const examples = [
    {
      title: "Variable Hoisting with var",
      description:
        "How 'var' declarations are hoisted to the top of their scope.",
      code: `// Hoisting with var
console.log(x); // undefined (hoisted, but not initialized)
var x = 10;
console.log(x); // 10

// Equivalent to:
var x; // Declaration hoisted
console.log(x); // undefined
x = 10; // Assignment stays
console.log(x); // 10

// Hoisting in function scope
function example() {
  console.log(y); // undefined
  var y = 20;
}
example();

// Multiple declarations
var z = 1;
var z; // Hoisted, no effect
console.log(z); // 1

// Pitfall: Overwriting
function overwrite() {
  var a = 1;
  var a = 2; // Allowed, hoisted to single declaration
  console.log(a); // 2
}
overwrite();`,
    },
    {
      title: "Function Declaration Hoisting",
      description:
        "Function declarations are fully hoisted, unlike function expressions.",
      code: `// Function declaration
console.log(myFunc()); // "Hello!" (fully hoisted)
function myFunc() {
  return "Hello!";
}

// Function expression
// console.log(myExpr()); // Error: myExpr is not a function
var myExpr = function() {
  return "I'm an expression";
};
console.log(myExpr()); // "I'm an expression"

// Named function expression
var namedExpr = function named() {
  return "Named expression";
};
console.log(namedExpr()); // "Named expression"
// console.log(named()); // Error: named is not defined

// Hoisting precedence
var duplicate = "Variable";
function duplicate() {
  return "Function";
}
console.log(duplicate); // "Variable" (var overwrites function in some environments)`,
    },
    {
      title: "Hoisting with let and const",
      description:
        "let and const are hoisted but not initialized, causing Temporal Dead Zone (TDZ).",
      code: `// let hoisting
// console.log(a); // Error: Cannot access 'a' before initialization
let a = 5;
console.log(a); // 5

// const hoisting
// console.log(b); // Error: Cannot access 'b' before initialization
const b = 10;
console.log(b); // 10

// TDZ in block scope
if (true) {
  // console.log(c); // Error: Cannot access 'c' before initialization
  let c = 15;
  console.log(c); // 15
}

// Function scope with let
function tdzExample() {
  // console.log(x); // Error: Cannot access 'x' before initialization
  let x = 20;
  console.log(x); // 20
}
tdzExample();

// Practical: Safe initialization
function safeAccess() {
  let result;
  if (typeof value === "undefined") {
    result = "No value";
  } else {
    result = value;
  }
  var value = 100; // Hoisted, but undefined
  return result;
}
console.log(safeAccess()); // "No value"`,
    },
    {
      title: "Hoisting in Practice",
      description: "Practical examples and pitfalls of hoisting.",
      code: `// Loop with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 (var is function-scoped)
}

// Fix with let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 (let is block-scoped)
}

// IIFE to capture var
for (var j = 0; j < 3; j++) {
  (function(index) {
    setTimeout(() => console.log(index), 100); // 0, 1, 2
  })(j);
}

// Hoisting in event handlers
function setupButtons() {
  var buttons = document.querySelectorAll(".btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => console.log(i)); // Last i value
  }
}

// Fix with let
function setupButtonsFixed() {
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => console.log(i)); // 0, 1, 2
  }
}

// Best practice: Declare at top
function bestPractice() {
  let x = 10; // Declare first
  console.log(x); // 10
  return x * 2;
}
console.log(bestPractice()); // 20`,
    },
    {
      title: "Best Practices and Avoiding Hoisting Issues",
      description: "How to avoid common hoisting-related bugs.",
      code: `// Avoid var for new code
function avoidVar() {
  let x = 10; // Prefer let/const
  console.log(x); // 10
}
avoidVar();

// Use strict mode to catch errors
"use strict";
function strictMode() {
  undeclared = 5; // Error: undeclared is not defined
  // var undeclared = 5; // Would hoist without strict mode
}
// strictMode();

// Organize code to minimize hoisting confusion
function clearCode() {
  const config = { apiKey: "xyz123" }; // Declare at top
  function fetchData() {
    console.log(config.apiKey); // Clear access
  }
  fetchData();
}
clearCode();

// Module scope to avoid global hoisting
// module.js
const moduleVar = "Safe scope";
export function getVar() {
  return moduleVar;
}

// main.js
// import { getVar } from './module.js';
// console.log(getVar()); // "Safe scope"
// console.log(moduleVar); // Error: moduleVar is not defined`,
    },
  ];

  return (
    <TopicPage
      title="Hoisting"
      description="Understand JavaScript hoisting, where variable and function declarations are moved to the top of their scope, and how it affects var, let, const, and function declarations."
      examples={examples}
    />
  );
}
