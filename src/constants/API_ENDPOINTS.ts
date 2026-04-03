/**
 * API Endpoints Constants
 * Centralized API endpoint definitions
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH: '/api/v1/auth/refresh',
    ACCOUNT: '/api/v1/auth/account',
  },

  // User endpoints
  USERS: {
    BASE: '/api/v1/users',
    BY_ID: (id: string) => `/api/v1/users/${id}`,
    UPDATE: (id: string) => `/api/v1/users/${id}`,
    DELETE: (id: string) => `/api/v1/users/${id}`,
  },

  // Book endpoints
  BOOKS: {
    BASE: '/api/v1/books',
    BY_ID: (id: string) => `/api/v1/books/${id}`,
    CREATE: '/api/v1/books',
    UPDATE: (id: string) => `/api/v1/books/${id}`,
    DELETE: (id: string) => `/api/v1/books/${id}`,
  },

  // Product endpoints
  PRODUCTS: {
    BASE: '/api/v1/products',
    BY_ID: (id: string) => `/api/v1/products/${id}`,
    CREATE: '/api/v1/products',
    UPDATE: (id: string) => `/api/v1/products/${id}`,
    DELETE: (id: string) => `/api/v1/products/${id}`,
  },
} as const;
