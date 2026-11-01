import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    products,
    addToCart,
    navigateToProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          <div className="px-6 py-5 border-b border-[#E8E2D5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-black stroke-black" />
              <h2 className="text-base font-bold uppercase tracking-wider text-[#111111]">
                Wishlist
              </h2>
              <span className="text-xs text-[#777777] font-medium">
                ({wishlistedProducts.length} saved)
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-[#F5F1E8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#F0EBE0]">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <Heart className="w-12 h-12 text-[#CCCCCC] stroke-[1.2] mb-3" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-[#666666] max-w-xs mt-1">
                  Save your favorite silhouettes and traditional pieces here while you browse.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded bg-[#EFEBE1] shrink-0 border border-[#E8E2D5] cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateToProduct(product);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            navigateToProduct(product);
                          }}
                          className="text-xs font-semibold text-neutral-900 hover:underline cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#777777] uppercase tracking-wider block mt-0.5">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-bold text-black tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => {
                          const size = product.sizes[0] || 'M';
                          const color = product.colors[0]?.name || 'Standard';
                          addToCart(product, size, color, 1);
                        }}
                        className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-[11px] font-semibold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D5] bg-[#FAF8F5]">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => {
                    addToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard', 1);
                  });
                }}
                className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Add All to Shopping Bag
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
