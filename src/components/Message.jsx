import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Message = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Quote className="w-16 h-16 mx-auto text-pink-300 mb-8 opacity-50" />
          
          <motion.h2 
            className="text-3xl md:text-5xl font-[var(--font-secondary)] text-gray-800 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            "Every love story is beautiful, but ours is my favorite. Thank you for being my partner, my best friend, and my greatest adventure."
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-xl text-pink-500 font-medium tracking-widest uppercase">
              Happy Anniversary
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Message;
