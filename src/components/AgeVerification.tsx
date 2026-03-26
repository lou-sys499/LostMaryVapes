import React from 'react';
import { motion } from 'motion/react';

export function AgeVerification({ onVerify }: { onVerify: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-2xl max-w-md w-full mx-4 text-center shadow-2xl shadow-rose-900/20"
      >
        <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">Lost Mary</h1>
        <div className="w-12 h-1 bg-rose-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold mb-4">AGE VERIFICATION</h2>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
          The products on this website are intended for adults only. By entering this website, you certify that you are at least 21 years of age in accordance with U.S. federal law.
        </p>
        <div className="space-y-4">
          <button 
            onClick={onVerify}
            className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-6 rounded-full transition-colors uppercase tracking-wider text-sm"
          >
            I am 21+ - Enter
          </button>
          <button 
            onClick={() => window.location.href = 'https://google.com'}
            className="w-full bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-bold py-4 px-6 rounded-full transition-colors uppercase tracking-wider text-sm"
          >
            I am under 21 - Exit
          </button>
        </div>
      </motion.div>
    </div>
  );
}
