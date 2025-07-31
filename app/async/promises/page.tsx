import { TopicPage } from '@/components/TopicPage';

export default function PromisesPage() {
  const examples = [
    {
      title: "Creating and Using Promises",
      description: "Basic promise creation and consumption with then/catch.",
      code: `// Creating a Promise
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: \`User \${userId}\`,
          email: \`user\${userId}@example.com\`
        });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
};

// Consuming the Promise
fetchUserData(1)
  .then(user => {
    console.log('User data received:', user);
    return user.name; // Return value for next .then()
  })
  .then(userName => {
    console.log('User name:', userName);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Request completed');
  });`
    },
    {
      title: "Promise States and Chaining",
      description: "Understanding promise states and how to chain multiple operations.",
      code: `// Promise states: pending, fulfilled, rejected

// Example 1: Successful promise chain
const processOrder = (orderId) => {
  return new Promise((resolve) => {
    console.log('Processing order:', orderId);
    setTimeout(() => resolve({ orderId, status: 'confirmed' }), 500);
  });
};

const chargePayment = (order) => {
  return new Promise((resolve) => {
    console.log('Charging payment for order:', order.orderId);
    setTimeout(() => resolve({ ...order, payment: 'charged' }), 500);
  });
};

const sendEmail = (order) => {
  return new Promise((resolve) => {
    console.log('Sending confirmation email for:', order.orderId);
    setTimeout(() => resolve({ ...order, emailSent: true }), 300);
  });
};

// Chain promises
processOrder('ORD-001')
  .then(order => chargePayment(order))
  .then(order => sendEmail(order))
  .then(finalOrder => {
    console.log('Order completed:', finalOrder);
  })
  .catch(error => {
    console.error('Order failed:', error);
  });

// Example 2: Promise with conditional logic
const authenticateUser = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'password123') {
        resolve({ username, role: 'admin', token: 'abc123' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

authenticateUser('admin', 'password123')
  .then(user => {
    console.log('Login successful:', user);
    if (user.role === 'admin') {
      return 'admin-dashboard';
    } else {
      return 'user-dashboard';
    }
  })
  .then(redirectTo => {
    console.log('Redirecting to:', redirectTo);
  })
  .catch(error => {
    console.log('Login failed:', error.message);
  });`
    },
    {
      title: "Promise.all() and Promise.allSettled()",
      description: "Handle multiple promises concurrently.",
      code: `// Promise.all - Wait for all promises to resolve
const fetchUser = (id) => 
  new Promise(resolve => 
    setTimeout(() => resolve({ id, name: \`User\${id}\` }), Math.random() * 1000)
  );

const fetchPosts = (userId) => 
  new Promise(resolve => 
    setTimeout(() => resolve([
      { id: 1, title: 'Post 1', userId },
      { id: 2, title: 'Post 2', userId }
    ]), Math.random() * 1000)
  );

const fetchComments = (postId) => 
  new Promise(resolve => 
    setTimeout(() => resolve([
      { id: 1, text: 'Great post!', postId },
      { id: 2, text: 'Thanks for sharing', postId }
    ]), Math.random() * 1000)
  );

// All promises must succeed for Promise.all to succeed
Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchComments(1)
])
.then(([user, posts, comments]) => {
  console.log('All data loaded:', { user, posts, comments });
})
.catch(error => {
  console.error('One or more requests failed:', error);
});

// Promise.allSettled - Wait for all promises to complete (success or failure)
const riskyOperations = [
  Promise.resolve('Success 1'),
  Promise.reject(new Error('Failed operation')),
  Promise.resolve('Success 2'),
  new Promise(resolve => setTimeout(() => resolve('Delayed success'), 1000))
];

Promise.allSettled(riskyOperations)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(\`Operation \${index + 1} succeeded:, result.value);
      } else {
        console.log(\`Operation \${index + 1} failed:, result.reason.message);
      }
    });
  });`
    },
    {
      title: "Promise.race() and Promise.any()",
      description: "Handle promises that compete with each other.",
      code: `// Promise.race - First promise to settle (resolve or reject) wins
const fastRequest = new Promise(resolve => 
  setTimeout(() => resolve('Fast response'), 100)
);

const slowRequest = new Promise(resolve => 
  setTimeout(() => resolve('Slow response'), 2000)
);

const timeoutPromise = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 1500)
);

Promise.race([fastRequest, slowRequest, timeoutPromise])
  .then(result => {
    console.log('First to complete:', result); // "Fast response"
  })
  .catch(error => {
    console.error('First to fail:', error.message);
  });

// Promise.any - First promise to resolve wins (ignores rejections)
const unreliableServices = [
  Promise.reject(new Error('Service 1 down')),
  Promise.reject(new Error('Service 2 down')),
  new Promise(resolve => setTimeout(() => resolve('Service 3 works!'), 500)),
  new Promise(resolve => setTimeout(() => resolve('Service 4 works!'), 800))
];

Promise.any(unreliableServices)
  .then(result => {
    console.log('First successful response:', result); // "Service 3 works!"
  })
  .catch(error => {
    console.error('All services failed:', error);
  });

// Practical example: Timeout wrapper
const withTimeout = (promise, timeoutMs) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
  );
  
  return Promise.race([promise, timeout]);
};

// Usage
const slowApi = new Promise(resolve => 
  setTimeout(() => resolve('API response'), 3000)
);

withTimeout(slowApi, 2000)
  .then(result => console.log(result))
  .catch(error => console.error(error.message)); // "Operation timed out"`
    },
    {
      title: "Error Handling and Promise Utilities",
      description: "Advanced error handling and utility functions for promises.",
      code: `// Error handling in promise chains
const processData = (data) => {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject(new Error('No data provided'));
      return;
    }
    
    if (typeof data !== 'string') {
      reject(new Error('Data must be a string'));
      return;
    }
    
    resolve(data.toUpperCase());
  });
};

processData('hello world')
  .then(result => {
    console.log('Processed:', result);
    throw new Error('Something went wrong after processing');
  })
  .then(result => {
    // This won't execute due to the error above
    console.log('This will not run');
  })
  .catch(error => {
    console.error('Caught error:', error.message);
    return 'Default value'; // Recovery
  })
  .then(result => {
    console.log('Recovered with:', result); // "Default value"
  });

// Utility: Delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Retry function
const retry = async (fn, maxAttempts = 3) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(\`Attempt \${attempt} failed:, error.message);
      
      if (attempt === maxAttempts) {
        throw error;
      }
      
      // Wait before retrying
      await delay(1000 * attempt);
    }
  }
};

// Usage of retry
const unreliableOperation = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.7) {
      resolve('Operation succeeded!');
    } else {
      reject(new Error('Random failure'));
    }
  });
};

retry(unreliableOperation, 3)
  .then(result => console.log(result))
  .catch(error => console.error('All attempts failed:', error.message));`
    }
  ];

  return (
    <TopicPage
      title="Promises"
      description="Promises provide a way to handle asynchronous operations in JavaScript. They help avoid callback hell and provide better error handling with a cleaner, more readable syntax."
      examples={examples}
    />
  );
}