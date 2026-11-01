import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Menu, X, SlidersHorizontal, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBrandModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBrandModal }) => {
  const {
    brandName,
    activePage,
    navigateToPage,
    setFilters,
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen
  } = useShop();

  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryClick = (category: string, gender?: string) => {
    setFilters((prev) => ({
      ...prev,
      category: category,
      gender: gender || 'All'
    }));
    navigateToPage('shop');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
      {/* Free Delivery in Manipur Offer Banner */}
      {isBannerVisible && (
        <div className="bg-[#000000] text-[#FFFFFF] text-[11px] sm:text-xs tracking-wider uppercase py-2 px-4 font-medium flex items-center justify-between">
          <div className="flex-1 text-center">
            <span>✨ Free Delivery across Manipur on orders above ₹999 · Cash on Delivery Available</span>
          </div>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="text-neutral-400 hover:text-white p-1 ml-2 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav) - Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-black hover:text-neutral-600 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateToPage('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-bold text-xl sm:text-2xl tracking-[0.2em] text-[#000000] uppercase block leading-none font-sans">
              {brandName}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#736E65] uppercase block mt-1 font-medium">
              Imphal, Manipur
            </span>
          </button>

          {/* Quick Customize Brand Name Pill */}
          <button
            onClick={onOpenBrandModal}
            title="Customize brand name"
            className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-[#736E65] hover:text-black bg-[#F5F1E8] hover:bg-[#EBE5D8] px-2 py-0.5 rounded transition-colors border border-[#E5DFD0] cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#B38728]" />
            <span>Rename Brand</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] uppercase tracking-[0.14em] font-medium text-[#222222]">
          <button
            onClick={() => handleCategoryClick('All', 'Men')}
            className={`hover:text-black transition-colors relative py-1 cursor-pointer ${
              activePage === 'shop' ? 'text-black' : 'text-[#555555]'
            }`}
          >
            Men
          </button>
          <button
            onClick={() => handleCategoryClick('All', 'Women')}
            className="hover:text-black transition-colors relative py-1 cursor-pointer text-[#555555]"
          >
            Women
          </button>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'All', gender: 'All', sortBy: 'newest' }));
              navigateToPage('shop');
            }}
            className="hover:text-black transition-colors relative py-1 cursor-pointer text-[#555555]"
          >
            New Drops
          </button>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'Traditional Touches', gender: 'All' }));
              navigateToPage('shop');
            }}
            className="hover:text-black transition-colors relative py-1 cursor-pointer text-[#555555]"
          >
            Traditional Touches
          </button>
          <button
            onClick={() => navigateToPage('about')}
            className={`hover:text-black transition-colors relative py-1 cursor-pointer ${
              activePage === 'about' ? 'text-black font-semibold' : 'text-[#555555]'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => navigateToPage('contact')}
            className={`hover:text-black transition-colors relative py-1 cursor-pointer ${
              activePage === 'contact' ? 'text-black font-semibold' : 'text-[#555555]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#111111] hover:text-[#555555] transition-colors rounded-full hover:bg-[#F5F1E8] cursor-pointer"
            aria-label="Search items"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-[#111111] hover:text-[#555555] transition-colors rounded-full hover:bg-[#F5F1E8] cursor-pointer"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#000000] text-white text-[10px] font-semibold flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 py-2 px-3 bg-[#000000] text-white rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="text-xs font-medium tracking-wide">
              Bag ({totalCartCount})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D5] bg-[#FFFFFF] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-[0.15em]">
            <button
              onClick={() => {
                navigateToPage('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              Home
            </button>
            <button
              onClick={() => handleCategoryClick('All', 'Men')}
              className="text-left py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              Men's Collection
            </button>
            <button
              onClick={() => handleCategoryClick('All', 'Women')}
              className="text-left py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              Women's Collection
            </button>
            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: 'All', gender: 'All', sortBy: 'newest' }));
                navigateToPage('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              New Drops
            </button>
            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: 'Traditional Touches', gender: 'All' }));
                navigateToPage('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              Traditional Touches (Moirang Phee)
            </button>
            <button
              onClick={() => {
                navigateToPage('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              Shop All
            </button>
            <button
              onClick={() => {
                navigateToPage('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              About The Brand
            </button>
            <button
              onClick={() => {
                navigateToPage('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-neutral-500"
            >
              Contact & Imphal Studio
            </button>
            <div className="pt-3 border-t border-neutral-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBrandModal();
                }}
                className="w-full text-center py-2.5 bg-[#F5F1E8] text-xs uppercase tracking-wider font-semibold rounded text-neutral-800"
              >
                Customize Brand Name
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
