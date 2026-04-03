/**
 * User Service Layer
 * Handles all user-related API calls
 */

import axios from './axios.custom';
import type { User, UpdateUserData } from '@/types/user.type';
import type { ApiResponse, PaginatedResponse } from '@/types/common.type';
import { API_ENDPOINTS } from '@/constants/API_ENDPOINTS';

export const userService = {
  /**
   * Get all users with pagination
   */
  getUsers: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> => {
    const response = await axios.get<PaginatedResponse<User>>(API_ENDPOINTS.USERS.BASE, {
      params: { current: page, pageSize: limit },
    });
    return response.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await axios.get<ApiResponse<User>>(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  /**
   * Create new user
   */
  createUser: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await axios.post<ApiResponse<User>>(API_ENDPOINTS.USERS.BASE, data);
    return response.data;
  },

  /**
   * Update user
   */
  updateUser: async (id: string, data: UpdateUserData): Promise<ApiResponse<User>> => {
    const response = await axios.put<ApiResponse<User>>(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Delete user
   */
  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await axios.delete<ApiResponse<void>>(API_ENDPOINTS.USERS.DELETE(id));
    return response.data;
  },
};
