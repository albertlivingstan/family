import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set marriage date here
    const marriageDate = new Date('2001-05-02T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = now.getTime() - marriageDate.getTime();

      const years = now.getFullYear() - marriageDate.getFullYear();
      let months = now.getMonth() - marriageDate.getMonth();
      let days = now.getDate() - marriageDate.getDate();

      if (days < 0) {
        months -= 1;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        // years -= 1; // Handled by simple difference if we need precise calendar, let's keep it simple
        // Wait, for exact years we should subtract 1 if months < 0
      }
      
      // Let's use simple math for hours, mins, secs
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      // A more accurate year/month/day calculation
      let y = now.getFullYear() - marriageDate.getFullYear();
      let m = now.getMonth() - marriageDate.getMonth();
      let d = now.getDate() - marriageDate.getDate();

      if (m < 0 || (m === 0 && d < 0)) {
        y--;
        m += 12;
      }
      if (d < 0) {
        m--;
        const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        d += daysInLastMonth;
      }
      if (m < 0) {
        m += 12;
      }

      setTimeElapsed({
        years: y,
        months: m,
        days: d,
        hours,
        minutes,
        seconds
      });
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Years', value: timeElapsed.years },
    { label: 'Months', value: timeElapsed.months },
    { label: 'Days', value: timeElapsed.days },
    { label: 'Hours', value: timeElapsed.hours },
    { label: 'Minutes', value: timeElapsed.minutes },
    { label: 'Seconds', value: timeElapsed.seconds }
  ];

  return (
    <section className="py-20 bg-pink-50 text-center border-y border-pink-100">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-[var(--font-secondary)] text-gray-800 mb-10"
        >
          Time We've Cherished Together
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/50 transition-colors"
            >
              <span className="text-4xl md:text-5xl font-bold text-pink-500 mb-2 font-mono">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="text-sm uppercase tracking-widest text-gray-500">{block.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
