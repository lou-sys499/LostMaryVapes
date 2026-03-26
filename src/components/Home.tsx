import React from 'react';
import { motion } from 'motion/react';
import { ViewState } from '../types';
import { PRODUCTS } from '../data';
import { BannerSlider } from './BannerSlider';

export function Home({ setView }: { setView: (v: ViewState) => void }) {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <BannerSlider />

      {/* Featured Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Featured Releases</h2>
            <p className="text-zinc-400">Discover our most popular devices.</p>
          </div>
          <button 
            onClick={() => setView('shop')}
            className="hidden md:block text-rose-500 hover:text-rose-400 font-medium uppercase tracking-wider text-sm"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setView('shop')}
            >
              <div className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                    Quick View
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{product.name}</h3>
              <p className="text-zinc-400 text-sm mb-3">{product.shortDesc}</p>
              <p className="text-lg font-medium">${product.retailPrice.toFixed(2)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

