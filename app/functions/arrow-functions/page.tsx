import { TopicPage } from '@/components/TopicPage';

export default function ArrowFunctionsPage() {
  const examples = [
    {
      title: "Basic Arrow Function Syntax",
      description: "Different ways to write arrow functions.",
      code: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function - full syntax
const add = (a, b) => {
  return a + b;
};

// Arrow function - concise syntax (implicit return)
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;
const square = (x) => x * x; // Both are valid

// No parameters
const greet = () => "Hello World!";

// Multiple statements
const processData = (data) => {
  const processed = data.map(item => item * 2);
  const filtered = processed.filter(item => item > 10);
  return filtered;
};`
    },
    {
      title: "Arrow Functions vs Regular Functions",
      description: "Key differences in behavior between arrow and regular functions.",
      code: `// 1. 'this' binding difference
const person = {
  name: "Alice",
  
  // Regular function - 'this' refers to person object
  sayHello: function() {
    console.log(\`Hello, I'm \${this.name}\`);
  },
  
  // Arrow function - 'this' refers to surrounding scope
  sayGoodbye: () => {
    console.log(\`Goodbye from \${this.name}\`); // 'this' is undefined or global
  },
  
  // Using arrow function inside method
  delayedGreeting: function() {
    setTimeout(() => {
      console.log(\`Delayed hello from \${this.name}\`); // 'this' still refers to person
    }, 1000);
  }
};

person.sayHello(); // "Hello, I'm Alice"
person.sayGoodbye(); // "Goodbye from undefined"
person.delayedGreeting(); // "Delayed hello from Alice" (after 1 second)`
    },
    {
      title: "Cannot Use as Constructors",
      description: "Arrow functions cannot be used with the 'new' keyword.",
      code: `// Regular function as constructor
function Person(name) {
  this.name = name;
  this.greet = function() {
    return \`Hello, I'm \${this.name}\`;
  };
}

const person1 = new Person("Alice"); // ✅ Works
console.log(person1.greet()); // "Hello, I'm Alice"

// Arrow function cannot be constructor
const PersonArrow = (name) => {
  this.name = name; // 'this' doesn't work as expected
};

// const person2 = new PersonArrow("Bob"); // ❌ TypeError: PersonArrow is not a constructor

// Use arrow functions for callbacks and short functions
const numbers = [1, 2, 3, 4, 5];

// ✅ Perfect for array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);`
    },
    {
      title: "Practical Examples",
      description: "Real-world usage patterns for arrow functions.",
      code: `// Event handlers
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// Array transformations
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

// Chain multiple array methods
const adultNames = users
  .filter(user => user.age >= 30)
  .map(user => user.name.toUpperCase())
  .sort();

console.log(adultNames); // ['BOB', 'CHARLIE']

// Async operations
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

// Higher-order functions
const createMultiplier = (factor) => (number) => number * factor;

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12`
    },
    {
      title: "When to Use Arrow Functions",
      description: "Best practices for choosing between arrow and regular functions.",
      code: `// ✅ Use arrow functions for:

// 1. Short, simple functions
const isEven = n => n % 2 === 0;

// 2. Array methods and callbacks
const processed = data
  .filter(item => item.active)
  .map(item => ({ ...item, processed: true }));

// 3. When you need to preserve 'this' context
class Timer {
  constructor() {
    this.seconds = 0;
  }
  
  start() {
    // Arrow function preserves 'this'
    setInterval(() => {
      this.seconds++;
      console.log(\`Time: \${this.seconds}s\`);
    }, 1000);
  }
}

// ❌ Avoid arrow functions for:

// 1. Object methods (when you need 'this')
const calculator = {
  total: 0,
  // Don't do this
  add: (value) => this.total += value, // 'this' won't work
  
  // Do this instead
  add: function(value) {
    this.total += value;
  }
};

// 2. Event handlers when you need 'this' to refer to the element
// Don't do this
// element.addEventListener('click', () => this.classList.toggle('active'));

// Do this instead
// element.addEventListener('click', function() { this.classList.toggle('active'); });`
    }
  ];

  return (
    <TopicPage
      title="Arrow Functions"
      description="Arrow functions provide a more concise syntax for writing functions in JavaScript. They have different behavior regarding 'this' binding and cannot be used as constructors."
      examples={examples}
    />
  );
}