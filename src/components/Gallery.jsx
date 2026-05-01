import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { X, Upload, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const initialPhotos = [
  { src: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.10.jpeg', caption: 'Smiling Together' },
  { src: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11%20(1).jpeg', caption: 'A Beautiful Memory' },
  { src: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11%20(2).jpeg', caption: 'Unforgettable Moments' },
  { src: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11.jpeg', caption: 'Cherished Times' },
  { src: '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.12.jpeg', caption: 'Loving Embrace' },
  { src: '/image/WhatsApp%20Image%202026-05-01%20at%2009.34.52.jpeg', caption: 'Forever and Always' },
];

const Gallery = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      src: URL.createObjectURL(file),
      caption: 'A New Beautiful Memory'
    }));
    setPhotos(prev => [...newPhotos, ...prev]);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') nextSlide(e);
      if (e.key === 'ArrowLeft') prevSlide(e);
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, photos.length]);

  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-[var(--font-secondary)] text-gray-800 mb-4">Our Memories</h2>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">A collection of our favorite moments together. Click any photo to open the interactive slideshow!</p>
          
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-pink-100 text-pink-600 rounded-full cursor-pointer hover:bg-pink-200 transition-colors font-medium shadow-sm">
            <Upload size={20} />
            Upload Photos
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>
        </motion.div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 5) * 0.1 }}
              className="mb-4 relative group cursor-pointer overflow-hidden rounded-xl shadow-sm bg-pink-50/50"
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={photo.src} 
                alt={photo.caption} 
                className="w-full h-auto block transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <ZoomIn className="text-white w-10 h-10 mb-2" />
                <span className="text-white font-[var(--font-secondary)] font-medium text-lg drop-shadow-md">
                  {photo.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Interactive Lightbox Slideshow */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-2 rounded-full"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-3 rounded-full hover:scale-110"
            >
              <ChevronLeft size={36} />
            </button>

            <button 
              onClick={nextSlide}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 bg-black/50 p-3 rounded-full hover:scale-110"
            >
              <ChevronRight size={36} />
            </button>

            <div className="flex flex-col items-center justify-center max-w-full max-h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  src={photos[selectedIndex].src}
                  alt={photos[selectedIndex].caption}
                  className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
              
              <motion.div 
                key={`caption-${selectedIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-white text-2xl md:text-3xl font-[var(--font-secondary)] tracking-wide">
                  {photos[selectedIndex].caption}
                </h3>
                <p className="text-white/60 mt-2 tracking-widest text-sm uppercase">
                  {selectedIndex + 1} / {photos.length}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
