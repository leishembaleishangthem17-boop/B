import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, filters, setFilters, resetFilters, setIsSizeChartOpen } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available Filter Options
  const categories = ['All', 'T-Shirts', 'Hoodies', 'Jeans', 'Traditional Touches'];
  const genders = ['All', 'Men', 'Women', 'Unisex'];
  const sizes = ['All', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { label: 'All', hex: '' },
    { label: 'Noir Black', hex: '#111111' },
    { label: 'Bone Beige', hex: '#EBE5D8' },
    { label: 'Washed Charcoal', hex: '#2A2A2A' },
    { label: 'Dune Sand', hex: '#D2C6B2' }
  ];
  const priceBrackets = [
    { label: 'All', value: 'All' },
    { label: 'Under ₹2,000', value: 'under-2000' },
    { label: '₹2,000 - ₹3,500', value: '2000-3500' },
    { label: 'Above ₹3,500', value: 'above-3500' }
  ];

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }
      // Gender
      if (filters.gender !== 'All' && product.gender !== filters.gender && product.gender !== 'Unisex') {
        return false;
      }
      // Size
      if (filters.size !== 'All' && !product.sizes.includes(filters.size as any)) {
        return false;
      }
      // Color
      if (filters.color !== 'All') {
        const hasColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(filters.color.toLowerCase())
        );
        if (!hasColor) return false;
      }
      // Price
      if (filters.priceRange === 'under-2000' && product.price >= 2000) return false;
      if (filters.priceRange === '2000-3500' && (product.price < 2000 || product.price > 3500)) return false;
      if (filters.priceRange === 'above-3500' && product.price <= 3500) return false;

      // Search keyword
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0);
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, filters]);

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.gender !== 'All' ||
    filters.size !== 'All' ||
    filters.color !== 'All' ||
    filters.priceRange !== 'All' ||
    filters.search !== '';

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="border-b border-[#E8E2D5] pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#736E65] font-semibold block">
                The Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111] mt-1">
                All Collections
              </h1>
              <p className="text-xs text-[#666666] mt-1">
                Showing {filteredProducts.length} premium pieces · Engineered in Imphal
              </p>
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#DDD5C5] rounded-md text-xs font-semibold uppercase tracking-wider text-black"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <div className="flex items-center gap-2 bg-white border border-[#DDD5C5] rounded-md px-3 py-2 text-xs">
                <span className="text-[#777777] font-medium">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-transparent font-semibold text-black focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Drops</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-[#EFECE3]">
              <span className="text-[11px] text-[#777777] uppercase font-semibold">Active:</span>
              {filters.category !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white text-[11px] rounded-md">
                  {filters.category}
                  <button onClick={() => setFilters((p) => ({ ...p, category: 'All' }))} className="hover:text-neutral-300">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.gender !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white text-[11px] rounded-md">
                  {filters.gender}
                  <button onClick={() => setFilters((p) => ({ ...p, gender: 'All' }))} className="hover:text-neutral-300">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.size !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white text-[11px] rounded-md">
                  Size: {filters.size}
                  <button onClick={() => setFilters((p) => ({ ...p, size: 'All' }))} className="hover:text-neutral-300">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.color !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white text-[11px] rounded-md">
                  Color: {filters.color}
                  <button onClick={() => setFilters((p) => ({ ...p, color: 'All' }))} className="hover:text-neutral-300">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.priceRange !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white text-[11px] rounded-md">
                  Price Filter
                  <button onClick={() => setFilters((p) => ({ ...p, priceRange: 'All' }))} className="hover:text-neutral-300">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-[11px] text-[#777777] hover:text-black underline ml-2 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Catalog Main Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-xl border border-[#E8E2D5] shadow-xs sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter Streetwear</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#888888] hover:text-black underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2.5">
                Category
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters((p) => ({ ...p, category: cat }))}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                      filters.category === cat
                        ? 'bg-black text-white font-semibold'
                        : 'text-neutral-600 hover:bg-[#F5F1E8] hover:text-black'
                    }`}
                  >
                    <span>{cat}</span>
                    {filters.category === cat && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender / Line Filter */}
            <div className="pt-4 border-t border-[#EFECE3]">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2.5">
                Department
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilters((p) => ({ ...p, gender: g }))}
                    className={`py-1.5 px-2 rounded text-xs text-center transition-colors ${
                      filters.gender === g
                        ? 'bg-black text-white font-semibold'
                        : 'bg-[#FAF8F5] text-neutral-700 hover:bg-[#EFECE3]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="pt-4 border-t border-[#EFECE3]">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Size
                </label>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-[11px] text-neutral-500 hover:text-black underline"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilters((p) => ({ ...p, size: s }))}
                    className={`w-10 h-8 rounded text-xs font-semibold flex items-center justify-center transition-colors ${
                      filters.size === s
                        ? 'bg-black text-white'
                        : 'bg-[#FAF8F5] text-neutral-700 hover:bg-[#EFECE3] border border-[#DDD5C5]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-4 border-t border-[#EFECE3]">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2.5">
                Color Palette
              </label>
              <div className="space-y-1.5">
                {colors.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setFilters((p) => ({ ...p, color: c.label }))}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center gap-2 ${
                      filters.color === c.label
                        ? 'bg-black text-white font-semibold'
                        : 'text-neutral-700 hover:bg-[#F5F1E8]'
                    }`}
                  >
                    {c.hex && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#EFECE3]">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-2.5">
                Price
              </label>
              <div className="space-y-1">
                {priceBrackets.map((pb) => (
                  <label key={pb.value} className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="priceBracket"
                      checked={filters.priceRange === pb.value}
                      onChange={() => setFilters((p) => ({ ...p, priceRange: pb.value }))}
                      className="accent-black"
                    />
                    <span>{pb.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E8E2D5] p-12 text-center">
                <h3 className="text-base font-bold uppercase tracking-wider text-black">
                  No Drops Found
                </h3>
                <p className="text-xs text-[#666666] max-w-sm mx-auto mt-2">
                  No streetwear drops match the selected filters. Try broadening your size, color, or price options.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div onClick={() => setMobileFilterOpen(false)} className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                    Filter Collections
                  </h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">Category</span>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFilters((p) => ({ ...p, category: c }))}
                        className={`px-3 py-1.5 text-xs rounded ${
                          filters.category === c ? 'bg-black text-white' : 'bg-[#F5F1E8] text-black'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">Size</span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilters((p) => ({ ...p, size: s }))}
                        className={`w-10 h-8 rounded text-xs font-semibold ${
                          filters.size === s ? 'bg-black text-white' : 'bg-[#F5F1E8] text-black'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mt-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-black block mb-2">Price</span>
                  {priceBrackets.map((pb) => (
                    <label key={pb.value} className="flex items-center gap-2 text-xs py-1">
                      <input
                        type="radio"
                        checked={filters.priceRange === pb.value}
                        onChange={() => setFilters((p) => ({ ...p, priceRange: pb.value }))}
                      />
                      <span>{pb.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D5] space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded"
                >
                  Show {filteredProducts.length} Results
                </button>
                <button
                  onClick={() => {
                    resetFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="w-full py-2 bg-neutral-100 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
