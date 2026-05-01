import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Music, Music3, Heart } from 'lucide-react';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {hearts.map((_, i) => {
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        return (
          <motion.div
            key={i}
            className="absolute bottom-[-50px] text-pink-300 opacity-60"
            style={{ left: `${left}%`, fontSize: size }}
            animate={{
              y: ['0vh', '-100vh'],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
          >
            <Heart fill="currentColor" size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Relying on native autoPlay and user interaction instead of programmatic play on load

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Playback failed", error);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-pink-50">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/image/00c511d9-26e2-4e34-9196-ba9e4ed421cd.png')" }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/90"></div>
      </div>

      <FloatingHearts />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-[var(--font-secondary)] font-semibold tracking-wide mb-6 cursor-default">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-amber-500 drop-shadow-sm hover:opacity-80 transition-opacity duration-300">
              Happy 25th
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-400 to-pink-500 drop-shadow-sm hover:opacity-80 transition-opacity duration-300">
              Anniversary
            </span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl md:text-4xl text-gray-700 font-light mb-8 font-[var(--font-secondary)]"
        >
          Gnana Kumar & Jemima Pushpavathy <br /> <span className="text-xl text-pink-600 mt-2 block">(GJ Family)</span>
        </motion.div>

        <div className="text-xl md:text-2xl text-pink-600 font-medium h-16">
          <Typewriter
            options={{
              strings: [
                'To the love of my life...',
                '25 Years of wonderful memories...',
                'Forever and always.'
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
            }}
          />
        </div>
      </div>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="/audio/wedding-music-valentines-day-182505.mp3" 
        loop 
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Music Toggle Button */}
      <div className="absolute bottom-8 right-8 z-50 flex items-center gap-3">
        {!isPlaying && (
          <span className="text-pink-600 font-medium animate-pulse bg-white/70 px-3 py-1 rounded-full text-sm">
            Play Music
          </span>
        )}
        <button 
          onClick={toggleAudio}
          className="glass-panel p-4 rounded-full text-pink-500 hover:text-pink-600 hover:scale-110 transition-all duration-300 shadow-xl"
          aria-label="Toggle Music"
        >
          {isPlaying ? <Music className="animate-pulse" size={28} /> : <Music3 size={28} />}
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-pink-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-pink-300 flex justify-center p-2">
          <motion.div 
            className="w-1 h-3 bg-pink-400 rounded-full"
            animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
