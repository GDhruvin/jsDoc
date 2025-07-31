import { TopicPage } from '@/components/TopicPage';

export default function CallApplyBindPage() {
  const examples = [
    {
      title: "Understanding 'this' Context",
      description: "How 'this' works in different contexts and why we need call, apply, and bind.",
      code: `// 'this' in different contexts
const person = {
  name: "Alice",
  greet: function() {
    return \`Hello, I'm \${this.name}\`;
  }
};

console.log(person.greet()); // "Hello, I'm Alice"

// Losing context when assigning to variable
const greetFunction = person.greet;
console.log(greetFunction()); // "Hello, I'm undefined" (this is not person)

// 'this' in regular functions vs arrow functions
const obj = {
  name: "Bob",
  regularFunction: function() {
    console.log("Regular function this:", this.name);
  },
  arrowFunction: () => {
    console.log("Arrow function this:", this.name); // 'this' refers to global scope
  },
  nestedExample: function() {
    console.log("Outer this:", this.name);
    
    // Regular function loses context
    setTimeout(function() {
      console.log("setTimeout regular function this:", this.name); // undefined
    }, 100);
    
    // Arrow function preserves context
    setTimeout(() => {
      console.log("setTimeout arrow function this:", this.name); // "Bob"
    }, 200);
  }
};

obj.regularFunction(); // "Regular function this: Bob"
obj.arrowFunction(); // "Arrow function this: undefined"
obj.nestedExample();`
    },
    {
      title: "call() Method",
      description: "Invoke a function with a specific 'this' value and individual arguments.",
      code: `// Basic call() usage
function introduce(age, city) {
  return \`Hi, I'm \${this.name}, \${age} years old, from \${city}\`;
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

// Call function with different contexts
console.log(introduce.call(person1, 25, "New York"));
// "Hi, I'm Alice, 25 years old, from New York"

console.log(introduce.call(person2, 30, "London"));
// "Hi, I'm Bob, 30 years old, from London"

// Using call() to borrow methods
const calculator = {
  numbers: [1, 2, 3, 4, 5],
  sum: function() {
    return this.numbers.reduce((total, num) => total + num, 0);
  }
};

const anotherObject = {
  numbers: [10, 20, 30]
};

// Borrow the sum method
console.log(calculator.sum.call(anotherObject)); // 60

// call() with array-like objects
function processArguments() {
  // Convert arguments to real array using call()
  const args = Array.prototype.slice.call(arguments);
  return args.map(arg => arg * 2);
}

console.log(processArguments(1, 2, 3, 4)); // [2, 4, 6, 8]

// Practical example: Method chaining with call()
const validator = {
  isRequired: function(value) {
    if (!value) {
      throw new Error(\`\${this.field} is required\`);
    }
    return this;
  },
  minLength: function(value, min) {
    if (value.length < min) {
      throw new Error(\`\${this.field} must be at least \${min} characters\`);
    }
    return this;
  }
};

function validateField(field, value) {
  const context = { field };
  validator.isRequired.call(context, value);
  validator.minLength.call(context, value, 3);
  return "Valid!";
}

console.log(validateField("username", "alice")); // "Valid!"`
    },
    {
      title: "apply() Method",
      description: "Invoke a function with a specific 'this' value and arguments as an array.",
      code: `// Basic apply() usage
function introduce(age, city, country) {
  return \`Hi, I'm \${this.name}, \${age} years old, from \${city}, \${country}\`;
}

const person = { name: "Charlie" };
const details = [28, "Paris", "France"];

// apply() takes arguments as an array
console.log(introduce.apply(person, details));
// "Hi, I'm Charlie, 28 years old, from Paris, France"

// Compare with call()
console.log(introduce.call(person, 28, "Paris", "France")); // Same result

// Finding max/min in arrays using apply()
const numbers = [5, 2, 8, 1, 9, 3];

// Math.max expects individual arguments, not an array
console.log(Math.max.apply(null, numbers)); // 9
console.log(Math.min.apply(null, numbers)); // 1

// Modern alternative with spread operator
console.log(Math.max(...numbers)); // 9 (ES6 way)

// apply() with array methods
const arrays = [[1, 2], [3, 4], [5, 6]];

// Flatten arrays using apply()
const flattened = [].concat.apply([], arrays);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Modern alternative
const modernFlattened = arrays.flat();
console.log(modernFlattened); // [1, 2, 3, 4, 5, 6]

// Practical example: Dynamic function calls
const operations = {
  add: function(...nums) {
    return nums.reduce((sum, num) => sum + num, 0);
  },
  multiply: function(...nums) {
    return nums.reduce((product, num) => product * num, 1);
  }
};

function calculate(operation, numbers) {
  if (operations[operation]) {
    return operations[operation].apply(null, numbers);
  }
  throw new Error("Unknown operation");
}

console.log(calculate("add", [1, 2, 3, 4])); // 10
console.log(calculate("multiply", [2, 3, 4])); // 24

// apply() for constructor functions
function Person(name, age) {
  this.name = name;
  this.age = age;
}

function createPerson(args) {
  // Create new instance with apply()
  return new (Person.bind.apply(Person, [null].concat(args)))();
}

const personData = ["David", 35];
const newPerson = createPerson(personData);
console.log(newPerson); // Person { name: "David", age: 35 }`
    },
    {
      title: "bind() Method",
      description: "Create a new function with a permanently bound 'this' value.",
      code: `// Basic bind() usage
const person = {
  name: "Emma",
  greet: function(greeting) {
    return \`\${greeting}, I'm \${this.name}\`;
  }
};

// Create bound function
const boundGreet = person.greet.bind(person);
console.log(boundGreet("Hello")); // "Hello, I'm Emma"

// bind() preserves context even when assigned
const greetFunction = person.greet;
console.log(greetFunction("Hi")); // "Hi, I'm undefined"

const boundFunction = person.greet.bind(person);
console.log(boundFunction("Hi")); // "Hi, I'm Emma"

// Partial application with bind()
function multiply(a, b, c) {
  return a * b * c;
}

// Pre-fill first argument
const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(3, 4)); // 2 * 3 * 4 = 24

// Pre-fill first two arguments
const multiplyByTwoAndThree = multiply.bind(null, 2, 3);
console.log(multiplyByTwoAndThree(4)); // 2 * 3 * 4 = 24

// Event handlers with bind()
const button = {
  text: "Click me!",
  clickCount: 0,
  handleClick: function() {
    this.clickCount++;
    console.log(\`"\${this.text}" clicked \${this.clickCount} times\`);
  }
};

// Without bind, 'this' would refer to the button element
// document.getElementById('myButton').addEventListener('click', button.handleClick.bind(button));

// Practical example: Method binding for callbacks
class Timer {
  constructor(name) {
    this.name = name;
    this.seconds = 0;
  }
  
  tick() {
    this.seconds++;
    console.log(\`\${this.name}: \${this.seconds} seconds\`);
  }
  
  start() {
    // Without bind, 'this' would be lost in setInterval
    setInterval(this.tick.bind(this), 1000);
  }
}

const timer = new Timer("MyTimer");
// timer.start(); // Would log: "MyTimer: 1 seconds", "MyTimer: 2 seconds", etc.

// bind() with arrow functions (doesn't work as expected)
const obj = {
  name: "Test",
  arrowMethod: () => {
    return \`Arrow: \${this.name}\`;
  },
  regularMethod: function() {
    return \`Regular: \${this.name}\`;
  }
};

const boundArrow = obj.arrowMethod.bind(obj);
const boundRegular = obj.regularMethod.bind(obj);

console.log(boundArrow()); // "Arrow: undefined" (arrow functions ignore bind)
console.log(boundRegular()); // "Regular: Test"`
    },
    {
      title: "Practical Examples and Comparisons",
      description: "Real-world usage patterns and when to use each method.",
      code: `// Example 1: Array method borrowing
const arrayLike = {
  0: "a",
  1: "b", 
  2: "c",
  length: 3
};

// Borrow array methods
const result = Array.prototype.map.call(arrayLike, item => item.toUpperCase());
console.log(result); // ["A", "B", "C"]

// Convert to real array
const realArray = Array.prototype.slice.call(arrayLike);
console.log(realArray); // ["a", "b", "c"]

// Modern alternatives
const modernArray = Array.from(arrayLike);
const spreadArray = [...arrayLike]; // Only works with iterables

// Example 2: Function composition
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Create specialized functions
const addFive = add.bind(null, 5);
const double = multiply.bind(null, 2);

console.log(addFive(3)); // 8
console.log(double(4)); // 8

// Example 3: Method delegation
const logger = {
  prefix: "[LOG]",
  log: function(level, message) {
    console.log(\`\${this.prefix} \${level}: \${message}\`);
  }
};

const errorLogger = {
  prefix: "[ERROR]"
};

// Delegate method with different context
logger.log.call(errorLogger, "CRITICAL", "System failure");
// "[ERROR] CRITICAL: System failure"

// Example 4: When to use each method
// Use call() when you know the arguments at call time
function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}

const user = { name: "Alice" };
console.log(greet.call(user, "Hello", "!")); // "Hello, Alice!"

// Use apply() when arguments are in an array
const args = ["Hi", "?"];
console.log(greet.apply(user, args)); // "Hi, Alice?"

// Use bind() when you need a reusable function with fixed context
const boundGreet = greet.bind(user);
console.log(boundGreet("Hey", ".")); // "Hey, Alice."

// Performance considerations
const obj = { value: 42 };
function getValue() { return this.value; }

// bind() creates a new function (memory overhead)
const boundGetValue = getValue.bind(obj);

// call() and apply() invoke immediately (no new function created)
const result1 = getValue.call(obj);
const result2 = getValue.apply(obj);`
    }
  ];

  return (
    <TopicPage
      title="Call, Apply, Bind"
      description="Master function context control in JavaScript. Learn how call(), apply(), and bind() methods allow you to set the 'this' value explicitly and create flexible, reusable functions."
      examples={examples}
    />
  );
}