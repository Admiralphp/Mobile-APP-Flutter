import api from './api';

// Mock order data
const ORDERS = [
  {
    id: '1',
    orderNumber: 'ORD-2023-001',
    date: '2023-05-10',
    status: 'delivered',
    total: 79.98,
    items: [
      {
        id: '1',
        name: 'Premium Silicone Case for iPhone 13',
        quantity: 1,
        price: 49.99,
        image: 'https://images.pexels.com/photos/4526401/pexels-photo-4526401.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        id: '4',
        name: 'Braided USB-C to Lightning Cable (6ft)',
        quantity: 1,
        price: 24.99,
        image: 'https://images.pexels.com/photos/6007858/pexels-photo-6007858.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-002',
    date: '2023-06-15',
    status: 'shipped',
    total: 229.98,
    items: [
      {
        id: '3',
        name: 'Noise-Cancelling Wireless Earbuds',
        quantity: 1,
        price: 199.99,
        image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        id: '2',
        name: 'Fast Wireless Charger 15W',
        quantity: 1,
        price: 29.99,
        image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
    ],
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

export const getOrders = async () => {
  try {
    // For real API call:
    // const response = await api.get('/orders');
    // return response.data;
    
    // Simulate API call
    return simulateApiCall(ORDERS);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    // For real API call:
    // const response = await api.get(`/orders/${orderId}`);
    // return response.data;
    
    // Simulate API call
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    return simulateApiCall(order);
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

export const placeOrder = async (cartItems: any[], shippingInfo: any, paymentInfo: any) => {
  try {
    // For real API call:
    // const response = await api.post('/orders', { items: cartItems, shipping: shippingInfo, payment: paymentInfo });
    // return response.data;
    
    // Simulate API call
    const newOrder = {
      id: `${ORDERS.length + 1}`,
      orderNumber: `ORD-2023-00${ORDERS.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      items: cartItems,
    };
    
    ORDERS.push(newOrder);
    
    return simulateApiCall({ success: true, order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    // For real API call:
    // const response = await api.put(`/orders/${orderId}/cancel`);
    // return response.data;
    
    // Simulate API call
    const order = ORDERS.find(o => o.id === orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    if (order.status === 'delivered') {
      throw new Error('Cannot cancel a delivered order');
    }
    
    order.status = 'cancelled';
    
    return simulateApiCall({ success: true });
  } catch (error) {
    console.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
};