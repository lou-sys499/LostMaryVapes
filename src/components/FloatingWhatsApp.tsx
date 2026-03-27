import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const phoneNumber = '16674715870';
  const message = 'Hello! I would like to inquire about Lost Mary products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap font-bold uppercase tracking-wider text-sm">
        Chat with us
      </span>
    </a>
  );
}
