import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useContext } from 'react';
import { useRouter } from 'expo-router';
import { CartContext } from '@/context/CartContext';
import { CircleMinus as MinusCircle, CirclePlus as PlusCircle, Trash2 } from 'lucide-react-native';

type CartItemProps = {
  item: {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    quantity: number;
  };
};

export function CartItem({ item }: CartItemProps) {
  const router = useRouter();
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${item.name} from your cart?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeFromCart(item.id),
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleNavigateToProduct = () => {
    router.push(`/product/${item.id}`);
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleNavigateToProduct}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
      
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={handleNavigateToProduct}>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        </TouchableOpacity>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={handleRemove}
          >
            <Trash2 size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.quantityRow}>
          <TouchableOpacity 
            onPress={handleDecrement}
            disabled={item.quantity <= 1}
          >
            <MinusCircle 
              size={24} 
              color={item.quantity > 1 ? '#3B82F6' : '#CBD5E1'} 
              fill="transparent" 
            />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity onPress={handleIncrement}>
            <PlusCircle size={24} color="#3B82F6" fill="transparent" />
          </TouchableOpacity>
          
          <Text style={styles.subtotal}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  brand: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  removeButton: {
    padding: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  subtotal: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
});