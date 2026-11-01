import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Truck, Sparkles, Shield, RefreshCw, Instagram, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';

export const HomePage: React.FC = () => {
  const { brandName, products, navigateToPage, setFilters, navigateToProduct } = useShop();
  const [activeIgPost, setActiveIgPost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  // Best Sellers (4 items for the 4-column grid requirement)
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const categories = [
    {
      name: 'T-Shirts',
      category: 'T-Shirts',
      tagline: '280-300 GSM Heavyweight Boxy Cuts',
      image: '/src/assets/images/tee_black_moirang_1793538393313.jpg'
    },
    {
      name: 'Hoodies',
      category: 'Hoodies',
      tagline: '450 GSM French Terry Drop-Shoulders',
      image: '/src/assets/images/hoodie_bone_front_1793538391466.jpg'
    },
    {
      name: 'Jeans & Cargo',
      category: 'Jeans',
      tagline: '14oz Raw Selvedge & Utility Wide-Legs',
      image: '/src/assets/images/denim_black_cargo_1793538393624.jpg'
    },
    {
      name: 'Traditional Touches',
      category: 'Traditional Touches',
      tagline: 'Moirang Phee & Shaphee Lanphee Motifs',
      image: '/src/assets/images/hero_streetwear_imphal_1793538391156.jpg'
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryName,
      gender: 'All'
    }));
    navigateToPage('shop');
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        <div className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-end">
          {/* Hero Photography Asset */}
          <img
            src="/src/assets/images/hero_streetwear_imphal_1793538391156.jpg"
            alt="New Collection Drop Streetwear Editorial"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-85"
          />

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 w-full">
            <div className="max-w-2xl space-y-4">
              {/* Season kicker */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-300 font-medium">
                <span>The Imphal Edit</span>
                <span aria-hidden="true">·</span>
                <span>Autumn / Winter 2026 Drop</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] text-white">
                NEW COLLECTION DROP
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal max-w-xl">
                Minimal luxury cuts inspired by global streetwear aesthetics like Zara & Represent, finished with authentic Manipuri Moirang Phee handcrafts.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'All', gender: 'All', sortBy: 'newest' }));
                    navigateToPage('shop');
                  }}
                  className="px-7 py-3.5 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-[0.16em] rounded-md transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'Traditional Touches', gender: 'All' }));
                    navigateToPage('shop');
                  }}
                  className="px-6 py-3.5 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.16em] rounded-md transition-all border border-white/20 cursor-pointer"
                >
                  Traditional Touches
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Strip */}
        <div className="border-t border-neutral-800 bg-[#0B0B0B] py-3.5 px-4 text-xs text-neutral-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-white" />
              <span>Free Delivery in Manipur over ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C49B38]" />
              <span>450 GSM Heavy French Terry & Japanese Selvedge</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white" />
              <span>Cash on Delivery + Razorpay Instant Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-white" />
              <span>7-Day Effortless Size Exchange</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#736E65] font-semibold block">
              Curated Lines
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase mt-1">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => navigateToPage('shop')}
            className="text-xs uppercase tracking-wider font-semibold text-[#111111] hover:underline flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.category)}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 cursor-pointer shadow-sm border border-[#E8E2D5]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end">
                <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-medium">
                  {cat.tagline}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight mt-0.5 group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
                <span className="text-xs text-neutral-300 mt-2 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Drops</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best Sellers (4 Columns Grid with Image Hover) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#736E65] font-semibold block">
              Most Wanted
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] uppercase mt-1">
              Best Sellers
            </h2>
            <p className="text-xs text-[#666666] mt-1">
              Hover over items to view model and detail shots. Direct one-click quick add.
            </p>
          </div>
          <button
            onClick={() => navigateToPage('shop')}
            className="text-xs font-semibold uppercase tracking-wider text-black underline hover:text-neutral-700 cursor-pointer"
          >
            Shop All Best Sellers
          </button>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Cultural Craftsmanship Spotlight (Imphal Story & Modern Streetwear) */}
      <section className="bg-[#FFFFFF] border-y border-[#E8E2D5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Visual Frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#E8E2D5] bg-[#EFEBE1]">
                <img
                  src="/src/assets/images/tee_black_moirang_1793538393313.jpg"
                  alt="Moirang Phee Embroidered Luxury Streetwear"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E8E2D5] text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#736E65] font-bold block">
                    Authentic Motif
                  </span>
                  <p className="text-neutral-900 font-semibold mt-0.5">
                    Moirang Phee chevron needlework embroidered in Imphal, Manipur.
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative text */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-[0.25em] text-[#736E65] font-semibold block">
                Heritage Meets Modern Luxury
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight">
                MANIPURI TEXTILE ARTISTRY IN ARCHITECTURAL STREETWEAR
              </h2>
              <p className="text-sm text-[#444444] leading-relaxed">
                Manipur is globally celebrated for its handloom heritage—from the geometric spearhead patterns of <strong>Moirang Phee</strong> to the sacred motifs of <strong>Shaphee Lanphee</strong>. At {brandName}, we translate these ancestral legacies into modern, Gen-Z boxy silhouettes.
              </p>
              <p className="text-sm text-[#444444] leading-relaxed">
                Every tee, hoodie, and cargo trouser is milled with high-density organic cottons, drop shoulders, and engineered longevity—giving you the refined luxury feel of Zara and H&M Studio, rooted in the soul of Imphal.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => navigateToPage('about')}
                  className="px-6 py-3 bg-[#000000] text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Read The Imphal Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. High-Impact Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-[#000000] text-white p-8 sm:p-12 border border-neutral-800 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C49B38] font-bold block">
              Manipur Local Community Offer
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
              Free Delivery Across Manipur On Orders Above ₹999
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg">
              We deliver straight to your doorstep across Imphal West, Imphal East, Churachandpur, Bishnupur, Thoubal, and all districts. Cash on Delivery and Razorpay UPI accepted.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateToPage('shop')}
                className="px-6 py-3 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Shop The Drop Now
              </button>
              <div className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded text-xs font-mono text-neutral-200">
                Code: <strong className="text-white">IMPHAL10</strong> (10% Extra Off)
              </div>
            </div>
          </div>

          {/* Graphic Accent */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <img
              src="/src/assets/images/hoodie_bone_model_1793538393078.jpg"
              alt="Streetwear Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. Instagram Feed Section (@yourbrand) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736E65] font-semibold">
            <Instagram className="w-4 h-4 text-black" />
            <span>@langoi.studios</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 uppercase">
            Seen on the Streets of Imphal
          </h2>
          <p className="text-xs text-[#666666]">
            Tag us to be featured in our seasonal lookbook. Tap any shot to inspect the styling.
          </p>
        </div>

        {/* 5-item Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveIgPost(post)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900 cursor-pointer shadow-xs border border-[#E8E2D5]"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <span className="text-[11px] font-semibold flex items-center gap-1">
                    ❤️ {post.likes}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] bg-white/90 text-black px-2 py-0.5 rounded font-bold uppercase tracking-wider block w-fit mb-1">
                    {post.productTag}
                  </span>
                  <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Post Quick View Modal */}
      {activeIgPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setActiveIgPost(null)} className="fixed inset-0 bg-black/70 backdrop-blur-xs" />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-xl overflow-hidden shadow-2xl border border-[#E8E2D5] animate-in zoom-in-95 duration-200">
              <img
                src={activeIgPost.image}
                alt={activeIgPost.caption}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-black">
                    @langoi.studios // Imphal
                  </span>
                  <span className="text-xs text-[#777777] font-semibold">
                    ❤️ {activeIgPost.likes} likes
                  </span>
                </div>
                <p className="text-xs text-neutral-800 leading-relaxed">
                  {activeIgPost.caption}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#E8E2D5]">
                  <span className="text-xs font-semibold text-neutral-600">
                    Featured: <strong className="text-black">{activeIgPost.productTag}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setActiveIgPost(null);
                      navigateToPage('shop');
                    }}
                    className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                  >
                    Shop This Look
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
