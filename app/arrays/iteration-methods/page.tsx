import { TopicPage } from '@/components/TopicPage';

export default function IterationMethodsPage() {
  const examples = [
    {
      title: "forEach() - Execute Function for Each Element",
      description: "Iterate through array elements and execute a function for each one.",
      code: `const numbers = [1, 2, 3, 4, 5];

// Basic forEach usage
numbers.forEach(num => {
  console.log(num * 2);
});
// Output: 2, 4, 6, 8, 10

// forEach with index and array parameters
const fruits = ["apple", "banana", "orange"];
fruits.forEach((fruit, index, array) => {
  console.log(\`\${index}: \${fruit} (total: \${array.length})\`);
});
// Output: 
// 0: apple (total: 3)
// 1: banana (total: 3)
// 2: orange (total: 3)

// forEach with objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

users.forEach(user => {
  console.log(\`\${user.name} is \${user.age} years old\`);
});

// forEach doesn't return anything (returns undefined)
const result = numbers.forEach(num => num * 2);
console.log(result); // undefined

// forEach vs for loop performance
const largeArray = new Array(1000000).fill(0).map((_, i) => i);

console.time("forEach");
largeArray.forEach(num => num * 2);
console.timeEnd("forEach");

console.time("for loop");
for (let i = 0; i < largeArray.length; i++) {
  largeArray[i] * 2;
}
console.timeEnd("for loop");

// Note: forEach cannot be stopped with break or continue
// Use for...of or traditional for loop if you need to break`
    },
    {
      title: "map() - Transform Each Element",
      description: "Create a new array by transforming each element with a function.",
      code: `const numbers = [1, 2, 3, 4, 5];

// Basic map usage
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5] (original unchanged)

// Map with objects
const users = [
  { firstName: "John", lastName: "Doe", age: 25 },
  { firstName: "Jane", lastName: "Smith", age: 30 },
  { firstName: "Bob", lastName: "Johnson", age: 35 }
];

// Extract specific properties
const fullNames = users.map(user => \`\${user.firstName} \${user.lastName}\`);
console.log(fullNames); // ["John Doe", "Jane Smith", "Bob Johnson"]

// Transform objects
const userSummaries = users.map(user => ({
  name: \`\${user.firstName} \${user.lastName}\`,
  isAdult: user.age >= 18,
  category: user.age < 30 ? "young" : "mature"
}));

console.log(userSummaries);
// [
//   { name: "John Doe", isAdult: true, category: "young" },
//   { name: "Jane Smith", isAdult: true, category: "mature" },
//   { name: "Bob Johnson", isAdult: true, category: "mature" }
// ]

// Map with index
const indexedItems = ["a", "b", "c"].map((item, index) => \`\${index}: \${item}\`);
console.log(indexedItems); // ["0: a", "1: b", "2: c"]

// Chaining map operations
const result = [1, 2, 3, 4, 5]
  .map(x => x * 2)      // [2, 4, 6, 8, 10]
  .map(x => x + 1)      // [3, 5, 7, 9, 11]
  .map(x => \`#\${x}\`);   // ["#3", "#5", "#7", "#9", "#11"]

console.log(result);

// Map vs forEach
const nums = [1, 2, 3];

// ❌ Don't use map if you're not using the returned array
nums.map(num => console.log(num)); // Works but wasteful

// ✅ Use forEach for side effects
nums.forEach(num => console.log(num));

// ✅ Use map for transformations
const transformed = nums.map(num => num * 2);`
    },
    {
      title: "filter() - Select Elements by Condition",
      description: "Create a new array with elements that pass a test function.",
      code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Basic filter usage
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

const greaterThanFive = numbers.filter(num => num > 5);
console.log(greaterThanFive); // [6, 7, 8, 9, 10]

// Filter with objects
const products = [
  { name: "Laptop", price: 999, category: "Electronics", inStock: true },
  { name: "Book", price: 15, category: "Education", inStock: true },
  { name: "Phone", price: 699, category: "Electronics", inStock: false },
  { name: "Desk", price: 299, category: "Furniture", inStock: true }
];

// Filter by single condition
const inStockProducts = products.filter(product => product.inStock);
console.log(inStockProducts.length); // 3

// Filter by multiple conditions
const affordableElectronics = products.filter(product => 
  product.category === "Electronics" && product.price < 800
);
console.log(affordableElectronics); // [{ name: "Phone", ... }]

// Filter with complex logic
const premiumAvailableProducts = products.filter(product => {
  const isPremium = product.price > 500;
  const isAvailable = product.inStock;
  const isElectronics = product.category === "Electronics";
  
  return isPremium && isAvailable && isElectronics;
});

// Filter with index
const firstThreeEven = numbers.filter((num, index) => num % 2 === 0 && index < 6);
console.log(firstThreeEven); // [2, 4, 6]

// Remove falsy values
const mixedArray = [1, "", "hello", 0, null, "world", undefined, 42];
const truthyValues = mixedArray.filter(Boolean);
console.log(truthyValues); // [1, "hello", "world", 42]

// Remove duplicates (basic approach)
const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = duplicates.filter((item, index) => duplicates.indexOf(item) === index);
console.log(unique); // [1, 2, 3, 4, 5]

// Filter and transform pattern
const users = [
  { name: "Alice", age: 17, active: true },
  { name: "Bob", age: 25, active: true },
  { name: "Charlie", age: 30, active: false },
  { name: "Diana", age: 22, active: true }
];

const activeAdultNames = users
  .filter(user => user.active && user.age >= 18)
  .map(user => user.name);

console.log(activeAdultNames); // ["Bob", "Diana"]`
    },
    {
      title: "reduce() - Reduce Array to Single Value",
      description: "Apply a function against an accumulator to reduce array to a single value.",
      code: `const numbers = [1, 2, 3, 4, 5];

// Basic reduce - sum all numbers
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 15

// Reduce without initial value (uses first element as initial)
const product = numbers.reduce((acc, curr) => acc * curr);
console.log(product); // 120

// Find maximum value
const max = numbers.reduce((max, current) => current > max ? current : max);
console.log(max); // 5

// More complex reduce - count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const fruitCount = fruits.reduce((count, fruit) => {
  count[fruit] = (count[fruit] || 0) + 1;
  return count;
}, {});
console.log(fruitCount); // { apple: 3, banana: 2, orange: 1 }

// Group objects by property
const people = [
  { name: "Alice", department: "Engineering", salary: 75000 },
  { name: "Bob", department: "Marketing", salary: 65000 },
  { name: "Charlie", department: "Engineering", salary: 80000 },
  { name: "Diana", department: "Marketing", salary: 70000 }
];

const groupedByDepartment = people.reduce((groups, person) => {
  const dept = person.department;
  if (!groups[dept]) {
    groups[dept] = [];
  }
  groups[dept].push(person);
  return groups;
}, {});

console.log(groupedByDepartment);
// {
//   Engineering: [{ name: "Alice", ... }, { name: "Charlie", ... }],
//   Marketing: [{ name: "Bob", ... }, { name: "Diana", ... }]
// }

// Calculate average salary by department
const avgSalaryByDept = people.reduce((acc, person) => {
  const dept = person.department;
  if (!acc[dept]) {
    acc[dept] = { total: 0, count: 0 };
  }
  acc[dept].total += person.salary;
  acc[dept].count += 1;
  return acc;
}, {});

// Convert to averages
Object.keys(avgSalaryByDept).forEach(dept => {
  const data = avgSalaryByDept[dept];
  avgSalaryByDept[dept] = data.total / data.count;
});

console.log(avgSalaryByDept); // { Engineering: 77500, Marketing: 67500 }

// Flatten nested arrays
const nestedArrays = [[1, 2], [3, 4], [5, 6]];
const flattened = nestedArrays.reduce((flat, current) => flat.concat(current), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Build object from array
const keyValuePairs = [["name", "Alice"], ["age", 30], ["city", "New York"]];
const obj = keyValuePairs.reduce((object, [key, value]) => {
  object[key] = value;
  return object;
}, {});
console.log(obj); // { name: "Alice", age: 30, city: "New York" }`
    },
    {
      title: "find() and findIndex() - Locate Elements",
      description: "Find the first element or its index that matches a condition.",
      code: `const users = [
  { id: 1, name: "Alice", role: "admin", active: true },
  { id: 2, name: "Bob", role: "user", active: false },
  { id: 3, name: "Charlie", role: "user", active: true },
  { id: 4, name: "Diana", role: "admin", active: true }
];

// find() - returns first matching element
const firstAdmin = users.find(user => user.role === "admin");
console.log(firstAdmin); // { id: 1, name: "Alice", role: "admin", active: true }

const inactiveUser = users.find(user => !user.active);
console.log(inactiveUser); // { id: 2, name: "Bob", role: "user", active: false }

// find() returns undefined if not found
const superAdmin = users.find(user => user.role === "superadmin");
console.log(superAdmin); // undefined

// findIndex() - returns index of first matching element
const firstAdminIndex = users.findIndex(user => user.role === "admin");
console.log(firstAdminIndex); // 0

const inactiveUserIndex = users.findIndex(user => !user.active);
console.log(inactiveUserIndex); // 1

// findIndex() returns -1 if not found
const superAdminIndex = users.findIndex(user => user.role === "superadmin");
console.log(superAdminIndex); // -1

// Practical examples
function getUserById(users, id) {
  return users.find(user => user.id === id);
}

function removeUserById(users, id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0]; // Remove and return the user
  }
  return null;
}

// Usage
const user = getUserById(users, 3);
console.log(user); // { id: 3, name: "Charlie", ... }

// Find with complex conditions
const products = [
  { name: "Laptop", price: 999, tags: ["electronics", "computers"] },
  { name: "Book", price: 15, tags: ["education", "reading"] },
  { name: "Phone", price: 699, tags: ["electronics", "mobile"] }
];

const expensiveElectronics = products.find(product => 
  product.price > 500 && product.tags.includes("electronics")
);
console.log(expensiveElectronics); // { name: "Laptop", ... }

// findLast() and findLastIndex() (ES2023)
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// Find last occurrence
const lastFour = numbers.findLast(num => num === 4);
console.log(lastFour); // 4

const lastFourIndex = numbers.findLastIndex(num => num === 4);
console.log(lastFourIndex); // 5

// Comparison with indexOf/lastIndexOf
const fruits = ["apple", "banana", "apple", "orange"];

// indexOf/lastIndexOf work with exact values
console.log(fruits.indexOf("apple")); // 0
console.log(fruits.lastIndexOf("apple")); // 2

// find/findIndex work with conditions
const longFruit = fruits.find(fruit => fruit.length > 5);
console.log(longFruit); // "banana"`
    },
    {
      title: "some() and every() - Test Array Elements",
      description: "Test whether some or all elements pass a condition.",
      code: `const numbers = [2, 4, 6, 8, 10];
const mixedNumbers = [1, 2, 3, 4, 5];

// every() - tests if ALL elements pass the condition
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true

const allPositive = mixedNumbers.every(num => num > 0);
console.log(allPositive); // true

const allGreaterThanFive = mixedNumbers.every(num => num > 5);
console.log(allGreaterThanFive); // false

// some() - tests if AT LEAST ONE element passes the condition
const hasEven = mixedNumbers.some(num => num % 2 === 0);
console.log(hasEven); // true

const hasNegative = mixedNumbers.some(num => num < 0);
console.log(hasNegative); // false

// Practical examples with objects
const users = [
  { name: "Alice", age: 25, verified: true },
  { name: "Bob", age: 17, verified: false },
  { name: "Charlie", age: 30, verified: true }
];

// Check if all users are adults
const allAdults = users.every(user => user.age >= 18);
console.log(allAdults); // false

// Check if any user is verified
const hasVerifiedUser = users.some(user => user.verified);
console.log(hasVerifiedUser); // true

// Check if all users are verified
const allVerified = users.every(user => user.verified);
console.log(allVerified); // false

// Form validation example
const formFields = [
  { name: "email", value: "user@example.com", required: true },
  { name: "password", value: "secret123", required: true },
  { name: "newsletter", value: false, required: false }
];

const allRequiredFieldsFilled = formFields.every(field => 
  !field.required || (field.value !== "" && field.value !== null && field.value !== undefined)
);
console.log(allRequiredFieldsFilled); // true

// Permission checking
const permissions = ["read", "write", "delete"];
const userPermissions = ["read", "write"];

const canRead = userPermissions.some(permission => permission === "read");
const canDelete = userPermissions.some(permission => permission === "delete");
const hasAllPermissions = permissions.every(permission => 
  userPermissions.includes(permission)
);

console.log(canRead); // true
console.log(canDelete); // false
console.log(hasAllPermissions); // false

// Empty array behavior
const emptyArray = [];
console.log(emptyArray.every(x => x > 0)); // true (vacuously true)
console.log(emptyArray.some(x => x > 0)); // false

// Short-circuit evaluation
const largeArray = new Array(1000000).fill(1);
largeArray[500000] = 0;

console.time("every");
const allOnes = largeArray.every(num => num === 1); // Stops at first 0
console.timeEnd("every");
console.log(allOnes); // false

console.time("some");
const hasZero = largeArray.some(num => num === 0); // Stops at first 0
console.timeEnd("some");
console.log(hasZero); // true`
    }
  ];

  return (
    <TopicPage
      title="Iteration Methods"
      description="Master array iteration methods in JavaScript: forEach, map, filter, reduce, find, findIndex, some, and every. These methods provide powerful ways to process and transform arrays functionally."
      examples={examples}
    />
  );
}