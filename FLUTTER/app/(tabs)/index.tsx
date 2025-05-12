import { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { useProducts } from '@/hooks/useProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, ChevronRight } from 'lucide-react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { categories, featuredProducts, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[
      styles.container, 
      colorScheme === 'dark' && styles.darkContainer
    ]}>
      <View style={styles.header}>
        <Text style={[
          styles.headerTitle,
          colorScheme === 'dark' && styles.darkText
        ]}>PhoneGear</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color={colorScheme === 'dark' ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[
              styles.sectionTitle,
              colorScheme === 'dark' && styles.darkText
            ]}>Categories</Text>
            <TouchableOpacity 
              onPress={() => router.push('/categories')}
              style={styles.viewAll}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
                <Text style={[
                  styles.categoryText,
                  colorScheme === 'dark' && styles.darkText
                ]}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[
              styles.sectionTitle,
              colorScheme === 'dark' && styles.darkText
            ]}>Featured Products</Text>
            <TouchableOpacity 
              onPress={() => router.push('/search')}
              style={styles.viewAll}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={featuredProducts}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.productCard,
                  colorScheme === 'dark' && styles.darkProductCard
                ]}
                onPress={() => router.push({
                  pathname: '/product/[id]',
                  params: { id: item.id }
                })}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={[
                    styles.productName,
                    colorScheme === 'dark' && styles.darkText
                  ]}>{item.name}</Text>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
            columnWrapperStyle={styles.productGrid}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  darkText: {
    color: '#f9fafb',
  },
  filterButton: {
    padding: 8,
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
    marginRight: 4,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
  productGrid: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkProductCard: {
    backgroundColor: '#374151',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
  },
});