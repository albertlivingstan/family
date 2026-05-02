import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  { image: '/image/00c511d9-26e2-4e34-9196-ba9e4ed421cd.png', caption: 'A moment to remember' },
  { image: '/image/Gemini_Generated_Image_1zg97m1zg97m1zg9.png', caption: 'Beautiful Art' },
  { image: '/image/Gemini_Generated_Image_ju1ip9ju1ip9ju1i.png', caption: 'Aesthetic Creation' },
  { image: '/image/WhatsApp%20Image%202026-04-23%20at%2010.59.01%20(1).jpeg', caption: 'Special Memory' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.10.jpeg', caption: 'Joyful Times' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11%20(1).jpeg', caption: 'Togetherness' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11%20(2).jpeg', caption: 'Happy Moments' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11.jpeg', caption: 'Smiles and Laughter' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.12.jpeg', caption: 'Unforgettable Day' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.34.52.jpeg', caption: 'Our Beautiful Life' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.36.51.jpeg', caption: 'Precious early moments watching our little one grow' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.07%20(1).jpeg', caption: 'A Sweet Memory' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.07.jpeg', caption: 'The Day We Said Yes' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.08%20(1).jpeg', caption: 'Cherished Forever' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.08.jpeg', caption: 'Building Our Dream Home' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.09.jpeg', caption: 'Creating Beautiful Memories Together' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2010.14.23.jpeg', caption: 'Our Growing Family' },
  { image: '/image/WhatsApp%20Image%202026-05-01%20at%2010.22.02.jpeg', caption: 'Adventures Around the World' },
  { image: '/image/WhatsApp%20Image%202026-05-02%20at%2010.30.34.jpeg', caption: 'Love and Happiness' },
  { image: '/image/WhatsApp%20Image%202026-05-02%20at%2010.32.03.jpeg', caption: 'Silver Jubilee Celebration' },
  { image: '/image/WhatsApp%20Image%202026-05-02%20at%2010.32.47.jpeg', caption: 'Always Together' },
  { image: '/image/c322a959-10be-4165-90b6-30bec84e1948.png', caption: 'A Timeless Moment' },
  { image: '/image/d64ea043-86c0-46b4-901d-cbb4733cf9af.png', caption: 'Elegant Memory' },
  { image: '/image/e390edc1-5358-4d28-a722-315aa1e4985f.png', caption: 'Golden Years' },
  { image: '/image/f115e7be-ed96-4f4e-9dbf-8ee2b4c322c2.png', caption: 'A Wonderful Journey' }
];

const SlideshowPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col font-[var(--font-primary)] overflow-hidden">
      {/* Top Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
        <Link to="/" className="text-white/80 hover:text-white flex items-center gap-2 transition-colors">
          <Home size={24} />
          <span className="font-medium">Back to Home</span>
        </Link>
        <h1 className="text-white text-2xl font-[var(--font-secondary)] hidden md:block">Interactive Journey</h1>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white/80 hover:text-white flex items-center gap-2 transition-colors"
        >
          {isPlaying ? (
            <><Pause size={24} /> <span className="font-medium">Pause</span></>
          ) : (
            <><Play size={24} /> <span className="font-medium">Auto-Play</span></>
          )}
        </button>
      </header>

      {/* Main Slideshow Area */}
      <main className="flex-grow relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl"
              style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
            />
            <img 
              src={slides[currentIndex].image} 
              alt={slides[currentIndex].caption} 
              className="relative z-10 max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/30 backdrop-blur-md transition-all z-40 hover:scale-110"
        >
          <ChevronLeft className="w-8 h-8 md:w-9 md:h-9" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 p-2 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/30 backdrop-blur-md transition-all z-40 hover:scale-110"
        >
          <ChevronRight className="w-8 h-8 md:w-9 md:h-9" />
        </button>

        {/* Bottom Caption Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center z-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-white text-2xl md:text-5xl font-[var(--font-secondary)] drop-shadow-lg mb-2 md:mb-4 px-4">
                {slides[currentIndex].caption}
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 md:gap-3 mt-6 flex-wrap max-w-3xl mx-auto">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                className={`transition-all rounded-full ${
                  idx === currentIndex 
                    ? 'bg-amber-400 w-8 md:w-10 h-2 md:h-2.5 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                    : 'bg-white/40 hover:bg-white/80 w-2 md:w-2.5 h-2 md:h-2.5'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SlideshowPage;
