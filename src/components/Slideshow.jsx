import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.36.51.jpeg',
    caption: 'Precious early moments watching our little one grow'
  },
  {
    image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.07.jpeg',
    caption: 'The Day We Said Yes'
  },
  {
    image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.08.jpeg',
    caption: 'Building Our Dream Home'
  }
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="py-20 bg-pink-50" id="slideshow">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-[var(--font-secondary)] text-gray-800">Journey Through Time</h2>
        </div>
        
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={slides[currentIndex].image} 
                alt={slides[currentIndex].caption} 
                className="w-full h-full object-contain bg-black/10 backdrop-blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white text-xl md:text-3xl font-[var(--font-secondary)] drop-shadow-md"
                >
                  {slides[currentIndex].caption}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
          >
            <ChevronRight size={32} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slideshow;
