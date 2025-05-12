import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Initialize auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would check for tokens in local storage or cookies
        // and validate them with the backend
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, initialize as not authenticated
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      } catch (err) {
        setError('Authentication check failed');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API request to authenticate
      // For demo purposes, accept any credentials
      const userData: User = {
        id: '123456',
        email: email,
        name: 'John Doe',
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      // In a real app, we would store authentication tokens
      // localStorage.setItem('authToken', 'sample-token');
      
      return true;
    } catch (err) {
      setError('Login failed');
      setIsLoading(false);
      return false;
    }
  }, []);

  // Register function
  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API request to register a new user
      // For demo purposes, simulate successful registration
      const userData: User = {
        id: '123456',
        email: email,
        name: name,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
      
      // In a real app, we would store authentication tokens
      // localStorage.setItem('authToken', 'sample-token');
      
      return true;
    } catch (err) {
      setError('Registration failed');
      setIsLoading(false);
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would invalidate tokens on the server
      setUser(null);
      setIsAuthenticated(false);
      
      // In a real app, we would remove tokens from storage
      // localStorage.removeItem('authToken');
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Logout failed');
      setIsLoading(false);
      return false;
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API request to update user data
      setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Profile update failed');
      setIsLoading(false);
      return false;
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };
};