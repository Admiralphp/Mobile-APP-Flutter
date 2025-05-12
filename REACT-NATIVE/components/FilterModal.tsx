import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { X } from 'lucide-react-native';

type Brand = {
  id: string;
  name: string;
};

const BRANDS: Brand[] = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Samsung' },
  { id: '3', name: 'Sony' },
  { id: '4', name: 'JBL' },
  { id: '5', name: 'Anker' },
  { id: '6', name: 'Belkin' },
];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'priceAsc', label: 'Price: Low to High' },
  { value: 'priceDesc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  initialFilters: {
    brands: string[];
    priceRange: [number, number];
    sortBy: string;
  };
};

export function FilterModal({ 
  visible, 
  onClose, 
  onApply, 
  initialFilters 
}: FilterModalProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialFilters.brands);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange);
  const [sortBy, setSortBy] = useState<string>(initialFilters.sortBy);
  
  const toggleBrand = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter(id => id !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };
  
  const handleApply = () => {
    onApply({
      brands: selectedBrands,
      priceRange,
      sortBy,
    });
  };
  
  const handleReset = () => {
    setSelectedBrands([]);
    setPriceRange([0, 1000]);
    setSortBy('popularity');
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter & Sort</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="#4B5563" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.sortOptions}>
                {SORT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.sortOption,
                      sortBy === option.value && styles.selectedSortOption
                    ]}
                    onPress={() => setSortBy(option.value)}
                  >
                    <Text 
                      style={[
                        styles.sortOptionText,
                        sortBy === option.value && styles.selectedSortOptionText
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Brands</Text>
              <View style={styles.brandOptions}>
                {BRANDS.map((brand) => (
                  <TouchableOpacity
                    key={brand.id}
                    style={[
                      styles.brandOption,
                      selectedBrands.includes(brand.id) && styles.selectedBrandOption
                    ]}
                    onPress={() => toggleBrand(brand.id)}
                  >
                    <Text 
                      style={[
                        styles.brandOptionText,
                        selectedBrands.includes(brand.id) && styles.selectedBrandOptionText
                      ]}
                    >
                      {brand.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRangeOptions}>
                <TouchableOpacity
                  style={[
                    styles.priceRangeOption,
                    priceRange[0] === 0 && priceRange[1] === 1000 && styles.selectedPriceRangeOption
                  ]}
                  onPress={() => setPriceRange([0, 1000])}
                >
                  <Text 
                    style={[
                      styles.priceRangeOptionText,
                      priceRange[0] === 0 && priceRange[1] === 1000 && styles.selectedPriceRangeOptionText
                    ]}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priceRangeOption,
                    priceRange[0] === 0 && priceRange[1] === 50 && styles.selectedPriceRangeOption
                  ]}
                  onPress={() => setPriceRange([0, 50])}
                >
                  <Text 
                    style={[
                      styles.priceRangeOptionText,
                      priceRange[0] === 0 && priceRange[1] === 50 && styles.selectedPriceRangeOptionText
                    ]}
                  >
                    Under $50
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priceRangeOption,
                    priceRange[0] === 50 && priceRange[1] === 100 && styles.selectedPriceRangeOption
                  ]}
                  onPress={() => setPriceRange([50, 100])}
                >
                  <Text 
                    style={[
                      styles.priceRangeOptionText,
                      priceRange[0] === 50 && priceRange[1] === 100 && styles.selectedPriceRangeOptionText
                    ]}
                  >
                    $50 - $100
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priceRangeOption,
                    priceRange[0] === 100 && priceRange[1] === 200 && styles.selectedPriceRangeOption
                  ]}
                  onPress={() => setPriceRange([100, 200])}
                >
                  <Text 
                    style={[
                      styles.priceRangeOptionText,
                      priceRange[0] === 100 && priceRange[1] === 200 && styles.selectedPriceRangeOptionText
                    ]}
                  >
                    $100 - $200
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priceRangeOption,
                    priceRange[0] === 200 && priceRange[1] === 1000 && styles.selectedPriceRangeOption
                  ]}
                  onPress={() => setPriceRange([200, 1000])}
                >
                  <Text 
                    style={[
                      styles.priceRangeOptionText,
                      priceRange[0] === 200 && priceRange[1] === 1000 && styles.selectedPriceRangeOptionText
                    ]}
                  >
                    Over $200
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  sortOptions: {},
  sortOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F3F4F6',
  },
  selectedSortOption: {
    backgroundColor: '#EBF4FF',
  },
  sortOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  selectedSortOptionText: {
    color: '#3B82F6',
  },
  brandOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brandOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F3F4F6',
  },
  selectedBrandOption: {
    backgroundColor: '#EBF4FF',
  },
  brandOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  selectedBrandOptionText: {
    color: '#3B82F6',
  },
  priceRangeOptions: {},
  priceRangeOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F3F4F6',
  },
  selectedPriceRangeOption: {
    backgroundColor: '#EBF4FF',
  },
  priceRangeOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  selectedPriceRangeOptionText: {
    color: '#3B82F6',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4B5563',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 12,
    marginLeft: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
});