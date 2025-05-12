import api from './api';

// Mock data for development
const BANNERS = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Up to 50% off on selected items',
    imageUrl: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'New Arrivals',
    description: 'Check out our latest products',
    imageUrl: 'https://images.pexels.com/photos/3944396/pexels-photo-3944396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const CATEGORIES = [
  {
    id: '1',
    name: 'Cases',
    image: 'https://images.pexels.com/photos/4526408/pexels-photo-4526408.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Chargers',
    image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Earphones',
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    name: 'Cables',
    image: 'https://images.pexels.com/photos/6007858/pexels-photo-6007858.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '5',
    name: 'Speakers',
    image: 'https://images.pexels.com/photos/164820/pexels-photo-164820.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Premium Silicone Case for iPhone 13',
    brand: 'Apple',
    price: 49.99,
    oldPrice: 59.99,
    image: 'https://images.pexels.com/photos/4526401/pexels-photo-4526401.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/4526401/pexels-photo-4526401.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4526406/pexels-photo-4526406.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4526405/pexels-photo-4526405.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    rating: 4.8,
    reviewCount: 245,
    description: 'Designed by Apple to complement iPhone 13, the Silicone Case with MagSafe is a delightful way to protect your iPhone. The silky, soft-touch finish of the silicone exterior feels great in your hand. And on the inside, there\'s a soft microfiber lining for even more protection.',
    features: [
      'Made with high-quality silicone',
      'Soft microfiber lining inside',
      'MagSafe compatible',
      'Available in multiple colors',
      'Precise cutouts for easy access to buttons',
    ],
    category: '1',
  },
  {
    id: '2',
    name: 'Fast Wireless Charger 15W',
    brand: 'Anker',
    price: 29.99,
    oldPrice: null,
    image: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4220866/pexels-photo-4220866.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1080118/pexels-photo-1080118.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    rating: 4.5,
    reviewCount: 189,
    description: 'The Anker Wireless Charger delivers the fastest possible charge to your device with up to 15W of power. Featuring advanced temperature control and foreign object detection for safe, worry-free charging.',
    features: [
      '15W fast wireless charging',
      'Universal compatibility with Qi devices',
      'LED charging indicator',
      'Foreign object detection',
      'Compact and portable design',
    ],
    category: '2',
  },
  {
    id: '3',
    name: 'Noise-Cancelling Wireless Earbuds',
    brand: 'Sony',
    price: 199.99,
    oldPrice: 249.99,
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    rating: 4.7,
    reviewCount: 312,
    description: 'Experience superior sound quality with Sony\'s industry-leading noise cancellation technology. These earbuds deliver crisp, clear audio and feature a comfortable, secure fit for all-day listening.',
    features: [
      'Active noise cancellation',
      'Up to 8 hours of battery life',
      'Water and sweat resistant (IPX4)',
      'Touch controls for easy operation',
      'Voice assistant compatible',
    ],
    category: '3',
  },
  {
    id: '4',
    name: 'Braided USB-C to Lightning Cable (6ft)',
    brand: 'Belkin',
    price: 24.99,
    oldPrice: 29.99,
    image: 'https://images.pexels.com/photos/6007858/pexels-photo-6007858.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/6007858/pexels-photo-6007858.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4219863/pexels-photo-4219863.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    rating: 4.6,
    reviewCount: 178,
    description: 'This premium braided cable from Belkin combines style, durability, and fast charging capabilities. The nylon braiding adds a layer of protection against everyday wear and tear.',
    features: [
      'Premium double-braided nylon exterior',
      'MFi certified for iPhone compatibility',
      'Supports fast charging up to 20W',
      'Reinforced stress points for durability',
      'Available in multiple colors and lengths',
    ],
    category: '4',
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    brand: 'JBL',
    price: 129.99,
    oldPrice: 149.99,
    image: 'https://images.pexels.com/photos/164820/pexels-photo-164820.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/164820/pexels-photo-164820.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/191877/pexels-photo-191877.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    rating: 4.9,
    reviewCount: 423,
    description: 'Take your music anywhere with this powerful, portable Bluetooth speaker. Delivering JBL\'s signature sound with deep bass and crystal-clear highs, this speaker is perfect for parties, beach days, or everyday listening.',
    features: [
      'Powerful, room-filling sound',
      'Waterproof design (IPX7)',
      'Up to 20 hours of playtime',
      'Built-in power bank to charge devices',
      'Wireless Bluetooth streaming',
    ],
    category: '5',
  },
  {
    id: '6',
    name: 'Rugged Phone Case with Card Holder',
    brand: 'Spigen',
    price: 34.99,
    oldPrice: null,
    image: 'https://images.pexels.com/photos/4526408/pexels-photo-4526408.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/4526408/pexels-photo-4526408.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4526409/pexels-photo-4526409.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4526406/pexels-photo-4526406.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    rating: 4.4,
    reviewCount: 156,
    description: 'This rugged case provides superior protection for your smartphone while also offering convenient card storage. The dual-layer design absorbs shocks and prevents damage from drops and falls.',
    features: [
      'Military-grade drop protection',
      'Hidden card slot holds up to 2 cards',
      'Raised edges to protect screen and camera',
      'Wireless charging compatible',
      'Slim profile despite rugged protection',
    ],
    category: '1',
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

export const getBanners = async () => {
  try {
    // For real API call:
    // const response = await api.get('/banners');
    // return response.data;
    
    // Simulate API call
    return simulateApiCall(BANNERS);
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    // For real API call:
    // const response = await api.get('/categories');
    // return response.data;
    
    // Simulate API call
    return simulateApiCall(CATEGORIES);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    // For real API call:
    // const response = await api.get('/products/featured');
    // return response.data;
    
    // Simulate API call
    return simulateApiCall(PRODUCTS);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    // For real API call:
    // const response = await api.get(`/products/${id}`);
    // return response.data;
    
    // Simulate API call
    const product = PRODUCTS.find(p => p.id === id);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return simulateApiCall(product);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: string) => {
  try {
    // For real API call:
    // const response = await api.get(`/products?category=${categoryId}`);
    // return response.data;
    
    // Simulate API call
    const filteredProducts = PRODUCTS.filter(p => p.category === categoryId);
    return simulateApiCall(filteredProducts);
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

export const searchProducts = async (query: string, filters: any = {}) => {
  try {
    // For real API call:
    // const response = await api.get('/products/search', { 
    //   params: { 
    //     q: query,
    //     ...filters 
    //   } 
    // });
    // return response.data;
    
    // Simulate API call
    let filteredProducts = [...PRODUCTS];
    
    // Apply search query
    if (query) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(p => 
        filters.brands.includes(p.brand)
      );
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(p => 
        p.price >= min && p.price <= max
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'priceAsc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          // Assuming the order in the array is newest first for this mock
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default: // popularity
          // For mock purposes, we'll just use the default order
          break;
      }
    }
    
    return simulateApiCall(filteredProducts);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};