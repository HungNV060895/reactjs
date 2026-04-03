/**
 * Custom hook for authentication
 * Provides easy access to auth context
 */

import { useContext } from 'react';
import { AuthContext } from '@/components/context/auth.context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthWrapper');
  }
  
  return context;
};
