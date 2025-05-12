import { useState, useEffect, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  variant?: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Initialize cart from local storage (if available)
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        // In a real app, this could be fetched from an API or local storage
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo purposes, initialize with empty cart
        // In a real app, we would retrieve from storage:
        // const savedCart = localStorage.getItem('cart');
        // if (savedCart) {
        //   setCartItems(JSON.parse(savedCart));
        // }
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load cart');
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart changes to local storage (if available)
  useEffect(() => {
    if (cartItems.length > 0 && typeof window !== 'undefined') {
      // In a real app, we would save to storage:
      // localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, item];
      }
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    // In a real app:
    // localStorage.removeItem('cart');
  }, []);

  // Check if item is in cart
  const isItemInCart = useCallback((itemId: string) => {
    return cartItems.some(item => item.id === itemId);
  }, [cartItems]);

  return {
    cartItems,
    cartTotal,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isItemInCart
  };
};