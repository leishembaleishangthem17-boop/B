import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart, navigateToProduct, setIsSizeChartOpen } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[0] || 'M');

  const isWishlisted = wishlist.includes(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Standard';
    addToCart(product, selectedQuickSize, defaultColor, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateToProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFEBE1] rounded-lg border border-[#E8E2D5]">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
            isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
          }`}
          onError={(e) => {
            // Fallback gradient if path fails
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Secondary Image on Hover */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} preview`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top Badges / Tags - Quiet text */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewDrop && (
            <span className="bg-[#000000] text-white text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
              New Drop
            </span>
          )}
          {product.category === 'Traditional Touches' && (
            <span className="bg-[#FFFFFF]/90 backdrop-blur-sm text-[#111111] text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-sm border border-[#E5DFD0]">
              Manipur Heritage
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#000000] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-neutral-800 hover:text-black shadow-sm backdrop-blur-sm'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? 'fill-white stroke-white scale-110' : 'stroke-[1.8]'
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute inset-x-2 bottom-2 z-10 bg-white/95 backdrop-blur-md p-2.5 rounded-md border border-[#E8E2D5] shadow-lg transition-all duration-200 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
          } hidden md:flex flex-col gap-2`}
        >
          <div className="flex items-center justify-between text-[11px] text-[#666666]">
            <span>Select Size:</span>
            <button
              onClick={() => setIsSizeChartOpen(true)}
              className="text-[#111111] underline hover:text-[#000000] text-[10px]"
            >
              Size Guide
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedQuickSize(size)}
                className={`flex-1 py-1 text-[11px] font-medium rounded transition-colors ${
                  selectedQuickSize === size
                    ? 'bg-[#000000] text-white'
                    : 'bg-[#F5F1E8] text-[#333333] hover:bg-[#EBE5D8]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2 bg-[#000000] hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add ({selectedQuickSize})</span>
          </button>
        </div>
      </div>

      {/* Product Metadata & Pricing */}
      <div className="mt-3 flex flex-col">
        {/* Subtle Category & Fabric Kicker */}
        <div className="flex items-center gap-2 text-[11px] text-[#757067] tracking-wider uppercase">
          <span>{product.category}</span>
          {product.gsm && (
            <>
              <span aria-hidden="true">·</span>
              <span>{product.gsm} GSM</span>
            </>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-[#111111] group-hover:text-black transition-colors line-clamp-1 mt-0.5">
          {product.name}
        </h3>

        {/* Pricing */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold text-[#111111] tabular-nums">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#999999] line-through tabular-nums">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.originalPrice && (
            <span className="text-[11px] text-[#8C3A27] font-medium">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Color swatches preview */}
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-3 h-3 rounded-full border border-black/20"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="text-[10px] text-[#888888] ml-1">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>
      </div>
    </div>
  );
};
