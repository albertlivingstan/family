import React from 'react';
import { Heart } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-pink-100 py-12 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
            <FaTwitter size={20} />
          </a>
        </div>
        
        <p className="text-gray-600 font-[var(--font-secondary)] text-xl mb-4 flex items-center justify-center gap-2">
          Made with <Heart className="text-pink-500 fill-current" size={20} /> for our Special Day
        </p>
        
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Gnana Kumar & Jemima Pushpavathy (GJ Family). All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
