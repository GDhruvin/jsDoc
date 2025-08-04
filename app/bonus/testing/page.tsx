import { TopicPage } from "@/components/TopicPage";

export default function TestingBasicsPage() {
  const examples = [
    {
      title: "Introduction to Testing with Jest",
      description:
        "Writing basic unit tests using Jest, a popular JavaScript testing framework.",
      code: `// math.js
export function add(a, b) {
  return a + b;
}

// math.test.js
import { add } from './math.js';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds negative numbers', () => {
  expect(add(-1, -2)).toBe(-3);
});

test('adds zero', () => {
  expect(add(5, 0)).toBe(5);
});

// Running tests (in terminal): jest math.test.js
// Output: ✓ adds 1 + 2 to equal 3
//         ✓ adds negative numbers
//         ✓ adds zero`,
    },
    {
      title: "Testing Asynchronous Code",
      description: "Testing promises and async/await functions with Jest.",
      code: `// api.js
export async function fetchUser(id) {
  // Simulated API call
  return new Promise((resolve) => setTimeout(() => resolve({ id, name: "Alice" }), 500));
}

// api.test.js
import { fetchUser } from './api.js';

test('fetches user with id 1', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: "Alice" });
});

test('handles async errors', async () => {
  const failingFetch = async () => {
    throw new Error("Failed to fetch");
  };
  await expect(failingFetch()).rejects.toThrow("Failed to fetch");
});

// Mocking async functions
jest.mock('./api.js');
fetchUser.mockResolvedValue({ id: 2, name: "Bob" });

test('mocked fetch user', async () => {
  const user = await fetchUser(2);
  expect(user).toEqual({ id: 2, name: "Bob" });
});`,
    },
    {
      title: "Testing DOM Interactions",
      description:
        "Testing DOM manipulation and events in a browser-like environment.",
      code: `// component.js
export function createButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", () => {
    button.textContent = "Clicked!";
  });
  return button;
}

// component.test.js
import { createButton } from './component.js';

test('button renders and updates on click', () => {
  // jsdom environment assumed
  const button = createButton("Click me");
  document.body.appendChild(button);
  
  expect(button.textContent).toBe("Click me");
  
  // Simulate click
  button.click();
  expect(button.textContent).toBe("Clicked!");
});

// Mocking DOM with jsdom
test('button in isolated DOM', () => {
  const button = createButton("Test");
  expect(button.tagName).toBe("BUTTON");
  expect(button.textContent).toBe("Test");
});`,
    },
    {
      title: "Practical Examples",
      description:
        "Real-world testing scenarios for common JavaScript features.",
      code: `// utils.js
export function formatName({ first, last }) {
  return \`\${first} \${last}\`.trim();
}

// utils.test.js
import { formatName } from './utils.js';

test('formats name correctly', () => {
  expect(formatName({ first: "John", last: "Doe" })).toBe("John Doe");
  expect(formatName({ first: "Alice" })).toBe("Alice");
});

// Testing API integration
// apiClient.js
export async function getPosts() {
  const response = await fetch("https://api.example.com/posts");
  return response.json();
}

// apiClient.test.js
import { getPosts } from './apiClient.js';

jest.spyOn(global, 'fetch').mockResolvedValue({
  json: jest.fn().mockResolvedValue([{ id: 1, title: "Post 1" }])
});

test('fetches posts', async () => {
  const posts = await getPosts();
  expect(posts).toEqual([{ id: 1, title: "Post 1" }]);
  expect(fetch).toHaveBeenCalledWith("https://api.example.com/posts");
});

// Snapshot testing
test('formatName snapshot', () => {
  expect(formatName({ first: "Jane", last: "Doe" })).toMatchSnapshot();
});`,
    },
    {
      title: "Best Practices and Mocking",
      description: "Optimizing tests and using mocks effectively.",
      code: `// Avoid flaky tests
// bad.test.js
test('flaky async test', (done) => {
  setTimeout(() => {
    expect(1 + 1).toBe(2);
    done();
  }, 1000);
});

// Better: Use async/await
test('reliable async test', async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  expect(1 + 1).toBe(2);
});

// Mocking dependencies
// logger.js
export function log(message) {
  console.log(message);
}

// service.js
import { log } from './logger.js';
export function processData(data) {
  log(\`Processing: \${data}\`);
  return data.toUpperCase();
}

// service.test.js
import { processData } from './service.js';
import * as logger from './logger.js';

jest.spyOn(logger, 'log').mockImplementation(() => {});

test('processes data without logging', () => {
  expect(processData("test")).toBe("TEST");
  expect(logger.log).toHaveBeenCalledWith("Processing: test");
});

// Setup and teardown
beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = "";
});

test('clean DOM', () => {
  document.body.innerHTML = "<div>Test</div>";
  expect(document.body.children.length).toBe(1);
}); // AfterEach ensures clean state`,
    },
  ];

  return (
    <TopicPage
      title="Testing Basics"
      description="Learn the fundamentals of testing JavaScript code with Jest, including unit tests, async testing, DOM interactions, and mocking dependencies."
      examples={examples}
    />
  );
}
