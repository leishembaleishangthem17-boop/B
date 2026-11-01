export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'T-Shirts' | 'Hoodies' | 'Jeans' | 'Traditional Touches' | 'Jackets' | 'Accessories';
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  gsm?: number;
  fit: string;
  details: string[];
  care: string[];
  colors: { name: string; hex: string }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  inStock: boolean;
  stockCount?: number;
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  images: string[];
  traditionalTouch?: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface FilterState {
  category: string;
  gender: string;
  size: string;
  color: string;
  priceRange: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  search: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'razorpay';
  paymentStatus: 'completed' | 'pending';
}
