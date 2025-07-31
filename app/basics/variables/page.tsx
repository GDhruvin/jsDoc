import { TopicPage } from '@/components/TopicPage';

export default function VariablesPage() {
  const examples = [
    {
      title: "Variable Declarations",
      description: "Different ways to declare variables in JavaScript.",
      code: `// var - Function scoped, can be redeclared
var name = "John";
var name = "Jane"; // No error

// let - Block scoped, cannot be redeclared
let age = 25;
// let age = 30; // Error: Identifier 'age' has already been declared

// const - Block scoped, cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // Error: Assignment to constant variable`
    },
    {
      title: "Scope Differences",
      description: "Understanding how var, let, and const behave in different scopes.",
      code: `function scopeExample() {
  if (true) {
    var varVariable = "I'm function scoped";
    let letVariable = "I'm block scoped";
    const constVariable = "I'm also block scoped";
  }
  
  console.log(varVariable); // "I'm function scoped"
  // console.log(letVariable); // ReferenceError
  // console.log(constVariable); // ReferenceError
}

scopeExample();`
    },
    {
      title: "Hoisting Behavior",
      description: "How different variable declarations are hoisted.",
      code: `console.log(hoistedVar); // undefined (not an error)
// console.log(hoistedLet); // ReferenceError
// console.log(hoistedConst); // ReferenceError

var hoistedVar = "I'm hoisted";
let hoistedLet = "I'm not hoisted";
const hoistedConst = "I'm also not hoisted";

// What actually happens with var:
// var hoistedVar; // undefined
// console.log(hoistedVar);
// hoistedVar = "I'm hoisted";`
    },
    {
      title: "Best Practices",
      description: "Modern JavaScript variable declaration recommendations.",
      code: `// ✅ Use const by default
const userName = "Alice";
const users = ["Alice", "Bob", "Charlie"];

// ✅ Use let when you need to reassign
let counter = 0;
counter += 1;

// ❌ Avoid var in modern JavaScript
// var oldStyle = "Don't use this";

// ✅ Declare variables at the top of their scope
function calculateTotal(items) {
  const taxRate = 0.08;
  let subtotal = 0;
  let total = 0;
  
  // Processing logic here
  for (const item of items) {
    subtotal += item.price;
  }
  
  total = subtotal * (1 + taxRate);
  return total;
}`
    }
  ];

  return (
    <TopicPage
      title="Variables (var, let, const)"
      description="Learn about the three ways to declare variables in JavaScript: var, let, and const. Understand their differences in scope, hoisting, and when to use each one."
      examples={examples}
    />
  );
}