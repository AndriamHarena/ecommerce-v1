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
  role: "user",
  createdAt: "2023-05-15T10:30:00Z"
};

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
    }
    return Promise.resolve({ data: {} });
  },
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} })
};
