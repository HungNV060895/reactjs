/**
 * API related type definitions
 */

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}
