import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useParallax, useMouseParallax } from '../hooks/useParallax';

const HeroEnhanced = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Hồ Chí Minh';
  const parallaxOffset = useParallax(0.5);
  const mousePos = useMouseParallax();

  useEffect(() => {
    setIsLoaded(true);
    
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-red via-primary-dark-red to-black"
          animate={{
            background: [
              'linear-gradient(135deg, #DA020E 0%, #B8001F 50%, #000000 100%)',
              'linear-gradient(135deg, #B8001F 0%, #DA020E 50%, #1A0000 100%)',
              'linear-gradient(135deg, #DA020E 0%, #B8001F 50%, #000000 100%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Pattern overlay with parallax */}
        <div 
          className="absolute inset-0 hero-pattern opacity-10"
          style={{
            transform: `translateY(${parallaxOffset * 0.5}px)`
          }}
        />
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-primary-gold rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: ['-100vh', '100vh'],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Light rays effect */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full w-px bg-gradient-to-b from-primary-gold/0 via-primary-gold/20 to-primary-gold/0"
              style={{
                left: `${20 * (i + 1)}%`,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Content with animations */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Decorative stars */}
        <motion.div 
          className="absolute -top-20 -left-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
          }}
        >
          <FaStar className="text-primary-gold text-4xl opacity-30" />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-20 -right-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
          }}
        >
          <FaStar className="text-primary-gold text-5xl opacity-30" />
        </motion.div>

        {/* Main Title with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
            style={{
              transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bảo Tàng
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block"
            >
              Tư Tưởng
            </motion.span>
            <motion.span 
              className="text-gradient bg-gradient-to-r from-primary-gold via-primary-accent-yellow to-primary-gold bg-clip-text text-transparent text-6xl md:text-8xl lg:text-9xl mt-4 block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{
                backgroundSize: '200% 100%',
                animation: 'gradient-shift 3s ease infinite'
              }}
            >
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Subtitle with fade-in */}
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`
          }}
        >
          Khám phá hệ thống tư tưởng vĩ đại và toàn diện của 
          <motion.span 
            className="text-primary-gold font-semibold inline-block mx-2"
            animate={{ 
              y: [0, -5, 0],
              color: ['#FFD700', '#FFEB3B', '#FFD700']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Chủ tịch Hồ Chí Minh
          </motion.span>
          về cách mạng Việt Nam
        </motion.p>

        {/* CTA Buttons with hover effects */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.button 
            onClick={() => scrollToSection('thoughts')}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary-red to-primary-dark-red text-white text-lg font-semibold rounded-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Khám Phá Tư Tưởng</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-gold to-primary-accent-yellow"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0)',
                  '0 0 40px rgba(255, 215, 0, 0.5)',
                  '0 0 20px rgba(255, 215, 0, 0)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
          
          <motion.button 
            onClick={() => scrollToSection('analysis')}
            className="group relative px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Đọc Phân Tích</span>
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="absolute inset-0 flex items-center justify-center text-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Đọc Phân Tích
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Stats preview with counter animation */}
        <motion.div 
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {[
            { value: 5, label: 'Nội Dung Cơ Bản' },
            { value: 79, label: 'Năm Lãnh Đạo' },
            { value: '∞', label: 'Giá Trị Trường Tồn' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-primary-gold mb-2"
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(255, 215, 0, 0)',
                    '0 0 20px rgba(255, 215, 0, 0.5)',
                    '0 0 10px rgba(255, 215, 0, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.button
          onClick={() => scrollToSection('overview')}
          className="relative w-12 h-12 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary-red transition-all duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaChevronDown />
          <motion.div 
            className="absolute inset-0 border-2 border-white rounded-full"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default HeroEnhanced;
