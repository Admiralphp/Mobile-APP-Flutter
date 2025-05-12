import { useState, useEffect, useCallback } from 'react';

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  categoryId?: string;
  images?: string[];
  features?: string[];
  variants?: ProductVariant[];
  relatedProducts?: RelatedProduct[];
  createdAt?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export const useProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for categories
  const mockCategories: Category[] = [
    {
      id: 'cat1',
      name: 'Cases',
      imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Protect your device with our premium cases'
    },
    {
      id: 'cat2',
      name: 'Chargers',
      imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Fast charging solutions for all your devices'
    },
    {
      id: 'cat3',
      name: 'Headphones',
      imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Immersive audio experiences'
    },
    {
      id: 'cat4',
      name: 'Screen Protectors',
      imageUrl: 'https://images.pexels.com/photos/2320369/pexels-photo-2320369.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Keep your screen safe from scratches'
    },
    {
      id: 'cat5',
      name: 'Stands',
      imageUrl: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Ergonomic stands for comfortable viewing'
    },
  ];

  // Mock data for products
  const mockProducts: Product[] = [
    {
      id: 'prod1',
      name: 'Premium Silicone Case',
      price: 29.99,
      imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'High-quality silicone case that provides excellent protection while maintaining the sleek profile of your device.',
      rating: 4.5,
      reviewCount: 128,
      categoryId: 'cat1',
      images: [
        'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1447254/pexels-photo-1447254.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      features: [
        'Soft-touch silicone exterior',
        'Microfiber lining for scratch protection',
        'Precise cutouts for all ports and buttons',
        'Wireless charging compatible',
        'Available in multiple colors'
      ],
      variants: [
        { id: 'var1', name: 'Black' },
        { id: 'var2', name: 'Blue' },
        { id: 'var3', name: 'Red' },
        { id: 'var4', name: 'Green' }
      ],
      relatedProducts: [
        { id: 'prod2', name: 'Screen Protector', price: 19.99, imageUrl: 'https://images.pexels.com/photos/2320369/pexels-photo-2320369.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'prod3', name: 'Fast Wireless Charger', price: 39.99, imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'prod4', name: 'Phone Stand', price: 24.99, imageUrl: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      createdAt: '2023-03-15T00:00:00Z'
    },
    {
      id: 'prod2',
      name: 'Screen Protector',
      price: 19.99,
      imageUrl: 'https://images.pexels.com/photos/2320369/pexels-photo-2320369.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ultra-clear tempered glass screen protector with 9H hardness for maximum protection against scratches and impacts.',
      rating: 4.2,
      reviewCount: 96,
      categoryId: 'cat4',
      images: [
        'https://images.pexels.com/photos/2320369/pexels-photo-2320369.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      features: [
        '9H hardness tempered glass',
        'Oleophobic coating to resist fingerprints',
        'Ultra-clear transparency (99.9%)',
        'Easy installation with included alignment frame',
        '0.33mm thickness maintains touchscreen sensitivity'
      ],
      variants: [
        { id: 'var5', name: 'Single Pack' },
        { id: 'var6', name: 'Double Pack' },
        { id: 'var7', name: 'Triple Pack' }
      ],
      relatedProducts: [
        { id: 'prod1', name: 'Premium Silicone Case', price: 29.99, imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'prod6', name: 'Screen Cleaning Kit', price: 12.99, imageUrl: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      createdAt: '2023-04-20T00:00:00Z'
    },
    {
      id: 'prod3',
      name: 'Fast Wireless Charger',
      price: 39.99,
      imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Qi-certified wireless charger that delivers fast charging speeds up to 15W for compatible devices. Sleek design with LED indicator.',
      rating: 4.7,
      reviewCount: 205,
      categoryId: 'cat2',
      images: [
        'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/4339928/pexels-photo-4339928.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      features: [
        '15W maximum charging speed',
        'Qi certified for compatibility with all Qi-enabled devices',
        'Smart chip for temperature control and surge protection',
        'Non-slip surface keeps your phone secure',
        'Compact and portable design'
      ],
      variants: [
        { id: 'var8', name: 'Black' },
        { id: 'var9', name: 'White' }
      ],
      relatedProducts: [
        { id: 'prod7', name: 'USB-C Fast Charging Cable', price: 14.99, imageUrl: 'https://images.pexels.com/photos/4068365/pexels-photo-4068365.jpeg?auto=compress&cs=tinysrgb&w=400' },
        { id: 'prod8', name: 'Power Bank 10000mAh', price: 49.99, imageUrl: 'https://images.pexels.com/photos/189582/pexels-photo-189582.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      createdAt: '2023-05-10T00:00:00Z'
    },
    {
      id: 'prod4',
      name: 'Phone Stand',
      price: 24.99,
      imageUrl: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Adjustable aluminum phone stand with multiple viewing angles. Perfect for video calls, watching movies, or following recipes.',
      rating: 4.4,
      reviewCount: 78,
      categoryId: 'cat5',
      images: [
        'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      features: [
        'Premium aluminum construction',
        'Adjustable viewing angles from 15° to 90°',
        'Anti-slip silicone pads to protect your device',
        'Foldable and portable design',
        'Compatible with all smartphones and small tablets'
      ],
      variants: [
        { id: 'var10', name: 'Silver' },
        { id: 'var11', name: 'Space Gray' },
        { id: 'var12', name: 'Rose Gold' }
      ],
      relatedProducts: [
        { id: 'prod9', name: 'Car Phone Mount', price: 19.99, imageUrl: 'https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      createdAt: '2023-02-15T00:00:00Z'
    },
    {
      id: 'prod5',
      name: 'Wireless Earbuds',
      price: 79.99,
      imageUrl: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'True wireless earbuds with premium sound quality, active noise cancellation, and up to 25 hours of battery life with the charging case.',
      rating: 4.8,
      reviewCount: 312,
      categoryId: 'cat3',
      images: [
        'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/5582863/pexels-photo-5582863.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      features: [
        'Active noise cancellation technology',
        'Bluetooth 5.2 for stable connection',
        'Up to 8 hours of playtime (25 with charging case)',
        'IPX7 water and sweat resistance',
        'Touch controls for music and calls',
        'Voice assistant compatible'
      ],
      variants: [
        { id: 'var13', name: 'Black' },
        { id: 'var14', name: 'White' },
        { id: 'var15', name: 'Blue' }
      ],
      relatedProducts: [
        { id: 'prod10', name: 'Earbuds Carrying Case', price: 14.99, imageUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400' }
      ],
      createdAt: '2023-06-01T00:00:00Z'
    },
    {
      id: 'prod6',
      name: 'Screen Cleaning Kit',
      price: 12.99,
      imageUrl: 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete screen cleaning kit with anti-bacterial spray, microfiber cloth, and brush for removing dust and fingerprints.',
      rating: 4.3,
      reviewCount: 64,
      categoryId: 'cat4',
      createdAt: '2023-01-20T00:00:00Z'
    },
    {
      id: 'prod7',
      name: 'USB-C Fast Charging Cable',
      price: 14.99,
      imageUrl: 'https://images.pexels.com/photos/4068365/pexels-photo-4068365.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Premium nylon-braided USB-C cable with fast charging capability up to 100W. Durable and tangle-free.',
      rating: 4.5,
      reviewCount: 142,
      categoryId: 'cat2',
      createdAt: '2023-03-05T00:00:00Z'
    },
    {
      id: 'prod8',
      name: 'Power Bank 10000mAh',
      price: 49.99,
      imageUrl: 'https://images.pexels.com/photos/189582/pexels-photo-189582.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'High-capacity 10000mAh power bank with dual USB-A and USB-C ports for charging multiple devices simultaneously.',
      rating: 4.6,
      reviewCount: 98,
      categoryId: 'cat2',
      createdAt: '2023-04-15T00:00:00Z'
    },
  ];

  // Function to get a product by ID
  const getProductById = useCallback((id: string | string[]): Product | null => {
    const productId = Array.isArray(id) ? id[0] : id;
    return allProducts.find(product => product.id === productId) || null;
  }, [allProducts]);

  useEffect(() => {
    // Simulate API loading delay
    const loadData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCategories(mockCategories);
        setAllProducts(mockProducts);
        setFeaturedProducts(mockProducts.slice(0, 4));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    categories,
    featuredProducts,
    allProducts,
    isLoading,
    error,
    getProductById
  };
};