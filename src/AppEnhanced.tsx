import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroEnhanced from './components/HeroEnhanced';
import Overview from './sections/Overview';
import Thoughts from './sections/Thoughts';
import Analysis from './sections/Analysis';
import Timeline from './sections/Timeline';
import Footer from './components/Footer';
import Loader from './components/Loader';
import FloatingMenu from './components/FloatingMenu';

function AppEnhanced() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader 
            key="loader"
            onLoadComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {showContent && (
        <>
          <Header />
          <main>
            <HeroEnhanced />
            <Overview />
            <Thoughts />
            <Analysis />
            <Timeline />
          </main>
          <Footer />
          <FloatingMenu />
        </>
      )}
    </div>
  );
}

export default AppEnhanced;
