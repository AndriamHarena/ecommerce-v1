/**
 * Mock API client for testing purposes
 * This file provides mock implementations of API functions
 */

/**
 * Mock user data
 */
const MOCK_USER = {
  id: "123456789",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin", // Admin par défaut pour tester les fonctionnalités admin
  createdAt: "2023-05-15T10:30:00Z"
};

/**
 * Mock users list for admin testing
 */
const MOCK_USERS = [
  {
    id: "123456789",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    createdAt: "2023-05-15T10:30:00Z"
  },
  {
    id: "987654321",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    createdAt: "2023-06-20T14:45:22Z"
  },
  {
    id: "456789123",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "user",
    createdAt: "2023-07-10T09:15:30Z"
  },
  {
    id: "789123456",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "admin",
    createdAt: "2023-08-05T16:22:45Z"
  },
  {
    id: "321654987",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "user",
    createdAt: "2023-09-12T11:40:18Z"
  }
];

/**
 * Mock orders data
 */
const MOCK_ORDERS = [
  {
    _id: "ord123456",
    userId: "123456789",
    items: [
      { productId: "prod1", name: "iPhone 13", price: 999.99, quantity: 1 },
      { productId: "prod2", name: "AirPods Pro", price: 249.99, quantity: 1 }
    ],
    totalAmount: 1249.98,
    status: "livrée",
    createdAt: "2024-05-20T14:23:56Z",
    updatedAt: "2024-05-23T10:11:22Z",
    shippingAddress: {
      street: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    }
  },
  {
    _id: "ord789012",
    userId: "123456789",
    items: [
      { productId: "prod3", name: "MacBook Pro", price: 1999.99, quantity: 1 }
    ],
    totalAmount: 1999.99,
    status: "en traitement",
    createdAt: "2024-05-26T09:45:11Z",
    updatedAt: "2024-05-26T09:45:11Z",
    shippingAddress: {
      street: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    }
  },
  {
    _id: "ord345678",
    userId: "123456789",
    items: [
      { productId: "prod4", name: "Apple Watch", price: 399.99, quantity: 1 },
      { productId: "prod5", name: "iPad Mini", price: 499.99, quantity: 1 },
      { productId: "prod6", name: "Magic Keyboard", price: 149.99, quantity: 1 }
    ],
    totalAmount: 1049.97,
    status: "expédiée",
    createdAt: "2024-05-10T17:30:00Z",
    updatedAt: "2024-05-15T08:22:33Z",
    shippingAddress: {
      street: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    }
  }
];

/**
 * Mock implementation of getCurrentUser
 * @returns {Promise<Object>} Simulated API response with user data
 */
export const getCurrentUser = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock user data wrapped in the format returned by the backend
  return {
    message: "Profil utilisateur",
    user: MOCK_USER
  };
};

/**
 * Mock implementation of login
 * @returns {Promise<Object>} Simulated API response with token
 */
export const login = async (email, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For testing, accept any credentials
  return {
    token: "mock.jwt.token",
    user: MOCK_USER
  };
};

/**
 * Mock implementation of getAllUsers for admin testing
 * @returns {Promise<Array>} List of mock users
 */
export const getAllUsers = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock users data wrapped in format expected by frontend
  return {
    users: MOCK_USERS,
    total: MOCK_USERS.length
  };
};

/**
 * Mock implementation of updateUserRole
 * @param {string} userId - ID of user to update
 * @param {string} newRole - New role to assign
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserRole = async (userId, newRole) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate inputs
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  if (newRole !== 'user' && newRole !== 'admin') {
    throw new Error('Invalid role. Role must be either "user" or "admin"');
  }
  
  // Find the user to update
  const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update the user's role in our mock data
  MOCK_USERS[userIndex] = {
    ...MOCK_USERS[userIndex],
    role: newRole
  };
  
  // Return the updated user
  return MOCK_USERS[userIndex];
};

/**
 * Mock implementation of getUserOrders
 * @returns {Promise<Array>} Simulated API response with user orders
 */
export const getUserOrders = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock orders data
  return MOCK_ORDERS;
};

export default {
  get: (url) => {
    // Simulate different API endpoints
    if (url === '/orders/me') {
      return Promise.resolve({ data: MOCK_ORDERS });
    } else if (url === '/user/all') {
      return Promise.resolve({ data: { users: MOCK_USERS, total: MOCK_USERS.length } });
    } else if (url === '/user/profile') {
      return Promise.resolve({ data: { user: MOCK_USER } });
    }
    return Promise.resolve({ data: {} });
  },
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  patch: (url, data) => {
    // Simulate update user role API
    if (url.includes('/user/') && url.includes('/role')) {
      const userId = url.split('/')[2]; // Extrait l'ID de l'URL
      const newRole = data.role;
      
      // Trouve et met à jour l'utilisateur dans le mock
      const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex].role = newRole;
        return Promise.resolve({ data: MOCK_USERS[userIndex] });
      }
    }
    return Promise.resolve({ data: {} });
  },
  delete: () => Promise.resolve({ data: {} })
};
