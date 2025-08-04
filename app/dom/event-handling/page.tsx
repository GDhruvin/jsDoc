import { TopicPage } from "@/components/TopicPage";

export default function EventHandlingPage() {
  const examples = [
    {
      title: "Basic Event Listeners",
      description: "Adding and handling basic DOM events.",
      code: `// Click event
const button = document.createElement("button");
button.textContent = "Click me";
button.addEventListener("click", (event) => {
  console.log("Button clicked!", event.target);
});
document.body.appendChild(button);

// Multiple events
const div = document.createElement("div");
div.addEventListener("mouseover", () => console.log("Mouse entered"));
div.addEventListener("mouseout", () => console.log("Mouse left"));
document.body.appendChild(div);

// Event object properties
button.addEventListener("click", (event) => {
  console.log("Type:", event.type); // "click"
  console.log("Target:", event.target); // <button>...</button>
  console.log("Coordinates:", event.clientX, event.clientY);
});

// Inline event handler (avoid in practice)
button.onclick = () => console.log("Inline click");`,
    },
    {
      title: "Event Propagation",
      description:
        "Understanding capturing and bubbling phases in event handling.",
      code: `// Event bubbling
const parent = document.createElement("div");
const child = document.createElement("button");
child.textContent = "Click me";
parent.appendChild(child);
document.body.appendChild(parent);

parent.addEventListener("click", () => console.log("Parent clicked"));
child.addEventListener("click", (event) => {
  console.log("Child clicked");
  // event.stopPropagation(); // Stops bubbling to parent
});
// Clicking child logs: "Child clicked", "Parent clicked"

// Event capturing
parent.addEventListener(
  "click",
  () => console.log("Parent capture"),
  { capture: true }
);
child.addEventListener("click", () => console.log("Child capture"));
// Clicking child logs: "Parent capture", "Child capture", "Child clicked", "Parent clicked"

// Prevent default
const link = document.createElement("a");
link.href = "https://example.com";
link.textContent = "Link";
link.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Link click prevented");
});
document.body.appendChild(link);`,
    },
    {
      title: "Event Delegation",
      description: "Handling events on parent elements for dynamic children.",
      code: `// Event delegation
const ul = document.createElement("ul");
document.body.appendChild(ul);

ul.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log(\`Clicked: \${event.target.textContent}\`);
  }
});

["Item 1", "Item 2", "Item 3"].forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
});
// Clicking an LI logs its text

// Dynamic elements
function addItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
}
addItem("Item 4"); // Clicks on new item still handled

// Filtering with data attributes
ul.innerHTML = '<li data-type="special">Special Item</li>';
ul.addEventListener("click", (event) => {
  if (event.target.dataset.type === "special") {
    console.log("Special item clicked");
  }
});`,
    },
    {
      title: "Practical Examples",
      description: "Real-world event handling scenarios.",
      code: `// Todo list with delete buttons
function createTodoList(todos) {
  const ul = document.createElement("ul");
  ul.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      event.target.parentElement.remove();
    }
  });
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = \`\${todo} <button class="delete">Delete</button>\`;
    ul.appendChild(li);
  });
  document.body.appendChild(ul);
}
createTodoList(["Task 1", "Task 2"]);

// Form input handling
function setupForm() {
  const input = document.createElement("input");
  input.type = "text";
  input.addEventListener("input", (event) => {
    console.log(\`Input value: \${event.target.value}\`);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Enter pressed!");
    }
  });
  document.body.appendChild(input);
}
setupForm();

// Throttled scroll handler
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const logScroll = throttle(() => {
  console.log(\`Scroll position: \${window.scrollY}\`);
}, 200);
// window.addEventListener("scroll", logScroll);`,
    },
    {
      title: "Best Practices and Cleanup",
      description: "Optimizing event handling and preventing memory leaks.",
      code: `// Remove event listeners
function setupTemporaryListener() {
  const button = document.createElement("button");
  const handler = () => console.log("Clicked");
  button.addEventListener("click", handler);
  document.body.appendChild(button);
  // Cleanup
  return () => button.removeEventListener("click", handler);
}
const cleanup = setupTemporaryListener();
// cleanup(); // Remove listener

// Use once option
const button = document.createElement("button");
button.addEventListener("click", () => console.log("Clicked once"), { once: true });
document.body.appendChild(button);

// Avoid excessive listeners
function efficientDelegation() {
  const container = document.createElement("div");
  container.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (target) {
      console.log(\`Action: \${target.dataset.action}\`);
    }
  });
  container.innerHTML = '<button data-action="save">Save</button>';
  document.body.appendChild(container);
}
efficientDelegation();

// Handle passive events for performance
window.addEventListener("scroll", () => {
  console.log("Scrolling");
}, { passive: true });`,
    },
  ];

  return (
    <TopicPage
      title="Event Handling"
      description="Explore event handling in JavaScript, including adding listeners, managing propagation, delegation, and optimizing for performance in browser applications."
      examples={examples}
    />
  );
}
