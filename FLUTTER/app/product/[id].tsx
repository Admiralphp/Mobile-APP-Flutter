import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { ChevronLeft, Star, ShoppingCart, Heart } from 'lucide-react-native';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const { getProductById, isLoading, error } = useProducts();
  const { addToCart, isItemInCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      const productData = getProductById(id);
      setProduct(productData);
      if (productData?.variants?.length > 0) {
        setSelectedVariant(productData.variants[0]);
      }
    }
  }, [id, getProductById]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    // Simulate network delay for adding to cart
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images ? product.images[0] : product.imageUrl,
        quantity: 1,
        variant: selectedVariant?.name || 'Default'
      });
      setAddingToCart(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || "Product not found"}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Handle multiple product images or use the single imageUrl
  const productImages = product.images || [product.imageUrl];
  
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#f9fafb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft 
                size={24} 
                color={colorScheme === 'dark' ? '#f9fafb' : '#1f2937'} 
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={toggleFavorite}
            >
              <Heart 
                size={24} 
                color={isFavorite ? '#ef4444' : (colorScheme === 'dark' ? '#d1d5db' : '#6b7280')} 
                fill={isFavorite ? '#ef4444' : 'none'} 
              />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[
        styles.container, 
        colorScheme === 'dark' && styles.darkContainer
      ]} edges={['bottom']}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Product Image */}
          <Image 
            source={{ uri: productImages[selectedImageIndex] }} 
            style={styles.mainImage}
            resizeMode="cover"
          />

          {/* Thumbnail Row */}
          {productImages.length > 1 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailContainer}
            >
              {productImages.map((image, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.thumbnailWrapper,
                    selectedImageIndex === index && styles.selectedThumbnail
                  ]}
                  onPress={() => setSelectedImageIndex(index)}
                >
                  <Image source={{ uri: image }} style={styles.thumbnail} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Product Info */}
          <View style={styles.productInfoContainer}>
            <Text style={[
              styles.productName,
              colorScheme === 'dark' && styles.darkText
            ]}>{product.name}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={16}
                    color="#f59e0b" 
                    fill={star <= product.rating ? '#f59e0b' : 'none'}
                  />
                ))}
              </View>
              <Text style={styles.reviewCount}>({product.reviewCount || 0} reviews)</Text>
            </View>
            
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            
            {product.description && (
              <Text style={[
                styles.productDescription,
                colorScheme === 'dark' && styles.darkText
              ]}>{product.description}</Text>
            )}
          </View>

          {/* Variants Section */}
          {product.variants && product.variants.length > 0 && (
            <View style={styles.variantsContainer}>
              <Text style={[
                styles.variantsTitle,
                colorScheme === 'dark' && styles.darkText
              ]}>Variants</Text>
              
              <View style={styles.variantOptions}>
                {product.variants.map((variant, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.variantItem,
                      selectedVariant?.id === variant.id && styles.selectedVariant
                    ]}
                    onPress={() => setSelectedVariant(variant)}
                  >
                    <Text style={[
                      styles.variantText,
                      selectedVariant?.id === variant.id && styles.selectedVariantText
                    ]}>{variant.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Features Section */}
          {product.features && product.features.length > 0 && (
            <View style={styles.featuresContainer}>
              <Text style={[
                styles.featuresTitle,
                colorScheme === 'dark' && styles.darkText
              ]}>Key Features</Text>
              
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={[
                    styles.featureText,
                    colorScheme === 'dark' && styles.darkText
                  ]}>• {feature}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Related Products */}
          {product.relatedProducts && product.relatedProducts.length > 0 && (
            <View style={styles.relatedProductsContainer}>
              <Text style={[
                styles.relatedProductsTitle,
                colorScheme === 'dark' && styles.darkText
              ]}>You May Also Like</Text>
              
              <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedProductsList}
              >
                {product.relatedProducts.map((relatedProduct, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.relatedProductCard,
                      colorScheme === 'dark' && styles.darkRelatedProductCard
                    ]}
                    onPress={() => router.push({
                      pathname: '/product/[id]',
                      params: { id: relatedProduct.id }
                    })}
                  >
                    <Image 
                      source={{ uri: relatedProduct.imageUrl }} 
                      style={styles.relatedProductImage}
                    />
                    <View style={styles.relatedProductInfo}>
                      <Text style={[
                        styles.relatedProductName,
                        colorScheme === 'dark' && styles.darkText
                      ]} numberOfLines={2}>{relatedProduct.name}</Text>
                      <Text style={styles.relatedProductPrice}>
                        ${relatedProduct.price.toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
        
        {/* Add to Cart Button */}
        <View style={[
          styles.addToCartContainer,
          colorScheme === 'dark' && styles.darkAddToCartContainer
        ]}>
          {isItemInCart(product.id) ? (
            <TouchableOpacity 
              style={styles.viewCartButton}
              onPress={() => router.push('/cart')}
            >
              <Text style={styles.viewCartButtonText}>View in Cart</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <ShoppingCart size={20} color="#fff" style={styles.cartIcon} />
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  darkContainer: {
    backgroundColor: '#1f2937',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  mainImage: {
    width: width,
    height: width,
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbnailWrapper: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#3b82f6',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  productInfoContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  darkText: {
    color: '#f9fafb',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
  },
  variantsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  variantsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  variantOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  variantItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedVariant: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  variantText: {
    fontSize: 14,
  },
  selectedVariantText: {
    color: '#ffffff',
  },
  featuresContainer: {
    padding: 16,
    paddingTop: 0,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureItem: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
  },
  relatedProductsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  relatedProductsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  relatedProductsList: {
    paddingRight: 16,
  },
  relatedProductCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkRelatedProductCard: {
    backgroundColor: '#374151',
  },
  relatedProductImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  relatedProductInfo: {
    padding: 8,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    height: 40,
  },
  relatedProductPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3b82f6',
  },
  addToCartContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  darkAddToCartContainer: {
    backgroundColor: '#374151',
    borderTopColor: '#4b5563',
  },
  addToCartButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  viewCartButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  viewCartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 8,
  },
});