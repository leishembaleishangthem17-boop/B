import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, MapPin, Award, Shield, ArrowRight, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { brandName, navigateToPage } = useShop();

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Narrative Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#736E65] font-semibold block">
            The Atelier Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950 leading-tight">
            ROOTED IN IMPHAL. CRAFTED FOR THE STREETS OF THE WORLD.
          </h1>
          <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
            {brandName} was founded at the crossroads of ancient Manipuri handloom tradition and contemporary international streetwear luxury. We believe in heavy fabrics, boxy architectural fits, and deep cultural reverence.
          </p>
        </div>

        {/* Hero Visual Display */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#E8E2D5] bg-black">
          <img
            src="/src/assets/images/hero_streetwear_imphal_1793538391156.jpg"
            alt="Imphal Streetwear Campaign"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-lg">
              <span className="text-xs uppercase tracking-widest text-[#C49B38] font-bold block">
                Autumn / Winter 2026 Drop 03
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase mt-1">
                Monochrome Luxury Built in Imphal
              </h3>
            </div>
          </div>
        </div>

        {/* The 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-black border border-[#E8E2D5]">
              <Sparkles className="w-5 h-5 text-[#B38728]" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-black">
              1. Meitei Handloom Legacy
            </h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Centuries before modern fashion houses existed, the weavers of Manipur crafted <em>Moirang Phee</em> with precision chevron motifs and <em>Shaphee Lanphee</em> with sacred astrological symbols. We preserve these motifs through high-density tonal embroidery on streetwear silhouettes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-black border border-[#E8E2D5]">
              <Award className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-black">
              2. 450 GSM Heavyweights
            </h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              We never compromise on fabric density. Our custom-milled French terry hoodies weigh 450 GSM, while our tees use 280–300 GSM combed organic cotton. Double-enzyme washed for a velvety hand-feel that never shrinks or distorts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#E8E2D5] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-black border border-[#E8E2D5]">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-black">
              3. Manipur Community First
            </h3>
            <p className="text-xs text-[#555555] leading-relaxed">
              Every drop directly supports local pattern-makers, embroiderers, and artisans in Imphal West and Wangkhei. We offer permanent Free Delivery across Manipur above ₹999 and full Cash on Delivery support.
            </p>
          </div>
        </div>

        {/* Detailed Story Split Section */}
        <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E8E2D5] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#736E65] font-bold block">
                The Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-black">
                MINIMAL LUXURY WITH RAW NORTHEAST SOUL
              </h2>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                When you browse streetwear from London, Tokyo, or New York, you see a repetitive minimalism. We asked ourselves: <em>What happens when you infuse that clean, architectural aesthetic with the raw beauty and rich textile heritage of Manipur?</em>
              </p>
              <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                The result is {brandName}: monochrome tones, travertine bone beiges, washed black selvedge denim, and quiet Manipuri geometric signatures that only those in the know will recognize.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateToPage('shop')}
                  className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore The Latest Drop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#E8E2D5]">
                <img
                  src="/src/assets/images/hoodie_bone_model_1793538393078.jpg"
                  alt="Streetwear Detail"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Imphal Studio Location Card */}
        <div className="bg-[#FAF8F5] p-8 sm:p-10 rounded-2xl border border-[#E8E2D5] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#736E65] font-bold">
              <MapPin className="w-4 h-4 text-black" />
              <span>Visit the Atelier</span>
            </div>
            <h3 className="text-xl font-bold uppercase text-black">
              The Imphal Design Studio
            </h3>
            <p className="text-xs text-[#555555] max-w-md">
              Kangla Road, Thangal Bazaar, Imphal West, Manipur 795001. Open Monday to Saturday for custom fittings and private lookbook previews.
            </p>
          </div>
          <button
            onClick={() => navigateToPage('contact')}
            className="px-6 py-3 bg-white border border-[#DDD5C5] text-black hover:border-black text-xs font-bold uppercase tracking-wider rounded transition-colors shrink-0"
          >
            Get Studio Directions
          </button>
        </div>
      </div>
    </div>
  );
};
