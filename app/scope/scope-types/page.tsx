import { TopicPage } from '@/components/TopicPage';

export default function ScopeTypesPage() {
  const examples = [
    {
      title: "Global Scope",
      description: "Variables declared outside any function or block have global scope.",
      code: `// Global variable
const globalVar = "I'm global";

function accessGlobal() {
  console.log(globalVar); // Accessible anywhere
}

accessGlobal(); // "I'm global"
console.log(globalVar); // "I'm global"

// Pitfall: Global pollution
var anotherGlobal = "This is global too";

function overwriteGlobal() {
  var anotherGlobal = "Local variable"; // Creates a new local variable
  console.log(anotherGlobal); // "Local variable"
}

overwriteGlobal();
console.log(anotherGlobal); // "This is global too"

// Global object (window in browsers)
var windowVar = "I'm on window";
console.log(window.windowVar); // "I'm on window" (in browser environment)

// Avoid global variables in modern JS
const safeGlobal = "Use modules instead";
export { safeGlobal }; // Preferred for modular code`
    },
    {
      title: "Function Scope",
      description: "Variables declared with 'var' inside a function are scoped to that function.",
      code: `function myFunction() {
  var functionScoped = "I'm function scoped";
  console.log(functionScoped); // "I'm function scoped"
}

myFunction();
// console.log(functionScoped); // Error: functionScoped is not defined

// var hoisting
function hoistedExample() {
  console.log(x); // undefined (hoisted, but not initialized)
  var x = 10;
  console.log(x); // 10
}

hoistedExample();

// Function scope with nested functions
function outer() {
  var outerVar = "Outer scope";
  
  function inner() {
    var innerVar = "Inner scope";
    console.log(outerVar); // Accessible: "Outer scope"
    console.log(innerVar); // "Inner scope"
  }
  
  inner();
  // console.log(innerVar); // Error: innerVar is not defined
}

outer();

// var redeclaration in same scope
function redeclare() {
  var x = 1;
  var x = 2; // Allowed with var, redeclares
  console.log(x); // 2
}

redeclare();`
    },
    {
      title: "Block Scope",
      description: "Variables declared with 'let' or 'const' are scoped to the nearest block.",
      code: `// Block scope with let/const
if (true) {
  let blockScoped = "I'm block scoped";
  const constant = "I'm constant";
  console.log(blockScoped); // "I'm block scoped"
  console.log(constant); // "I'm constant"
}
// console.log(blockScoped); // Error: blockScoped is not defined
// console.log(constant); // Error: constant is not defined

// var vs let in loops
for (var i = 0; i < 3; i++) {
  console.log("var:", i); // 0, 1, 2
}
console.log("Outside loop:", i); // 3 (var leaks out)

for (let j = 0; j < 3; j++) {
  console.log("let:", j); // 0, 1, 2
}
// console.log(j); // Error: j is not defined

// Temporal Dead Zone (TDZ)
function tdzExample() {
  // console.log(x); // Error: Cannot access 'x' before initialization
  let x = 5;
  console.log(x); // 5
}

tdzExample();

// Block scope in switch statements
switch (true) {
  case true:
    let caseScoped = "Scoped to case";
    console.log(caseScoped); // "Scoped to case"
    break;
}
// console.log(caseScoped); // Error: caseScoped is not defined`
    },
    {
      title: "Module Scope",
      description: "Variables in ES modules are scoped to the module.",
      code: `// module1.js
const moduleVar = "I'm module scoped";
export function getModuleVar() {
  return moduleVar;
}

// module2.js
import { getModuleVar } from './module1.js';
console.log(getModuleVar()); // "I'm module scoped"
// console.log(moduleVar); // Error: moduleVar is not defined

// Default export with module scope
const config = { apiKey: "xyz123" };
export default config;

// Importing in another module
// import config from './module1.js';
// console.log(config.apiKey); // "xyz123"

// Module scope prevents global pollution
const privateVar = "Not accessible outside module";
export function logPrivate() {
  console.log(privateVar); // "Not accessible outside module"
}

// Immediately Invoked Function Expression (IIFE) for module-like scope
(function() {
  const iifeVar = "Scoped to IIFE";
  console.log(iifeVar); // "Scoped to IIFE"
})();
// console.log(iifeVar); // Error: iifeVar is not defined`
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of different scope types.",
      code: `// Avoiding global scope issues
const app = (function() {
  const state = { count: 0 }; // Private to IIFE
  return {
    increment() {
      state.count++;
      return state.count;
    },
    getCount() {
      return state.count;
    }
  };
})();

console.log(app.increment()); // 1
console.log(app.increment()); // 2
// console.log(app.state); // undefined (state is private)

// Block scope in event handlers
function setupButtons() {
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      console.log(\`Button \${i} clicked\`); // Correct index due to let
    });
  }
}
// setupButtons();

// Function scope for configuration
function createConfig() {
  var settings = { theme: "dark" };
  function updateTheme(newTheme) {
    settings.theme = newTheme;
    return settings;
  }
  return updateTheme;
}

const updateTheme = createConfig();
console.log(updateTheme("light")); // { theme: "light" }

// Module scope for API client
// api.js
const API_KEY = "secret123";
export function fetchData(endpoint) {
  return fetch(\`https://api.example.com\${endpoint}?key=\${API_KEY}\`);
}

// main.js
// import { fetchData } from './api.js';
// fetchData("/users").then(res => res.json()); // API_KEY is private to api.js`
    }
  ];

  return (
    <TopicPage
      title="Scope Types"
      description="Understand JavaScript scope types, including global, function, block, and module scope, and how they control variable visibility and lifetime."
      examples={examples}
    />
  );
}