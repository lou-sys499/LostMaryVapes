import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

const BANNERS = [
  { id: 1, src: 'https://drive.google.com/thumbnail?id=1_wVJbpdxkVtX0X3KYEgBmVUhjMahmOgN&sz=w1200', alt: 'Lost Mary Premium Vapes - Banner 1' },
  { id: 2, src: 'https://drive.google.com/thumbnail?id=1xoevbKu3okWowRRDZwu6yx6zPOKgJBmz&sz=w1200', alt: 'New Arrivals - Banner 2' },
  { id: 3, src: 'https://drive.google.com/thumbnail?id=19yvuKgREGM_b3A7X5hmtARW0d5s8qZci&sz=w1200', alt: 'Special Offers - Banner 3' },
];

export function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % BANNERS.length;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-zinc-950" role="region" aria-label="Promotional Banners">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {BANNERS.map((banner, index) => (
          <div 
            key={banner.id} 
            className="w-full h-full flex-shrink-0 snap-center relative"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${BANNERS.length}`}
          >
            <img 
              src={banner.src} 
              alt={banner.alt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            {/* Overlay gradient to ensure text readability if needed, though banners usually have text baked in. Adding a subtle one just in case. */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index}
          />
        ))}
      </div>
    </div>
  );
}
