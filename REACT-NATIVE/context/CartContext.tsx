import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from './AuthContext';
import { getCart, updateCart as updateCartApi } from '@/services/cart';

// For web compatibility
const secureStore = {
  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return await SecureStore.setItemAsync(key, value);
  }
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
};

type CartContextType = {
  cart: CartItem[];
  cartTotal: number;
  itemCount: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  cartTotal: 0,
  itemCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  loading: false,
});

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(AuthContext);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Calculate total item count
  const itemCount = cart.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
  
  // Load cart from storage or API on mount and when user changes
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        
        if (user && token) {
          // If logged in, get cart from API
          const apiCart = await getCart();
          setCart(apiCart);
        } else {
          // If not logged in, get cart from local storage
          const storedCart = await secureStore.getItem('cart');
          if (storedCart) {
            setCart(JSON.parse(storedCart));
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCart();
  }, [user, token]);
  
  // Save cart to storage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        if (user && token) {
          // If logged in, update cart in API
          await updateCartApi(cart);
        }
        
        // Always save to local storage as backup
        await secureStore.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };
    
    // Only save if cart has been loaded (not initial state)
    if (!loading) {
      saveCart();
    }
  }, [cart, user, token]);
  
  const addToCart = (product: CartItem) => {
    setCart(currentCart => {
      // Check if product already exists in cart
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If exists, update quantity
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        // If not exists, add new item
        return [...currentCart, product];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    setCart(currentCart => 
      currentCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartTotal, 
        itemCount, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        loading 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}