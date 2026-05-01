import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gem, CalendarHeart, PartyPopper } from 'lucide-react';

const events = [
  {
    year: '2001',
    title: 'The Wedding Day',
    description: 'Surrounded by our loved ones, we tied the knot and began our beautiful journey as a married couple.',
    icon: <PartyPopper size={24} />,
    image: '/image/WhatsApp%20Image%202026-05-01%20at%2009.55.09.jpeg'
  },
  {
    year: '2010',
    title: 'Building Our Family',
    description: 'The journey of love growing stronger with each passing day and every new milestone.',
    icon: <Heart size={24} />,
    image: '/image/WhatsApp%20Image%202026-05-01%20at%2010.14.23.jpeg'
  },
  {
    year: '2018',
    title: 'Unforgettable Adventures',
    description: 'Traveling the world together and collecting memories that will last a lifetime.',
    icon: <Gem size={24} />,
    image: '/image/WhatsApp%20Image%202026-05-01%20at%2010.22.02.jpeg'
  },
  {
    year: '2026',
    title: 'Silver Jubilee',
    description: 'Celebrating 25 beautiful years of togetherness. Here is to a lifetime more of love and happiness.',
    icon: <CalendarHeart size={24} />,
    image: '/image/f115e7be-ed96-4f4e-9dbf-8ee2b4c322c2.png'
  }
];

const Timeline = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="story">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-[var(--font-secondary)] text-gray-800"
          >
            Our Love Story
          </motion.h2>
        </div>

        <div className="relative timeline-line">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-5/12"></div>

              {/* Icon Marker */}
              <div className="absolute left-[24px] md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-amber-300 flex items-center justify-center text-amber-500 z-10 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                {event.icon}
              </div>

              {/* Content Card */}
              <div className={`w-full pl-20 md:pl-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'
                }`}>
                <div className="glass-panel p-6 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
                  <span className="text-pink-500 font-bold text-xl mb-2 block">{event.year}</span>
                  <h3 className="text-2xl font-[var(--font-secondary)] text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="rounded-xl overflow-hidden relative group border border-pink-100 shadow-sm bg-pink-50/20">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-auto block transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
