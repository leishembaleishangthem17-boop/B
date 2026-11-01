import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowUpRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateToProduct } = useShop();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        (p.traditionalTouch && p.traditionalTouch.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Hoodie 450 GSM', 'Moirang Phee', 'Cargo Denim', 'T-Shirts', 'Bone Beige'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-12">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E8E2D5] my-8 animate-in fade-in-50 zoom-in-95 duration-200">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E8E2D5] flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search heavyweight streetwear, hoodies, denim, Moirang Phee..."
              className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-none placeholder-neutral-400 font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-black p-1 text-xs uppercase"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-md hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick suggestions if query is empty */}
          {!query.trim() && (
            <div className="p-6 bg-[#FAF8F5]">
              <span className="text-[11px] uppercase tracking-wider text-[#777777] font-semibold block mb-3">
                Trending Searches in Imphal
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-white border border-[#DDD5C5] rounded-full text-xs font-medium text-neutral-800 hover:border-black transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#777777]">
                  No streetwear drops matching "<span className="text-black font-semibold">{query}</span>".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateToProduct(product);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg border border-[#E8E2D5] hover:border-black hover:bg-[#FAF8F5] transition-all cursor-pointer group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-18 object-cover rounded bg-[#EFEBE1] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#777777] font-medium block">
                          {product.category}
                        </span>
                        <h4 className="text-xs font-semibold text-black truncate group-hover:text-neutral-900">
                          {product.name}
                        </h4>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs font-bold text-black tabular-nums">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-[#777777] group-hover:text-black flex items-center gap-0.5">
                            View <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
