import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import VideoSection from './components/VideoSection';
import Message from './components/Message';
import Countdown from './components/Countdown';
import Wishes from './components/Wishes';
import Footer from './components/Footer';
import SlideshowPage from './pages/SlideshowPage';
import ScrollToTop from './components/ScrollToTop';
import { Presentation } from 'lucide-react';

function MainPage() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000); // Confetti for 8 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-[var(--font-primary)]">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={600} colors={['#c0c0c0', '#e5e4e2', '#d4af37', '#ffffff', '#fecdd3']} />}
      <Hero />
      <Message />
      <Countdown />
      <Timeline />
      
      {/* Slideshow Call to Action */}
      <section className="py-16 bg-pink-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl md:text-5xl font-[var(--font-secondary)] text-gray-800 mb-6">Journey Through Time</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Immerse yourself in our beautiful memories. Open our full-screen interactive slideshow to relive our favorite moments.</p>
          <Link 
            to="/slideshow"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 to-pink-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-[0_0_20px_rgba(244,114,182,0.5)] transition-all hover:scale-105"
          >
            <Presentation size={24} />
            Enter Interactive Slideshow
          </Link>
        </div>
      </section>

      <Gallery />
      <VideoSection />
      <Wishes />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/slideshow" element={<SlideshowPage />} />
    </Routes>
  );
}

export default App;
