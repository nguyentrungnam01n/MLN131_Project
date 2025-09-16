import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaBookOpen, 
  FaChartLine, 
  FaClock,
  FaBars,
  FaTimes,
  FaArrowUp
} from 'react-icons/fa';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll to top button
      setShowScrollTop(window.scrollY > 500);

      // Update active section
      const sections = ['home', 'overview', 'thoughts', 'analysis', 'timeline'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', icon: FaHome, label: 'Trang chủ', color: 'from-red-500 to-red-600' },
    { id: 'thoughts', icon: FaBookOpen, label: 'Nội dung', color: 'from-yellow-500 to-yellow-600' },
    { id: 'analysis', icon: FaChartLine, label: 'Phân tích', color: 'from-blue-500 to-blue-600' },
    { id: 'timeline', icon: FaClock, label: 'Nghị quyết', color: 'from-green-500 to-green-600' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed right-6 bottom-24 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-gradient-to-br from-primary-red to-primary-dark-red rounded-full shadow-lg flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          
          {/* Pulse effect when closed */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 bg-primary-red rounded-full"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div className="absolute bottom-16 right-0">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, x: 50, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    x: 0, 
                    opacity: 1,
                    transition: { delay: index * 0.1 }
                  }}
                  exit={{ 
                    scale: 0, 
                    x: 50, 
                    opacity: 0,
                    transition: { delay: (menuItems.length - index) * 0.05 }
                  }}
                  className="mb-3 flex items-center justify-end"
                >
                  {/* Label */}
                  <motion.span
                    className="mr-3 px-3 py-1 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Icon Button */}
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative w-12 h-12 bg-gradient-to-br ${item.color} rounded-full shadow-md flex items-center justify-center text-white`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon size={18} />
                    
                    {/* Active indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 border-2 border-white rounded-full"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed right-6 bottom-6 w-12 h-12 bg-primary-gold rounded-full shadow-lg flex items-center justify-center text-primary-dark-red z-40"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FaArrowUp size={18} />
            <motion.div
              className="absolute inset-0 bg-primary-gold rounded-full"
              animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingMenu;
