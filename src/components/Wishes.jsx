import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Trash2, Undo2, CheckCircle2 } from 'lucide-react';

const initialWishes = [
  { id: '1', name: 'Sarah & Mark', message: 'Happy Anniversary to the most beautiful couple! Wishing you a lifetime of love and happiness.' },
  { id: '2', name: 'Mom & Dad', message: 'We are so proud of the life you have built together. Happy Anniversary! Love you both.' }
];

const Wishes = () => {
  const [wishes, setWishes] = useState(initialWishes);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [lastDeleted, setLastDeleted] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && message.trim() && phone.trim()) {
      const newWish = { id: Date.now().toString(), name, phone, message };
      setWishes([newWish, ...wishes]);
      setSubmittedName(name);
      setName('');
      setPhone('');
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
          
          <AnimatePresence>
            {showThankYou && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 bg-green-100 border-b border-green-200 p-4 flex items-start gap-3 z-20"
              >
                <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-green-800 font-medium">Thank You, {submittedName}!</h4>
                  <p className="text-green-700 text-sm mt-1">
                    We have lovingly received your beautiful wish. Your kind words mean the world to us on our special day. Thank you so much for your blessings!
                  </p>
                </div>
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
                placeholder="John & Jane Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                placeholder="+1 (234) 567-8900"
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
