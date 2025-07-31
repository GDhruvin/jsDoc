import { TopicPage } from '@/components/TopicPage';

export default function AdvancedArraysPage() {
  const examples = [
    {
      title: "Array Destructuring",
      description: "Extract values from arrays into distinct variables.",
      code: `// Basic array destructuring
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

console.log(first);  // "red"
console.log(second); // "green"
console.log(third);  // "blue"

// Skipping elements
const numbers = [1, 2, 3, 4, 5];
const [a, , c, , e] = numbers; // Skip 2nd and 4th elements
console.log(a, c, e); // 1 3 5

// Default values
const [x = 0, y = 0, z = 0] = [10, 20];
console.log(x, y, z); // 10 20 0

// Rest pattern
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Swapping variables
let p = 1, q = 2;
[p, q] = [q, p];
console.log(p, q); // 2 1

// Nested array destructuring
const nested = [[1, 2], [3, 4]];
const [[a1, a2], [b1, b2]] = nested;
console.log(a1, a2, b1, b2); // 1 2 3 4

// Function return destructuring
function getCoordinates() {
  return [10, 20, 30];
}

const [x1, y1, z1] = getCoordinates();
console.log(x1, y1, z1); // 10 20 30

// Destructuring in function parameters
function processPoint([x, y, z = 0]) {
  return \`Point at (\${x}, \${y}, \${z})\`;
}

console.log(processPoint([5, 10])); // "Point at (5, 10, 0)"`
    },
    {
      title: "Spread Operator with Arrays",
      description: "Use the spread operator to expand arrays in various contexts.",
      code: `// Copying arrays
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]
console.log(copy === original); // false (different arrays)

// Concatenating arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const combined = [...arr1, ...arr2, ...arr3];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Adding elements while spreading
const numbers = [2, 3, 4];
const extended = [1, ...numbers, 5, 6];
console.log(extended); // [1, 2, 3, 4, 5, 6]

// Converting string to array
const str = "hello";
const chars = [...str];
console.log(chars); // ["h", "e", "l", "l", "o"]

// Converting NodeList to array
// const elements = [...document.querySelectorAll('div')];

// Finding max/min with spread
const scores = [85, 92, 78, 96, 88];
const maxScore = Math.max(...scores);
const minScore = Math.min(...scores);
console.log(maxScore, minScore); // 96 78

// Function arguments with spread
function sum(a, b, c) {
  return a + b + c;
}

const nums = [1, 2, 3];
console.log(sum(...nums)); // 6

// Cloning with modifications
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const usersWithNewUser = [
  ...users,
  { id: 3, name: "Charlie" }
];

// Removing duplicates with Set and spread
const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(duplicates)];
console.log(unique); // [1, 2, 3, 4, 5]

// Conditional spreading
const baseArray = [1, 2, 3];
const condition = true;
const result = [
  ...baseArray,
  ...(condition ? [4, 5] : [])
];
console.log(result); // [1, 2, 3, 4, 5]`
    },
    {
      title: "Array.from() Advanced Usage",
      description: "Create and transform arrays using Array.from() with mapping functions.",
      code: `// Basic Array.from()
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const realArray = Array.from(arrayLike);
console.log(realArray); // ["a", "b", "c"]

// Array.from() with mapping function
const numbers = Array.from({ length: 5 }, (_, index) => index + 1);
console.log(numbers); // [1, 2, 3, 4, 5]

// Generate squares
const squares = Array.from({ length: 5 }, (_, i) => (i + 1) ** 2);
console.log(squares); // [1, 4, 9, 16, 25]

// Create alphabet array
const alphabet = Array.from({ length: 26 }, (_, i) => 
  String.fromCharCode(65 + i)
);
console.log(alphabet); // ["A", "B", "C", ..., "Z"]

// Convert string to array with mapping
const word = "hello";
const upperChars = Array.from(word, char => char.toUpperCase());
console.log(upperChars); // ["H", "E", "L", "L", "O"]

// Working with Sets
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
const arrayFromSet = Array.from(uniqueNumbers);
console.log(arrayFromSet); // [1, 2, 3]

// Transform Set values
const doubledFromSet = Array.from(uniqueNumbers, x => x * 2);
console.log(doubledFromSet); // [2, 4, 6]

// Working with Maps
const userMap = new Map([
  ["alice", { age: 25, role: "admin" }],
  ["bob", { age: 30, role: "user" }]
]);

const userEntries = Array.from(userMap);
console.log(userEntries);
// [["alice", { age: 25, role: "admin" }], ["bob", { age: 30, role: "user" }]]

const usernames = Array.from(userMap.keys());
console.log(usernames); // ["alice", "bob"]

// Create range function
function range(start, end, step = 1) {
  const length = Math.ceil((end - start) / step);
  return Array.from({ length }, (_, i) => start + i * step);
}

console.log(range(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(range(0, 20, 5)); // [0, 5, 10, 15]

// Matrix creation
function createMatrix(rows, cols, fillValue = 0) {
  return Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => fillValue)
  );
}

const matrix = createMatrix(3, 4, 1);
console.log(matrix);
// [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]`
    },
    {
      title: "Multidimensional Arrays",
      description: "Working with arrays of arrays (matrices) and nested structures.",
      code: `// Creating 2D arrays
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Accessing elements
console.log(matrix[0][0]); // 1
console.log(matrix[1][2]); // 6
console.log(matrix[2][1]); // 8

// Iterating through 2D array
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(\`matrix[\${i}][\${j}] = \${matrix[i][j]}\`);
  }
}

// Using forEach with 2D arrays
matrix.forEach((row, rowIndex) => {
  row.forEach((value, colIndex) => {
    console.log(\`[\${rowIndex}][\${colIndex}]: \${value}\`);
  });
});

// Flattening 2D array
const flattened = matrix.flat();
console.log(flattened); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Deep flattening
const deepNested = [1, [2, [3, [4, 5]]]];
const deepFlattened = deepNested.flat(Infinity);
console.log(deepFlattened); // [1, 2, 3, 4, 5]

// Creating dynamic 2D array
function create2DArray(rows, cols, initialValue = null) {
  return Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => initialValue)
  );
}

const grid = create2DArray(3, 4, 0);
console.log(grid);

// Transposing a matrix
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => 
    matrix.map(row => row[colIndex])
  );
}

const original = [
  [1, 2, 3],
  [4, 5, 6]
];

const transposed = transpose(original);
console.log(transposed);
// [[1, 4], [2, 5], [3, 6]]

// Working with jagged arrays (arrays with different lengths)
const jaggedArray = [
  [1, 2],
  [3, 4, 5, 6],
  [7],
  [8, 9, 10]
];

// Safe access to jagged array
function safeGet(arr, row, col) {
  return arr[row] && arr[row][col];
}

console.log(safeGet(jaggedArray, 1, 3)); // 6
console.log(safeGet(jaggedArray, 2, 3)); // undefined

// 3D array example
const cube = [
  [
    [1, 2],
    [3, 4]
  ],
  [
    [5, 6],
    [7, 8]
  ]
];

console.log(cube[0][1][0]); // 3
console.log(cube[1][0][1]); // 6`
    },
    {
      title: "Array Performance and Memory",
      description: "Understanding array performance characteristics and memory usage.",
      code: `// Sparse vs Dense arrays
const dense = [1, 2, 3, 4, 5];
const sparse = [1, , , , 5]; // Has holes

console.log(dense.length); // 5
console.log(sparse.length); // 5

// Performance difference in iteration
console.time("dense forEach");
dense.forEach(item => item * 2);
console.timeEnd("dense forEach");

console.time("sparse forEach");
sparse.forEach(item => item * 2); // Skips holes, faster
console.timeEnd("sparse forEach");

// Array vs Object for numeric indices
const arrayData = new Array(1000);
const objectData = {};

// Fill with data
console.time("array fill");
for (let i = 0; i < 1000; i++) {
  arrayData[i] = i;
}
console.timeEnd("array fill");

console.time("object fill");
for (let i = 0; i < 1000; i++) {
  objectData[i] = i;
}
console.timeEnd("object fill");

// Access performance
console.time("array access");
for (let i = 0; i < 1000; i++) {
  const value = arrayData[i];
}
console.timeEnd("array access");

console.time("object access");
for (let i = 0; i < 1000; i++) {
  const value = objectData[i];
}
console.timeEnd("object access");

// Memory-efficient array operations
const largeArray = new Array(1000000).fill(0).map((_, i) => i);

// ❌ Memory inefficient - creates new arrays
console.time("inefficient chain");
const result1 = largeArray
  .map(x => x * 2)
  .filter(x => x % 4 === 0)
  .map(x => x / 2);
console.timeEnd("inefficient chain");

// ✅ Memory efficient - single pass
console.time("efficient single pass");
const result2 = [];
for (let i = 0; i < largeArray.length; i++) {
  const doubled = largeArray[i] * 2;
  if (doubled % 4 === 0) {
    result2.push(doubled / 2);
  }
}
console.timeEnd("efficient single pass");

// Array length optimization
const items = [];

// ❌ Inefficient - length property accessed each iteration
console.time("inefficient loop");
for (let i = 0; i < items.length; i++) {
  // Process item
}
console.timeEnd("inefficient loop");

// ✅ Efficient - cache length
console.time("efficient loop");
const length = items.length;
for (let i = 0; i < length; i++) {
  // Process item
}
console.timeEnd("efficient loop");

// Pre-allocating arrays for better performance
function createLargeArray(size) {
  // ❌ Grows dynamically
  const dynamic = [];
  for (let i = 0; i < size; i++) {
    dynamic.push(i);
  }
  
  // ✅ Pre-allocated
  const preallocated = new Array(size);
  for (let i = 0; i < size; i++) {
    preallocated[i] = i;
  }
  
  return preallocated;
}

// Avoiding memory leaks with large arrays
function processLargeData() {
  let largeData = new Array(1000000).fill(0);
  
  // Process data...
  
  // Clear reference to allow garbage collection
  largeData = null;
}`
    }
  ];

  return (
    <TopicPage
      title="Advanced Arrays"
      description="Explore advanced array concepts in JavaScript: destructuring, spread operator, Array.from(), multidimensional arrays, and performance considerations for working with large datasets."
      examples={examples}
    />
  );
}