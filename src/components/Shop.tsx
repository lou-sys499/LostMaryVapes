import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';
import { Filter } from 'lucide-react';

interface ShopProps {
  searchQuery: string;
  onSelectProduct: (p: Product) => void;
}

export function Shop({ searchQuery, onSelectProduct }: ShopProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<number>(50);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesPrice = p.retailPrice <= priceRange;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, activeCategory, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filters
            </h3>
            
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Categories</h4>
                <div className="flex flex-col space-y-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left text-sm transition-colors ${activeCategory === cat ? 'text-rose-500 font-bold' : 'text-zinc-400 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Max Price: ${priceRange}</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="1"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h2>
            <span className="text-zinc-400 text-sm">{filteredProducts.length} Results</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-zinc-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden group cursor-pointer hover:border-zinc-700 transition-colors"
                  onClick={() => onSelectProduct(product)}
                >
                  <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-zinc-950 to-transparent">
                      <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-rose-500 font-bold uppercase tracking-wider mb-1">{product.category}</div>
                    <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{product.shortDesc}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Retail</div>
                        <div className="text-lg font-bold">${product.retailPrice.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Wholesale</div>
                        <div className="text-lg font-bold text-rose-400">${product.wholesalePrice.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
