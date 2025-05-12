import api from './api';

// Mock user profile
let USER_PROFILE = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-123-4567',
  address: '123 Main St, Anytown, USA 12345',
};

// Helper function to simulate API call
const simulateApiCall = (data: any, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const getUserProfile = async () => {
  try {
    // For real API call:
    // const response = await api.get('/user/profile');
    // return response.data;
    
    // Simulate API call
    return simulateApiCall(USER_PROFILE);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: any) => {
  try {
    // For real API call:
    // const response = await api.put('/user/profile', profileData);
    // return response.data;
    
    // Simulate API call
    USER_PROFILE = { ...USER_PROFILE, ...profileData };
    return simulateApiCall({ success: true, user: USER_PROFILE });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    // For real API call:
    // const response = await api.put('/user/password', { currentPassword, newPassword });
    // return response.data;
    
    // Simulate API call
    return simulateApiCall({ success: true });
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};