import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  { image: '/image/f115e7be-ed96-4f4e-9dbf-8ee2b4c322c2.png', caption: 'A Wonderful Journey' },
  { image: 'public/image/84c5fb4a-600a-49f1-8fc5-7e8229e01546.png', caption: 'golden memory ' }
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 md:gap-2 w-[90%] md:w-auto">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4 md:w-8' : 'bg-white/50 hover:bg-white/80'
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
