import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { X, Upload, ZoomIn } from 'lucide-react';

const initialPhotos = [
  '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.10.jpeg',
  '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11%20(1).jpeg',
  '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11%20(2).jpeg',
  '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.11.jpeg',
  '/image/WhatsApp%20Image%202026-05-01%20at%2009.32.12.jpeg',
  '/image/WhatsApp%20Image%202026-05-01%20at%2009.34.52.jpeg',
];

const Gallery = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prev => [...newPhotos, ...prev]);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

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
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">A collection of our favorite moments together. Feel free to add more photos to our gallery!</p>
          
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
          {photos.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 5) * 0.1 }}
              className="mb-4 relative group cursor-pointer overflow-hidden rounded-xl shadow-sm"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`Memory ${index + 1}`} 
                className="w-full h-auto block transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10" />
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={36} />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Enlarged"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
