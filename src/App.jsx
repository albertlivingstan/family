import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Slideshow from './components/Slideshow';
import Timeline from './components/Timeline';
import VideoSection from './components/VideoSection';
import Message from './components/Message';
import Countdown from './components/Countdown';
import Wishes from './components/Wishes';
import Footer from './components/Footer';

function App() {
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
      <Slideshow />
      <Gallery />
      <VideoSection />
      <Wishes />
      <Footer />
    </div>
  );
}

export default App;
