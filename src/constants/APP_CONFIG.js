/**
 * Application Configuration Constants
 */

export const APP_CONFIG = {
  APP_NAME: 'MyReactJS',
  APP_VERSION: '1.0.0',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  
  // API
  API_TIMEOUT: 30000, // 30 seconds
  
  // Storage keys
  STORAGE_KEYS: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_INFO: 'user_info',
    THEME: 'theme',
    LANGUAGE: 'language',
  },
  
  // Date formats
  DATE_FORMAT: 'DD/MM/YYYY',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm:ss',
  TIME_FORMAT: 'HH:mm:ss',
  
  // File upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  
  // Validation
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 50,
  
};
