import { TopicPage } from "@/components/TopicPage";

export default function DomManipulationPage() {
  const examples = [
    {
      title: "Selecting Elements",
      description: "Methods to select DOM elements for manipulation.",
      code: `// Selecting by ID
const elementById = document.getElementById("myId");
console.log(elementById); // <div id="myId">...</div>

// Selecting by class
const elementsByClass = document.getElementsByClassName("myClass");
console.log(elementsByClass); // HTMLCollection of elements with class "myClass"

// Selecting by tag
const divs = document.getElementsByTagName("div");
console.log(divs); // HTMLCollection of all <div> elements

// Query selector (single element)
const firstDiv = document.querySelector("div");
console.log(firstDiv); // First <div> element

// Query selector all (multiple elements)
const allItems = document.querySelectorAll(".item");
console.log(allItems); // NodeList of elements with class "item"

// Practical: Selecting nested element
const nested = document.querySelector("#container .item");
console.log(nested); // First .item inside #container`,
    },
    {
      title: "Modifying Elements",
      description: "Changing content, attributes, and styles of DOM elements.",
      code: `// Create element
const div = document.createElement("div");
div.textContent = "Hello, World!";
document.body.appendChild(div);

// Modify content
const heading = document.querySelector("h1");
heading.textContent = "New Title";
heading.innerHTML = "<strong>New Title</strong>";

// Modify attributes
const img = document.createElement("img");
img.setAttribute("src", "image.jpg");
img.alt = "Description"; // Direct property access
console.log(img.getAttribute("src")); // "image.jpg"

// Modify styles
const box = document.querySelector(".box");
box.style.backgroundColor = "blue";
box.style.cssText = "color: white; padding: 10px;";

// Add/remove classes
box.classList.add("active");
box.classList.remove("inactive");
box.classList.toggle("visible");
console.log(box.classList.contains("active")); // true`,
    },
    {
      title: "Adding and Removing Elements",
      description: "Dynamically adding and removing elements in the DOM.",
      code: `// Append element
const ul = document.createElement("ul");
const li = document.createElement("li");
li.textContent = "Item 1";
ul.appendChild(li);
document.body.appendChild(ul);

// Append multiple elements
const fragment = document.createDocumentFragment();
for (let i = 1; i <= 3; i++) {
  const li = document.createElement("li");
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}
ul.appendChild(fragment);

// Insert before
const newLi = document.createElement("li");
newLi.textContent = "New Item";
ul.insertBefore(newLi, ul.firstChild);

// Remove element
const item = document.querySelector("li");
item.remove(); // Modern, direct removal
// item.parentNode.removeChild(item); // Older method

// Replace element
const oldDiv = document.querySelector(".old");
const newDiv = document.createElement("div");
newDiv.textContent = "Replaced";
oldDiv.replaceWith(newDiv);`,
    },
    {
      title: "Practical Examples",
      description: "Real-world DOM manipulation scenarios.",
      code: `// Todo list
function createTodoList(todos) {
  const ul = document.createElement("ul");
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;
    li.classList.add("todo-item");
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}
createTodoList(["Buy milk", "Call Bob", "Write code"]);

// Dynamic form
function createForm(fields) {
  const form = document.createElement("div"); // Note: Using div instead of form due to sandbox restrictions
  fields.forEach(({ label, type }) => {
    const container = document.createElement("div");
    const labelEl = document.createElement("label");
    labelEl.textContent = label;
    const input = document.createElement("input");
    input.type = type;
    container.append(labelEl, input);
    form.appendChild(container);
  });
  document.body.appendChild(form);
}
createForm([
  { label: "Name", type: "text" },
  { label: "Email", type: "email" }
]);

// Toggle visibility
function toggleVisibility(selector) {
  const element = document.querySelector(selector);
  element.style.display = element.style.display === "none" ? "block" : "none";
}
toggleVisibility("#myElement");`,
    },
    {
      title: "Best Practices and Performance",
      description:
        "Optimizing DOM manipulation for performance and maintainability.",
      code: `// Use DocumentFragment for bulk updates
function addManyItems(items) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });
  document.querySelector("ul").appendChild(fragment);
}
addManyItems(["Item 1", "Item 2", "Item 3"]);

// Avoid inline styles
const box = document.querySelector(".box");
box.classList.add("styled"); // Use CSS class instead of box.style.backgroundColor

// Cache selectors
function updateItems() {
  const items = document.querySelectorAll(".item"); // Cache
  items.forEach((item) => {
    item.textContent = "Updated";
  });
}
updateItems();

// Minimize reflows
function efficientUpdate() {
  const container = document.querySelector("#container");
  container.style.display = "none"; // Hide to avoid reflows
  container.innerHTML = ""; // Clear content
  container.appendChild(document.createElement("div")); // Add new content
  container.style.display = "block";
}
efficientUpdate();

// Sanitize user input
function safeAddContent(userInput) {
  const div = document.createElement("div");
  div.textContent = userInput; // Avoid innerHTML with user input
  document.body.appendChild(div);
}
safeAddContent("<script>alert('XSS')</script>"); // Safely renders as text`,
    },
  ];

  return (
    <TopicPage
      title="DOM Manipulation"
      description="Learn how to manipulate the Document Object Model (DOM) in JavaScript to select, modify, add, and remove elements dynamically in a web page."
      examples={examples}
    />
  );
}
