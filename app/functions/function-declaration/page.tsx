import { TopicPage } from '@/components/TopicPage';

export default function FunctionDeclarationPage() {
  const examples = [
    {
      title: "Function Declaration vs Expression",
      description: "Different ways to create functions in JavaScript.",
      code: `// Function Declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Function Expression
const greetExpression = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow Function Expression
const greetArrow = (name) => \`Hello, \${name}!\`;

// All three work the same way
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greetExpression("Bob")); // "Hello, Bob!"
console.log(greetArrow("Charlie")); // "Hello, Charlie!"

// Key difference: Hoisting
console.log(hoistedFunction()); // Works! "I'm hoisted"
// console.log(notHoisted()); // Error: Cannot access before initialization

function hoistedFunction() {
  return "I'm hoisted";
}

const notHoisted = function() {
  return "I'm not hoisted";
};`
    },
    {
      title: "Function Parameters and Arguments",
      description: "Working with function inputs and default values.",
      code: `// Basic parameters
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8

// Default parameters (ES6)
function greet(name = "Guest", greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"

// Rest parameters - collect remaining arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Mixed parameters
function createUser(name, age, ...hobbies) {
  return {
    name,
    age,
    hobbies
  };
}

const user = createUser("Alice", 25, "reading", "coding", "hiking");
console.log(user);
// { name: "Alice", age: 25, hobbies: ["reading", "coding", "hiking"] }

// Arguments object (older approach, avoid in modern JS)
function oldStyleSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(oldStyleSum(1, 2, 3)); // 6`
    },
    {
      title: "Return Values and Early Returns",
      description: "How functions return values and control flow.",
      code: `// Basic return
function multiply(a, b) {
  return a * b;
}

// Function without explicit return returns undefined
function noReturn() {
  console.log("This function doesn't return anything");
}

console.log(noReturn()); // undefined

// Early returns for validation
function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // "Error: Division by zero"

// Multiple return points
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// Returning objects
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet: function() {
      return \`Hi, I'm \${this.name}\`;
    }
  };
}

const person = createPerson("Alice", 30);
console.log(person.greet()); // "Hi, I'm Alice"

// Returning functions (higher-order functions)
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12`
    },
    {
      title: "Function Scope and Closures",
      description: "Understanding variable scope within functions.",
      code: `// Function scope
function outerFunction() {
  const outerVariable = "I'm in outer scope";
  
  function innerFunction() {
    const innerVariable = "I'm in inner scope";
    console.log(outerVariable); // Can access outer variable
    console.log(innerVariable); // Can access inner variable
  }
  
  innerFunction();
  // console.log(innerVariable); // Error: innerVariable is not defined
}

outerFunction();

// Closures - inner function remembers outer scope
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
console.log(counter2()); // 1 (separate counter)

// Practical closure example
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      } else {
        return "Insufficient funds";
      }
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120
// console.log(balance); // Error: balance is not accessible`
    },
    {
      title: "Function Methods and Context",
      description: "Using call, apply, and bind to control function context.",
      code: `// Function context (this)
const person = {
  name: "Alice",
  greet: function() {
    return \`Hello, I'm \${this.name}\`;
  }
};

console.log(person.greet()); // "Hello, I'm Alice"

// Losing context
const greetFunction = person.greet;
console.log(greetFunction()); // "Hello, I'm undefined" (this is not person)

// call() - invoke function with specific context
function introduce(age, city) {
  return \`I'm \${this.name}, \${age} years old, from \${city}\`;
}

const user = { name: "Bob" };
console.log(introduce.call(user, 25, "New York"));
// "I'm Bob, 25 years old, from New York"

// apply() - same as call but arguments as array
console.log(introduce.apply(user, [30, "London"]));
// "I'm Bob, 30 years old, from London"

// bind() - create new function with bound context
const boundIntroduce = introduce.bind(user);
console.log(boundIntroduce(35, "Paris"));
// "I'm Bob, 35 years old, from Paris"

// Practical example: Event handlers
const button = {
  text: "Click me",
  handleClick: function() {
    console.log(\`Button "\${this.text}" was clicked\`);
  }
};

// Without bind, 'this' would refer to the button element
// document.getElementById('myButton').addEventListener('click', button.handleClick.bind(button));

// Partial application with bind
function multiply(a, b, c) {
  return a * b * c;
}

const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(3, 4)); // 2 * 3 * 4 = 24

const multiplyByTwoAndThree = multiply.bind(null, 2, 3);
console.log(multiplyByTwoAndThree(4)); // 2 * 3 * 4 = 24`
    }
  ];

  return (
    <TopicPage
      title="Function Declaration"
      description="Functions are reusable blocks of code that perform specific tasks. Learn about function declarations, expressions, parameters, return values, scope, and function methods like call, apply, and bind."
      examples={examples}
    />
  );
}