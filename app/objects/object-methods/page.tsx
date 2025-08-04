import { TopicPage } from '@/components/TopicPage';

export default function ObjectMethodsPage() {
  const examples = [
    {
      title: "Object Property Management",
      description: "Methods to manage object properties and their descriptors.",
      code: `const obj = { name: "Alice", age: 25 };

// Get property names
console.log(Object.keys(obj)); // ["name", "age"]

// Get property values
console.log(Object.values(obj)); // ["Alice", 25]

// Get key-value pairs
console.log(Object.entries(obj)); // [["name", "Alice"], ["age", 25]]

// Property descriptors
console.log(Object.getOwnPropertyDescriptor(obj, "name"));
// { value: "Alice", writable: true, enumerable: true, configurable: true }

// Define property with specific attributes
Object.defineProperty(obj, "role", {
  value: "user",
  writable: false, // Cannot be changed
  enumerable: true,
  configurable: true
});
console.log(obj.role); // "user"
obj.role = "admin"; // No effect (writable: false)
console.log(obj.role); // "user"

// Define multiple properties
Object.defineProperties(obj, {
  id: { value: 1, writable: false },
  active: { value: true, writable: true }
});
console.log(obj); // { name: "Alice", age: 25, role: "user", id: 1, active: true }`
    },
    {
      title: "Object Merging and Copying",
      description: "Methods to combine or copy objects.",
      code: `const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// Merge objects with Object.assign
const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 3, c: 4 }

// Shallow copy
const copy = Object.assign({}, obj1);
console.log(copy); // { a: 1, b: 2 }
copy.a = 10;
console.log(obj1.a); // 1 (original unchanged)

// Modern spread operator alternative
const spreadCopy = { ...obj1 };
console.log(spreadCopy); // { a: 1, b: 2 }

// Merging with spread
const spreadMerged = { ...obj1, ...obj2 };
console.log(spreadMerged); // { a: 1, b: 3, c: 4 }

// Deep copy limitation
const nested = { a: 1, nested: { b: 2 } };
const shallowCopy = Object.assign({}, nested);
shallowCopy.nested.b = 3;
console.log(nested.nested.b); // 3 (nested object shared)`
    },
    {
      title: "Object Freezing and Sealing",
      description: "Preventing modifications to objects.",
      code: `const obj = { name: "Bob", age: 30 };

// Freeze object (no add, delete, or modify)
Object.freeze(obj);
obj.name = "Charlie"; // No effect
delete obj.age; // No effect
obj.newProp = true; // No effect
console.log(obj); // { name: "Bob", age: 30 }
console.log(Object.isFrozen(obj)); // true

// Seal object (no add or delete, but can modify existing)
const sealedObj = { name: "Diana", age: 35 };
Object.seal(sealedObj);
sealedObj.name = "Eve"; // Allowed
delete sealedObj.age; // No effect
sealedObj.newProp = true; // No effect
console.log(sealedObj); // { name: "Eve", age: 35 }
console.log(Object.isSealed(sealedObj)); // true

// Prevent extensions (no add, but can modify and delete)
const extensibleObj = { name: "Frank" };
Object.preventExtensions(extensibleObj);
extensibleObj.name = "Grace"; // Allowed
extensibleObj.newProp = true; // No effect
console.log(extensibleObj); // { name: "Grace" }
console.log(Object.isExtensible(extensibleObj)); // false`
    },
    {
      title: "Object Prototypes and Inheritance",
      description: "Working with object prototypes and inheritance.",
      code: `// Creating object with prototype
const parent = { role: "user", greet() { return "Hello!"; } };
const child = Object.create(parent);
child.name = "Alice";
console.log(child.role); // "user" (inherited)
console.log(child.greet()); // "Hello!" (inherited)
console.log(Object.getPrototypeOf(child) === parent); // true

// Setting prototype
const obj = { name: "Bob" };
Object.setPrototypeOf(obj, { status: "active" });
console.log(obj.status); // "active"

// Checking property ownership
console.log(obj.hasOwnProperty("name")); // true
console.log(obj.hasOwnProperty("status")); // false

// Practical example: Extending functionality
const baseConfig = {
  apiUrl: "https://api.example.com",
  getEndpoint(endpoint) {
    return \`\${this.apiUrl}\${endpoint}\`;
  }
};

const userConfig = Object.create(baseConfig);
userConfig.apiKey = "xyz123";
console.log(userConfig.getEndpoint("/users")); // "https://api.example.com/users"
console.log(userConfig.apiKey); // "xyz123"`
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of object methods.",
      code: `// Creating immutable configuration
const config = Object.freeze({
  apiKey: "abc123",
  endpoint: "https://api.example.com",
  settings: Object.freeze({ timeout: 5000 })
});
console.log(config.apiKey); // "abc123"
config.apiKey = "xyz789"; // No effect
console.log(config.apiKey); // "abc123"

// Merging user data
function mergeUserData(defaults, userData) {
  return Object.assign({}, defaults, userData);
}

const defaults = { role: "guest", active: false };
const userData = { name: "Charlie", role: "admin" };
console.log(mergeUserData(defaults, userData));
// { role: "admin", active: false, name: "Charlie" }

// Property validation
function createValidatedObject(data) {
  const obj = {};
  Object.defineProperties(obj, {
    name: {
      value: data.name || "Unknown",
      writable: true,
      enumerable: true
    },
    age: {
      value: Number(data.age) || 0,
      writable: false,
      enumerable: true
    }
  });
  return obj;
}

const validated = createValidatedObject({ name: "Diana", age: "30" });
console.log(validated); // { name: "Diana", age: 30 }
validated.age = 31; // No effect
console.log(validated.age); // 30

// Converting array to object
const pairs = [["a", 1], ["b", 2], ["c", 3]];
const objFromPairs = Object.fromEntries(pairs);
console.log(objFromPairs); // { a: 1, b: 2, c: 3 }`
    }
  ];

  return (
    <TopicPage
      title="Object Methods"
      description="Explore JavaScript object methods for managing properties, merging objects, controlling mutability, and working with prototypes and inheritance."
      examples={examples}
    />
  );
}