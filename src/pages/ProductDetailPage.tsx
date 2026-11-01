import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ChevronRight,
  Star,
  Check,
  Sparkles,
  Info
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsSizeChartOpen,
    navigateToPage,
    products,
    brandName
  } = useShop();

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-black">No drop selected.</p>
          <button
            onClick={() => navigateToPage('shop')}
            className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase rounded"
          >
            Explore Drops
          </button>
        </div>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(selectedProduct.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('story');

  const isWishlisted = wishlist.includes(selectedProduct.id);

  // WhatsApp Order Handler
  const handleWhatsAppOrder = () => {
    const encodedText = encodeURIComponent(
      `Hello ${brandName}! I would like to order:
• Item: ${selectedProduct.name}
• Size: ${selectedSize}
• Color: ${selectedColor}
• Quantity: ${quantity}
• Price: ₹${(selectedProduct.price * quantity).toLocaleString('en-IN')}

Please share payment / Cash on Delivery confirmation for delivery to Manipur.`
    );
    window.open(`https://wa.me/919876543210?text=${encodedText}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.isBestSeller))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#736E65] mb-6 font-medium">
          <button onClick={() => navigateToPage('home')} className="hover:text-black transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigateToPage('shop')} className="hover:text-black transition-colors">
            {selectedProduct.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-semibold truncate max-w-xs">{selectedProduct.name}</span>
        </nav>

        {/* Product Grid: Left Gallery + Right Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Zone (7 columns desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
              {selectedProduct.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-18 h-22 sm:w-20 sm:h-26 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === index ? 'border-black ring-1 ring-black' : 'border-[#E8E2D5] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${selectedProduct.name} angle ${index + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover bg-[#EFEBE1]"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#EFEBE1] border border-[#E8E2D5] shadow-sm">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Wishlist Top Right */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isWishlisted ? 'bg-black text-white shadow-md' : 'bg-white/90 hover:bg-white text-black shadow-sm'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white stroke-white' : 'stroke-[1.8]'}`} />
              </button>

              {/* Tag */}
              {selectedProduct.isNewDrop && (
                <div className="absolute top-4 left-4 bg-black text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                  New Drop AW26
                </div>
              )}
            </div>
          </div>

          {/* Contiguous Purchase Module (5 columns desktop) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-6">
            {/* Category & Ratings */}
            <div className="flex items-center justify-between text-xs text-[#736E65]">
              <span className="uppercase tracking-[0.2em] font-semibold">{selectedProduct.category}</span>
              <div className="flex items-center gap-1 text-neutral-800">
                <Star className="w-3.5 h-3.5 fill-[#B38728] stroke-[#B38728]" />
                <span className="font-bold tabular-nums">{selectedProduct.rating}</span>
                <span className="text-[#888888]">({selectedProduct.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950 leading-tight">
                {selectedProduct.name}
              </h1>
              <p className="text-xs text-[#666666] mt-1 font-medium">{selectedProduct.subtitle}</p>
            </div>

            {/* Pricing Strip */}
            <div className="py-3 px-4 bg-[#FAF8F5] rounded-xl border border-[#EFECE3] flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-black tabular-nums">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-[#999999] line-through tabular-nums">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {selectedProduct.originalPrice && (
                  <span className="text-xs text-emerald-700 font-bold">
                    Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#777777]">Inclusive of all taxes</span>
            </div>

            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-bold uppercase tracking-wider text-black">
                  Color: <span className="font-normal text-[#555555]">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {selectedProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative p-1 rounded-full border-2 transition-all ${
                      selectedColor === c.name ? 'border-black ring-1 ring-black' : 'border-transparent'
                    }`}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Chart */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-bold uppercase tracking-wider text-black">
                  Select Size: <span className="font-normal text-[#555555]">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-black font-semibold underline hover:text-neutral-700 flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 rounded-lg text-xs font-bold uppercase transition-all ${
                      selectedSize === s
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-[#FAF8F5] text-neutral-800 hover:bg-[#EFECE3] border border-[#DDD5C5]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Subtle Low Stock Urgency */}
              <p className="text-[11px] text-[#B38728] font-semibold mt-2 flex items-center gap-1">
                <span>⚡ Low inventory: Only 4 pieces left in Size {selectedSize}</span>
              </p>
            </div>

            {/* Action Buttons: Add to Bag + WhatsApp Order */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#000000] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-[0.18em] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* WhatsApp Instant Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp (Instant Chat)</span>
              </button>
            </div>

            {/* Manipur Local Perks */}
            <div className="pt-2 border-t border-[#EFECE3] space-y-2 text-xs text-[#555555]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-black shrink-0" />
                <span>Free delivery across Manipur on orders above ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cash on Delivery (COD) accepted at doorstep</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-black shrink-0" />
                <span>7-Day Hassle-Free Size Exchange policy</span>
              </div>
            </div>

            {/* Accordion Details */}
            <div className="border-t border-[#E8E2D5] pt-4 space-y-3 text-xs">
              {/* Manipur Heritage Accordion */}
              {selectedProduct.traditionalTouch && (
                <div className="border border-[#E8E2D5] rounded-lg p-3.5 bg-[#FAF8F5]">
                  <h4 className="font-bold uppercase tracking-wider text-black flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#B38728]" />
                    <span>Manipur Heritage Story</span>
                  </h4>
                  <p className="text-[#555555] leading-relaxed">{selectedProduct.traditionalTouch}</p>
                </div>
              )}

              {/* Fabric & Fit Details */}
              <div className="border border-[#E8E2D5] rounded-lg p-3.5">
                <h4 className="font-bold uppercase tracking-wider text-black mb-1.5">Fabric & Fit</h4>
                <ul className="space-y-1 text-[#555555]">
                  <li>• Fabric: {selectedProduct.fabric}</li>
                  <li>• Cut: {selectedProduct.fit}</li>
                  {selectedProduct.details.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>

              {/* Care Instructions */}
              <div className="border border-[#E8E2D5] rounded-lg p-3.5">
                <h4 className="font-bold uppercase tracking-wider text-black mb-1.5">Garment Care</h4>
                <ul className="space-y-1 text-[#555555]">
                  {selectedProduct.care.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Collections */}
        <section className="mt-20 pt-12 border-t border-[#E8E2D5]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-950">
              Complete The Look
            </h3>
            <button
              onClick={() => navigateToPage('shop')}
              className="text-xs uppercase font-semibold text-black underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E8E2D5] p-3 px-4 shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase text-[#777777] font-semibold block">Total</span>
          <span className="text-sm font-black text-black tabular-nums">
            ₹{(selectedProduct.price * quantity).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={handleWhatsAppOrder}
            className="p-2.5 bg-[#25D366] text-white rounded-lg flex items-center justify-center shrink-0"
            title="Order on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg flex-1 text-center"
          >
            Add to Bag ({selectedSize})
          </button>
        </div>
      </div>
    </div>
  );
};
