import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Tag, MessageCircle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    shippingFee,
    totalAmount,
    appliedDiscount,
    couponCode,
    setCouponCode,
    applyCoupon,
    removeCoupon,
    manipurFreeShippingGoal,
    amountNeededForFreeShipping,
    navigateToPage
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / manipurFreeShippingGoal) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const ok = applyCoupon(inputCode);
    if (!ok) {
      setCouponError('Invalid code. Use IMPHAL10');
    } else {
      setCouponError('');
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateToPage('checkout');
  };

  const handleWhatsAppCartOrder = () => {
    const itemsSummary = cart
      .map((it) => `• ${it.product.name} (Size: ${it.selectedSize}, Color: ${it.selectedColor}, Qty: ${it.quantity}) - ₹${it.product.price * it.quantity}`)
      .join('%0A');

    const message = `Hello LANGOI STUDIOS! I would like to place an order:%0A%0A${itemsSummary}%0A%0A*Total Amount:* ₹${totalAmount}%0A*Delivery to Manipur:* ${shippingFee === 0 ? 'FREE' : '₹99'}%0APlease confirm my order!`;

    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E2D5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold uppercase tracking-wider text-[#111111]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#777777] font-medium">
                ({cart.reduce((sum, it) => sum + it.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-[#F5F1E8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Manipur Free Shipping Progress Tracker */}
          <div className="bg-[#F5F1E8] px-6 py-3 border-b border-[#E8E2D5]">
            <div className="flex items-center justify-between text-xs text-[#333333] mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-black" />
                {amountNeededForFreeShipping === 0 ? (
                  <strong className="text-emerald-700">You unlocked FREE Delivery in Manipur!</strong>
                ) : (
                  <span>Add ₹{amountNeededForFreeShipping} more for Free Manipur Delivery</span>
                )}
              </span>
              <span className="text-[11px] text-[#777777] font-semibold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E0D9C8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#000000] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#F0EBE0]">
            {cart.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#F5F1E8] flex items-center justify-center mb-4 text-[#888888]">
                  <Truck className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#666666] max-w-xs mt-1">
                  Discover our new drop engineered in Imphal. Heavyweight cottons, drop shoulders, and selvedge cuts.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateToPage('shop');
                  }}
                  className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded bg-[#EFEBE1] shrink-0 border border-[#E8E2D5]"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-[#666666]">
                        <span>Size: <strong className="text-black">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Color: <strong className="text-black">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD5C5] rounded bg-[#FAF7F0]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                          className="p-1 px-2 text-neutral-600 hover:text-black cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-black px-2 min-w-[20px] text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                          className="p-1 px-2 text-neutral-600 hover:text-black cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-black tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

            {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-[#E8E2D5] bg-[#FAF8F5] p-6 space-y-4">
              {/* Promo code bar */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Coupon code (try IMPHAL10)"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#DDD5C5] rounded focus:outline-none focus:border-black uppercase font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#000000] text-white text-xs font-medium uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded border border-emerald-200">
                  <span>Community Promo ({appliedDiscount}% Off)</span>
                  <button onClick={removeCoupon} className="text-emerald-900 underline text-[11px] font-semibold">
                    Remove
                  </button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-semibold tabular-nums">
                      -₹{Math.round((subtotal * appliedDiscount) / 100).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Delivery (Manipur)</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E8E2D5] flex justify-between text-sm font-bold text-black">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTAs */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-[#000000] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-[0.15em] rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Quick Order button */}
                <button
                  onClick={handleWhatsAppCartOrder}
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp Direct</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#777777]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery & Razorpay Secure Verification</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
