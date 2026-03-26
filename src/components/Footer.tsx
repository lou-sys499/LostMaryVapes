import React from 'react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="text-3xl font-black tracking-tighter uppercase mb-4">
              Lost<span className="text-rose-600">Mary</span>
            </div>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed mb-6">
              Premium disposable vaping devices and e-liquids. Designed for adult smokers seeking an alternative.
            </p>
            <div className="inline-block border-2 border-zinc-800 p-4 rounded-xl">
              <h4 className="font-bold text-rose-500 uppercase tracking-wider text-sm mb-1">Warning</h4>
              <p className="text-zinc-400 text-xs font-bold uppercase">This product contains nicotine. Nicotine is an addictive chemical.</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disposables</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Devices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-Liquids</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wholesale Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Age Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Lost Mary. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
