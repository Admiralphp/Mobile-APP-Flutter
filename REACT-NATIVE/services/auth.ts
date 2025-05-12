import api from './api';

// Mock data for development
const USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
];

// Helper function to simulate API call
const simulateApiCall = (data: any, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const loginUser = async (email: string, password: string) => {
  try {
    // For real API call:
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
    
    // Simulate API call
    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...userData } = user;
    
    return simulateApiCall({
      token: 'mock-jwt-token',
      user: userData,
    });
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    // For real API call:
    // const response = await api.post('/auth/register', { name, email, password });
    // return response.data;
    
    // Simulate API call
    const existingUser = USERS.find((u) => u.email === email);
    
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    const newUser = {
      id: String(USERS.length + 1),
      name,
      email,
      password,
    };
    
    USERS.push(newUser);
    
    const { password: _, ...userData } = newUser;
    
    return simulateApiCall({
      token: 'mock-jwt-token',
      user: userData,
    });
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    // For real API call:
    // const response = await api.post('/auth/forgot-password', { email });
    // return response.data;
    
    // Simulate API call
    const user = USERS.find((u) => u.email === email);
    
    if (!user) {
      throw new Error('Email not found');
    }
    
    return simulateApiCall({
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};