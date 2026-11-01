import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { brandName, showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry / Manipur Delivery',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to the Imphal Atelier!');
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${brandName} Imphal! I have an inquiry about sizing and custom streetwear orders.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#736E65] font-semibold block">
            Atelier Direct Connect
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-black">
            CONTACT & IMPHAL STUDIO
          </h1>
          <p className="text-xs sm:text-sm text-[#555555]">
            Have a question regarding custom drops, sizing, or doorstep delivery in Manipur? Connect with our Imphal team.
          </p>
        </div>

        {/* 2-Column Split: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Studio Info (5 columns) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-[#E8E2D5]">
              Physical Atelier Location
            </h3>

            <div className="space-y-4 text-xs text-[#444444]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center shrink-0 text-black">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-black block text-xs uppercase tracking-wide">
                    {brandName} Studio
                  </strong>
                  <p className="mt-0.5 leading-relaxed text-[#555555]">
                    2nd Floor, Kangla Road, Thangal Bazaar, Imphal West, Manipur 795001, India
                  </p>
                  <span className="text-[11px] text-[#736E65] mt-1 block">
                    (Landmark: Opposite Kangla Fort West Gate)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center shrink-0 text-black">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-black block text-xs uppercase tracking-wide">
                    Direct Line
                  </strong>
                  <a href="tel:+919876543210" className="text-[#555555] hover:text-black mt-0.5 block">
                    +91 98765 43210 / +91 98621 09876
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center shrink-0 text-black">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-black block text-xs uppercase tracking-wide">
                    Email Inquiries
                  </strong>
                  <a href="mailto:atelier@langoi.com" className="text-[#555555] hover:text-black mt-0.5 block">
                    atelier@langoi.com / orders@langoi.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center shrink-0 text-black">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-black block text-xs uppercase tracking-wide">
                    Visiting Hours
                  </strong>
                  <p className="text-[#555555] mt-0.5">
                    Monday to Saturday: 10:00 AM – 7:30 PM IST<br />
                    Sunday: Studio fittings by private appointment
                  </p>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Chat CTA */}
            <div className="pt-4 border-t border-[#E8E2D5]">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Interactive Contact Form (7 columns) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black pb-3 border-b border-[#E8E2D5]">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold uppercase text-black">Message Received</h4>
                <p className="text-xs text-[#555555] max-w-sm mx-auto">
                  Thank you for reaching out to {brandName}. Our Imphal studio team will get back to you via phone or email within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 bg-black text-white text-xs uppercase font-semibold rounded"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-800 font-semibold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sanatombi"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-800 font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-800 font-semibold mb-1">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit number"
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-800 font-semibold mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium cursor-pointer"
                    >
                      <option>Order Inquiry / Manipur Delivery</option>
                      <option>Size & Fit Recommendation</option>
                      <option>Exchange / Return Assistance</option>
                      <option>Wholesale & Collaborations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-800 font-semibold mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the drop you're interested in or your questions..."
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#DDD5C5] rounded focus:outline-none focus:border-black font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-[0.16em] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Atelier</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
