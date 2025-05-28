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

export default {
  get: () => Promise.resolve({ data: {} }),
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} })
};
