import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  rating,
  isFavorite = false,
  onToggleFavorite
}: ProductCardProps) {
  const colorScheme = useColorScheme();

  const handlePress = () => {
    router.push({
      pathname: '/product/[id]',
      params: { id }
    });
  };

  const handleFavoritePress = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        colorScheme === 'dark' && styles.darkContainer
      ]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        {onToggleFavorite && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
          >
            <Heart 
              size={20} 
              color={isFavorite ? '#ef4444' : (colorScheme === 'dark' ? '#d1d5db' : '#6b7280')} 
              fill={isFavorite ? '#ef4444' : 'none'} 
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text 
          style={[
            styles.name,
            colorScheme === 'dark' && styles.darkText
          ]}
          numberOfLines={2}
        >
          {name}
        </Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkContainer: {
    backgroundColor: '#374151',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    height: 40,
  },
  darkText: {
    color: '#f9fafb',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
  },
});