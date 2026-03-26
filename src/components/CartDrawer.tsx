import React from 'react';
import { motion } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  cart: CartItem[];
  onClose: () => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ cart, onClose, updateQuantity, removeItem, onCheckout }: CartDrawerProps) {
  const subtotal = cart.reduce((sum, item) => {
    const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
    return sum + (price * item.quantity);
  }, 0);

  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + taxes;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-zinc-900 h-full flex flex-col border-l border-zinc-800 shadow-2xl"
      >
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-wider">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500">
              <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item, index) => {
              const price = item.isWholesale ? item.product.wholesalePrice : item.product.retailPrice;
              const minQty = item.isWholesale ? 10 : 1;

              return (
                <div key={`${item.product.id}-${item.isWholesale}`} className="flex gap-4 bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800/50">
                  <div className="w-20 h-20 bg-zinc-900 rounded-xl overflow-hidden shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="eager" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm leading-tight pr-4">{item.product.name}</h3>
                        <button onClick={() => removeItem(index)} className="text-zinc-500 hover:text-rose-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">
                        {item.isWholesale ? 'Wholesale' : 'Retail'} • ${price.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800">
                        <button 
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= minQty}
                          className="p-1.5 text-zinc-400 hover:text-white disabled:opacity-30"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="p-1.5 text-zinc-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="font-bold text-sm">
                        ${(price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-zinc-800 bg-zinc-950">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-sm">
                <span>Estimated Tax</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="h-px bg-zinc-800 my-2"></div>
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
