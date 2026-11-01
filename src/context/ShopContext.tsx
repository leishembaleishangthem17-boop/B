import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, FilterState, Order, CustomerInfo } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  brandName: string;
  setBrandName: (name: string) => void;
  products: Product[];
  activePage: 'home' | 'shop' | 'product-detail' | 'about' | 'checkout' | 'contact';
  setActivePage: (page: 'home' | 'shop' | 'product-detail' | 'about' | 'checkout' | 'contact') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeChartOpen: boolean;
  setIsSizeChartOpen: (open: boolean) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  navigateToProduct: (product: Product) => void;
  navigateToPage: (page: 'home' | 'shop' | 'product-detail' | 'about' | 'checkout' | 'contact') => void;
  orders: Order[];
  createOrder: (customer: CustomerInfo, paymentMethod: 'cod' | 'razorpay') => Order;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  manipurFreeShippingGoal: number;
  amountNeededForFreeShipping: number;
}

const initialFilters: FilterState = {
  category: 'All',
  gender: 'All',
  size: 'All',
  color: 'All',
  priceRange: 'All',
  sortBy: 'featured',
  search: ''
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandName, setBrandName] = useState<string>(() => {
    return localStorage.getItem('langoi_brand_name') || 'LANGOI STUDIOS';
  });

  const [products] = useState<Product[]>(PRODUCTS);
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'product-detail' | 'about' | 'checkout' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('langoi_cart');
      return saved ? JSON.parse(saved) : [
        // Start with one default luxury sample item so cart is immediately demonstrable
        {
          product: PRODUCTS[0],
          selectedSize: 'L',
          selectedColor: 'Noir Black',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('langoi_wishlist');
      return saved ? JSON.parse(saved) : ['prod-02'];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('langoi_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('langoi_brand_name', brandName);
  }, [brandName]);

  useEffect(() => {
    localStorage.setItem('langoi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('langoi_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('langoi_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });
    showToast(`Added ${product.name} (${size}) to bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
    showToast('Item removed from bag');
  };

  const updateQuantity = (productId: string, size: string, color: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isExist = prev.includes(productId);
      if (isExist) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist');
        return [...prev, productId];
      }
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'IMPHAL10' || clean === 'MANIPUR10') {
      setAppliedDiscount(10);
      showToast('10% Manipur Community Discount applied!');
      return true;
    } else if (clean === 'GENZ20') {
      setAppliedDiscount(20);
      showToast('20% Drop Discount applied!');
      return true;
    } else {
      showToast('Invalid coupon code. Try "IMPHAL10"');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedDiscount(0);
    setCouponCode('');
    showToast('Promo code removed');
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (page: 'home' | 'shop' | 'product-detail' | 'about' | 'checkout' | 'contact') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const manipurFreeShippingGoal = 999;
  const shippingFee = subtotal >= manipurFreeShippingGoal || subtotal === 0 ? 0 : 99;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, manipurFreeShippingGoal - subtotal);

  const createOrder = (customer: CustomerInfo, paymentMethod: 'cod' | 'razorpay'): Order => {
    const newOrder: Order = {
      id: `LN-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer,
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      discount: discountAmount,
      total: totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'razorpay' ? 'completed' : 'pending'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        brandName,
        setBrandName,
        products,
        activePage,
        setActivePage,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSizeChartOpen,
        setIsSizeChartOpen,
        filters,
        setFilters,
        resetFilters,
        couponCode,
        setCouponCode,
        appliedDiscount,
        applyCoupon,
        removeCoupon,
        toastMessage,
        showToast,
        navigateToProduct,
        navigateToPage,
        orders,
        createOrder,
        subtotal,
        shippingFee,
        totalAmount,
        manipurFreeShippingGoal,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
