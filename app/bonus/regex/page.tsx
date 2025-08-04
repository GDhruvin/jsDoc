import { TopicPage } from "@/components/TopicPage";

export default function RegexBasicsPage() {
  const examples = [
    {
      title: "Basic Regex Patterns",
      description: "Creating and using basic regular expressions.",
      code: `// Match literal string
const regex = /hello/;
console.log(regex.test("hello world")); // true
console.log(regex.test("hi world")); // false

// Character classes
const digits = /\\d+/;
console.log(digits.test("123")); // true
console.log(digits.test("abc")); // false

// Anchors
const start = /^start/;
console.log(start.test("start here")); // true
console.log(start.test("end start")); // false

// Quantifiers
const oneOrMore = /a+/;
console.log(oneOrMore.test("aaa")); // true
console.log(oneOrMore.test("b")); // false`,
    },
    {
      title: "Matching and Extracting",
      description: "Using regex to match and extract parts of strings.",
      code: `// Match and capture groups
const email = /(\\w+)@([\\w.]+)/;
const match = "alice@example.com".match(email);
console.log(match); // ["alice@example.com", "alice", "example.com"]

// Named capture groups
const date = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const result = "2025-08-04".match(date);
console.log(result.groups); // { year: "2025", month: "08", day: "04" }

// Replace with regex
const text = "Hello, world!";
const replaced = text.replace(/world/, "JavaScript");
console.log(replaced); // "Hello, JavaScript!"

// Split with regex
const csv = "apple,banana,orange";
const items = csv.split(/,/);
console.log(items); // ["apple", "banana", "orange"]`,
    },
    {
      title: "Common Regex Patterns",
      description: "Practical regex patterns for common use cases.",
      code: `// Email validation
const emailRegex = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
console.log(emailRegex.test("alice@example.com")); // true
console.log(emailRegex.test("invalid.email@com")); // false

// Phone number
const phoneRegex = /^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$/;
console.log(phoneRegex.test("(123) 456-7890")); // true
console.log(phoneRegex.test("123-456-7890")); // false

// URL validation
const urlRegex = /^https?:\\/\\/[\\w-.]+(\\.[a-z]{2,})(\\/\\S*)?$/;
console.log(urlRegex.test("https://example.com")); // true
console.log(urlRegex.test("http://example")); // false

// Extract numbers
const numberRegex = /\\d+/g;
const str = "Order 123 and 456 items";
console.log(str.match(numberRegex)); // ["123", "456"]`,
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of regex in JavaScript.",
      code: `// Form input validation
function validateForm(input) {
  const emailRegex = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
  return emailRegex.test(input);
}
console.log(validateForm("alice@example.com")); // true
console.log(validateForm("invalid@com")); // false

// Parse log file
function parseLog(log) {
  const logRegex = /^(\\d{4}-\\d{2}-\\d{2})\\s(\\w+):(.+)$/gm;
  const matches = [...log.matchAll(logRegex)];
  return matches.map(([_, date, level, message]) => ({ date, level, message }));
}
const log = "2025-08-04 INFO:Started\\n2025-08-04 ERROR:Failed";
console.log(parseLog(log));
// [{ date: "2025-08-04", level: "INFO", message: "Started" },
//  { date: "2025-08-04", level: "ERROR", message: "Failed" }]

// Sanitize input
function sanitizeInput(input) {
  return input.replace(/[<>]/g, "");
}
console.log(sanitizeInput("<script>alert('XSS')</script>")); // "scriptalert('XSS')/script"

// Extract hashtags
function getHashtags(text) {
  const hashtagRegex = /#[\\w-]+/g;
  return text.match(hashtagRegex) || [];
}
console.log(getHashtags("I love #JavaScript and #coding")); // ["#JavaScript", "#coding"]`,
    },
    {
      title: "Best Practices and Performance",
      description: "Optimizing regex usage and avoiding common pitfalls.",
      code: `// Avoid greedy quantifiers
const greedy = /.*!/; // Greedy
const lazy = /.*?!/; // Non-greedy
console.log("hello world!".match(greedy)); // ["hello world!"]
console.log("hello world!".match(lazy)); // ["hello!"]

// Compile regex for reuse
const emailRegex = /^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
function isValidEmail(email) {
  return emailRegex.test(email); // Reuse compiled regex
}
console.log(isValidEmail("alice@example.com")); // true

// Use specific patterns
const badRegex = /.*/; // Too broad
const goodRegex = /[a-zA-Z]+/; // Specific
console.log(goodRegex.test("hello")); // true
console.log(goodRegex.test("123")); // false`,
    },
  ];

  return (
    <TopicPage
      title="Regex Basics"
      description="Learn the fundamentals of regular expressions (regex) in JavaScript for pattern matching, validation, and text processing."
      examples={examples}
    />
  );
}
