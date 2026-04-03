/**
 * User related type definitions
 */

import type { ID, Status } from './common.type';

export interface User {
  _id: ID;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role?: UserRole;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserProfile extends User {
  bio?: string;
  address?: string;
  dateOfBirth?: string;
}

export interface UpdateUserData {
  fullName?: string;
  phone?: string;
  avatar?: string;
}
