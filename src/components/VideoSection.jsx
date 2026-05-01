import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/image/WhatsApp%20Image%202026-05-01%20at%2009.34.52.jpeg')" }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-panel bg-white/10 p-10 md:p-16 rounded-3xl border border-white/20 shadow-2xl"
        >
          <HeartHandshake className="w-16 h-16 mx-auto text-amber-400 mb-6" />
          
          <h2 className="text-4xl md:text-5xl font-[var(--font-secondary)] text-white mb-8 font-semibold tracking-wide drop-shadow-md">
            Our Promise of Forever
          </h2>
          
          <p className="text-xl md:text-3xl font-light italic leading-relaxed text-pink-100 drop-shadow-sm font-[var(--font-secondary)]">
            "Through all the seasons of life, the laughter, and the tears, our love has only grown deeper. Twenty-five years is just the beginning of our forever."
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
            <span className="text-amber-400 font-medium tracking-widest uppercase text-sm">25 Years Strong</span>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
