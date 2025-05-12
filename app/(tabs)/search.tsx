import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  FlatList, 
  TouchableOpacity, 
  Image,
  useColorScheme,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { useProducts } from '@/hooks/useProducts';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const { allProducts, categories, isLoading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: null,
    priceRange: null,
    sortBy: 'popular',  // 'popular', 'price-asc', 'price-desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Price ranges for filtering
  const priceRanges = [
    { label: 'Under $25', value: '0-25' },
    { label: '$25 - $50', value: '25-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: '100-999' },
  ];

  // Sort options
  const sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest', value: 'newest' },
  ];

  useEffect(() => {
    if (searchQuery.trim() === '' && !activeFilters.category && !activeFilters.priceRange) {
      setSearchResults([]);
      return;
    }

    let results = [...allProducts];

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (activeFilters.category) {
      results = results.filter(product => product.categoryId === activeFilters.category);
    }

    // Apply price range filter
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange.split('-').map(Number);
      results = results.filter(product => product.price >= min && product.price <= max);
    }

    // Apply sorting
    switch (activeFilters.sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
      default:
        // Assuming products already have some sort of popularity rank
        // or we can use rating or sales data
        break;
    }

    setSearchResults(results);
  }, [searchQuery, activeFilters, allProducts]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const clearFilters = () => {
    setActiveFilters({
      category: null,
      priceRange: null,
      sortBy: 'popular',
    });
  };

  const toggleFilter = (type, value) => {
    setActiveFilters(prev => {
      // If the same filter is clicked again, remove it
      if (prev[type] === value) {
        return { ...prev, [type]: null };
      }
      return { ...prev, [type]: value };
    });
  };

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
        ]}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={[
          styles.searchInputContainer,
          colorScheme === 'dark' && styles.darkSearchInputContainer
        ]}>
          <SearchIcon size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          <TextInput
            style={[
              styles.searchInput,
              colorScheme === 'dark' && styles.darkSearchInput
            ]}
            placeholder="Search products..."
            placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal 
            size={20} 
            color={
              Object.values(activeFilters).some(value => value !== null && value !== 'popular')
                ? '#3b82f6' 
                : colorScheme === 'dark' ? '#f9fafb' : '#1f2937'
            }
          />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={[
          styles.filtersContainer,
          colorScheme === 'dark' && styles.darkFiltersContainer
        ]}>
          <View style={styles.filterSection}>
            <Text style={[
              styles.filterTitle,
              colorScheme === 'dark' && styles.darkText
            ]}>Categories</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity 
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    activeFilters.category === category.id && styles.activeFilter
                  ]}
                  onPress={() => toggleFilter('category', category.id)}
                >
                  <Text style={[
                    styles.categoryChipText,
                    activeFilters.category === category.id && styles.activeFilterText
                  ]}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={[
              styles.filterTitle,
              colorScheme === 'dark' && styles.darkText
            ]}>Price Range</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.priceRangesContainer}
            >
              {priceRanges.map((range) => (
                <TouchableOpacity 
                  key={range.value}
                  style={[
                    styles.priceChip,
                    activeFilters.priceRange === range.value && styles.activeFilter
                  ]}
                  onPress={() => toggleFilter('priceRange', range.value)}
                >
                  <Text style={[
                    styles.priceChipText,
                    activeFilters.priceRange === range.value && styles.activeFilterText
                  ]}>{range.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={[
              styles.filterTitle,
              colorScheme === 'dark' && styles.darkText
            ]}>Sort By</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sortOptionsContainer}
            >
              {sortOptions.map((option) => (
                <TouchableOpacity 
                  key={option.value}
                  style={[
                    styles.sortChip,
                    activeFilters.sortBy === option.value && styles.activeFilter
                  ]}
                  onPress={() => toggleFilter('sortBy', option.value)}
                >
                  <Text style={[
                    styles.sortChipText,
                    activeFilters.sortBy === option.value && styles.activeFilterText
                  ]}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity 
            style={styles.clearFiltersButton}
            onPress={clearFilters}
          >
            <Text style={styles.clearFiltersText}>Clear All Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {searchResults.length === 0 && searchQuery.trim() !== '' && (
        <View style={styles.noResultsContainer}>
          <Text style={[
            styles.noResultsText,
            colorScheme === 'dark' && styles.darkText
          ]}>No products found for "{searchQuery}"</Text>
        </View>
      )}

      {(searchResults.length > 0 || (searchQuery.trim() === '' && (activeFilters.category || activeFilters.priceRange))) && (
        <FlatList
          data={searchResults}
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
          contentContainerStyle={styles.resultsContainer}
        />
      )}

      {searchResults.length === 0 && searchQuery.trim() === '' && !activeFilters.category && !activeFilters.priceRange && (
        <View style={styles.initialSearchState}>
          <Text style={[
            styles.initialSearchText,
            colorScheme === 'dark' && styles.darkText
          ]}>Search for products, brands, or accessories</Text>
          
          <Text style={[
            styles.popularSearchTitle,
            colorScheme === 'dark' && styles.darkText
          ]}>Popular Searches</Text>
          
          <View style={styles.popularSearches}>
            {['Phone Cases', 'Wireless Chargers', 'Earbuds', 'Screen Protectors'].map((term, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.popularSearchChip}
                onPress={() => setSearchQuery(term)}
              >
                <Text style={styles.popularSearchText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
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
  header: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  darkSearchInputContainer: {
    backgroundColor: '#374151',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  darkSearchInput: {
    color: '#f9fafb',
  },
  filterButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkFiltersContainer: {
    backgroundColor: '#374151',
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingRight: 16,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 14,
  },
  priceRangesContainer: {
    paddingRight: 16,
  },
  priceChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  priceChipText: {
    fontSize: 14,
  },
  sortOptionsContainer: {
    paddingRight: 16,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  sortChipText: {
    fontSize: 14,
  },
  activeFilter: {
    backgroundColor: '#3b82f6',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  clearFiltersButton: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  clearFiltersText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  resultsContainer: {
    padding: 16,
  },
  productGrid: {
    justifyContent: 'space-between',
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  initialSearchState: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  initialSearchText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  popularSearchTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  popularSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  popularSearchChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
  },
  popularSearchText: {
    color: '#3b82f6',
    fontSize: 14,
  },
});