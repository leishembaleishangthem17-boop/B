import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

export const SizeChartModal: React.FC = () => {
  const { isSizeChartOpen, setIsSizeChartOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'hoodies' | 'tees' | 'denim'>('hoodies');
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeChartOpen) return null;

  const hoodieMeasurements = [
    { size: 'S', chest: { in: 44, cm: 112 }, length: { in: 26.5, cm: 67 }, shoulder: { in: 22, cm: 56 }, sleeve: { in: 23, cm: 58 } },
    { size: 'M', chest: { in: 47, cm: 119 }, length: { in: 27.5, cm: 70 }, shoulder: { in: 23.5, cm: 60 }, sleeve: { in: 24, cm: 61 } },
    { size: 'L', chest: { in: 50, cm: 127 }, length: { in: 28.5, cm: 72 }, shoulder: { in: 25, cm: 63.5 }, sleeve: { in: 24.5, cm: 62 } },
    { size: 'XL', chest: { in: 53, cm: 135 }, length: { in: 29.5, cm: 75 }, shoulder: { in: 26.5, cm: 67 }, sleeve: { in: 25, cm: 63.5 } },
    { size: 'XXL', chest: { in: 56, cm: 142 }, length: { in: 30.5, cm: 77 }, shoulder: { in: 28, cm: 71 }, sleeve: { in: 25.5, cm: 65 } }
  ];

  const teeMeasurements = [
    { size: 'S', chest: { in: 42, cm: 107 }, length: { in: 27, cm: 68.5 }, shoulder: { in: 20.5, cm: 52 }, sleeve: { in: 8.5, cm: 21.5 } },
    { size: 'M', chest: { in: 45, cm: 114 }, length: { in: 28, cm: 71 }, shoulder: { in: 22, cm: 56 }, sleeve: { in: 9, cm: 23 } },
    { size: 'L', chest: { in: 48, cm: 122 }, length: { in: 29, cm: 73.5 }, shoulder: { in: 23.5, cm: 60 }, sleeve: { in: 9.5, cm: 24 } },
    { size: 'XL', chest: { in: 51, cm: 129.5 }, length: { in: 30, cm: 76 }, shoulder: { in: 25, cm: 63.5 }, sleeve: { in: 10, cm: 25.5 } },
    { size: 'XXL', chest: { in: 54, cm: 137 }, length: { in: 31, cm: 78.5 }, shoulder: { in: 26.5, cm: 67 }, sleeve: { in: 10.5, cm: 26.5 } }
  ];

  const denimMeasurements = [
    { size: 'S (30)', waist: { in: 31, cm: 79 }, hip: { in: 42, cm: 107 }, length: { in: 41, cm: 104 }, thigh: { in: 26, cm: 66 } },
    { size: 'M (32)', waist: { in: 33, cm: 84 }, hip: { in: 44, cm: 112 }, length: { in: 42, cm: 107 }, thigh: { in: 27, cm: 68.5 } },
    { size: 'L (34)', waist: { in: 35, cm: 89 }, hip: { in: 46, cm: 117 }, length: { in: 42.5, cm: 108 }, thigh: { in: 28, cm: 71 } },
    { size: 'XL (36)', waist: { in: 37, cm: 94 }, hip: { in: 48, cm: 122 }, length: { in: 43, cm: 109 }, thigh: { in: 29, cm: 73.5 } }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsSizeChartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E8E2D5] my-8 animate-in fade-in-50 zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2.5">
              <Ruler className="w-5 h-5 text-black" />
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-black">
                  Streetwear Fit & Size Guide
                </h3>
                <p className="text-xs text-[#666666]">
                  Engineered with an authentic oversized, drop-shoulder silhouette.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black rounded-md hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Tabs & Unit Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* Category selector */}
              <div className="flex items-center gap-1 bg-[#F5F1E8] p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('hoodies')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'hoodies' ? 'bg-black text-white shadow-xs' : 'text-[#555555] hover:text-black'
                  }`}
                >
                  Hoodies (450 GSM)
                </button>
                <button
                  onClick={() => setActiveTab('tees')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'tees' ? 'bg-black text-white shadow-xs' : 'text-[#555555] hover:text-black'
                  }`}
                >
                  Heavy Tees (280 GSM)
                </button>
                <button
                  onClick={() => setActiveTab('denim')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                    activeTab === 'denim' ? 'bg-black text-white shadow-xs' : 'text-[#555555] hover:text-black'
                  }`}
                >
                  Denim & Cargo
                </button>
              </div>

              {/* Unit Toggle */}
              <div className="flex items-center gap-1 bg-[#F5F1E8] p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    unit === 'in' ? 'bg-black text-white' : 'text-[#666666] hover:text-black'
                  }`}
                >
                  Inches (")
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    unit === 'cm' ? 'bg-black text-white' : 'text-[#666666] hover:text-black'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>
            </div>

            {/* Measurement Table */}
            <div className="overflow-x-auto border border-[#E8E2D5] rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-[#E8E2D5] font-semibold text-neutral-800 uppercase tracking-wider">
                  {activeTab !== 'denim' ? (
                    <tr>
                      <th className="py-3 px-4">Size</th>
                      <th className="py-3 px-4">Chest / Bust</th>
                      <th className="py-3 px-4">Body Length</th>
                      <th className="py-3 px-4">Shoulder Drop</th>
                      <th className="py-3 px-4">Sleeve</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="py-3 px-4">Waist Size</th>
                      <th className="py-3 px-4">Actual Waist</th>
                      <th className="py-3 px-4">Hip</th>
                      <th className="py-3 px-4">Outseam Length</th>
                      <th className="py-3 px-4">Thigh</th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-[#EFECE3] font-medium text-neutral-800">
                  {activeTab === 'hoodies' &&
                    hoodieMeasurements.map((m) => (
                      <tr key={m.size} className="hover:bg-[#FAF8F5]">
                        <td className="py-3 px-4 font-bold">{m.size}</td>
                        <td className="py-3 px-4 tabular-nums">{m.chest[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.length[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.shoulder[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.sleeve[unit]} {unit}</td>
                      </tr>
                    ))}

                  {activeTab === 'tees' &&
                    teeMeasurements.map((m) => (
                      <tr key={m.size} className="hover:bg-[#FAF8F5]">
                        <td className="py-3 px-4 font-bold">{m.size}</td>
                        <td className="py-3 px-4 tabular-nums">{m.chest[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.length[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.shoulder[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.sleeve[unit]} {unit}</td>
                      </tr>
                    ))}

                  {activeTab === 'denim' &&
                    denimMeasurements.map((m) => (
                      <tr key={m.size} className="hover:bg-[#FAF8F5]">
                        <td className="py-3 px-4 font-bold">{m.size}</td>
                        <td className="py-3 px-4 tabular-nums">{m.waist[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.hip[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.length[unit]} {unit}</td>
                        <td className="py-3 px-4 tabular-nums">{m.thigh[unit]} {unit}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Fit Tips */}
            <div className="mt-5 p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D5] space-y-2 text-xs text-[#555555]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>True to Streetwear Fit:</strong> We intentionally cut our tees and hoodies with 2–3 inches of relaxed boxiness and dropped shoulders. If you prefer a fitted/standard Zara look, size down once.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Pre-Shrunk Luxury Cotton:</strong> Double-enzyme washed so measurements won't degrade after home washing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
