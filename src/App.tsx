/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AgeVerification } from './components/AgeVerification';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { Checkout } from './components/Checkout';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { Product, CartItem, ViewState } from './types';

export default function App() {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const verified = localStorage.getItem('lostMaryAgeVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    } else {
      setIsAgeVerified(false);
    }

    const savedCart = localStorage.getItem('lostMaryCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lostMaryCart', JSON.stringify(cart));
  }, [cart]);

  const handleVerifyAge = () => {
    localStorage.setItem('lostMaryAgeVerified', 'true');
    setIsAgeVerified(true);
  };

  const addToCart = (product: Product, quantity: number, isWholesale: boolean) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.isWholesale === isWholesale);
      if (existing) {
        return prev.map(item => 
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, isWholesale }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter((_, i) => i !== index));
    } else {
      setCart(prev => prev.map((item, i) => i === index ? { ...item, quantity } : item));
    }
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (isAgeVerified === null) return null; // Loading state

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-rose-500/30">
      {!isAgeVerified && <AgeVerification onVerify={handleVerifyAge} />}
      
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        setView={setView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="pt-20 pb-16 min-h-screen">
        {view === 'home' && <Home setView={setView} />}
        {view === 'shop' && <Shop searchQuery={searchQuery} onSelectProduct={setSelectedProduct} />}
        {view === 'checkout' && <Checkout cart={cart} clearCart={() => setCart([])} setView={setView} />}
      </main>

      <Footer />

      {isCartOpen && (
        <CartDrawer 
          cart={cart} 
          onClose={() => setIsCartOpen(false)} 
          updateQuantity={updateCartQuantity}
          removeItem={removeFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            setView('checkout');
          }}
        />
      )}

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}
