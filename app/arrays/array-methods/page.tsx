import { TopicPage } from '@/components/TopicPage';

export default function ArrayMethodsPage() {
  const examples = [
    {
      title: "Transform Arrays - map()",
      description: "Create a new array by transforming each element.",
      code: `const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Transform objects
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

const usernames = users.map(user => user.name);
console.log(usernames); // ['Alice', 'Bob', 'Charlie']

// Add new properties
const usersWithStatus = users.map(user => ({
  ...user,
  isAdult: user.age >= 18,
  displayName: user.name.toUpperCase()
}));

console.log(usersWithStatus);
// [
//   { name: 'Alice', age: 25, isAdult: true, displayName: 'ALICE' },
//   { name: 'Bob', age: 30, isAdult: true, displayName: 'BOB' },
//   { name: 'Charlie', age: 35, isAdult: true, displayName: 'CHARLIE' }
// ]`
    },
    {
      title: "Filter Arrays - filter()",
      description: "Create a new array with elements that pass a test.",
      code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Filter objects
const products = [
  { name: 'Laptop', price: 999, category: 'Electronics' },
  { name: 'Book', price: 15, category: 'Education' },
  { name: 'Phone', price: 699, category: 'Electronics' },
  { name: 'Pen', price: 2, category: 'Office' }
];

// Filter by price
const expensiveItems = products.filter(product => product.price > 100);

// Filter by category
const electronics = products.filter(product => product.category === 'Electronics');

// Multiple conditions
const affordableElectronics = products.filter(product => 
  product.category === 'Electronics' && product.price < 800
);

console.log(affordableElectronics);
// [{ name: 'Phone', price: 699, category: 'Electronics' }]`
    },
    {
      title: "Reduce Arrays - reduce()",
      description: "Reduce an array to a single value by applying a function.",
      code: `const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// Find maximum
const max = numbers.reduce((maximum, num) => Math.max(maximum, num), -Infinity);
console.log(max); // 5

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((count, fruit) => {
  count[fruit] = (count[fruit] || 0) + 1;
  return count;
}, {});
console.log(fruitCount); // { apple: 3, banana: 2, orange: 1 }

// Group objects by property
const people = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' },
  { name: 'Charlie', department: 'Engineering' },
  { name: 'Diana', department: 'Marketing' }
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
//   Engineering: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   Marketing: [{ name: 'Bob', ... }, { name: 'Diana', ... }]
// }`
    },
    {
      title: "Find Elements - find() and findIndex()",
      description: "Find the first element or its index that matches a condition.",
      code: `const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
];

// Find first active user
const activeUser = users.find(user => user.active);
console.log(activeUser); // { id: 1, name: 'Alice', active: true }

// Find user by id
const userById = users.find(user => user.id === 2);
console.log(userById); // { id: 2, name: 'Bob', active: false }

// Find index
const inactiveUserIndex = users.findIndex(user => !user.active);
console.log(inactiveUserIndex); // 1

// Find returns undefined if not found
const adminUser = users.find(user => user.role === 'admin');
console.log(adminUser); // undefined

// findIndex returns -1 if not found
const adminIndex = users.findIndex(user => user.role === 'admin');
console.log(adminIndex); // -1

// Check if element exists
const hasActiveUsers = users.some(user => user.active);
console.log(hasActiveUsers); // true

// Check if all elements match
const allActive = users.every(user => user.active);
console.log(allActive); // false`
    },
    {
      title: "Array Manipulation - push, pop, shift, unshift",
      description: "Add and remove elements from arrays.",
      code: `let fruits = ['apple', 'banana'];

// Add to end - push() (modifies original array)
fruits.push('orange');
console.log(fruits); // ['apple', 'banana', 'orange']

// Add multiple items
fruits.push('grape', 'kiwi');
console.log(fruits); // ['apple', 'banana', 'orange', 'grape', 'kiwi']

// Remove from end - pop()
const lastFruit = fruits.pop();
console.log(lastFruit); // 'kiwi'
console.log(fruits); // ['apple', 'banana', 'orange', 'grape']

// Add to beginning - unshift()
fruits.unshift('mango');
console.log(fruits); // ['mango', 'apple', 'banana', 'orange', 'grape']

// Remove from beginning - shift()
const firstFruit = fruits.shift();
console.log(firstFruit); // 'mango'
console.log(fruits); // ['apple', 'banana', 'orange', 'grape']

// Non-mutating alternatives
const originalArray = [1, 2, 3];

// Add to end without mutation
const withNewItem = [...originalArray, 4];
console.log(withNewItem); // [1, 2, 3, 4]
console.log(originalArray); // [1, 2, 3] (unchanged)

// Add to beginning without mutation
const withPrepended = [0, ...originalArray];
console.log(withPrepended); // [0, 1, 2, 3]`
    },
    {
      title: "Advanced Array Methods",
      description: "More powerful array methods for complex operations.",
      code: `const numbers = [1, 2, [3, 4], [5, [6, 7]]];

// Flatten arrays
const flattened = numbers.flat();
console.log(flattened); // [1, 2, 3, 4, 5, [6, 7]]

const deepFlattened = numbers.flat(2);
console.log(deepFlattened); // [1, 2, 3, 4, 5, 6, 7]

// flatMap - map then flatten
const sentences = ['Hello world', 'How are you'];
const words = sentences.flatMap(sentence => sentence.split(' '));
console.log(words); // ['Hello', 'world', 'How', 'are', 'you']

// includes - check if array contains value
const colors = ['red', 'blue', 'green'];
console.log(colors.includes('blue')); // true
console.log(colors.includes('yellow')); // false

// indexOf and lastIndexOf
const numbers2 = [1, 2, 3, 2, 4];
console.log(numbers2.indexOf(2)); // 1 (first occurrence)
console.log(numbers2.lastIndexOf(2)); // 3 (last occurrence)

// join - convert array to string
const fruits2 = ['apple', 'banana', 'orange'];
console.log(fruits2.join()); // 'apple,banana,orange'
console.log(fruits2.join(' - ')); // 'apple - banana - orange'
console.log(fruits2.join('')); // 'applebananaorange'

// reverse - reverse array in place
const nums = [1, 2, 3, 4, 5];
nums.reverse();
console.log(nums); // [5, 4, 3, 2, 1]

// sort - sort array in place
const names = ['Charlie', 'Alice', 'Bob'];
names.sort();
console.log(names); // ['Alice', 'Bob', 'Charlie']

// Custom sort
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

people.sort((a, b) => a.age - b.age);
console.log(people); // Sorted by age ascending`
    }
  ];

  return (
    <TopicPage
      title="Array Methods"
      description="JavaScript arrays come with powerful built-in methods for manipulation, transformation, and iteration. Master these methods to write more functional and concise code."
      examples={examples}
    />
  );
}