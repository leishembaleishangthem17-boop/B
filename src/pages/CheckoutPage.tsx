import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CustomerInfo, Order } from '../types';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  QrCode,
  Smartphone
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    shippingFee,
    totalAmount,
    appliedDiscount,
    createOrder,
    navigateToPage,
    brandName
  } = useShop();

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: 'Leishemba Leishangthem',
    email: 'leishembaleishangthem17@gmail.com',
    phone: '9862123456',
    address: 'House #42, Uripok Achom Leikai',
    locality: 'Near Kangla Fort',
    city: 'Imphal',
    state: 'Manipur',
    pincode: '795001',
    orderNotes: 'Please call before delivery'
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');
  const [isProcessingRazorpay, setIsProcessingRazorpay] = useState(false);
  const [razorpayModalOpen, setRazorpayModalOpen] = useState(false);
  const [razorpayTab, setRazorpayTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const manipurDistricts = [
    'Imphal West',
    'Imphal East',
    'Bishnupur',
    'Thoubal',
    'Kakching',
    'Churachandpur',
    'Ukhrul',
    'Senapati',
    'Kangpokpi',
    'Tamenglong',
    'Tengnoupal',
    'Chandel',
    'Noney',
    'Pherzawl',
    'Kamjong',
    'Jiribam'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (paymentMethod === 'razorpay') {
      setRazorpayModalOpen(true);
    } else {
      // Cash on delivery direct order
      const order = createOrder(customer, 'cod');
      setConfirmedOrder(order);
    }
  };

  const handleSimulateRazorpaySuccess = () => {
    setIsProcessingRazorpay(true);
    setTimeout(() => {
      setIsProcessingRazorpay(false);
      setRazorpayModalOpen(false);
      const order = createOrder(customer, 'razorpay');
      setConfirmedOrder(order);
    }, 1500);
  };

  // Order Confirmed State
  if (confirmedOrder) {
    const shareWhatsAppReceipt = () => {
      const itemsList = confirmedOrder.items
        .map((it) => `• ${it.product.name} (${it.selectedSize}) x${it.quantity} - ₹${it.product.price * it.quantity}`)
        .join('%0A');

      const text = `🎉 Order Confirmed with ${brandName}!%0A%0A*Order ID:* ${confirmedOrder.id}%0A*Date:* ${confirmedOrder.date}%0A*Customer:* ${confirmedOrder.customer.fullName}%0A*Delivery Address:* ${confirmedOrder.customer.address}, ${confirmedOrder.customer.city}, ${confirmedOrder.customer.state} - ${confirmedOrder.customer.pincode}%0A*Phone:* ${confirmedOrder.customer.phone}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Amount:* ₹${confirmedOrder.total}%0A*Payment Method:* ${confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (₹0 extra)' : 'Paid Online via Razorpay'}%0A%0AThank you for supporting Imphal craftsmanship!`;

      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    };

    return (
      <div className="min-h-screen bg-[#F5F1E8] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-2xl border border-[#E8E2D5] shadow-xl p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#736E65] font-bold block">
              Payment & Order Successful
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-black">
              ORDER CONFIRMED
            </h1>
            <p className="text-xs text-[#555555]">
              Order <strong className="text-black">#{confirmedOrder.id}</strong> has been received by the Imphal Atelier.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E8E2D5] space-y-3 text-xs">
            <div className="flex justify-between pb-2 border-b border-[#E8E2D5]">
              <span className="text-[#777777]">Payment Method:</span>
              <strong className="text-black uppercase">
                {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Razorpay Verified'}
              </strong>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E8E2D5]">
              <span className="text-[#777777]">Estimated Delivery:</span>
              <strong className="text-black">2-3 Business Days in Manipur</strong>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E8E2D5]">
              <span className="text-[#777777]">Shipping Address:</span>
              <span className="text-right text-black font-medium">
                {confirmedOrder.customer.address}, {confirmedOrder.customer.locality}, {confirmedOrder.customer.city}, {confirmedOrder.customer.state} ({confirmedOrder.customer.pincode})
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold text-black">
              <span>Total Paid / Payable:</span>
              <span>₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={shareWhatsAppReceipt}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Receipt on WhatsApp</span>
            </button>

            <button
              onClick={() => navigateToPage('shop')}
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#736E65] font-bold block">
            Express Checkout
          </span>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-black mt-1">
            Shipping & Payment
          </h1>
          <p className="text-xs text-[#666666] mt-1">
            Enjoy Free Delivery in Manipur on orders above ₹999. Cash on Delivery supported.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Customer Shipping Info (7 columns) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-[#E8E2D5] flex items-center gap-2">
              <Truck className="w-4 h-4 text-black" />
              <span>1. Delivery Address (Manipur / India)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={customer.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Leishemba Leishangthem"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Mobile Number (for COD & Delivery Call) *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={customer.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Email Address (for order invoices) *
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Street Address / House No. / Leikai *
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Uripok Achom Leikai, Kangla Road"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Locality / Landmark
                </label>
                <input
                  type="text"
                  name="locality"
                  value={customer.locality}
                  onChange={handleInputChange}
                  placeholder="e.g. Near Kangla Fort / Thangal Bazaar"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  City / District *
                </label>
                <select
                  name="city"
                  value={customer.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium cursor-pointer"
                >
                  <option value="Imphal">Imphal (Capital)</option>
                  {manipurDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  <option value="Other India City">Other (Rest of India)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={customer.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Postal PIN Code *
                </label>
                <input
                  type="text"
                  required
                  name="pincode"
                  value={customer.pincode}
                  onChange={handleInputChange}
                  placeholder="e.g. 795001"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="pt-6 border-t border-[#E8E2D5] space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-black flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-black" />
                <span>2. Select Payment Option</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-black bg-[#FAF8F5]'
                      : 'border-[#E8E2D5] hover:border-neutral-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-emerald-700" />
                      <span className="text-xs font-bold uppercase text-black">Cash on Delivery</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold uppercase">
                      ₹0 Extra Fee
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666666] mt-2">
                    Pay in cash or UPI directly to our delivery courier at your doorstep in Manipur.
                  </p>
                </label>

                {/* Razorpay Online */}
                <label
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                    paymentMethod === 'razorpay'
                      ? 'border-black bg-[#FAF8F5]'
                      : 'border-[#E8E2D5] hover:border-neutral-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-bold uppercase text-black">Razorpay Online</span>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold uppercase">
                      UPI / Cards
                    </span>
                  </div>
                  <p className="text-[11px] text-[#666666] mt-2">
                    Instant payment via GPay, PhonePe, Paytm, RuPay, Credit/Debit Cards, or NetBanking.
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary & Place Order Button (5 columns) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-6 sticky top-28">
            <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-[#E8E2D5]">
              Order Summary ({cart.reduce((s, it) => s + it.quantity, 0)} items)
            </h2>

            {/* Itemized Mini List */}
            <div className="divide-y divide-[#F0EBE0] max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="py-3 flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-15 object-cover rounded bg-[#EFEBE1] border border-[#E8E2D5]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-black truncate">{item.product.name}</h4>
                    <span className="text-[11px] text-[#777777]">
                      Size: {item.selectedSize} · Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-black tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Details */}
            <div className="space-y-2 text-xs border-t border-[#E8E2D5] pt-4 text-[#555555]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-black tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span className="font-semibold tabular-nums">
                    -₹{Math.round((subtotal * appliedDiscount) / 100).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>Delivery (Manipur)</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E8E2D5] flex justify-between text-base font-extrabold text-black">
                <span>Total Amount</span>
                <span className="tabular-nums">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-[0.16em] rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {paymentMethod === 'cod'
                    ? `Place Cash on Delivery Order (₹${totalAmount})`
                    : `Pay ₹${totalAmount} via Razorpay`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#777777]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted & Certified Authentic</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Razorpay Simulated Payment Modal */}
      {razorpayModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div onClick={() => setRazorpayModalOpen(false)} className="fixed inset-0 bg-black/75 backdrop-blur-xs" />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DDD5C5] animate-in zoom-in-95 duration-200">
              {/* Razorpay Brand Header */}
              <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold block">
                    Razorpay Secure Checkout
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{brandName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-blue-200 block">Amount to Pay</span>
                  <span className="text-lg font-black text-white tabular-nums">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="flex border-b border-[#E8E2D5] bg-[#FAF8F5] text-xs font-semibold">
                <button
                  onClick={() => setRazorpayTab('upi')}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                    razorpayTab === 'upi' ? 'border-[#0C2340] text-[#0C2340] bg-white' : 'border-transparent text-neutral-500'
                  }`}
                >
                  UPI (GPay / PhonePe)
                </button>
                <button
                  onClick={() => setRazorpayTab('card')}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                    razorpayTab === 'card' ? 'border-[#0C2340] text-[#0C2340] bg-white' : 'border-transparent text-neutral-500'
                  }`}
                >
                  Cards (Debit / Credit)
                </button>
                <button
                  onClick={() => setRazorpayTab('netbanking')}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                    razorpayTab === 'netbanking' ? 'border-[#0C2340] text-[#0C2340] bg-white' : 'border-transparent text-neutral-500'
                  }`}
                >
                  NetBanking
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6 space-y-4">
                {razorpayTab === 'upi' && (
                  <div className="space-y-4 text-center">
                    <div className="p-4 bg-[#F5F1E8] rounded-xl border border-[#E8E2D5] inline-block mx-auto">
                      <QrCode className="w-32 h-32 text-black mx-auto" />
                    </div>
                    <p className="text-xs text-[#555555]">
                      Scan QR code using GPay, PhonePe, Paytm, or enter UPI ID below:
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. yourname@okhdfcbank"
                      defaultValue="leishemba@upi"
                      className="w-full px-3 py-2 text-xs border border-[#DDD5C5] rounded bg-[#FAF8F5] text-center font-medium"
                    />
                  </div>
                )}

                {razorpayTab === 'card' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">Card Number</label>
                      <input
                        type="text"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full px-3 py-2 border border-[#DDD5C5] rounded bg-[#FAF8F5] font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-700 font-semibold mb-1">Expiry Date</label>
                        <input
                          type="text"
                          defaultValue="08/29"
                          className="w-full px-3 py-2 border border-[#DDD5C5] rounded bg-[#FAF8F5] font-mono text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-700 font-semibold mb-1">CVV</label>
                        <input
                          type="password"
                          defaultValue="892"
                          maxLength={3}
                          className="w-full px-3 py-2 border border-[#DDD5C5] rounded bg-[#FAF8F5] font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {razorpayTab === 'netbanking' && (
                  <div className="space-y-2 text-xs">
                    <label className="block text-neutral-700 font-semibold">Select Bank</label>
                    <select className="w-full px-3 py-2 border border-[#DDD5C5] rounded bg-[#FAF8F5]">
                      <option>State Bank of India (SBI - Imphal Main)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Manipur Rural Bank</option>
                    </select>
                  </div>
                )}

                {/* Simulate Payment Button */}
                <button
                  type="button"
                  onClick={handleSimulateRazorpaySuccess}
                  disabled={isProcessingRazorpay}
                  className="w-full py-3.5 bg-[#0C2340] hover:bg-[#1A365D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isProcessingRazorpay ? (
                    <span>Verifying with Razorpay...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Simulate Successful Payment (₹{totalAmount})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
