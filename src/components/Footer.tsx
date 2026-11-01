import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Check, Instagram, MessageCircle, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { brandName, navigateToPage, setFilters, setIsSizeChartOpen, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Drop List! 10% coupon: IMPHAL10');
    setEmail('');
  };

  const handleCategoryNav = (cat: string, gender?: string) => {
    setFilters((prev) => ({ ...prev, category: cat, gender: gender || 'All' }));
    navigateToPage('shop');
  };

  return (
    <footer className="bg-[#000000] text-[#FFFFFF] border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Promise Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-neutral-800">
          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-2xl font-bold tracking-[0.2em] uppercase block">
              {brandName}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 block font-medium">
              Imphal, Manipur · Established 2026
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-md pt-1">
              Minimal luxury meets high-density streetwear. Engineered from custom 450 GSM French terry and raw selvedge denim, subtly enriched with traditional Manipuri Moirang Phee and Shaphee Lanphee needlecraft.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@langoi.com"
                className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block">
                Exclusive VIP Drop Access
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                Receive Early Access to Limited Manipur Runs
              </h3>
              <p className="text-xs text-neutral-400 mt-2">
                Subscribe for private drop notifications, exclusive lookbooks, and get ₹200 off your first streetwear piece with code <strong className="text-white">IMPHAL10</strong>.
              </p>
            </div>

            {subscribed ? (
              <div className="mt-5 p-3 bg-neutral-900 border border-neutral-700 rounded-lg flex items-center gap-2 text-xs text-emerald-400">
                <Check className="w-4 h-4" />
                <span>You're in! Check your inbox for exclusive drop invitations.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          {/* Shop */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-widest text-neutral-300">
              Collections
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => handleCategoryNav('All', 'Men')} className="hover:text-white transition-colors">
                  Men's Streetwear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('All', 'Women')} className="hover:text-white transition-colors">
                  Women's Relaxed Cuts
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Hoodies')} className="hover:text-white transition-colors">
                  450 GSM Heavy Hoodies
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Jeans')} className="hover:text-white transition-colors">
                  Selvedge & Cargo Denim
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav('Traditional Touches')} className="hover:text-white transition-colors">
                  Moirang Phee Traditional
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-widest text-neutral-300">
              Client Support
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => setIsSizeChartOpen(true)} className="hover:text-white transition-colors">
                  Streetwear Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('checkout')} className="hover:text-white transition-colors">
                  Cash on Delivery Info
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('about')} className="hover:text-white transition-colors">
                  Manipur Free Delivery Terms
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('contact')} className="hover:text-white transition-colors">
                  7-Day Hassle-Free Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('contact')} className="hover:text-white transition-colors">
                  Track Existing Order
                </button>
              </li>
            </ul>
          </div>

          {/* About Atelier */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-widest text-neutral-300">
              The Brand
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => navigateToPage('about')} className="hover:text-white transition-colors">
                  Our Imphal Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('about')} className="hover:text-white transition-colors">
                  Meitei Handloom Legacy
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('about')} className="hover:text-white transition-colors">
                  Sustainable 100% Cotton
                </button>
              </li>
              <li>
                <button onClick={() => navigateToPage('contact')} className="hover:text-white transition-colors">
                  Studio Atelier Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Manipur Studio Info */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-widest text-neutral-300">
              Imphal Studio
            </h4>
            <div className="space-y-2 text-neutral-400 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <span>Kangla Road, Thangal Bazaar, Imphal West, Manipur 795001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="text-[11px] text-neutral-500 pt-1">
                Mon - Sat: 10:00 AM – 7:30 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line & Trust */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400" />
            <span>Guaranteed Authentic Manipur Craftsmanship · Safe Razorpay & Cash on Delivery</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
            <span>Razorpay</span>
            <span>·</span>
            <span>UPI</span>
            <span>·</span>
            <span>Cards</span>
            <span>·</span>
            <span>Cash on Delivery</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
