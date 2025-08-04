import { TopicPage } from '@/components/TopicPage';

export default function StringMethodsPage() {
  const examples = [
    {
      title: "Accessing Characters and Substrings",
      description: "Methods to access individual characters or parts of a string.",
      code: `const str = "Hello, World!";

// Accessing characters
console.log(str.charAt(0)); // "H"
console.log(str[0]); // "H" (array-like access, ES5+)
console.log(str.charCodeAt(0)); // 72 (ASCII code for "H")
console.log(str.codePointAt(0)); // 72 (Unicode code point, supports beyond ASCII)

// Extracting substrings
console.log(str.slice(0, 5)); // "Hello"
console.log(str.substring(7, 12)); // "World"
console.log(str.substr(7, 5)); // "World" (deprecated)

// Differences between slice and substring
console.log(str.slice(12, 7)); // "" (empty, handles reverse indices)
console.log(str.substring(12, 7)); // "World" (swaps indices if start > end)`
    },
    {
      title: "Searching and Matching",
      description: "Methods to find content within strings.",
      code: `const text = "The quick brown fox jumps over the lazy dog";

// Finding substrings
console.log(text.indexOf("fox")); // 16
console.log(text.lastIndexOf("the")); // 31
console.log(text.includes("quick")); // true
console.log(text.startsWith("The")); // true
console.log(text.endsWith("dog")); // true

// Case-sensitive search
console.log(text.indexOf("Fox")); // -1 (not found)
console.log(text.toLowerCase().indexOf("fox")); // 16

// Search with regular expressions
console.log(text.search(/brown/)); // 10
console.log(text.match(/\\w+/g)); // ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]

// Getting matches with details
const match = text.match(/(quick|lazy)/g);
console.log(match); // ["quick", "lazy"]`
    },
    {
      title: "Modifying Strings",
      description: "Methods to create new strings based on modifications.",
      code: `const str = "  Hello, World!  ";

// Trimming whitespace
console.log(str.trim()); // "Hello, World!"
console.log(str.trimStart()); // "Hello, World!  "
console.log(str.trimEnd()); // "  Hello, World!"

// Case conversion
console.log(str.toUpperCase()); // "  HELLO, WORLD!  "
console.log(str.toLowerCase()); // "  hello, world!  "

// Replacing content
console.log(str.replace("World", "JavaScript")); // "  Hello, JavaScript!  "
console.log(str.replace(/o/g, "0")); // "  Hell0, W0rld!  "

// Replace all (ES2021+)
console.log(str.replaceAll("o", "0")); // "  Hell0, W0rld!  "

// Padding strings
const code = "42";
console.log(code.padStart(5, "0")); // "00042"
console.log(code.padEnd(5, "x")); // "42xxx"`
    },
    {
      title: "Splitting and Joining",
      description: "Breaking strings into arrays and combining them back.",
      code: `const sentence = "The quick brown fox";

// Splitting into array
console.log(sentence.split(" ")); // ["The", "quick", "brown", "fox"]
console.log(sentence.split("")); // ["T", "h", "e", ..., "x"]
console.log(sentence.split(/\\s+/)); // ["The", "quick", "brown", "fox"]

// Limiting split
console.log(sentence.split(" ", 2)); // ["The", "quick"]

// Joining array into string
const words = ["Hello", "World"];
console.log(words.join(" ")); // "Hello World"
console.log(words.join("-")); // "Hello-World"
console.log(words.join("")); // "HelloWorld"

// Practical example: CSV parsing
const csv = "name,age,city";
const [header, ...rows] = csv.split(",");
console.log(header); // "name"
console.log(rows.join("|")); // "age|city"`
    },
    {
      title: "Practical Examples",
      description: "Real-world applications of string methods.",
      code: `// Formatting a phone number
function formatPhone(phone) {
  const cleaned = phone.replace(/\\D/g, ""); // Remove non-digits
  if (cleaned.length !== 10) return "Invalid phone number";
  return cleaned.replace(/(\\d{3})(\\d{3})(\\d{4})/, "($1) $2-$3");
}

console.log(formatPhone("1234567890")); // "(123) 456-7890"
console.log(formatPhone("123-456-7890")); // "(123) 456-7890"

// Extracting email domain
function getEmailDomain(email) {
  const domain = email.slice(email.indexOf("@") + 1);
  return domain.toLowerCase();
}

console.log(getEmailDomain("user@Example.com")); // "example.com"

// URL slug generator
function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "") // Remove special chars
    .replace(/\\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-"); // Multiple hyphens to single
}

console.log(createSlug("Hello, World! How are you?")); // "hello-world-how-are-you"

// Validating password strength
function checkPassword(password) {
  return {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\\d/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password)
  };
}

console.log(checkPassword("Passw0rd!")); 
// { hasMinLength: true, hasUppercase: true, hasLowercase: true, hasNumber: true, hasSpecial: true }`
    }
  ];

  return (
    <TopicPage
      title="String Methods"
      description="Explore JavaScript string methods for manipulating, searching, and transforming strings, including accessing characters, searching, modifying, and splitting/joining strings."
      examples={examples}
    />
  );
}