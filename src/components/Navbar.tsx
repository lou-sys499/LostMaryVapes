import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  setView: (view: ViewState) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function Navbar({ cartCount, onOpenCart, setView, searchQuery, setSearchQuery }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', view: 'home' as ViewState },
    { name: 'Shop', view: 'shop' as ViewState },
    { name: 'Wholesale', view: 'shop' as ViewState },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl font-black tracking-tighter uppercase cursor-pointer"
            onClick={() => setView('home')}
          >
            Lost<span className="text-rose-600">Mary</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setView(link.view)}
                className="text-sm font-medium text-zinc-300 hover:text-white uppercase tracking-wider transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setView('shop');
                }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-rose-500 transition-colors w-48 lg:w-64"
              />
            </div>
            
            <button className="text-zinc-300 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            <button 
              className="text-zinc-300 hover:text-white transition-colors relative"
              onClick={onOpenCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden text-zinc-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-4">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setView('shop');
                }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setView(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-lg font-medium text-zinc-300 hover:text-white uppercase tracking-wider py-2"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
