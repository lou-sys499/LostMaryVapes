import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CartItem, ViewState } from '../types';
import { CheckCircle } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
  setView: (v: ViewState) => void;
}

export function Checkout({ cart, clearCart, setView }: CheckoutProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
    return sum + (price * item.quantity);
  }, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const action = submitter?.value;

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const zip = formData.get('zip') as string;

    const customerName = `${firstName} ${lastName}`.trim();
    const fullAddress = `${address}, ${city}, ${state} ${zip}`.trim();

    if (action === 'checkout') {
      setIsSubmitting(true);
      const selectedProducts = cart.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
      
      const payload = {
        firstName,
        lastName,
        email,
        address,
        city,
        zipCode: zip,
        selectedProduct: selectedProducts,
        totalAmount: total.toFixed(2)
      };

      try {
        await fetch('https://script.google.com/macros/s/AKfycbxJIk8CRzal_03wquLyMwMnwwrnl_XEc5IQ3ftxW02IEsa6tjvM71cuzrgqftLJ-Cbp/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.error('Error submitting order:', error);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      clearCart();
    } else {
      let orderDetails = `*New Order from ${customerName}*\n`;
      if (email) orderDetails += `*Email:* ${email}\n`;
      orderDetails += `*Address:* ${fullAddress}\n\n`;
      orderDetails += `*Items:*\n`;
      
      cart.forEach(item => {
        const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
        orderDetails += `- ${item.quantity}x ${item.product.name} ($${(price * item.quantity).toFixed(2)})\n`;
      });
      
      orderDetails += `\n*Subtotal:* $${subtotal.toFixed(2)}\n`;
      orderDetails += `*Tax:* $${taxes.toFixed(2)}\n`;
      orderDetails += `*Total:* $${total.toFixed(2)}\n`;

      const encodedMessage = encodeURIComponent(orderDetails);
      const whatsappUrl = `https://wa.me/237657484617?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');

      setIsSubmitted(true);
      clearCart();
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Order Confirmed</h2>
          <p className="text-zinc-400 mb-8 max-w-md">
            Thank you for your purchase. Your order has been sent via WhatsApp and is being processed.
          </p>
          <button 
            onClick={() => setView('home')}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-colors"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button 
          onClick={() => setView('shop')}
          className="text-rose-500 hover:text-rose-400 font-bold uppercase tracking-wider"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-10">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-zinc-800">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="firstName" type="text" placeholder="First Name" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
                <input required name="lastName" type="text" placeholder="Last Name" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
                <input required name="email" type="email" placeholder="Email Address" className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
                <input required name="address" type="text" placeholder="Address" className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
                <input required name="city" type="text" placeholder="City" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
                <div className="grid grid-cols-2 gap-4">
                  <input required name="state" type="text" placeholder="State" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
                  <input required name="zip" type="text" placeholder="ZIP" className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 pb-2 border-b border-zinc-800">Payment Details</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Card Number (Optional for WhatsApp)" maxLength={19} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 font-mono" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" maxLength={5} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 font-mono" />
                  <input type="text" placeholder="CVC" maxLength={4} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 font-mono" />
                </div>
                <input type="text" placeholder="Name on Card" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500" />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sticky top-24">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map((item, idx) => {
                const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
                return (
                  <div key={idx} className="flex justify-between text-sm">
                    <div className="flex gap-3">
                      <span className="text-zinc-500">{item.quantity}x</span>
                      <span className="truncate max-w-[150px]">{item.product.name}</span>
                    </div>
                    <span>${(price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-zinc-800 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Estimated Tax</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="h-px bg-zinc-800 my-2"></div>
              <div className="flex justify-between text-white font-bold text-xl">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                type="submit"
                name="action"
                value="checkout"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Checkout'}
              </button>
              <button 
                type="submit"
                name="action"
                value="whatsapp"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                Order via WhatsApp
              </button>
            </div>
            <p className="text-xs text-zinc-500 text-center mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
