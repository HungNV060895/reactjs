/**
 * Common TypeScript type definitions
 * Used across the application
 */

// API Response wrapper
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  statusCode?: number;
  error?: string;
}

// Pagination
export interface PaginationParams {
  current: number;
  pageSize: number;
  total?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current: number;
    pageSize: number;
    total: number;
    pages: number;
  };
}

// Loading state
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Form field error
export interface FieldError {
  field: string;
  message: string;
}

// Generic ID types
export type ID = string | number;

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'deleted';

// Sort order
export type SortOrder = 'asc' | 'desc';

// Generic filter params
export interface FilterParams {
  search?: string;
  status?: Status;
  sortBy?: string;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}
