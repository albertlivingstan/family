import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Trash2, Undo2, CheckCircle2 } from 'lucide-react';

const initialWishes = [
  { id: '1', name: 'Sarah & Mark', message: 'Happy Anniversary to the most beautiful couple! Wishing you a lifetime of love and happiness.' },
  { id: '2', name: 'Mom & Dad', message: 'We are so proud of the life you have built together. Happy Anniversary! Love you both.' },
  { id: '3', name: 'Emily', message: 'Wishing you another year of being as wonderful as you are! Happy Anniversary!' },
  { id: '4', name: 'Uncle Bob', message: '25 years! What an amazing milestone. Wishing you all the best.' },
  { id: '5', name: 'Cousin Jane', message: 'May your love continue to grow stronger each and every year. Cheers!' },
  { id: '6', name: 'The Smiths', message: 'Happy anniversary! We love you guys.' },
  { id: '7', name: 'Michael', message: 'You two are an inspiration to us all. Have a wonderful anniversary.' },
  { id: '8', name: 'Aunt Lisa', message: 'Sending you so much love on your special day.' },
  { id: '9', name: 'David & Family', message: 'Congratulations on 25 beautiful years together.' },
  { id: '10', name: 'Jessica', message: 'Wishing you many more years of joy and happiness!' },
  { id: '11', name: 'Grandma', message: 'My sweetest blessings to my favorite couple. Love you.' },
  { id: '12', name: 'Chris & Amanda', message: 'Happy 25th! Let\'s celebrate soon.' },
  { id: '13', name: 'Tom', message: 'A perfect pair! Happy anniversary!' }
];

const Wishes = () => {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      const newWish = { id: Date.now().toString(), name, message };
      setWishes([newWish, ...wishes]);
      setSubmittedName(name);
      setName('');
      setMessage('');

      // Show professional thank you message
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 6000);
    }
  };

  const handleDelete = (id, index) => {
    const wishToDelete = wishes.find(w => w.id === id);
    setLastDeleted(wishToDelete);
    setDeletedIndex(index);
    setWishes(wishes.filter(w => w.id !== id));

    // Auto clear the undo option after 10 seconds
    setTimeout(() => {
      setLastDeleted(null);
    }, 10000);
  };

  const handleUndo = () => {
    if (lastDeleted) {
      const newWishes = [...wishes];
      newWishes.splice(deletedIndex, 0, lastDeleted);
      setWishes(newWishes);
      setLastDeleted(null);
    }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl bg-pink-50/50 relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-4xl font-[var(--font-secondary)] text-gray-800 mb-6">Leave a Wish</h2>
          <p className="text-gray-600 mb-8">We'd love to hear from our friends and family on this special day!</p>

          {/* Interactive Thank You Modal */}
          <AnimatePresence>
            {showThankYou && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={() => setShowThankYou(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl p-6 md:p-12 max-w-[95vw] md:max-w-lg w-full text-center shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                  <div className="absolute inset-0 bg-pink-50/50"></div>

                  {/* Floating Hearts */}
                  <motion.div className="absolute top-6 md:top-12 left-6 md:left-12 text-pink-400 text-xl md:text-2xl" animate={{ y: [0, -40], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} >❤️</motion.div>
                  <motion.div className="absolute top-12 md:top-20 right-8 md:right-16 text-pink-300 text-2xl md:text-3xl" animate={{ y: [0, -50], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} >💖</motion.div>
                  <motion.div className="absolute bottom-20 md:bottom-32 left-8 md:left-16 text-pink-400 text-lg md:text-xl" animate={{ y: [0, -30], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 1 }} >💕</motion.div>

                  {/* Teddy Bear Animation */}
                  <motion.div
                    className="text-6xl md:text-8xl mb-4 md:mb-6 relative z-10 cursor-pointer mt-4 md:mt-0"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      rotate: [0, 15, -15, 15, -15, 0],
                      y: [0, -15, 0, -15, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🧸
                  </motion.div>

                  <h3 className="text-2xl md:text-4xl font-[var(--font-secondary)] text-gray-800 mb-3 md:mb-4 relative z-10">
                    Thank You, {submittedName}!
                  </h3>

                  <p className="text-gray-600 text-base md:text-lg relative z-10 leading-relaxed mb-6 md:mb-8 px-2 md:px-0">
                    We have lovingly received your beautiful wish. Your kind words mean the world to us on our special day. Thank you so much for your blessings!
                  </p>

                  <button
                    onClick={() => setShowThankYou(false)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 md:py-3 px-6 md:px-8 rounded-full transition-colors relative z-10 shadow-lg shadow-pink-500/30 hover:scale-105 transform duration-300 mb-4 md:mb-0"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white resize-none"
                placeholder="Wishing you both..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30"
            >
              <Send size={18} />
              Send Wish
            </button>
          </form>
        </motion.div>

        {/* Wishes Display Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 max-h-[700px] overflow-y-auto pr-4 relative"
        >
          <div className="flex items-center justify-between mb-6 sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10">
            <h2 className="text-3xl md:text-4xl font-[var(--font-secondary)] text-gray-800">Guestbook</h2>

            <AnimatePresence>
              {lastDeleted && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleUndo}
                  className="flex items-center gap-2 text-sm bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <Undo2 size={16} /> Undo Delete
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-pink-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group"
              >
                <Heart className="absolute top-6 right-6 text-pink-200 group-hover:text-pink-400 transition-colors" size={20} />
                <p className="text-gray-700 mb-4 italic pr-8">"{wish.message}"</p>
                <div className="flex justify-between items-end">
                  <p className="text-pink-600 font-medium">— {wish.name}</p>

                  <button
                    onClick={() => handleDelete(wish.id, index)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-2 rounded-full hover:bg-red-50"
                    title="Delete Wish"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Wishes;
