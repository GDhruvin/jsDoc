import { TopicPage } from '@/components/TopicPage';

export default function ObjectBasicsPage() {
  const examples = [
    {
      title: "Creating Objects",
      description: "Different ways to create objects in JavaScript.",
      code: `// Object literal syntax
const person = {
  name: "Alice",
  age: 25,
  city: "New York"
};
console.log(person); // { name: "Alice", age: 25, city: "New York" }

// Using Object constructor
const person2 = new Object();
person2.name = "Bob";
person2.age = 30;
console.log(person2); // { name: "Bob", age: 30 }

// Using Object.create()
const person3 = Object.create({ role: "user" });
person3.name = "Charlie";
console.log(person3.name); // "Charlie"
console.log(person3.role); // "user" (inherited)

// Shorthand property names (ES6+)
const name = "Diana";
const age = 35;
const person4 = { name, age };
console.log(person4); // { name: "Diana", age: 35 }

// Computed property names
const propName = "status";
const dynamicObject = {
  [propName]: "active"
};
console.log(dynamicObject); // { status: "active" }`
    },
    {
      title: "Accessing and Modifying Properties",
      description: "How to get and set object properties.",
      code: `const user = {
  name: "Emma",
  age: 28,
  isActive: true
};

// Dot notation
console.log(user.name); // "Emma"
user.age = 29;
console.log(user.age); // 29

// Bracket notation
console.log(user["isActive"]); // true
user["name"] = "Frank";
console.log(user["name"]); // "Frank"

// Dynamic property access
const key = "age";
console.log(user[key]); // 29

// Adding new properties
user.email = "emma@example.com";
console.log(user); // { name: "Frank", age: 29, isActive: true, email: "emma@example.com" }

// Deleting properties
delete user.isActive;
console.log(user); // { name: "Frank", age: 29, email: "emma@example.com" }

// Checking property existence
console.log("name" in user); // true
console.log(user.hasOwnProperty("email")); // true
console.log(user.hasOwnProperty("role")); // false`
    },
    {
      title: "Objects as References",
      description: "Understanding how objects are passed by reference.",
      code: `// Objects are references
const obj1 = { value: 10 };
const obj2 = obj1; // Reference to same object
obj2.value = 20;
console.log(obj1.value); // 20 (obj1 and obj2 point to the same object)

// Copying objects (shallow copy)
const obj3 = { value: 10, nested: { count: 1 } };
const shallowCopy = { ...obj3 };
shallowCopy.value = 15;
console.log(obj3.value); // 10 (original unchanged)
shallowCopy.nested.count = 2;
console.log(obj3.nested.count); // 2 (nested object is still shared)

// Deep copying (simple example)
const deepCopy = JSON.parse(JSON.stringify(obj3));
deepCopy.nested.count = 3;
console.log(obj3.nested.count); // 2 (original unchanged)

// Comparing objects
const obj4 = { name: "Alice" };
const obj5 = { name: "Alice" };
console.log(obj4 === obj5); // false (different references)
console.log(JSON.stringify(obj4) === JSON.stringify(obj5)); // true (same content)`
    },
    {
      title: "Object Properties and Methods",
      description: "Defining methods and computed properties in objects.",
      code: `const calculator = {
  x: 5,
  y: 10,
  // Method shorthand (ES6+)
  add() {
    return this.x + this.y;
  },
  // Regular function
  multiply: function() {
    return this.x * this.y;
  },
  // Getter
  get sum() {
    return this.x + this.y;
  },
  // Setter
  set coordinates({ x, y }) {
    this.x = x;
    this.y = y;
  }
};

console.log(calculator.add()); // 15
console.log(calculator.multiply()); // 50
console.log(calculator.sum); // 15 (getter, no parentheses)
calculator.coordinates = { x: 3, y: 4 };
console.log(calculator.sum); // 7

// Methods with computed property names
const methodName = "greet";
const person = {
  name: "Grace",
  [methodName]() {
    return \`Hello, \${this.name}!\`;
  }
};
console.log(person.greet()); // "Hello, Grace!"`
    },
    {
      title: "Practical Examples",
      description: "Real-world use cases for objects.",
      code: `// Configuration object
const settings = {
  theme: "dark",
  notifications: true,
  update(key, value) {
    this[key] = value;
    return this;
  }
};
console.log(settings.update("theme", "light")); // { theme: "light", notifications: true, update: [Function] }

// Data modeling
const book = {
  title: "JavaScript Guide",
  author: { name: "John Doe", email: "john@example.com" },
  published: 2023,
  getDetails() {
    return \`\${this.title} by \${this.author.name} (\${this.published})\`;
  }
};
console.log(book.getDetails()); // "JavaScript Guide by John Doe (2023)"

// Object as a map
const scores = {};
scores["Alice"] = 95;
scores["Bob"] = 88;
console.log(scores); // { Alice: 95, Bob: 88 }
console.log(Object.keys(scores)); // ["Alice", "Bob"]
console.log(Object.values(scores)); // [95, 88]

// Factory function
function createUser(name, role) {
  return {
    name,
    role,
    createdAt: new Date(),
    isActive: true
  };
}
const user = createUser("Henry", "admin");
console.log(user); // { name: "Henry", role: "admin", createdAt: [Date], isActive: true }`
    }
  ];

  return (
    <TopicPage
      title="Object Basics"
      description="Learn the fundamentals of objects in JavaScript, including creation, property access, reference behavior, and defining methods and computed properties."
      examples={examples}
    />
  );
}