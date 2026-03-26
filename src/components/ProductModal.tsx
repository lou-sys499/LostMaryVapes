import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, isWholesale: boolean) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWholesale, setIsWholesale] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const price = isWholesale ? product.wholesalePrice : product.retailPrice;
  const minQty = isWholesale ? 10 : 1;

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= minQty) {
      setQuantity(newQty);
    }
  };

  const handleWholesaleToggle = (wholesale: boolean) => {
    setIsWholesale(wholesale);
    if (wholesale && quantity < 10) {
      setQuantity(10);
    } else if (!wholesale && quantity >= 10) {
      setQuantity(1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-zinc-950/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery */}
        <div className="w-full md:w-1/2 bg-zinc-950 p-6 flex flex-col">
          <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 ${activeImage === idx ? 'border-rose-500' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
          <div className="text-rose-500 text-sm font-bold uppercase tracking-wider mb-2">{product.category}</div>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">{product.name}</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">{product.longDesc}</p>

          {/* Pricing Toggle */}
          <div className="bg-zinc-950 rounded-2xl p-1 flex mb-8">
            <button 
              onClick={() => handleWholesaleToggle(false)}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${!isWholesale ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Retail
            </button>
            <button 
              onClick={() => handleWholesaleToggle(true)}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${isWholesale ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Wholesale
            </button>
          </div>

          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Price per unit</div>
              <div className="text-4xl font-black">${price.toFixed(2)}</div>
            </div>
            {isWholesale && (
              <div className="text-sm text-rose-400 font-medium">
                Min. Order: 10 units
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <div className="text-sm text-zinc-500 uppercase tracking-wider mb-3">Quantity</div>
            <div className="flex items-center bg-zinc-950 rounded-xl w-fit border border-zinc-800">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= minQty}
                className="p-4 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-16 text-center font-bold text-lg">{quantity}</div>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="p-4 text-zinc-400 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product, quantity, isWholesale)}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart - ${(price * quantity).toFixed(2)}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
