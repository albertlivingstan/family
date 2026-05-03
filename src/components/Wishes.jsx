import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Trash2, Undo2, Search } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

const Wishes = () => {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(-1);

  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setWishes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      try {
        await addDoc(collection(db, 'wishes'), {
          name,
          message,
          createdAt: new Date()
        });
        setSubmittedName(name);
        setName('');
        setMessage('');

        // Show professional thank you message
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 6000);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleDelete = async (id, index) => {
    const wishToDelete = wishes.find(w => w.id === id);
    setLastDeleted(wishToDelete);
    setDeletedIndex(index);
    
    try {
      await deleteDoc(doc(db, 'wishes', id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }

    // Auto clear the undo option after 10 seconds
    setTimeout(() => {
      setLastDeleted(null);
    }, 10000);
  };

  const handleUndo = async () => {
    if (lastDeleted) {
      try {
        await addDoc(collection(db, 'wishes'), {
          name: lastDeleted.name,
          message: lastDeleted.message,
          createdAt: lastDeleted.createdAt || new Date()
        });
        setLastDeleted(null);
      } catch (error) {
        console.error("Error undoing delete: ", error);
      }
    }
  };

  const filteredWishes = wishes.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    w.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10 gap-4 md:gap-0">
            <h2 className="text-3xl md:text-4xl font-[var(--font-secondary)] text-gray-800">Guestbook</h2>
            
            <div className="relative w-full md:w-auto flex-1 md:max-w-xs md:ml-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search wishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm bg-white shadow-sm"
              />
            </div>

            <AnimatePresence>
              {lastDeleted && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleUndo}
                  className="flex items-center gap-2 text-sm bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors shadow-lg ml-2"
                >
                  <Undo2 size={16} /> Undo
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {filteredWishes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-gray-500 italic"
              >
                No wishes found matching your search.
              </motion.div>
            ) : (
              filteredWishes.map((wish, index) => (
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
            ))
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Wishes;
