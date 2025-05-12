import api from './api';

// Helper function to simulate API call
const simulateApiCall = (data: any, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Mock cart data
let CART_ITEMS = [
  {
    id: '1',
    name: 'Premium Silicone Case for iPhone 13',
    brand: 'Apple',
    price: 49.99,
    image: 'https://images.pexels.com/photos/4526401/pexels-photo-4526401.jpeg?auto=compress&cs=tinysrgb&w=600',
    quantity: 1,
  },
];

export const getCart = async () => {
  try {
    // For real API call:
    // const response = await api.get('/cart');
    // return response.data;
    
    // Simulate API call
    return simulateApiCall(CART_ITEMS);
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const updateCart = async (cartItems: any[]) => {
  try {
    // For real API call:
    // const response = await api.put('/cart', { items: cartItems });
    // return response.data;
    
    // Simulate API call
    CART_ITEMS = [...cartItems];
    return simulateApiCall({ success: true });
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const addToCart = async (productId: string, quantity: number) => {
  try {
    // For real API call:
    // const response = await api.post('/cart/items', { productId, quantity });
    // return response.data;
    
    // Simulate API call
    const existingItem = CART_ITEMS.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // In a real app, we would fetch the product details here
      CART_ITEMS.push({
        id: productId,
        name: 'Mock Product',
        brand: 'Mock Brand',
        price: 29.99,
        image: 'https://images.pexels.com/photos/4526401/pexels-photo-4526401.jpeg?auto=compress&cs=tinysrgb&w=600',
        quantity,
      });
    }
    
    return simulateApiCall({ success: true });
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    // For real API call:
    // const response = await api.delete(`/cart/items/${productId}`);
    // return response.data;
    
    // Simulate API call
    CART_ITEMS = CART_ITEMS.filter(item => item.id !== productId);
    return simulateApiCall({ success: true });
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    // For real API call:
    // const response = await api.delete('/cart');
    // return response.data;
    
    // Simulate API call
    CART_ITEMS = [];
    return simulateApiCall({ success: true });
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};