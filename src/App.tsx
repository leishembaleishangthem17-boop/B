import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { SearchModal } from './components/SearchModal';
import { SizeChartModal } from './components/SizeChartModal';
import { BrandNameModal } from './components/BrandNameModal';
import { CheckCircle2, MessageCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activePage, toastMessage, brandName } = useShop();
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#111111]">
      {/* Sticky Header with 3-Zone Top Bar Contract */}
      <Header onOpenBrandModal={() => setIsBrandModalOpen(true)} />

      {/* Main Page Content Router */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistModal />
      <SearchModal />
      <SizeChartModal />
      <BrandNameModal isOpen={isBrandModalOpen} onClose={() => setIsBrandModalOpen(false)} />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#000000] text-white px-4 py-3 rounded-lg shadow-2xl border border-neutral-700 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Quick Inquiries Button (Bottom Right) */}
      <a
        href="https://wa.me/919876543210?text=Hi%20LANGOI%20STUDIOS%2C%20I%20have%20an%20inquiry%20about%20your%20streetwear%20collection%20in%20Imphal"
        target="_blank"
        rel="noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="fixed bottom-6 left-6 z-30 bg-[#25D366] hover:bg-[#20BE5A] text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer group"
        title="WhatsApp Concierge"
      >
        <MessageCircle className="w-5 h-5 fill-white stroke-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold uppercase tracking-wider transition-all duration-300">
          Imphal Concierge
        </span>
      </a>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
