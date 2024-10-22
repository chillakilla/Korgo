import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScrollToTop = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > 100);
    };

    window.addEventListener('scroll', handleScrollToTop);
    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
    };
  }, []);

  return (
    <div>
      <Button
        onClick={scrollToTop}
        className={`${
          isVisible ? 'block' : 'hidden'
        } fixed bottom-20 right-10 bg-main-color hover:bg-blue-600 font-bold text-white px-4 py-2 rounded-md transition-all duration-300`}
      >
        Top
      </Button>
    </div>
  );
};

export default TopButton;
