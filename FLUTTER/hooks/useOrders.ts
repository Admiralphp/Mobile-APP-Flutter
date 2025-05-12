import { useState, useEffect, useCallback } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'credit_card' | 'paypal' | 'apple_pay';
    lastFour?: string;
  };
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for orders
  const mockOrders: Order[] = [
    {
      id: 'ord-001',
      items: [
        { id: 'prod1', name: 'Premium Silicone Case', price: 29.99, quantity: 1, variant: 'Black' },
        { id: 'prod2', name: 'Screen Protector', price: 19.99, quantity: 2 }
      ],
      total: 69.97,
      status: 'delivered',
      createdAt: '2023-01-15T08:30:00Z',
      updatedAt: '2023-01-18T14:20:00Z',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2023-01-18T00:00:00Z',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: {
        type: 'credit_card',
        lastFour: '4242'
      }
    },
    {
      id: 'ord-002',
      items: [
        { id: 'prod3', name: 'Fast Wireless Charger', price: 39.99, quantity: 1 },
        { id: 'prod5', name: 'Wireless Earbuds', price: 79.99, quantity: 1, variant: 'White' }
      ],
      total: 119.98,
      status: 'shipped',
      createdAt: '2023-02-20T10:15:00Z',
      updatedAt: '2023-02-21T09:45:00Z',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2023-02-25T00:00:00Z',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: {
        type: 'paypal'
      }
    },
    {
      id: 'ord-003',
      items: [
        { id: 'prod4', name: 'Phone Stand', price: 24.99, quantity: 1, variant: 'Silver' },
        { id: 'prod7', name: 'USB-C Fast Charging Cable', price: 14.99, quantity: 2 }
      ],
      total: 54.97,
      status: 'processing',
      createdAt: '2023-03-05T14:20:00Z',
      updatedAt: '2023-03-05T16:30:00Z',
      shippingAddress: {
        name: 'John Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      paymentMethod: {
        type: 'credit_card',
        lastFour: '1234'
      }
    }
  ];

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would fetch from an API
        setOrders(mockOrders);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Get order by ID
  const getOrderById = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  // Place new order
  const placeOrder = useCallback(async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Order | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would make an API request to create an order
      const newOrder: Order = {
        ...order,
        id: `ord-${Date.now().toString().slice(-6)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setIsLoading(false);
      
      return newOrder;
    } catch (err) {
      setError('Failed to place order');
      setIsLoading(false);
      return null;
    }
  }, []);

  // Cancel order
  const cancelOrder = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API request to cancel an order
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() } 
            : order
        )
      );
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Failed to cancel order');
      setIsLoading(false);
      return false;
    }
  }, []);

  return {
    orders,
    isLoading,
    error,
    getOrderById,
    placeOrder,
    cancelOrder
  };
};