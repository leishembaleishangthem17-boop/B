import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Check } from 'lucide-react';

interface BrandNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandNameModal: React.FC<BrandNameModalProps> = ({ isOpen, onClose }) => {
  const { brandName, setBrandName, showToast } = useShop();
  const [tempName, setTempName] = useState(brandName);

  if (!isOpen) return null;

  const presets = [
    { name: 'LANGOI STUDIOS', desc: 'Inspired by traditional Manipuri handloom lineage and raw luxury' },
    { name: 'YENNING ATELIER', desc: 'Meaning "Spring / Rebirth" in Manipuri' },
    { name: 'NONGIN WEAR', desc: 'Named after the rare State Bird of Manipur' },
    { name: 'KANGLEI NOIR', desc: 'Honoring ancient Kangleipak heritage in dark aesthetics' },
    { name: 'IMPHAL DEPT.', desc: 'Urban Gen-Z streetwear department' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    setBrandName(tempName.trim().toUpperCase());
    showToast(`Brand updated to "${tempName.trim().toUpperCase()}"`);
    onClose();
  };

  const handleSelectPreset = (name: string) => {
    setTempName(name);
    setBrandName(name);
    showToast(`Brand set to "${name}"`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E8E2D5] p-6 animate-in fade-in-50 zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B38728]" />
              <h3 className="text-base font-bold uppercase tracking-wider text-black">
                Customize Brand Name
              </h3>
            </div>
            <button onClick={onClose} className="p-1 text-neutral-400 hover:text-black rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#666666] mt-3">
            Your brief specified <em>"[YOUR BRAND NAME]" based in Imphal, Manipur</em>. Type your brand moniker below or choose from culturally curated Imphal streetwear labels:
          </p>

          <form onSubmit={handleSave} className="mt-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-1">
              Brand Moniker
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="e.g. YOUR BRAND NAME"
                className="flex-1 px-3 py-2 text-sm bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-semibold uppercase tracking-wider"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
              >
                Save
              </button>
            </div>
          </form>

          <div className="mt-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#777777] block mb-2">
              Curated Imphal Brand Monikers:
            </span>
            <div className="space-y-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleSelectPreset(p.name)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center justify-between group ${
                    brandName === p.name
                      ? 'border-black bg-[#FAF8F5]'
                      : 'border-[#E8E2D5] hover:border-black hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-black block">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-[#777777]">{p.desc}</span>
                  </div>
                  {brandName === p.name ? (
                    <Check className="w-4 h-4 text-black" />
                  ) : (
                    <span className="text-[11px] text-neutral-400 group-hover:text-black">Select</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
